import { singleton } from "tsyringe";
import { DataTypes, Model } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Products extends Model {}

Products.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_price: {
      type: DataTypes.FLOAT,
    },
    sell_price: {
      type: DataTypes.FLOAT,
    },
    type: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.INTEGER,
    },
    imei: {
      type: DataTypes.STRING,
    },
    physical_qc: {
      type: DataTypes.INTEGER,
    },
    screen_qc: {
      type: DataTypes.INTEGER,
    },
    ram: {
      type: DataTypes.INTEGER,
    },
    storage: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modified_by: {
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
    underscored: true,
    modelName: "products",
    indexes: [
      {
        name: "pid_business",
        unique: true,
        fields: ["product_id", "business_id"],
      },
    ],
  }
);

Products.sync();
