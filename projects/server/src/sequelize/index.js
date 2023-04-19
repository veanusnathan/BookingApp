const Models = require('./models')

Models.sequelize.sync({
    force: false,
    alter: true,
    logging: console.log
  }).then(function () {
    console.log('Database Sync!')
  }).catch(function (err) {
    console.log(err, 'Database Cannot update, Please Check Again!')
  });