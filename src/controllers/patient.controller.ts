import { Request, Response } from "express";
import { Patient, PatientI } from "../models/patient";

export class PatientController {
  // Get all patients with status "ACTIVE"
  public async getAllPatients(req: Request, res: Response) {
    try {
      const patients: PatientI[] = await Patient.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json({ patients });
    } catch (error) {
      res.status(500).json({ error: "Error fetching patients" });
    }
  }

  // Get a patient by ID
  public async getPatientById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patient = await Patient.findOne({
        where: {
          id: pk,
          status: 'ACTIVE'
        },
      });
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ error: "Patient not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching patient" });
    }
  }

  public async createPatient(req: Request, res: Response){
    const { id,name, age, document_type, document_number,gender,phone,email, status} = req.body;
    try {
      let body : PatientI = {
        name,
        age,
        document_type,
        document_number,
        gender,
        phone,
        email,
        status
      };

      const newPatient = await Patient.create({ ...body });
      res.status(201).json(newPatient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a patient
  public async updatePatient(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { id, name, age, document_type, document_number, gender, phone, email, status } = req.body;
    try {
      let body: PatientI = {
        name,
        age,
        document_type,
        document_number,
        gender,
        phone,
        email,
        status
      };

      const patientExist = await Patient.findOne({
        where: { 
          id: pk, 
          status: 'ACTIVE' },
      });

      if (patientExist) {
        await patientExist.update(body, {
          where: { id: pk },
        });
        res.status(200).json(patientExist);
      } else {
        res.status(404).json({ error: "Patient not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a patient physically
  public async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patientToDelete = await Patient.findByPk(id);

      if (patientToDelete) {
        await patientToDelete.destroy();
        res.status(200).json({ message: "Patient deleted successfully" });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting patient" });
    }
  }

  // Delete a client logically (change status to "INACTIVE")
  public async deletePatientAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patientToUpdate = await Patient.findOne({
        where: { 
          id: pk, 
          status: 'ACTIVE' },
      });

      if (patientToUpdate) {
        await patientToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "Paient marked as inactive" });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking patient as inactive" });
    }
  }
}




