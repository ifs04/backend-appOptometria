import { Application } from "express";
import { VisualExamController } from "../controllers/visual-exam.controller";
import { authMiddleware } from "../middleware/auth";

export class VisualExamRoutes {
  public visualExamController: VisualExamController = new VisualExamController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/visual-exams/public")
      .get(this.visualExamController.getAllVisualExams)
      .post(this.visualExamController.createVisualExam);

    app.route("/visual-exams/public/:id")
      .get(this.visualExamController.getVisualExamById)
      .patch(this.visualExamController.updateVisualExam)
      .delete(this.visualExamController.deleteVisualExam);

    app.route("/visual-exams/public/:id/logic")
      .delete(this.visualExamController.deleteVisualExamAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/visual-exams")
      .get(authMiddleware, this.visualExamController.getAllVisualExams)
      .post(authMiddleware, this.visualExamController.createVisualExam);

    app.route("/visual-exams/:id")
      .get(authMiddleware, this.visualExamController.getVisualExamById)
      .patch(authMiddleware, this.visualExamController.updateVisualExam)
      .delete(authMiddleware, this.visualExamController.deleteVisualExam);

    app.route("/visual-exams/:id/logic")
      .delete(authMiddleware, this.visualExamController.deleteVisualExamAdv);
  }
}
