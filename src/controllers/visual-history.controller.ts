import { Request, Response } from "express";
import { VisualHistory, VisualHistoryI } from "../models/visual-history";

export class VisualHistoryController {
  // Get all visual histories
  public async getAllVisualHistories(req: Request, res: Response) {
    try {
      const histories: VisualHistoryI[] = await VisualHistory.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json(histories);
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

  // Create a visual history
  public async createVisualHistory(req: Request, res: Response) {
    const { patient_id, observations, date, status } = req.body;
    try {
      let body: VisualHistoryI = {
        patient_id,
        observations,
        date,
        status,
      };

      const newHistory = await VisualHistory.create({ ...body });
      res.status(201).json(newHistory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a visual history
  public async updateVisualHistory(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { patient_id, observations, date, status } = req.body;
    try {
      let body: VisualHistoryI = {
        patient_id,
        observations,
        date,
        status,
      };

      const historyExist = await VisualHistory.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (historyExist) {
        await historyExist.update(body);
        res.status(200).json(historyExist);
      } else {
        res.status(404).json({ error: "Visual history not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a visual history physically
  public async deleteVisualHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const historyToDelete = await VisualHistory.findByPk(id);

      if (historyToDelete) {
        await historyToDelete.destroy();
        res.status(200).json({ message: "Visual history deleted successfully" });
      } else {
        res.status(404).json({ error: "Visual history not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting visual history" });
    }
  }

  // Delete a visual history logically (change status to "INACTIVE")
  public async deleteVisualHistoryAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const historyToUpdate = await VisualHistory.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (historyToUpdate) {
        await historyToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Visual history marked as inactive" });
      } else {
        res.status(404).json({ error: "Visual history not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking visual history as inactive" });
    }
  }
}
