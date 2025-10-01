import { Router, Application } from "express";
import { VisualExamController } from "../controllers/visual-exam.controller";

export class VisualExamRoutes {
  public visualExamController: VisualExamController = new VisualExamController();

  public routes(app: Application): void {
    app.route("/visual-exams").get(this.visualExamController.getAllVisualExams);
    app.route("/visual-exams/:id").get(this.visualExamController.getVisualExamById);
  }
}
