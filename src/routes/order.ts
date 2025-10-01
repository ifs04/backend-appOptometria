import { Router, Application } from "express";
import { OrderController } from "../controllers/order.controller";

export class OrderRoutes {
  public orderController: OrderController = new OrderController();

  public routes(app: Application): void {
    app.route("/orders").get(this.orderController.getAllOrders);
    app.route("/orders/:id").get(this.orderController.getOrderById);
  }
}
