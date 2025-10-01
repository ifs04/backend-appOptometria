import { Router, Application } from "express";
import { VisualHistoryController } from "../controllers/visual-history.controller";

export class VisualHistoryRoutes {
  public visualHistoryController: VisualHistoryController = new VisualHistoryController();

  public routes(app: Application): void {
    app.route("/visual-histories").get(this.visualHistoryController.getAllVisualHistories);
    app.route("/visual-histories/:id").get(this.visualHistoryController.getVisualHistoryById);
  }
}
