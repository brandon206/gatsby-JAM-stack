const nodemailer = require('nodemailer');


const clientID = "628367628512-3k1i853gvpl1el5vvd3ps051v5ug69pr.apps.googleusercontent.com";
const refreshToken = "1/CJAEvpyATgn8BgnR4-rWsa3g9L-GxxiGOsiC-wvWo8U";

exports.handler = function (event, context, callback) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "brandonpark206@gmail.com",
            clientId: clientID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: refreshToken
        }
    });

    const body = JSON.parse(event.body);
    const mailOptions = {
        to: "brandonpark206@gmail.com",
        subject: `New Website Message From ${body.name}`,
        text: `Sender Name: ${body.name}, Sender Email: ${body.email}, Sender Message: ${body.message}`
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            });
        }else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(info.response)
            })
        }
    })
}