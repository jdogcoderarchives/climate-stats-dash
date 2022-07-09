import * as bcrypt from "bcryptjs";
import express from "express";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

import User from "../../models/User";

const router = express.Router();

router.post("/add", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const accountType = req.body.accountType;

  const query = { email: email };

  const emailExists = await User.findOne(query);
  if (emailExists) {
    return res.status(400).send("Email already exists in system!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    id: uuidv4(),
    name: name,
    email: email,
    password: hashedPassword,
    accountType: accountType,
  });

  const newUser = await user.save();
  res.send({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    dateCreated: newUser.dateCreated,
    accountType: newUser.accountType,
  });
});

export default router;
