import { Router, Application } from "express";
import { EyeExamController } from "../controllers/eye-exam.controller";

export class EyeExamRoutes {
  public eyeExamController: EyeExamController = new EyeExamController();

  public routes(app: Application): void {
    app.route("/eye-exams").get(this.eyeExamController.getAllEyeExams);
    app.route("/eye-exams/:id").get(this.eyeExamController.getEyeExamById);
  }
}
