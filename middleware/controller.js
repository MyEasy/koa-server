const fs = require('fs');

const addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
    } else if (url.startsWith('PUT ')) {
      const path = url.substring(5);
      router.put(path, mapping[url]);
    } else if (url.startsWith('DELETE ')) {
      const path = url.substring(7);
      router.del(path, mapping[url]);
    }
  }
};

const addControllers = (router, dir) => {
  fs.readdirSync(__dirname + '/' + dir).filter(f => {
    return f.endsWith('.js');
  }).forEach(f => {
    const mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping)
  });
};

const controller = (dir = 'controllers') => {
  const router = require('koa-router')();
  addControllers(router, dir);
  return router.routes();
};

module.exports = controller;