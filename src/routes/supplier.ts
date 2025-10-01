import { Router, Application } from "express";
import { SupplierController } from "../controllers/supplier.controller";

export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    app.route("/suppliers").get(this.supplierController.getAllSuppliers);
    app.route("/suppliers/:id").get(this.supplierController.getSupplierById);
  }
}
