const fs = require('fs');
const path = require('path');

const addMapping = (router, routers) => {
  routers.forEach(route => {
    const { type, url, success } = route;
    router[type](url, success);
  })
};

const addControllers = (router, dir) => {
  const dirPath = path.resolve(__dirname, '..');
  fs.readdirSync(dirPath + '/' + dir).filter(f => {
    return f.endsWith('.js');
  }).forEach(f => {
    const routers = require(dirPath + '/' + dir + '/' + f);
    addMapping(router, routers)
  });
};

const controller = (dir = 'controllers') => {
  const router = require('koa-router')();
  addControllers(router, dir);
  return router.routes();
};

module.exports = controller;