import { Application } from "express";
import { SupplierController } from "../controllers/supplier.controller";
import { authMiddleware } from "../middleware/auth";

export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/suppliers/public")
      .get(this.supplierController.getAllSuppliers)
      .post(this.supplierController.createSupplier);

    app.route("/suppliers/public/:id")
      .get(this.supplierController.getSupplierById)
      .patch(this.supplierController.updateSupplier)
      .delete(this.supplierController.deleteSupplier);

    app.route("/suppliers/public/:id/logic")
      .delete(this.supplierController.deleteSupplierAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/suppliers")
      .get(authMiddleware, this.supplierController.getAllSuppliers)
      .post(authMiddleware, this.supplierController.createSupplier);

    app.route("/suppliers/:id")
      .get(authMiddleware, this.supplierController.getSupplierById)
      .patch(authMiddleware, this.supplierController.updateSupplier)
      .delete(authMiddleware, this.supplierController.deleteSupplier);

    app.route("/suppliers/:id/logic")
      .delete(authMiddleware, this.supplierController.deleteSupplierAdv);
  }
}
