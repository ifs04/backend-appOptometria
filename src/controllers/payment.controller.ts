import { Request, Response } from "express";
import { Payment, PaymentI } from "../models/payment";

export class PaymentController {
  // Get all payments with status "PENDING"
  public async getAllPayments(req: Request, res: Response) {
    try {
      const payments: PaymentI[] = await Payment.findAll({
        where: { status: 'PENDING' },
      });
      res.status(200).json({ payments });
    } catch (error) {
      res.status(500).json({ error: "Error fetching payments" });
    }
  }

  // Get a payment by ID
  public async getPaymentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const payment = await Payment.findOne({
        where: {
          id: pk,
          status: 'PENDING'
        },
      });
      if (payment) {
        res.status(200).json(payment);
      } else {
        res.status(404).json({ error: "Payment not found or not pending" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching payment" });
    }
  }
}
