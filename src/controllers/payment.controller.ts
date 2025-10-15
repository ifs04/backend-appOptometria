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
        where: { id: pk, status: 'PENDING' },
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

  // Create a payment
  public async createPayment(req: Request, res: Response) {
    const { order_id, date, amount, method, status } = req.body;
    try {
      let body: PaymentI = {
        order_id,
        date,
        amount,
        method,
        status,
      };

      const newPayment = await Payment.create({ ...body });
      res.status(201).json(newPayment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a payment
  public async updatePayment(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { order_id,date, amount, method, status } = req.body;
    try {
      let body: PaymentI = {
        order_id,
        date,
        amount,
        method,
        status,
      };

      const paymentExist = await Payment.findOne({
        where: { id: pk, status: 'PENDING' },
      });

      if (paymentExist) {
        await paymentExist.update(body);
        res.status(200).json(paymentExist);
      } else {
        res.status(404).json({ error: "Payment not found or not pending" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a payment physically
  public async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paymentToDelete = await Payment.findByPk(id);

      if (paymentToDelete) {
        await paymentToDelete.destroy();
        res.status(200).json({ message: "Payment deleted successfully" });
      } else {
        res.status(404).json({ error: "Payment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting payment" });
    }
  }

  // Delete a payment logically (change status to "CANCELLED")
  public async deletePaymentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const paymentToUpdate = await Payment.findOne({
        where: { id: pk, status: 'PENDING' },
      });

      if (paymentToUpdate) {
        await paymentToUpdate.update({ status: 'CANCELLED' });
        res.status(200).json({ message: "Payment marked as cancelled" });
      } else {
        res.status(404).json({ error: "Payment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking payment as cancelled" });
    }
  }
}
