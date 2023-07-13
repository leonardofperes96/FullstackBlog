import {
  addPost,
  connectDatabase,
  getAllPosts,
  deleteCollection,
} from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(422).json({ message: "Cannot reach database." });
    return;
  }

  if (req.method === "GET") {
    try {
      const getAllComments = await getAllPosts(client, "blog", "comments");
      res.status(201).json({
        message: "Fetched all posts sucessfull.",
        comments: getAllComments,
      });
    } catch (err) {
      res.status(422).json({ message: "Error fetching comments." });
      return;
    }
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(422).json({ message: "Dont have enough authorization." });
      return;
    }

    const { userId, postId, comment, username } = req.body;
    if (!comment || comment.trim() === "") {
      res.status(422).json({ message: "Insert a valid comment." });
      return;
    }

    const commentObj = {
      userId,
      postId,
      comment,
      username,
    };

    const post = await addPost(client, "blog", "comments", commentObj);
    res.status(201).json({ message: "Post added sucessfull", post: post });
  }
  if (req.method === "DELETE") {
    const id = JSON.parse(req.body);
    const { commentId } = id;

    try {
      const deletedPost = await deleteCollection(
        client,
        "blog",
        "comments",
        commentId
      );
      res.status(201).json({ message: "Post deleted!" });
    } catch (err) {
      res.status(422).json({ message: "Cannot delete the comment." });
    }
  }
}
