**Rod Ellison Personal Site**

This project is a simple Node.js Express site with a few angular tweaks for responsive scrolling/sliding information.  Currently, the code is setup to run as a normal express/node application in AWS Beanstalk, but
has most of the needed entries so as to be able to allow it to run in an AWS Lambda + AWS API Gateway environment using Claudia.js, and techniques as documented [at this link](https://aws.amazon.com/blogs/aws/running-express-applications-on-aws-lambda-and-amazon-api-gateway/?sc_channel=sm&sc_campaign=launch_Mobile_da831205&sc_publisher=fb_ln&sc_content=AWS_Severless_Express%3D&sc_country=global&sc_geo=global&sc_outcome=launches&adbsc=social_launches_20161007_66697356&adbid=UPDATE-c2382910-6190300418363445248&adbpl=li&adbpr=2382910)


**Requirements if running in AWS Lambda+ API Gateway mode**:

[Requires Claudia.js](https://claudiajs.com/) - follow installation instructions at the link.
Claudia.js will need specific AWS permissions to operate correctly. Easiest way is to use AWS IAM and configure a specific user with the [permissions documented here](https://claudiajs.com/tutorials/installing.html)
    - After creating that AWS IAM user, make sure to download the credentials and update the local aws credentials file with a profile and set the access and secret key parms.
e.g.
```   
    [ClaudiaJS]
    aws_access_key_id = <your access id>
    aws_secret_access_key = <your secret key>
```

**Prepping the code and getting it to AWS**

Remove the package.json Scripts (Start) entry, as well as replace app.js with lambda.js for the 'main' value.

In the project directory, run the specific commands to install the dependencies, have Claudia.js generate a proxy, and then have Claudia.js deploy the code to AWS Lambda and setup the API Gateway.

1.  ```npm install```                 to grab the dependencies.
2.  ```npm run generate-proxy ```     to create a simple proxy API for the express app. Note this step will automatically perform an npm install aws-serverless-express and add it to dependencies in the package.json.
3.  ```npm run deploy    ```          to send everything up to AWS Lambda. Note: any existing claudia.json in the project folder should be deleted before doing the first deploy. This file will be auto-generated for each new setup. 
4.  ```npm run update   ```           can be used to package up later project revisions. After the deploy, the claudia.json file will be created, and the update will then use that so as to upload any revised code to the existing lambda function that was created as part of the first deploy.

**Notes:**
With most of the content in the **site** subdirectory, had to make sure that folder/file permissions were ok so that Lambda/API Gateway could read.
performed:   chmod -R 777 site, otherwise may get permission denied when launching the url provided back by AWS/Claudia.

To make sure that Claudia has the AWS access it needs, if you've updated the aws credentials file with a claudia specific profile, then make sure to use that profile in the package.json script commands.
e.g. 

``` 
"scripts": {
    "deploy": "claudia create --profile ClaudiaJS --handler lambda.handler --deploy-proxy-api --region us-east-1",
    "update": "claudia update --profile ClaudiaJS",
    "generate-proxy": "claudia generate-serverless-express-proxy --express-module app"
```