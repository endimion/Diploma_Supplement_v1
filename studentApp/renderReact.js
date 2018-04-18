
import React from 'react';
import { renderToString } from 'react-dom/server';
import Container from './reactApp/src/components/container.jsx';
import template from './template';


module.exports = function(app) {
  app.get('/test', (req, res) => {
    const appString = renderToString(<Container />);

    res.send(template({
      body: appString,
      title: 'Hello World from the server'
    }));
})
}
