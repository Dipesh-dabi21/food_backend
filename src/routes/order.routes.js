import { Router } from "express";
import {
  placeOrder,
  listOrders,
  getOrder,
  trackOrder,
  changeStatus,
  deleteOrder,
} from "../controllers/order.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", placeOrder);
router.get("/:id/track", trackOrder);
router.get("/", requireAdmin, listOrders);
router.get("/:id", requireAdmin, getOrder);
router.patch("/:id/status", requireAdmin, changeStatus);
router.delete("/:id", requireAdmin, deleteOrder);
export default router;
