const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ region: "eu-west-2", apiVersion: "2012-08-10" });

exports.handler = (event, context, callback) => {
  const params = {
    Item: {
      id: {
        S: "" + event.userName,
      },
      email: {
        S: "" + event.request.userAttributes.email,
      },
    },
    TableName: "User-zgdtaiok7jegxmh3l7uczwu5cm-prod",
  };
  dynamodb.putItem(params, function(err, data) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(data);
      callback(null, event);
    }
  });
};
