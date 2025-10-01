import { Router, Application } from "express";
import { OrderDetailController } from "../controllers/order-detail.controller";

export class OrderDetailRoutes {
  public orderDetailController: OrderDetailController = new OrderDetailController();

  public routes(app: Application): void {
    app.route("/order-details").get(this.orderDetailController.getAllOrderDetails);
    app.route("/order-details/:id").get(this.orderDetailController.getOrderDetailById);
  }
}
