import { Request, Response } from "express";
import { Delivery, DeliveryI } from "../models/delivery";
import { isConstructorDeclaration } from "typescript";

export class DeliveryController {
  // Get all deliveries
  public async getAllDeliveries(req: Request, res: Response) {
    try {
      const deliveries: DeliveryI[] = await Delivery.findAll();
      res.status(200).json({ deliveries });
    } catch (error) {
      res.status(500).json({ error: "Error fetching deliveries" });
    }
  }

  // Get a delivery by ID
  public async getDeliveryById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const delivery = await Delivery.findByPk(pk);
      if (delivery) {
        res.status(200).json(delivery);
      } else {
        res.status(404).json({ error: "Delivery not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching delivery" });
    }
  }

  // Create a delivery
  public async createDelivery(req: Request, res: Response) {
    const { order_id, date, status, observations } = req.body;
    try {
      let body: DeliveryI = {
        order_id,
        date,
        status,
        observations,
      };

      const newDelivery = await Delivery.create({ ...body });
      res.status(201).json(newDelivery);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a delivery
  public async updateDelivery(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { order_id, date, status, observations } = req.body;
    try {
      let body: DeliveryI = {
        order_id,
        date,
        status,
        observations,
      };

      const deliveryExist = await Delivery.findByPk(pk);

      if (deliveryExist) {
        await deliveryExist.update(body);
        res.status(200).json(deliveryExist);
      } else {
        res.status(404).json({ error: "Delivery not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a delivery physically
  public async deleteDelivery(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deliveryToDelete = await Delivery.findByPk(id);

      if (deliveryToDelete) {
        await deliveryToDelete.destroy();
        res.status(200).json({ message: "Delivery deleted successfully" });
      } else {
        res.status(404).json({ error: "Delivery not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting delivery" });
    }
  }
  // Delete a delivery logically
  public async DeleteDeliveryAdv(req: Request, res: Response) {
    try {
      const { id:pk } = req.params;

      // Buscar por id y status ACTIVE
      const deliveryToDelete = await Delivery.findOne({
        where: {
          id:pk,
          status: "ACTIVE",
        },
      });

      if (deliveryToDelete) {
        await deliveryToDelete.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Delivery logically canceled successfully" });
      } else {
        res.status(404).json({ error: "Active delivery not found or already canceled" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error logically canceling delivery" });
    }
  }

}
