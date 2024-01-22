const sequelize = require("../utils/connection");

const main = async () => {
  try {
    sequelize.sync();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
