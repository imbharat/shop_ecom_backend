import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class UserLocations extends Model {}

UserLocations.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_locations",
  }
);
