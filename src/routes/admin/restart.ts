import express from "express";

const router = express.Router();

async function restart(req, res) {
  await res.send("Restarting...").then(() => {
    process.exit(0);
  });
}

router.post("/", (req, res) => {
  restart(req, res);
});

export default router;
