import { Router, Application } from "express";
import { PaymentController } from "../controllers/payment.controller";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    app.route("/payments").get(this.paymentController.getAllPayments);
    app.route("/payments/:id").get(this.paymentController.getPaymentById);
  }
}
