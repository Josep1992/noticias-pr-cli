'use strict';

const logger = require('debug')('noticieros:endi');
const xray = require('../xray');

const site = 'https://www.elnuevodia.com';

module.exports = async () => {
  logger('Running xray on chosen news site: %s', site);
  const primeraPlana = await xray(
    site,
    '.bk4-8of12 .featured-stories-primary article',
    [
      {
        title: '.story-tease-title a | trim',
        summary: '.story-tease-summary p | trim',
        link: '.story-tease-title a@href | trim'
      }
    ]
  );
  logger('Primera Plana: %O', primeraPlana);

  const segundaPlana = await xray(
    site,
    '.bk4-8of12 .featured-stories-secondary article',
    [
      {
        title: '.story-tease-title a | trim',
        summary: '.story-tease-summary p | trim',
        link: '.story-tease-title a@href | trim'
      }
    ]
  );
  logger('Segunda Plana: %O', segundaPlana);

  return [...primeraPlana, ...segundaPlana];
};
