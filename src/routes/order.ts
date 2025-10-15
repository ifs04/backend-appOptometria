import { Application } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth";

export class OrderRoutes {
  public orderController: OrderController = new OrderController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/orders/public")
      .get(this.orderController.getAllOrders)
      .post(this.orderController.createOrder);

    app.route("/orders/public/:id")
      .get(this.orderController.getOrderById)
      .patch(this.orderController.updateOrder)
      .delete(this.orderController.deleteOrder);

    app.route("/orders/public/:id/logic")
      .delete(this.orderController.deleteOrderAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/orders")
      .get(authMiddleware, this.orderController.getAllOrders)
      .post(authMiddleware, this.orderController.createOrder);

    app.route("/orders/:id")
      .get(authMiddleware, this.orderController.getOrderById)
      .patch(authMiddleware, this.orderController.updateOrder)
      .delete(authMiddleware, this.orderController.deleteOrder);

    app.route("/orders/:id/logic")
      .delete(authMiddleware, this.orderController.deleteOrderAdv);
  }
}
