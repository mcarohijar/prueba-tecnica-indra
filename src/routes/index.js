const starshipsRoutes = require('./starships.routes.js');
const vehiclesRoutes = require('./vehicles.routes.js');

module.exports = (app) => {
  app.use('/starships', starshipsRoutes);
  app.use('/vehicles', vehiclesRoutes);
};