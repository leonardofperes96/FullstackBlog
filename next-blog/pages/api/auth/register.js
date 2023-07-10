import { connectDatabase, getUser } from "@/utils/db";
import { passwordHashed } from "@/utils/password-utils";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(422).json({ message: "Cannot reach database." });
  }

  const { username, email, password } = req.body;

  if (
    !username ||
    username.trim() === "" ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim() === ""
  ) {
    res.status(422).json({ message: "Invalid input." });
    return;
  }
 
  if (password.length < 5) {
    res
      .status(422)
      .json({ message: "Your password need to be atleast 6 characters." });
  }

  const existingUser = await getUser(client, "blog", "users", email);
  if (existingUser) {
    res.status(422).json({ message: "This user already exists." });
    return;
  }

  const hashedPassword = await passwordHashed(password);

  const db = client.db("blog");

  const registeredUser = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    username,
  });

  res
    .status(200)
    .json({ message: "User created with success", user: registeredUser });
}
