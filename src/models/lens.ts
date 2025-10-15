import { DataTypes, Model } from "sequelize";
import {sequelize} from "../database/connection";
import { Supplier } from "./supplier";
import { OrderDetail } from "./order-detail";


export interface LensI {
  id?: number;
  image: string;
  type: string;
  material: string;
  treatment?: string;
  price: number;
  stock: number;
  supplier_id: number;
  status: "ACTIVE" | "INACTIVE";
}


export class Lens extends Model {
  public id!: number;
  public image!: string;
  public type!: string;
  public material!: string;
  public treatment?: string;
  public price!: number;
  public stock!: number;
  public supplier_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Lens.init(
  {
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
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
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Lens",
    tableName: "lenses",
    timestamps: false,
  }
);


Supplier.hasMany(Lens, {
  foreignKey: "supplier_id",
  sourceKey: "id"
});
Lens.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  targetKey: "id"
});

Lens.hasMany(OrderDetail, {
  foreignKey: "product_id",
  sourceKey: "id",
});
OrderDetail.belongsTo(Lens, {
  foreignKey: "product_id",
  targetKey: "id",
});
