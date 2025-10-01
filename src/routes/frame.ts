import { Router, Application } from "express";
import { FrameController } from "../controllers/frame.controller";

export class FrameRoutes {
  public frameController: FrameController = new FrameController();

  public routes(app: Application): void {
    app.route("/frames").get(this.frameController.getAllFrames);
    app.route("/frames/:id").get(this.frameController.getFrameById);
  }
}
