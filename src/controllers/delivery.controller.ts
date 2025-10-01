import { Request, Response } from "express";
import { Delivery, DeliveryI } from "../models/delivery";

export class DeliveryController {
  // Get all deliveries with status "PENDING"
  public async getAllDeliveries(req: Request, res: Response) {
    try {
      const deliveries: DeliveryI[] = await Delivery.findAll({
        where: { status: 'PENDING' },
      });
      res.status(200).json({ deliveries });
    } catch (error) {
      res.status(500).json({ error: "Error fetching deliveries" });
    }
  }

  // Get a delivery by ID
  public async getDeliveryById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const delivery = await Delivery.findOne({
        where: {
          id: pk,
          status: 'PENDING'
        },
      });
      if (delivery) {
        res.status(200).json(delivery);
      } else {
        res.status(404).json({ error: "Delivery not found or not pending" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching delivery" });
    }
  }
}
