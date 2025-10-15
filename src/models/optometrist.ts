import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../database/connection";

export interface OptometristI {
  id?: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Optometrist extends Model {
  public id!: number;
  public name!: string;
  public specialty!: string;
  public phone!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Optometrist.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 15], msg: "Phone must be between 7 and 15 characters" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Optometrist",
    tableName: "optometrists",
    timestamps: false,
  }
);