import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class GroupPermissions extends Model {}

GroupPermissions.init(
  {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    permission_id: {
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
    modelName: "group_permissions",
  }
);
