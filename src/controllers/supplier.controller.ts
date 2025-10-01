import { Request, Response } from "express";
import { Supplier, SupplierI } from "../models/supplier";

export class SupplierController {
  // Get all suppliers with status "ACTIVE"
  public async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers: SupplierI[] = await Supplier.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json({ suppliers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching suppliers" });
    }
  }

  // Get a supplier by ID
  public async getSupplierById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const supplier = await Supplier.findOne({
        where: {
          id: pk,
          status: 'ACTIVE'
        },
      });
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(404).json({ error: "Supplier not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching supplier" });
    }
  }
}
