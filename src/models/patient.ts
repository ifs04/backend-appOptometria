import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";


export interface PatientI {
  id?: number;
  name: string;
  age: number;
  document_type: string;
  document_number: string;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
}


export class Patient extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public document_type!: string;
  public document_number!: string;
  public gender!: "Male" | "Female" | "Other";
  public phone!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Patient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    document_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 15], msg: "Phone must be between 7 and 15 characters" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, 
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
  }
);