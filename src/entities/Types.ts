import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Types extends Model {}

Types.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "types",
  }
);
