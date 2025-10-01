import { Router, Application } from "express";
import { PatientController } from "../controllers/patient.controller";

export class PatientRoutes {
  public patientController: PatientController = new PatientController();

  public routes(app: Application): void {
    app.route("/patients").get(this.patientController.getAllPatients);
    app.route("/patients/:id").get(this.patientController.getPatientById);
  }
}
