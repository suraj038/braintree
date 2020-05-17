var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "mjkfzy9qz9vgmn4d",
  publicKey: "94sqkdpm9ryz8t2m",
  privateKey: "85a491a5efde0ab6b8bffc072e2960ce"
});

exports.getToken = (req, res) => {
    console.log('here')
    gateway.clientToken.generate({}, function (err, response) {
        console.log(err)
        if(err) {
            res.status(500).send(err)
        }else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, 
      function (err, result) {
          if(err) {
              res.status(500).json(err)
          } else {
              res.json(result);
          }
      });
};