'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const crypto = require('crypto');
const config = require('config')['aws'];

// // crypto helpers
// const hmac = (key, value) => crypto.createHmac('sha256', key).update(value).digest();
// const hexhmac = (key, value) => crypto.createHmac('sha256', key).update(value).digest('hex');

// // routes
// router.use((req, res) => {
//   const timestamp = req.query.datetime.substr(0, 8);

//   const date = hmac('AWS4' + process.env.AWS_SECRET || config.AWS_SECRET, timestamp);
//   const region = hmac(date, process.env.AWS_REGION || 'us-west-2');
//   const service = hmac(region, process.env.AWS_SERVICE || 's3');
//   const signing = hmac(service, 'aws4_request');

//   res.send(hexhmac(signing, req.query.to_sign));
// })

const s3Config = {};
s3Config.accessKey = process.env.AWS_KEY || config.KEY;
s3Config.secretKey = process.env.AWS_SECRET || config.SECRET;
s3Config.bucket = process.env.S3_BUCKET || config.S3_BUCKET;
s3Config.region = process.env.S3_REGION || 'us-west-2';

router.route('/')
  .get((request, response) => {
    if (true) {
      var filename =
        crypto.randomBytes(16).toString('hex') +
        path.extname('test');
      response.json(s3Credentials(s3Config, {filename: 'test2', contentType: 'image/png'}));
    } else {
      response.status(400).send('filename is required');
    }
  });

// <-------------------------------------------------------------------------->
// This is the entry function that produces data for the frontend
// config is hash of S3 configuration:
// * bucket
// * region
// * accessKey
// * secretKey
function s3Credentials(config, params) {
  return {
    endpoint_url: "https://" + config.bucket + ".s3.amazonaws.com",
    params: s3Params(config, params)
  }
}

// Returns the parameters that must be passed to the API call
function s3Params(config, params) {
  var credential = amzCredential(config);
  var policy = s3UploadPolicy(config, params, credential);
  var policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');
  return {
    key: params.filename,
    acl: 'public-read',
    success_action_status: '201',
    policy: policyBase64,
    "content-type": params.contentType,
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential': credential,
    'x-amz-date': dateString() + 'T000000Z',
    'x-amz-signature': s3UploadSignature(config, policyBase64, credential)
  }
}

function dateString() {
  var date = new Date().toISOString();
  return date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
}

function amzCredential(config) {
  return [config.accessKey, dateString(), config.region, 's3/aws4_request'].join('/')
}

// Constructs the policy
function s3UploadPolicy(config, params, credential) {
  return {
    // 5 minutes into the future
    expiration: new Date((new Date).getTime() + (5 * 60 * 1000)).toISOString(),
    conditions: [
      { bucket: config.bucket },
      { key: params.filename },
      { acl: 'public-read' },
      { success_action_status: "201" },
      // Optionally control content type and file size
      // A content-type clause is required (even if it's all-permissive)
      // so that the uploader can specify a content-type for the file
      ['starts-with', '$Content-Type',  ''],
      ['content-length-range', 0, 1000],
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
      { 'x-amz-credential': credential },
      { 'x-amz-date': dateString() + 'T000000Z' }
    ],
  }
}

function hmac(key, string) {
  var hmac = require('crypto').createHmac('sha256', key);
  hmac.end(string);
  return hmac.read();
}

// Signs the policy with the credential
function s3UploadSignature(config, policyBase64, credential) {
  var dateKey = hmac('AWS4' + config.secretKey, dateString());
  var dateRegionKey = hmac(dateKey, config.region);
  var dateRegionServiceKey = hmac(dateRegionKey, 's3');
  var signingKey = hmac(dateRegionServiceKey, 'aws4_request');
  return hmac(signingKey, policyBase64).toString('hex');
}

module.exports = router;