'use strict';

const svc = require('../services');

const getHtml = (req, res) => {
  const url = req.params.url;
  svc.scrapeWebsite(url, (html) => {
    res.send(html)
  });
}

const getTaxRate = (req, res) => {  
  const state = req.params.stateName;
  svc.scrapeTaxRates(state, stateUrls[state.toLowerCase()], (rates) => {
    const rate = rates.find(rate => {
      return rate.city.toLowerCase() === req.params.cityName.toLowerCase();
    });
    res.send(rate);
  });
}

const calculateTaxes = (req, res) => {  
  const state = req.params.stateName;
  svc.scrapeTaxRates(state, stateUrls[state.toLowerCase()], (rates) => {
    const rate = rates.find(rate => {
      return rate.city.toLowerCase() === req.params.cityName.toLowerCase();
    });
    res.send(rate.calculateTax(parseFloat(req.params.amount)));
  });
}


const stateUrls = {  
  nebraska: 'http://www.revenue.nebraska.gov/question/sales.html'
};

module.exports = {  
  getTaxRate,
  calculateTaxes,
  stateUrls,
  getHtml
};