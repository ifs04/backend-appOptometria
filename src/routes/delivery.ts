import { Application } from "express";
import { DeliveryController } from "../controllers/delivery.controller";
import { authMiddleware } from "../middleware/auth";

export class DeliveryRoutes {
  public deliveryController: DeliveryController = new DeliveryController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/deliveries/public")
      .get(this.deliveryController.getAllDeliveries)
      .post(this.deliveryController.createDelivery);

    app.route("/deliveries/public/:id")
      .get(this.deliveryController.getDeliveryById)
      .patch(this.deliveryController.updateDelivery)
      .delete(this.deliveryController.deleteDelivery);

    // app.route("/deliveries/public/:id/logic")
    //   .delete(this.deliveryController.deleteDeliveryAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/deliveries")
      .get(authMiddleware, this.deliveryController.getAllDeliveries)
      .post(authMiddleware, this.deliveryController.createDelivery);

    app.route("/deliveries/:id")
      .get(authMiddleware, this.deliveryController.getDeliveryById)
      .patch(authMiddleware, this.deliveryController.updateDelivery)
      .delete(authMiddleware, this.deliveryController.deleteDelivery);

    // app.route("/deliveries/:id/logic")
    //   .delete(authMiddleware, this.deliveryController.deleteDeliveryAdv);
  }
}
