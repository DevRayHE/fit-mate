const sequelize = require('../config/connection');
const { User, Exercise, ExerciseRecord } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');
const exerciseRecordData = require('./exerciseRecordData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const exercise of exerciseData) {
    await Exercise.create({
      ...exercise
    });
  }

  for (const exerciseRecord of exerciseRecordData) {
    await ExerciseRecord.create({
      ...exerciseRecord
    });
  }

  process.exit(0);
};

seedDatabase();