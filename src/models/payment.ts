import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";
import { Order } from "./order";


export interface PaymentI {
  id?: number;
  order_id: number;
  date: string;
  amount: number;
  method: "CASH" | "CARD" | "TRANSFER";
  status: "PENDING" | "COMPLETED" | "FAILED";
}


export class Payment extends Model {
  public id!: number;
  public order_id!: number;
  public date!: string;
  public amount!: number;
  public method!: "CASH" | "CARD" | "TRANSFER";
  public status!: "PENDING" | "COMPLETED" | "FAILED";
}

Payment.init(
  {
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("CASH", "CARD", "TRANSFER"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);


Order.hasMany(Payment, {
  foreignKey: "order_id",
  sourceKey: "id"
});
Payment.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id"
});