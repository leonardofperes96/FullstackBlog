import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const connectDatabase = async () => {
  const client = await clientPromise;

  return client;
};

export const getUser = async (client, database, docCollection, email) => {
  const db = await client.db(database);

  const user = await db.collection(docCollection).findOne({
    email: email,
  });

  return user;
};

export const addPost = async (client, database, docCollection, addPostObj) => {
  const db = client.db(database);

  const post = await db.collection(docCollection).insertOne(addPostObj);

  return post;
};

export const getAllPosts = async (client, database, docCollection) => {
  const db = client.db(database);

  const posts = await db
    .collection(docCollection)
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return posts;
};

export const getCollection = async (client, database, docCollection, id) => {
  const db = client.db(database);
  const post = await db.collection(docCollection).findOne({
    _id: new ObjectId(id),
  });

  return post;
};

export const deleteCollection = async (client, database, docCollection, id) => {
  const db = client.db(database);
  const deletedPost = await db.collection(docCollection).deleteOne({
    _id: new ObjectId(id),
  });
  return deletedPost;
};
