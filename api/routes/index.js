'use strict';

const taxCtrl = require('../controllers');

module.exports = (app) => {
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.use(['/scraping/:url'], (req, res, next) => {
    const url = req.params.url;
    next();
  });

  app.use(['/opengraph/:url'], (req, res, next) => {
    const url = req.params.url;
    next();
  });

  app.route('/scraping/:url')
    .get(taxCtrl.getHtml);

  app.route('/opengraph/:url')
    .get(taxCtrl.getOpenGraph);

  app.use((req, res) => {
    res.status(404)
        .send({url: `sorry friend, but url ${req.originalUrl} is not found`});
  });
}
