# frontend-application

## Version 0.0.2

This is part of a final project at Reykjavik University.

The master branch is being continuously delivered.

[Current build](https://app.openfolf.net/)

## What is this application

Its main purpose is to keep track of a game of Disc Golf.

openFOLF is a mobile application, completely system agnostic and runs on web technologies. With evergreen browsers, the ability to install the application locally for offline usage is possible on mobile devices, the application uses the geoLocation API and offers the ability to run service workers for offline caching.

All instances of a game in openFOLF are synced together via AWS AppSync. This allows for more flexibility when filling out the score card as it is shared between all instances of the game in real time.

## Tools

The application uses backend services from [Amplify](https://aws-amplify.github.io/) and [AppSync](https://aws.amazon.com/appsync/). In the end we went with a combination of different services. They are: [Cognito](https://aws.amazon.com/cognito/), [DynamoDB](https://aws.amazon.com/dynamodb/), [Lambda](https://aws.amazon.com/lambda/), [S3](https://aws.amazon.com/s3/), [CloudFront](https://aws.amazon.com/cloudfront/), [Route 53](https://aws.amazon.com/route53/).

The code is written in Visual Studio Code with a wide variety of pluggins.

We use Prettier+ESLint with a set of custom rules for code formatting and to insure that the team has a unified style in the code written.

The frontend of the application is written in VueJS 2.x and we utilize many libs and packages to simplify the programming process.

We embrace and try to follow the ideas of JAM Stack for this project. We really appreciate how developer friendly the core idea is.

## The Team

Arnar Arnarson, Dagur Kristjánsson and Ægir Tómasson.

We are all computer science students at [Reykjavik University](https://www.ru.is/).
