import { Request, Response } from "express";
import { Optometrist, OptometristI } from "../models/optometrist";

export class OptometristController {
  // Get all optometrists with status "ACTIVE"
  public async getAllOptometrists(req: Request, res: Response) {
    try {
      const optometrists: OptometristI[] = await Optometrist.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json( optometrists);
    } catch (error) {
      res.status(500).json({ error: "Error fetching optometrists" });
    }
  }

  // Get an optometrist by ID
  public async getOptometristById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const optometrist = await Optometrist.findOne({
        where: { id: pk, status: 'ACTIVE' },
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

  // Create an optometrist
  public async createOptometrist(req: Request, res: Response) {
    const { name, specialty,  phone, email, status } = req.body;
    try {
      let body: OptometristI = {
        name,
        
        specialty,
        phone,
        email,
        status,
      };

      const newOptometrist = await Optometrist.create({ ...body });
      res.status(201).json(newOptometrist);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an optometrist
  public async updateOptometrist(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, specialty, phone, email, status } = req.body;
    try {
      let body: OptometristI = {
        name,
        specialty,
        phone,
        email,
        status,
      };

      const optometristExist = await Optometrist.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (optometristExist) {
        await optometristExist.update(body);
        res.status(200).json(optometristExist);
      } else {
        res.status(404).json({ error: "Optometrist not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete an optometrist physically
  public async deleteOptometrist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const optometristToDelete = await Optometrist.findByPk(id);

      if (optometristToDelete) {
        await optometristToDelete.destroy();
        res.status(200).json({ message: "Optometrist deleted successfully" });
      } else {
        res.status(404).json({ error: "Optometrist not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting optometrist" });
    }
  }

  // Delete an optometrist logically (change status to "INACTIVE")
  public async deleteOptometristAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const optometristToUpdate = await Optometrist.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (optometristToUpdate) {
        await optometristToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Optometrist marked as inactive" });
      } else {
        res.status(404).json({ error: "Optometrist not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking optometrist as inactive" });
    }
  }
}
