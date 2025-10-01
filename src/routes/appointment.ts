import { Router, Application } from "express";
import { AppointmentController } from "../controllers/appointment.controller";

export class AppointmentRoutes {
  public appointmentController: AppointmentController = new AppointmentController();

  public routes(app: Application): void {
    app.route("/appointments").get(this.appointmentController.getAllAppointments);
    app.route("/appointments/:id").get(this.appointmentController.getAppointmentById);
  }
}
