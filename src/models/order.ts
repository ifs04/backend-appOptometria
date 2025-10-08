import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { Patient } from "./patient";
import { Optometrist } from "./optometrist";
import { OrderDetail } from "./order-detail";


export interface OrderI {
  id?: number;
  patient_id: number;
  optometrist_id: number;
  date: string;
  total: number;
  status: "PENDING" | "IN_PROCESS" | "DELIVERED" | "CANCELLED";
}


export class Order extends Model {
  public id!: number;
  public patient_id!: number;
  public optometrist_id!: number;
  public date!: string;
  public total!: number;
  public status!: "PENDING" | "IN_PROCESS" | "DELIVERED" | "CANCELLED";
}


Order.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROCESS", "DELIVERED", "CANCELLED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false,
  }
);



Patient.hasMany(Order, {
  foreignKey: "patient_id",
  sourceKey: "id"
});
Order.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id"
});

Optometrist.hasMany(Order, {
  foreignKey: "optometrist_id",
  sourceKey: "id"
});
Order.belongsTo(Optometrist, {
  foreignKey: "optometrist_id",
  targetKey: "id"
});

Order.hasMany(OrderDetail, {
  foreignKey: "order_id",
  sourceKey: "id"
});
OrderDetail.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id"
});

