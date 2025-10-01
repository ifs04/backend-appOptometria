import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Order } from "./order";


export interface OrderDetailI {
  id?: number;
  order_id?: number;
  product_type: "LENS" | "FRAME";
  product_id?: number;
  quantity: number;
  unit_price: number;
  graduation?: string;
  subtotal: number;
  status: "ACTIVE" | "INACTIVE";
}


export class OrderDetail extends Model<OrderDetailI> implements OrderDetailI {
  public id!: number;
  public order_id!: number;
  public product_type!: "LENS" | "FRAME";
  public product_id!: number;
  public quantity!: number;
  public unit_price!: number;
  public graduation?: string;
  public subtotal!: number;
  public status!: "ACTIVE" | "INACTIVE";
}


OrderDetail.init(
  {
    
    product_type: {
      type: DataTypes.ENUM("LENS", "FRAME"),
      allowNull: false,
    },
    
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    graduation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "OrderDetail",
    tableName: "order_details",
    timestamps: false,
  }
);



Order.hasMany(OrderDetail, {
  foreignKey: "order_id",
  sourceKey: "id"
});
OrderDetail.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id"
});