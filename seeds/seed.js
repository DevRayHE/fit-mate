const sequelize = require('../config/connection');
const { User, Exercise, ExerciseRecord } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');
const exerciseRecordData = require('./exerciseRecordData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // force: true drops table if exists

  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    console.log(err);
  }
  

  try {
    await Exercise.bulkCreate(exerciseData);
  } catch (err) {
    console.log(err);
  };

  try {
    await ExerciseRecord.bulkCreate(exerciseRecordData);
  } catch (err) {
    console.log(err);
  };

  process.exit(0);
};

seedDatabase();