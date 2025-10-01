import { Request, Response } from "express";
import { Order, OrderI } from "../models/order";

export class OrderController {
  // Get all orders with status "PENDING"
  public async getAllOrders(req: Request, res: Response) {
    try {
      const orders: OrderI[] = await Order.findAll({
        where: { status: 'PENDING' },
      });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: "Error fetching orders" });
    }
  }

  // Get an order by ID
  public async getOrderById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const order = await Order.findOne({
        where: {
          id: pk,
          status: 'PENDING'
        },
      });
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Order not found or not pending" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching order" });
    }
  }
}
