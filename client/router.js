import React from 'react'
import { Router } from 'dva/router'
import App from './routes/app'


import Post from "./routes/Post.js";


const registerModel = (() => {
  const cached = {};
  return (app, model) => {
    if (!cached[model.namespace]) {
      app.model(model);
      cached[model.namespace] = 1;
    }
  }
})();
export default function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'));
          // app.model(require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard') })
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'));
              // app.model(require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            })
          }
        }, {
          path: 'contentManage/contentImgs',
          name: 'contentManage/contentImgs',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contentImgs'));
              cb(null, require('./routes/contentManage/contentImgs'))
            })
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'));
              // app.model(require('./models/users'))
              cb(null, require('./routes/users'))
            })
          }
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            })
          }
        }, {
          path: 'ui/search',
          name: 'ui/search',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'))
            })
          }
        }, {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}
