import { Router, Application } from "express";
import { PatientController } from "../controllers/patient.controller";
import { authMiddleware } from "../middleware/auth";

export class PatientRoutes {
  public patientController: PatientController = new PatientController();

  // ================== RUTAS SIN AUTENTICACIÓN ==================

  public routes(app: Application): void {
    app.route("/patients/public")
    .get(this.patientController.getAllPatients)
    .post(this.patientController.createPatient);


    app.route("/patients/public/:id")
    .get(this.patientController.getPatientById)
    .patch(this.patientController.updatePatient)
    .delete(this.patientController.deletePatient);

    app.route("/patients/public/:id/logic")
    .delete(this.patientController.deletePatientAdv);



     // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/patients")
      .get(authMiddleware, this.patientController.getAllPatients)
      .post(authMiddleware, this.patientController.createPatient);

    app.route("/patients/:id")
      .get(authMiddleware, this.patientController.getPatientById)
      .patch(authMiddleware, this.patientController.updatePatient)
      .delete(authMiddleware, this.patientController.deletePatient); // físico

    app.route("/patient/:id/logic")
      .delete(authMiddleware, this.patientController.deletePatientAdv); // lógico
  }
}

