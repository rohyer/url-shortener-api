import express from "express";
const router = express.Router();
import {
  registerURL,
  listURLs,
  updateURL,
  deleteURL,
  redirectToOriginalURL
} from "../controllers/urlController.js";
import protect from "../middleware/authMiddleware.js";

router.post("/", protect, registerURL);

router.get("/", protect, listURLs);

router.put("/:id", protect, updateURL);

router.delete("/:id", protect, deleteURL);

router.get("/:shortCode", redirectToOriginalURL);

export default router;
