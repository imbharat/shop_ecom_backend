import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Businesses extends Model {}

Businesses.init(
  {
    business_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "businesses",
  }
);
