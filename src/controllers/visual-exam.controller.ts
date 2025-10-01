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
}
