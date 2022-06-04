const starshipsRoutes = require('./starships.routes.js');

module.exports = (app) => {
  app.use('/starships', starshipsRoutes);
};