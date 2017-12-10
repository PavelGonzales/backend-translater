'use strict';

const svc = require('../services');

const getHtml = (req, res) => {
  const url = req.params.url;
  svc.scrapeWebsite(url, (html) => {
    res.send(html)
  });
}

const getOpenGraph = (req, res) =>  {
  const url = req.params.url;
  svc.scrapeOpenGraph(url, (html) => {
    res.send(html)
  });
}

module.exports = {  
  getHtml,
  getOpenGraph
};