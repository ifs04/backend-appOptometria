import { Request, Response } from "express";
import { VisualExam, VisualExamI } from "../models/visual-exam";

export class VisualExamController {
  // Get all visual exams
  public async getAllVisualExams(req: Request, res: Response) {
    try {
      const exams: VisualExamI[] = await VisualExam.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json({ exams });
    } catch (error) {
      res.status(500).json({ error: "Error fetching visual exams" });
    }
  }

  // Get a visual exam by ID
  public async getVisualExamById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const exam = await VisualExam.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });
      if (exam) {
        res.status(200).json(exam);
      } else {
        res.status(404).json({ error: "Visual exam not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching visual exam" });
    }
  }

  // Create a visual exam
  public async createVisualExam(req: Request, res: Response) {
    const { date, prescription, od, oi, appointment_id, status } = req.body;
    try {
      let body: VisualExamI = {
        date,
        prescription,
        od,
        oi,
        appointment_id,
        status,
      };

      const newExam = await VisualExam.create({ ...body });
      res.status(201).json(newExam);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a visual exam
  public async updateVisualExam(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { date, prescription, od, oi, appointment_id, status } = req.body;
    try {
      let body: VisualExamI = {
        date,
        prescription,
        od,
        oi,
        appointment_id,
        status,
      };

      const examExist = await VisualExam.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (examExist) {
        await examExist.update(body);
        res.status(200).json(examExist);
      } else {
        res.status(404).json({ error: "Visual exam not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a visual exam physically
  public async deleteVisualExam(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const examToDelete = await VisualExam.findByPk(id);

      if (examToDelete) {
        await examToDelete.destroy();
        res.status(200).json({ message: "Visual exam deleted successfully" });
      } else {
        res.status(404).json({ error: "Visual exam not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting visual exam" });
    }
  }

  // Delete a visual exam logically (change status to "INACTIVE")
  public async deleteVisualExamAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const examToUpdate = await VisualExam.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (examToUpdate) {
        await examToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Visual exam marked as inactive" });
      } else {
        res.status(404).json({ error: "Visual exam not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking visual exam as inactive" });
    }
  }
}
