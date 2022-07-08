import express from "express";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).send("Welcome")
  })

export default router