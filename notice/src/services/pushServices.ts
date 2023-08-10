import { Op } from "sequelize";
import { Notice } from "../db/models";
import { Request, Response } from "express";

export const getIncomingNotices = async (req: Request, res: Response) => {
  const currentTime = Date.now(); // Current time in milliseconds
  let endDateTime;

  const oneHour = 3600000; // 1 hour in milliseconds

  const { duration } = req.query;

  if (duration && !isNaN(+duration)) {
    endDateTime = currentTime + +duration;
  } else {
    endDateTime = currentTime + oneHour;
  }

  try {
    const notices = await Notice.findAll({
      where: {
        startDateTime: {
          [Op.between]: [currentTime, endDateTime],
        },
      },
    });

    const payload = notices.map((notice) => {
      return notice.dataValues;
    }, []);

    res.status(200).json({
      notices: payload,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
