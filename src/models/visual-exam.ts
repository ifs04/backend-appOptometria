import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";
import { Appointment } from "./appointment";
import { EyeExamI } from "./eye-exam";



export interface VisualExamI {
  id?: number;
  date: string;
  prescription: string;
  od: EyeExamI;
  oi: EyeExamI;
  appointment_id: number;
  status: "ACTIVE" | "INACTIVE";
}



export class VisualExam extends Model {
  public id!: number;
  public date!: string;
  public prescription!: string;
  public od!: EyeExamI;
  public oi!: EyeExamI;
  public appointment_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

VisualExam.init(
  {
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    od: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    oi: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "VisualExam",
    tableName: "visual_exams",
    timestamps: false,
  }
);


Appointment.hasOne(VisualExam, {
  foreignKey: "appointment_id",
  sourceKey: "id"
});
VisualExam.belongsTo(Appointment, {
  foreignKey: "appointment_id",
  targetKey: "id"
});