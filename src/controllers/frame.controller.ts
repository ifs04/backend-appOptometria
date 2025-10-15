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

  // Create a frame
  public async createFrame(req: Request, res: Response) {
    const { brand, model, material, color, price, stock, supplier_id, image, status } = req.body;
    try {
      let body: FrameI = {
        brand,
        model,
        material,
        color,
        price,
        stock,
        supplier_id,
        image,
        status,
      };

      const newFrame = await Frame.create({ ...body });
      res.status(201).json(newFrame);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a frame
  public async updateFrame(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { brand, model, material, color, price, stock, supplier_id, image, status } = req.body;
    try {
      let body: FrameI = {
        brand,
        model,
        material,
        color,
        price,
        stock,
        supplier_id,
        image,
        status,
      };

      const frameExist = await Frame.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (frameExist) {
        await frameExist.update(body);
        res.status(200).json(frameExist);
      } else {
        res.status(404).json({ error: "Frame not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a frame physically
  public async deleteFrame(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const frameToDelete = await Frame.findByPk(id);

      if (frameToDelete) {
        await frameToDelete.destroy();
        res.status(200).json({ message: "Frame deleted successfully" });
      } else {
        res.status(404).json({ error: "Frame not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting frame" });
    }
  }

  // Delete a frame logically (change status to "INACTIVE")
  public async deleteFrameAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const frameToUpdate = await Frame.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (frameToUpdate) {
        await frameToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Frame marked as inactive" });
      } else {
        res.status(404).json({ error: "Frame not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking frame as inactive" });
    }
  }
}
