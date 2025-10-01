import { Request, Response } from "express";
import { EyeExamI } from "../models/eye-exam";

export class EyeExamController {
  // Get all eye exams (dummy, as EyeExam is interface only)
  public async getAllEyeExams(req: Request, res: Response) {
    res.status(200).json({ message: "No persistence for EyeExam" });
  }

  // Get an eye exam by ID (dummy)
  public async getEyeExamById(req: Request, res: Response) {
    res.status(404).json({ error: "EyeExam is not a persistent model" });
  }
}
