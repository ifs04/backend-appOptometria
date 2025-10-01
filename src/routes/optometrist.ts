import { Router, Application } from "express";
import { OptometristController } from "../controllers/optometrist.controller";

export class OptometristRoutes {
  public optometristController: OptometristController = new OptometristController();

  public routes(app: Application): void {
    app.route("/optometrists").get(this.optometristController.getAllOptometrists);
    app.route("/optometrists/:id").get(this.optometristController.getOptometristById);
  }
}
