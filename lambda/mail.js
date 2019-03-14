const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_KEY)

const headers = {
  'Access-Control-Allow-Origin': '*', // better change this for production
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type'
}
const onlyPOST = JSON.stringify({
  message: 'Only POST requests allowed.'
})
const missingInfo = JSON.stringify({
  message: 'Required information is missing.'
})
const msgSuccess = JSON.stringify({
  message: 'Message sent successfully!'
})

exports.handler = (event, context, callback) => {
  // only allow POST requests
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: onlyPOST
    })
  }

  // parse the body to JSON so we can use it in JS
  const payload = JSON.parse(event.body)

  // validate the form
  if (!payload.name || !payload.subject || !payload.email || !payload.message) {
    return callback(null, {
      statusCode: 422,
      headers,
      body: missingInfo
    })
  }

  sgMail
    .send({
      to: 'maxieberkmann@gmail.com',
      from: 'mail@nuxty.com',
      replyTo: payload.email,
      subject: `${payload.subject}`, // @todo find type and optimise accordingly
      html: `Hey,<br><br><em>${payload.name}</em> sent a new message from Nuxty!<br><blockquote>${payload.message}</blockquote>
      
      Cheers, Your Nuxty webserver`
    })
    .then(() => {
      return callback(null, {
        statusCode: 200,
        body: msgSuccess
      })
    }, err => {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Internal Server Error: ${err}`
        })
      })
    }
    )
}
