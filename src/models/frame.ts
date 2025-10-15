import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";
import { Supplier } from "./supplier";
import { OrderDetail } from "./order-detail";


export interface FrameI {
  id?: number;
  brand: string;
  model: string;
  material: string;
  color: string;
  price: number;
  stock: number;
  supplier_id?: number;
  image: string;
  status: "ACTIVE" | "INACTIVE";
}


export class Frame extends Model<FrameI> implements FrameI {
  public id!: number;
  public brand!: string;
  public model!: string;
  public material!: string;
  public color!: string;
  public price!: number;
  public stock!: number;
  public supplier_id!: number;
  public image!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Frame.init(
  {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Frame",
    tableName: "frames",
    timestamps: false,
  }
);


Supplier.hasMany(Frame, {
  foreignKey: "supplier_id",
  sourceKey: "id"
});
Frame.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  targetKey: "id"
});

Frame.hasMany(OrderDetail, {
  foreignKey: "product_id",
  sourceKey: "id",
});
OrderDetail.belongsTo(Frame, {
  foreignKey: "product_id",
  targetKey: "id",
});