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
      defTee: {
        S: "RED",
      },
      defMode: {
        S: "DARK"
      }

    },
    TableName: "User-2ktwvesmrfadlbqu76uyitfmqi-prod",
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
