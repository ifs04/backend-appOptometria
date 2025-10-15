import { Router, Application } from "express";
import { FrameController } from "../controllers/frame.controller";
import { authMiddleware } from "../middleware/auth";

export class FrameRoutes {
  public frameController: FrameController = new FrameController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/frames/public")
      .get(this.frameController.getAllFrames)
      .post(this.frameController.createFrame);

    app.route("/frames/public/:id")
      .get(this.frameController.getFrameById)
      .patch(this.frameController.updateFrame)
      .delete(this.frameController.deleteFrame);

    app.route("/frames/public/:id/logic")
      .delete(this.frameController.deleteFrameAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/frames")
      .get(authMiddleware, this.frameController.getAllFrames)
      .post(authMiddleware, this.frameController.createFrame);

    app.route("/frames/:id")
      .get(authMiddleware, this.frameController.getFrameById)
      .patch(authMiddleware, this.frameController.updateFrame)
      .delete(authMiddleware, this.frameController.deleteFrame);

    app.route("/frames/:id/logic")
      .delete(authMiddleware, this.frameController.deleteFrameAdv);
  }
}
