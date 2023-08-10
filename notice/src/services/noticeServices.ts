import { Request, Response } from "express";
import { Notice } from "../db/models";

// GET /notices
// Gets all notices
export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /notices/:id
// Gets a notice by id
export const getNoticeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notice = await Notice.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /notices
// Creates a new notice
export const createNotice = async (req: Request, res: Response) => {
  const { title, content, startDateTime, duration } = req.body;

  try {
    const notice = await Notice.create({
      title,
      content,
      startDateTime,
      duration,
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /notices/:id
// Updates a notice
export const updateNotice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const notice = await Notice.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    await notice.update({ title, content });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /notices/:id
// Deletes a notice
export const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const notice = await Notice.findByPk(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    await notice.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
