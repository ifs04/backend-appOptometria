import { Request, Response } from "express";
import { Lens, LensI } from "../models/lens";

export class LensController {
  // Get all lenses
  public async getAllLenses(req: Request, res: Response) {
    try {
      const lenses: LensI[] = await Lens.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json({ lenses });
    } catch (error) {
      res.status(500).json({ error: "Error fetching lenses" });
    }
  }

  // Get a lens by ID
  public async getLensById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const lens = await Lens.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });
      if (lens) {
        res.status(200).json(lens);
      } else {
        res.status(404).json({ error: "Lens not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching lens" });
    }
  }
}
