import express from "express";
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
} from "./services/noticeServices";

const noticeRoute = express.Router();

noticeRoute.get("/", getAllNotices);
noticeRoute.get("/:id", getNoticeById);
noticeRoute.post("/", createNotice);
noticeRoute.patch("/:id", updateNotice);
noticeRoute.delete("/:id", deleteNotice);

export default noticeRoute;
