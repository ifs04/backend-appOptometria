import { Request, Response } from "express";
import { VisualHistory, VisualHistoryI } from "../models/visual-history";

export class VisualHistoryController {
  // Get all visual histories
  public async getAllVisualHistories(req: Request, res: Response) {
    try {
      const histories: VisualHistoryI[] = await VisualHistory.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json({ histories });
    } catch (error) {
      res.status(500).json({ error: "Error fetching visual histories" });
    }
  }

  // Get a visual history by ID
  public async getVisualHistoryById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const history = await VisualHistory.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });
      if (history) {
        res.status(200).json(history);
      } else {
        res.status(404).json({ error: "Visual history not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching visual history" });
    }
  }
}
