'use strict';
var path = require('path');

const nodemailer = require('nodemailer');
const fileUtils = require('./FileUtils');
const srvUtils = require('../utils/serverUtils.js');
// const sendmail = require('sendmail')({silent: false, devPort: 1025});
const { exec } = require('child_process');

exports.sendEmail = sendEmail;



/**
Sends an email and returns a Promise that it will be sent
**/
function sendEmail(receiverAddress,body){

  return new Promise( (resolve,reject) => {
    let thePath = path.join(__dirname, '..', 'resources',  'emailCredentials');
    fileUtils.readFilePromise(thePath)
    .then( _pass => {
      // console.log("pass" + pass);
      // create reusable transporter object using the default SMTP transport
//       let transporter = nodemailer.createTransport({
//        // service: 'gmail',
//         host: 'mail.programmerdiaries.com',
//         port: '25',
// //      secure: false,
//         // tls:{
//           // rejectUnauthorized: false
//         // },
//         auth: {
//           user: 'dsservice@programmerdiaries.com',
//           // pass: _pass
//           // user: 'user@dss.aegean.gr',
//           pass: 'D$d1pl0m@'
//         }
//       });
//
//       console.log("transporter");
//       console.log(transporter);
//       console.log( 'Email Body ' + body );
//       // setup email data with unicode symbols
//       let mailOptions = {
//         from: '"Diploma Supplement Service" <supplements@ds.service.aegean.gr>', // sender address
//         to: receiverAddress,// list of receivers
//         subject: 'A Diploma Supplement has been shared with you ', // Subject line
//         text: body,//'Hello world ?', // plain text body
//         html: body //Hello world ?</b>' // html body
//       };
//         transporter.sendMail(mailOptions)
//

          process.env.subject='A Diploma Supplement has been shared with you '
          process.env.from="no-reply@dss.aegean.gr"
          process.env.recipients=receiverAddress
          process.env.body=body
          console.log()
          // process.env.mail="subject:$subject\nfrom:$from\n$body"
                    exec(`echo "From: $from
To: $recipients
MIME-Version: 1.0
Content-Type: text/html
Subject: $subject
$body
" | sendmail -t `, (err, stdout, stderr) => {
                      if (err) {
                        // node couldn't execute the command
                        return;
                      }

                      // the *entire* stdout and stderr (buffered)
                      console.log(`stdout: ${stdout}`);
                      console.log(`stderr: ${stderr}`);
                      resolve();
                    });

        // sendmail({
        //     from: 'no-reply@dss.aegean.gr',
        //     to: receiverAddress,
        //     subject: 'test sendmail',
        //     html: body,
        //   }, function(err, reply) {
        //     console.log(err && err.stack);
        //     console.dir(reply);
        // })
        // .then(result => {
        //         console.log(`mail sent ${result}`);
        //         console.log(result);
        //         resolve(result);
        // })
        // .catch(err => {
        //         console.log(err);
        //         reject(err)
        // });
    })
    .catch(err => {reject(err);})
  });
};
