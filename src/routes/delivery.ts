import { Router, Application } from "express";
import { DeliveryController } from "../controllers/delivery.controller";

export class DeliveryRoutes {
  public deliveryController: DeliveryController = new DeliveryController();

  public routes(app: Application): void {
    app.route("/deliveries").get(this.deliveryController.getAllDeliveries);
    app.route("/deliveries/:id").get(this.deliveryController.getDeliveryById);
  }
}
