import { connectDatabase, deleteCollection, getCollection } from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import validUrl from "valid-url";
export default async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(422).json({ message: "Cannot reach database." });
    return;
  }

  const id = req.query.id;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(422).json({ message: "Not authorized." });
    return;
  }
  /* method put*/
  if (req.method === "PUT") {
    const { photoUrl, photoCaption, photoHashtags } = req.body;
    /* valite every req.body */
    if (
      !photoCaption ||
      photoCaption.trim() === "" ||
      !photoUrl ||
      photoUrl.trim() === "" ||
      !photoHashtags ||
      photoHashtags.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const hashtagRegex = /#\w+(?:\s+#\w+)*/g;

    if (!hashtagRegex.test(photoHashtags)) {
      res.status(422).json({ message: "Invalid hashtags." });
      return;
    }

    /* validate image url */
    if (!validUrl.isUri(photoUrl)) {
      res.status(422).json({ message: "Invalid image URL." });
      return;
    }

    try {
      const db = client.db("blog");
      const updatedPost = await db.collection("posts").updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            photoUrl: photoUrl,
            caption: photoCaption,
            hashtags: photoHashtags,
          },
        }
      );
      res.status(201).json({ message: "Post updated.", post: updatedPost });
    } catch (err) {
      res.status(422).json({ message: "Failed to update post." });
      return;
    }
  }
  /* method delete */
  if (req.method === "DELETE") {
    try {
      const deletedPost = await deleteCollection(client, "blog", "posts", id);
      res.status(201).json({ message: "Post deleted!" });
    } catch (err) {
      res.status(422).json({ message: "Failed to delete post." });
      return;
    }
  }
  /* method get */
  if (req.method === "GET") {
    try {
      const post = await getCollection(client, "blog", "posts", id);
      res.status(201).json({ message: "Post fetched.", post: post });
    } catch (err) {
      res
        .status(422)
        .json({ message: "Failed to get the post." || err.message });
    }
  }
}
