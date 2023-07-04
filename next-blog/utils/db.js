import clientPromise from "@/lib/mongodb";

export const connectDatabase = async () => {
  const client = await clientPromise;

  return client;
};

export const getUser = async (client, database, collection, email) => {
  const db = await client.db(database);

  const user = await db.collection(collection).findOne({
    email: email,
  });

  return user;
};
