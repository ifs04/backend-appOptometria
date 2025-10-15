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
        where: { id: pk, status: 'PENDING' },
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

  // Create an order
  public async createOrder(req: Request, res: Response) {
    const { patient_id, optometrist_id, date, total, status } = req.body;
    try {
      let body: OrderI = {
        patient_id,
        optometrist_id,
        date,
        total,
        status,
      };

      const newOrder = await Order.create({ ...body });
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an order
  public async updateOrder(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { patient_id, optometrist_id, date, total, status } = req.body;
    try {
      let body: OrderI = {
        patient_id,
        optometrist_id,
        date,
        total,
        status,
      };

      const orderExist = await Order.findOne({
        where: { id: pk, status: 'PENDING' },
      });

      if (orderExist) {
        await orderExist.update(body);
        res.status(200).json(orderExist);
      } else {
        res.status(404).json({ error: "Order not found or not pending" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete an order physically
  public async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orderToDelete = await Order.findByPk(id);

      if (orderToDelete) {
        await orderToDelete.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting order" });
    }
  }

  // Delete an order logically (change status to "CANCELLED")
  public async deleteOrderAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const orderToUpdate = await Order.findOne({
        where: { id: pk, status: 'PENDING' },
      });

      if (orderToUpdate) {
        await orderToUpdate.update({ status: 'CANCELLED' });
        res.status(200).json({ message: "Order marked as cancelled" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking order as cancelled" });
    }
  }
}
