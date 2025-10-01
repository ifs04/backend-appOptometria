import { Request, Response } from "express";
import { OrderDetail, OrderDetailI } from "../models/order-detail";

export class OrderDetailController {
  // Get all order details
  public async getAllOrderDetails(req: Request, res: Response) {
    try {
      const details: OrderDetailI[] = await OrderDetail.findAll({ where: { status: 'ACTIVE' } });
      res.status(200).json({ details });
    } catch (error) {
      res.status(500).json({ error: "Error fetching order details" });
    }
  }

  // Get an order detail by ID
  public async getOrderDetailById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const detail = await OrderDetail.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });
      if (detail) {
        res.status(200).json(detail);
      } else {
        res.status(404).json({ error: "Order detail not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching order detail" });
    }
  }
}
