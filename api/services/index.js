'use strict';

const http = require('https');
const ogs = require('open-graph-scraper');
const cheerio = require('cheerio');
const _ = require('lodash');
const uuid = require('uuid/v1');

const scrapeOpenGraph = (url, cb) => {
  const options = {'url': url};
  ogs(options, function (error, res) {
    cb(res);
  });
}

const scrapeWebsite = (url, cb) => {
  http.get(url, (res) => {
    let html = '';

    res.on('data', chunk => {
      html += chunk;
    });

    res.on('end', () => {
      const parser = new Parser();
      cb(parser.parse(html));
    });
  })
}

class Parser {  
  constructor() {

  }

  parse(html) {
    return this.parseHtml(html);
  }

  parseHtml(html) {
    const words = [];

    const textArray = html.split(' ')
    const sortUniq = _.uniq(textArray).filter((item) => {
      return item.match(/^[a-zA-Z]+$/)
    })
    const uniq_text_array = sortUniq.filter(item => words.findIndex(t => t.word === item) < 0)
      .sort().map(item => ({id: uuid(), word: item}))
    const uniq_words_count = uniq_text_array.length
    return {
      uniq_text_array,
      uniq_words_count
    }
  }
}

module.exports = {
  scrapeWebsite,
  scrapeOpenGraph
};