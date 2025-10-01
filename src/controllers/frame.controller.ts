import { Request, Response } from "express";
import { Frame, FrameI } from "../models/frame";

export class FrameController {
  // Get all frames
  public async getAllFrames(req: Request, res: Response) {
    try {
      const frames: FrameI[] = await Frame.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json({ frames });
    } catch (error) {
      res.status(500).json({ error: "Error fetching frames" });
    }
  }

  // Get a frame by ID
  public async getFrameById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const frame = await Frame.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });
      if (frame) {
        res.status(200).json(frame);
      } else {
        res.status(404).json({ error: "Frame not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching frame" });
    }
  }
}
