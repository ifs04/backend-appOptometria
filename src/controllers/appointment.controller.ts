import { Request, Response } from "express";
import { Appointment, AppointmentI } from "../models/appointment";

export class AppointmentController {
  // Get all appointments with status "PENDING"
  public async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments: AppointmentI[] = await Appointment.findAll({
        where: { status: 'PENDING' },
      });
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ error: "Error fetching appointments" });
    }
  }

  // Get an appointment by ID
  public async getAppointmentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const appointment = await Appointment.findOne({
        where: {
          id: pk,
          status: 'PENDING'
        },
      });
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ error: "Appointment not found or not pending" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching appointment" });
    }
  }
}
