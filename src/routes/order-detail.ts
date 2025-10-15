import { Application } from "express";
import { OrderDetailController } from "../controllers/order-detail.controller";
import { authMiddleware } from "../middleware/auth";

export class OrderDetailRoutes {
  public orderDetailController: OrderDetailController = new OrderDetailController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/order-details/public")
      .get(this.orderDetailController.getAllOrderDetails)
      .post(this.orderDetailController.createOrderDetail);

    app.route("/order-details/public/:id")
      .get(this.orderDetailController.getOrderDetailById)
      .patch(this.orderDetailController.updateOrderDetail)
      .delete(this.orderDetailController.deleteOrderDetail);

    app.route("/order-details/public/:id/logic")
      .delete(this.orderDetailController.deleteOrderDetailAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/order-details")
      .get(authMiddleware, this.orderDetailController.getAllOrderDetails)
      .post(authMiddleware, this.orderDetailController.createOrderDetail);

    app.route("/order-details/:id")
      .get(authMiddleware, this.orderDetailController.getOrderDetailById)
      .patch(authMiddleware, this.orderDetailController.updateOrderDetail)
      .delete(authMiddleware, this.orderDetailController.deleteOrderDetail);

    app.route("/order-details/:id/logic")
      .delete(authMiddleware, this.orderDetailController.deleteOrderDetailAdv);
  }
}
