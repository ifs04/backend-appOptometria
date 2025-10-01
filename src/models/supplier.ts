import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";


export interface SupplierI {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Supplier extends Model<SupplierI> implements SupplierI {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public address!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Supplier.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },
    address: {
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
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: false,
  }
);