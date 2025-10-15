import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";
import { Order } from "./order";


export interface DeliveryI {
  id?: number;
  order_id: number;
  date: string;
  status: "PENDING" | "READY" | "DELIVERED";
  observations?: string;
}


export class Delivery extends Model {
  public id!: number;
  public order_id!: number;
  public date!: string;
  public status!: "PENDING" | "READY" | "DELIVERED";
  public observations?: string;
}


Delivery.init(
  {
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "READY", "DELIVERED"),
      defaultValue: "PENDING",
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Delivery",
    tableName: "deliveries",
    timestamps: false,
  }
);


Order.hasOne(Delivery, {
  foreignKey: "order_id",
  sourceKey: "id"
});
Delivery.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id"
});