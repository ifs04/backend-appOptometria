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

  // Create an order detail
  public async createOrderDetail(req: Request, res: Response) {
    const { order_id, product_id,product_type, quantity, unit_price, graduation, subtotal, status } = req.body;
    try {
      let body: OrderDetailI = {
        order_id,
        product_id,
        product_type,
        quantity,
        unit_price,
        graduation,
        subtotal,
        status,
      };
        
      const newDetail = await OrderDetail.create({ ...body });
      res.status(201).json(newDetail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an order detail
  public async updateOrderDetail(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { order_id,product_type,unit_price,graduation,subtotal,product_id, quantity, status } = req.body;
    try {
      let body: OrderDetailI = {
        order_id,
        product_id,
        product_type,
        quantity,
        unit_price,
        graduation,
        subtotal,
        status,
      };

      const detailExist = await OrderDetail.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (detailExist) {
        await detailExist.update(body);
        res.status(200).json(detailExist);
      } else {
        res.status(404).json({ error: "Order detail not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete an order detail physically
  public async deleteOrderDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detailToDelete = await OrderDetail.findByPk(id);

      if (detailToDelete) {
        await detailToDelete.destroy();
        res.status(200).json({ message: "Order detail deleted successfully" });
      } else {
        res.status(404).json({ error: "Order detail not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting order detail" });
    }
  }

  // Delete an order detail logically (change status to "INACTIVE")
  public async deleteOrderDetailAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const detailToUpdate = await OrderDetail.findOne({
        where: { id: pk, status: 'ACTIVE' },
      });

      if (detailToUpdate) {
        await detailToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Order detail marked as inactive" });
      } else {
        res.status(404).json({ error: "Order detail not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking order detail as inactive" });
    }
  }
}
