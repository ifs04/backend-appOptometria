import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { Patient } from "./patient";



export interface VisualHistoryI {
  id?: number;
  patient_id?: number;
  observations: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";
}



export class VisualHistory extends Model<VisualHistoryI> implements VisualHistoryI {
  public id!: number;
  public patient_id!: number;
  public observations!: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}


VisualHistory.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "VisualHistory",
    tableName: "visual_histories",
    timestamps: false,
  }
);



Patient.hasOne(VisualHistory, {
  foreignKey: "patient_id",
  sourceKey: "id",
  as: "visualHistory",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
VisualHistory.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
  as: "patient",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});