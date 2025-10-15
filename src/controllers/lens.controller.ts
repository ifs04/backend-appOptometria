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

  // Create a lens
  public async createLens(req: Request, res: Response) {
    const { image, type, material, treatment, price, stock, supplier_id, status } = req.body;
    try {
      let body: LensI = {
        image,
        type,
        material,
        treatment,
        price,
        stock,
        supplier_id,
        status,
      };

      const newLens = await Lens.create({ ...body });
      res.status(201).json(newLens);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a lens
  public async updateLens(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { image, type, material, treatment, price, stock, supplier_id, status } = req.body;
    try {
      let body: LensI = {
        image,
        type,
        material,
        treatment,
        price,
        stock,
        supplier_id,
        status,
      };

      const lensExist = await Lens.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (lensExist) {
        await lensExist.update(body);
        res.status(200).json(lensExist);
      } else {
        res.status(404).json({ error: "Lens not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a lens physically
  public async deleteLens(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lensToDelete = await Lens.findByPk(id);

      if (lensToDelete) {
        await lensToDelete.destroy();
        res.status(200).json({ message: "Lens deleted successfully" });
      } else {
        res.status(404).json({ error: "Lens not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting lens" });
    }
  }

  // Delete a lens logically (change status to "INACTIVE")
  public async deleteLensAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const lensToUpdate = await Lens.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (lensToUpdate) {
        await lensToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Lens marked as inactive" });
      } else {
        res.status(404).json({ error: "Lens not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking lens as inactive" });
    }
  }
}
