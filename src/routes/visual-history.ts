import { Router, Application } from "express";
import { VisualHistoryController } from "../controllers/visual-history.controller";
import { authMiddleware } from "../middleware/auth";

export class VisualHistoryRoutes {
  public visualHistoryController: VisualHistoryController = new VisualHistoryController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/visual-histories/public")
      .get(this.visualHistoryController.getAllVisualHistories)
      .post(this.visualHistoryController.createVisualHistory);

    app.route("/visual-histories/public/:id")
      .get(this.visualHistoryController.getVisualHistoryById)
      .patch(this.visualHistoryController.updateVisualHistory)
      .delete(this.visualHistoryController.deleteVisualHistory);

    app.route("/visual-histories/public/:id/logic")
      .delete(this.visualHistoryController.deleteVisualHistoryAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/visual-histories")
      .get(authMiddleware, this.visualHistoryController.getAllVisualHistories)
      .post(authMiddleware, this.visualHistoryController.createVisualHistory);

    app.route("/visual-histories/:id")
      .get(authMiddleware, this.visualHistoryController.getVisualHistoryById)
      .patch(authMiddleware, this.visualHistoryController.updateVisualHistory)
      .delete(authMiddleware, this.visualHistoryController.deleteVisualHistory);

    app.route("/visual-histories/:id/logic")
      .delete(authMiddleware, this.visualHistoryController.deleteVisualHistoryAdv);
  }
}
