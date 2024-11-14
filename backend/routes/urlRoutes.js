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

router.post("/register", protect, registerURL);

router.get("/list", protect, listURLs);

router.put("/update/:id", protect, updateURL);

router.delete("/delete/:id", protect, deleteURL);

router.get("/original-url/:shortCode", redirectToOriginalURL);

export default router;
