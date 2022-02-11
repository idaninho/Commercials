import express from "express";
import {
  createCommercial,
  deleteCommercial,
  getCommercialById,
  getCommercials,
  updateCommercial,
} from "../controllers/commercialController.js";
import { admin, protect } from "../middleware.js/authMiddleware.js";

const router = express.Router();

// Fetch all commercials
//@route GET /api/commercials
//@access public
router.route("/").get(getCommercials).post(createCommercial);

// Fetch single commercial
//@route GET /api/commercials/:id
//@access public
router
  .route("/:id")
  .get(getCommercialById)
  .delete(protect, admin, deleteCommercial)
  .put(updateCommercial);

export default router;
