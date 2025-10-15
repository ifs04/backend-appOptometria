import { Application } from "express";
import { OptometristController } from "../controllers/optometrist.controller";
import { authMiddleware } from "../middleware/auth";

export class OptometristRoutes {
  public optometristController: OptometristController = new OptometristController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/optometrists/public")
      .get(this.optometristController.getAllOptometrists)
      .post(this.optometristController.createOptometrist);

    app.route("/optometrists/public/:id")
      .get(this.optometristController.getOptometristById)
      .patch(this.optometristController.updateOptometrist)
      .delete(this.optometristController.deleteOptometrist);

    app.route("/optometrists/public/:id/logic")
      .delete(this.optometristController.deleteOptometristAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/optometrists")
      .get(authMiddleware, this.optometristController.getAllOptometrists)
      .post(authMiddleware, this.optometristController.createOptometrist);

    app.route("/optometrists/:id")
      .get(authMiddleware, this.optometristController.getOptometristById)
      .patch(authMiddleware, this.optometristController.updateOptometrist)
      .delete(authMiddleware, this.optometristController.deleteOptometrist);

    app.route("/optometrists/:id/logic")
      .delete(authMiddleware, this.optometristController.deleteOptometristAdv);
  }
}
