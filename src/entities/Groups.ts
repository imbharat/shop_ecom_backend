import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Groups extends Model {}

Groups.init(
  {
    group_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "groups",
  }
);
