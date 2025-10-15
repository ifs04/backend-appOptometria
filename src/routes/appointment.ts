import { Application } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authMiddleware } from "../middleware/auth";

export class AppointmentRoutes {
  public appointmentController: AppointmentController = new AppointmentController();

  public routes(app: Application): void {
    // ======= RUTAS SIN AUTENTICACIÓN =======
    app.route("/appointments/public")
      .get(this.appointmentController.getAllAppointments)
      .post(this.appointmentController.createAppointment);

    app.route("/appointments/public/:id")
      .get(this.appointmentController.getAppointmentById)
      .patch(this.appointmentController.updateAppointment)
      .delete(this.appointmentController.deleteAppointment);

    app.route("/appointments/public/:id/logic")
      .delete(this.appointmentController.deleteAppointmentAdv);

    // ======= RUTAS CON AUTENTICACIÓN =======
    app.route("/appointments")
      .get(authMiddleware, this.appointmentController.getAllAppointments)
      .post(authMiddleware, this.appointmentController.createAppointment);

    app.route("/appointments/:id")
      .get(authMiddleware, this.appointmentController.getAppointmentById)
      .patch(authMiddleware, this.appointmentController.updateAppointment)
      .delete(authMiddleware, this.appointmentController.deleteAppointment);

    app.route("/appointments/:id/logic")
      .delete(authMiddleware, this.appointmentController.deleteAppointmentAdv);
  }
}
