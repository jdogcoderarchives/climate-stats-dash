import express from "express";

import restartRoute from "./admin/restart";
import userRoutes from "./admin/users";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/restart", restartRoute);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/error", (req, res) => {
  throw new Error("Test error from admin route");
});

export default router;
