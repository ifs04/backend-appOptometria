import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/connection";
import { Patient } from "./patient"; 
import { Optometrist } from "./optometrist"; 


export interface AppointmentI {
  id?: number;
  patient_id: number;
  optometrist_id: number;
  date: string;
  reason: string;
  status: "PENDING" | "ATTENDED" | "CANCELLED";
}


export class Appointment extends Model {
  public id!: number;
  public date!: string;
  public reason!: string;
  public status!: "PENDING" | "ATTENDED" | "CANCELLED";
  public patient_id!: number;
  public optometrist_id!: number;
}


Appointment.init(
  {
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ATTENDED", "CANCELLED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: false,
  }
);



Patient.hasMany(Appointment, {
  foreignKey: "patient_id",
  sourceKey: "id"
});
Appointment.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id"
});

Optometrist.hasMany(Appointment, {
  foreignKey: "optometrist_id",
  sourceKey: "id"
});
Appointment.belongsTo(Optometrist, {
  foreignKey: "optometrist_id",
  targetKey: "id"
});