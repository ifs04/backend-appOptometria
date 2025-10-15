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
    const { name, age, document_type, document_number,gender,phone,email, status} = req.body;
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
}
