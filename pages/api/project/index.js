import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { S3Client, CreateBucketCommand, PutBucketPolicyCommand, DeletePublicAccessBlockCommand  } from "@aws-sdk/client-s3";
import { CloudFrontClient, CreateDistributionCommand } from "@aws-sdk/client-cloudfront";
import generateApiKey from 'generate-api-key';

function generateS3Name(name) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

function verifyS3Name(bucketName) {
  const minLength = 3;
  const maxLength = 63;

  // Check length
  if (bucketName.length < minLength || bucketName.length > maxLength) {
    return false;
  }

  // Check lowercase letters, numbers, and hyphens only
  const validCharactersRegex = /^[a-z0-9-]+$/;
  if (!validCharactersRegex.test(bucketName)) {
    return false;
  }

  // Check if starts and ends with a letter or number
  const startsWithLetterOrNumberRegex = /^[a-z0-9]/;
  const endsWithLetterOrNumberRegex = /[a-z0-9]$/;
  if (
    !startsWithLetterOrNumberRegex.test(bucketName) ||
    !endsWithLetterOrNumberRegex.test(bucketName)
  ) {
    return false;
  }

  // Check if contains two adjacent periods
  if (bucketName.includes("..")) {
    return false;
  }

  // Check if formatted as an IP address
  const ipAddressRegex = /^\d+\.\d+\.\d+\.\d+$/;
  if (ipAddressRegex.test(bucketName)) {
    return false;
  }

  // Check if starts with the prefix xn--
  if (bucketName.startsWith("xn--")) {
    return false;
  }

  // Check if ends with the suffix -s3alias or --ol-s3
  if (bucketName.endsWith("-s3alias") || bucketName.endsWith("--ol-s3")) {
    return false;
  }

  // All checks passed, bucket name is valid
  return true;
}

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // TODO Add region as a parameter
        const { name } = req.body;

        // CREATE AWS S3 BUCKET
        const s3BucketName = generateS3Name(name);
        console.log("S3 BUCKET NAME", s3BucketName)
        if (!verifyS3Name(s3BucketName)) {
          return res
            .status(400)
            .json({ success: false, error: "Invalid bucket name" });
        }
        const s3Client = new S3Client({ region: "us-west-1" });
        const command = new CreateBucketCommand({
          Bucket: s3BucketName,
        });

        const createResponse = await s3Client.send(command);
        const Location = createResponse.Location
        console.log("CREATE RESPONSE", createResponse)
        console.log(`Bucket created with location ${Location}`);

        const input = { // DeletePublicAccessBlockRequest
          Bucket: s3BucketName, // required
          ExpectedBucketOwner: process.env.AWS_USER_ID,
        };
        const deletePublicAccessBlockCommand = new DeletePublicAccessBlockCommand(input);
        const delResp = await s3Client.send(deletePublicAccessBlockCommand);

        // CREATE API KEY
        const api_key = generateApiKey({ method: 'string', length: 12 })

        // Add bucket policy
        const bucketPolicy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicReadGetObject",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": `arn:aws:s3:::${s3BucketName}/*`
                }
            ]
        }
        const policyCommand = new PutBucketPolicyCommand({Policy: JSON.stringify(bucketPolicy), Bucket: s3BucketName, GrantFullControl: process.env.AWS_USER_ID});
        const response = await s3Client.send(policyCommand);

        console.log("Put Bucket response", response)

        // CREATE AWS CLOUDFRONT DISTRIBUTION
        const cloudFrontClient = new CloudFrontClient({ region: "us-west-1" });
        const distributionParams = {
          DistributionConfig: {
            CallerReference: `${s3BucketName}-cdn`, // A unique identifier for the distribution
            Comment: `CDN for ${s3BucketName}`,
            DefaultRootObject: 'index.html', // The default file to serve
            Enabled: true,
            Origins: {
              Quantity: 1,
              Items: [
                {
                  Id: s3BucketName,
                  DomainName: `${s3BucketName}.s3.amazonaws.com`,
                  S3OriginConfig: {
                    OriginAccessIdentity: '' // Leave empty if no Origin Access Identity is used
                  }
                }
              ]
            },
            DefaultCacheBehavior: {
              TargetOriginId: s3BucketName,
              ForwardedValues: {
                QueryString: false,
                Cookies: {
                  Forward: 'none'
                }
              },
              ViewerProtocolPolicy: 'redirect-to-https',
              MinTTL: 0,
              AllowedMethods: {
                Quantity: 2,
                Items: ['GET', 'HEAD'],
                CachedMethods: {
                  Quantity: 2,
                  Items: ['GET', 'HEAD']
                }
              },
              SmoothStreaming: false,
              DefaultTTL: 86400,
              MaxTTL: 31536000,
              Compress: true
            },
            PriceClass: 'PriceClass_All',
            ViewerCertificate: {
              CloudFrontDefaultCertificate: true
            },
            HttpVersion: 'http2',
            IsIPV6Enabled: true
          }
        };
        
        const distributionCommand = new CreateDistributionCommand(distributionParams);
        const cfRes = await cloudFrontClient.send(distributionCommand);
        console.log("CFRES", cfRes)
        

    // name: { type: String, required: true, unique: true },
    // picture: { type: String, required: false },
    
    // // s3 info
    // bucket_name: { type: String, required: true },
    // bucket_url: { type: String, required: false },

    // // cloudfront info
    // cloudfront_location: { type: String, required: false },
    // cloudfront_id: { type: String, required: false },
    // cloudfront_arn: { type: String, required: false },
    // cloudfront_domain_name: { type: String, required: false },

    // // ETag: { type: String, required: false },
    // api_key: { type: String, required: true },
    // domains: { type: [DomainSchema], required: false },

        // CREATE PROJECT


        const test = {
          name,
          bucket_name: s3BucketName,
          bucket_url: Location,

          cloudfront_location: cfRes.Distribution.Location,
          cloudfront_id: cfRes.Distribution.Id,
          cloudfront_arn: cfRes.Distribution.ARN,
          cloudfront_domain_name: cfRes.Distribution.DomainName,

          api_key

        }
        console.log("MOST IMPORTANT", test)

        const project = await Project.create({
          name,
          bucket_name: s3BucketName,
          bucket_url: Location,

          cloudfront_location: cfRes.Distribution.Location,
          cloudfront_id: cfRes.Distribution.Id,
          cloudfront_arn: cfRes.Distribution.ARN,
          cloudfront_domain_name: cfRes.Distribution.DomainName,

          api_key,
          domains: []

        });
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
        const projects = await Project.find({ });
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
