import express from "express";

// import routes here

const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).send("Welcome!");
});

export default router;
