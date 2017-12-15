/*jslint es6,  node:true */
'use strict';

export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Import Google Icon Font -->
    	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    	<!-- Import materialize.css -->
    	<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
      <title>Diploma Supplement</title>
    </head>
      <body>
        <!-- Import jQuery before materialize.js -->
      	<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
      	<!-- And then your bundled js -->
         <div id="root"></div>
      <script src="/react/main.bundle.js"></script>
      </body>
    </html>

  `;
};
