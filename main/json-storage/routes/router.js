import { Router } from "express";
import dataController from "../controllers/controller.js";
const router = Router();

// const router = express.Router();

// router.get("/user/:id", async (req, res) => {
//   try {
//     dataController.dataGet(req, res);
//   } catch (e) {
//     res.status(500).json({ error: "error" });
//   }
// });
// router.post("/user/:id", async (req, res) => {
//   try {
//     dataController.dataPost(req, res);
//   } catch (e) {
//     res.status(500).json({ error: "error" });
//   }
// });

const createRouter = () => {
  router.post("/:route", dataController.post);
  router.get("/:route", dataController.get);
  return router;
};

export default createRouter;
