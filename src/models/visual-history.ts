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



Patient.hasMany(VisualHistory, {
  foreignKey: "patient_id",
  sourceKey: "id"
});
VisualHistory.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id"
});