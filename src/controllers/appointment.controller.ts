import { Request, Response } from "express";
import { Appointment, AppointmentI } from "../models/appointment";

export class AppointmentController {
  // Get all appointments with status "ACTIVE"
  public async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments: AppointmentI[] = await Appointment.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json(appointments );
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
          status: 'ACTIVE'
        },
      });
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ error: "Appointment not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching appointment" });
    }
  }

  // Create an appointment
  public async createAppointment(req: Request, res: Response){
    const { date, reason, patient_id, optometrist_id, status } = req.body;
    try {
      let body : AppointmentI = {
        date,
        reason,
        patient_id,
        optometrist_id,
        status
      };
      console.log(body);
      const newAppointment = await Appointment.create({ ...body });
      res.status(201).json(newAppointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an appointment
  public async updateAppointment(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { date, reason, patient_id, optometrist_id, status } = req.body;
    try {
      let body: AppointmentI = {
        date,
        reason,
        patient_id,
        optometrist_id,
        status
      };

      const appointmentExist = await Appointment.findOne({
        where: { 
          id: pk, 
          status: 'ACTIVE' },
      });

      if (appointmentExist) {
        await appointmentExist.update(body, {
          where: { id: pk },
        });
        res.status(200).json(appointmentExist);
      } else {
        res.status(404).json({ error: "Appointment not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete an appointment physically
  public async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointmentToDelete = await Appointment.findByPk(id);

      if (appointmentToDelete) {
        await appointmentToDelete.destroy();
        res.status(200).json({ message: "Appointment deleted successfully" });
      } else {
        res.status(404).json({ error: "Appointment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting appointment" });
    }
  }

  // Delete an appointment logically (change status to "INACTIVE")
  public async deleteAppointmentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const appointmentToUpdate = await Appointment.findOne({
        where: { 
          id: pk, 
          status: 'ACTIVE' },
      });

      if (appointmentToUpdate) {
        await appointmentToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Appointment marked as inactive" });
      } else {
        res.status(404).json({ error: "Appointment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking appointment as inactive" });
    }
  }
}
