import Express from "express";
import {
  addIssueReview, 
  createIssue, 
  deleteIssueById, 
  getIssueById, 
  getIssues, 
  getTopIssues, 
  initIssue, 
  updateIssueById
} from "../controllers/issueController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = Express.Router();

router.route("/")
  .get(getIssues)
  .post(protect, admin, createIssue);

router.get("/top/:limit", getTopIssues);
router.get("/top/", getTopIssues);

router
  .route("/:id")
  .get(getIssueById)
  .delete(protect, deleteIssueById)
  .put(protect, updateIssueById);

router.route("/:id/reviews").post(protect, addIssueReview);

export default router;
