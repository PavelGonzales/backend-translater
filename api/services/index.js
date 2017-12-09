'use strict';

const http = require('https');  
const cheerio = require('cheerio');  

const scrapeWebsite = (url, cb) => {
  http.get(url, (res) => {
    let html = '';

    res.on('data', chunk => {
      html += chunk;
    });

    res.on('end', () => {
      cb(html);
    });
  })
}

class Parser {  
  constructor(state) {
    this.state = state;
  }

  parse(html) {
    return this.parseHtml(html);
  }

  parseHtml(html) {
    const $ = cheerio.load(html);
    return $;
  }

  parseNebraska(html) {
    const $ = cheerio.load(html);
    let rates = [];
    $('tr').each((idx, el) => {
      const cells = $(el).children('td');
      if (cells.length === 5 && !$(el).attr('bgcolor')) {
        const rawData = {
          city: $(cells[0]).first().text(),
          cityRate: $(cells[1]).first().text(),
          totalRate: $(cells[2]).first().text()
        };
        rawData.cityRate = parseFloat(rawData.cityRate.replace('%', ''))/100;
        rawData.totalRate = parseFloat(rawData.totalRate.substr(0, rawData.totalRate.indexOf('%')))/100;
        rawData.stateRate = rawData.totalRate - rawData.cityRate;
        rates.push(new TaxRate('Nebraska', rawData.city, rawData.cityRate, rawData.stateRate));
      }
    });
    return rates;
  }
}

module.exports = {
  scrapeWebsite
};