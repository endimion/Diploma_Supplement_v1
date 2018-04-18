/*jslint es6,  node:true */
'use strict';

export default ({ body, title,preloadedState,css}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Import Google Icon Font -->
    	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    	<!-- Import materialize.css -->
    	<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
      <style type="text/css">${[...css].join('')}</style>
      <title>Diploma Supplement</title>
    </head>
      <body>
        <!-- Import jQuery before materialize.js -->
      	<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
      	<!-- And then your bundled js -->
         <div id="root">${body}</div>
         <script>
           // WARNING: See the following for security issues around embedding JSON in HTML:
           // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
         </script>
        <script src="/main.bundle.js"></script>
        <link href="/public/navbar.css" rel="stylesheet">
      </body>
    </html>

  `;
};
