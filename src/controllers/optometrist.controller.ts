import { Request, Response } from "express";
import { Optometrist, OptometristI } from "../models/optometrist";

export class OptometristController {
  // Get all optometrists with status "ACTIVE"
  public async getAllOptometrists(req: Request, res: Response) {
    try {
      const optometrists: OptometristI[] = await Optometrist.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json({ optometrists });
    } catch (error) {
      res.status(500).json({ error: "Error fetching optometrists" });
    }
  }

  // Get an optometrist by ID
  public async getOptometristById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const optometrist = await Optometrist.findOne({
        where: {
          id: pk,
          status: 'ACTIVE'
        },
      });
      if (optometrist) {
        res.status(200).json(optometrist);
      } else {
        res.status(404).json({ error: "Optometrist not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching optometrist" });
    }
  }
}
