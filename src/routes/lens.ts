import { Router, Application } from "express";
import { LensController } from "../controllers/lens.controller";

export class LensRoutes {
  public lensController: LensController = new LensController();

  public routes(app: Application): void {
    app.route("/lenses").get(this.lensController.getAllLenses);
    app.route("/lenses/:id").get(this.lensController.getLensById);
  }
}
