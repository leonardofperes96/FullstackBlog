import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import validUrl from "valid-url";
import { addPost, connectDatabase, getAllPosts, getUser } from "@/utils/db";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(422).json({ message: "Could not reach the database." });
    return;
  }

  if (req.method === "GET") {
    try {
      const posts = await getAllPosts(client, "blog", "posts");
      res
        .status(200)
        .json({ message: "Success getting the data.", posts: posts });
    } catch (err) {
      res.status(422).json({ message: "Failed to get the posts." });
      return;
    }
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(422).json({ message: "Unauthorized." });
      return;
    }
    const { email } = session.user;

    const user = await getUser(client, "blog", "users", email);
    if (!user) {
      res.status(422).json({ message: "You dont have enough permission." });
      return;
    }
    const userId = new ObjectId(user._id).toString();
    const { caption, photoUrl, hashtags, username } = req.body;
    if (
      !caption ||
      caption.trim() === "" ||
      !photoUrl ||
      photoUrl.trim() === "" ||
      !hashtags ||
      hashtags.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const hashtagRegex = /#\w+(?:\s+#\w+)*/g;

    if (!hashtagRegex.test(hashtags)) {
      res.status(422).json({ message: "Invalid hashtags." });
      return;
    }

    /* validate image url */
    if (!validUrl.isUri(photoUrl)) {
      res.status(422).json({ message: "Invalid image URL." });
      return;
    }

    const obj = {
      userId,
      caption,
      photoUrl,
      hashtags,
      username,
    };
    const post = await addPost(client, "blog", "posts", obj);

    res.status(200).json({ message: "Post added sucessfull.", post: post });
  }
}
