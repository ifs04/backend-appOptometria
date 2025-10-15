import { Router, Application } from "express";
import { LensController } from "../controllers/lens.controller";
import { authMiddleware } from "../middleware/auth";

export class LensRoutes {
  public lensController: LensController = new LensController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/lenses/public")
      .get(this.lensController.getAllLenses)
      .post(this.lensController.createLens);

    app.route("/lenses/public/:id")
      .get(this.lensController.getLensById)
      .patch(this.lensController.updateLens)
      .delete(this.lensController.deleteLens);

    app.route("/lenses/public/:id/logic")
      .delete(this.lensController.deleteLensAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/lenses")
      .get(authMiddleware, this.lensController.getAllLenses)
      .post(authMiddleware, this.lensController.createLens);

    app.route("/lenses/:id")
      .get(authMiddleware, this.lensController.getLensById)
      .patch(authMiddleware, this.lensController.updateLens)
      .delete(authMiddleware, this.lensController.deleteLens);

    app.route("/lenses/:id/logic")
      .delete(authMiddleware, this.lensController.deleteLensAdv);
  }
}
