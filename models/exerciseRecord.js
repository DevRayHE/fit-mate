const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ExerciseRecord extends Model {}

// Define each table row attributes with data validation
ExerciseRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // minutes
    duration: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    calories_burnt: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // email: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'user',
    //     key: 'first_name',
    //   },
    // },


    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "exercise",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exerciseRecord",
  }
);


module.exports = ExerciseRecord;

