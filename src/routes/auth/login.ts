import bcryptjs from "bcryptjs";
import express from "express";
import { body, validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";

import User from "../../models/User";

const jwt = jsonwebtoken;
const bcrypt = bcryptjs;

const router = express.Router();

router.post(
  "/",

  body("email", "Email is required").exists().isEmail().normalizeEmail(),
  body("password", "Password is required").exists(),

  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const query = { email: req.body.email };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).send("Can not find user");
    }

    if (bcrypt.compare(req.body.password, user.password)) {
      const accessToken = await jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          accountType: user.accountType,
          dateCreated: user.dateCreated,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        accessToken: accessToken,
      });
    } else {
      res.status(400).send("Not allowed");
    }
  }
);

export default router;
