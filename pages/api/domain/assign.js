import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import {
  CloudFrontClient,
  AssociateAliasCommand,
//   GetDistributionCommand,
GetDistributionConfigCommand,
  UpdateDistributionCommand,
} from "@aws-sdk/client-cloudfront";
import { ACMClient, DescribeCertificateCommand } from "@aws-sdk/client-acm";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { domainId } = req.body;
        const client = new CloudFrontClient({ region: "us-west-1" });

        const project = await Project.findOne({
          domains: {
            $elemMatch: {
              _id: domainId,
            },
          },
        });

        if (!project) {
          res.status(400).json({ success: false, error: "Project not found" });
          return;
        }

        const domain = project.domains.find((domain) => domain._id == domainId);


        const certificateClient = new ACMClient({ region: "us-east-1" }); // required for CloudFront distrubution to be in US East (N. Virginia)
        
        const getCertificateInput = { // GetCertificateRequest
            CertificateArn: domain.certificate.arn
        };
        const getCertificateCommand = new DescribeCertificateCommand(getCertificateInput);
        const getCertificateResponse = await certificateClient.send(getCertificateCommand);
        
        const certificate = getCertificateResponse.Certificate;

        console.log("C", certificate.DomainValidationOptions[0].ResourceRecord)



        // check if the certificate has been issued
        if (certificate.Status !== "ISSUED") {
          res.status(400).json({ success: false, error: "Certificate not issued" });
          return;
        }

        console.log("DOMAIN", domain)

        // GET DISTRIBUTION
        const input = {
          Id: project.cloudfront_id,
        };
        const command = new GetDistributionConfigCommand(input);
        const response = await client.send(command);

        // UPDATE DISTRIBUTION
        const updateDistributionInput = {
            DistributionConfig: {
                ...response.DistributionConfig,
                Aliases: {
                    Quantity: 1,
                    Items: [domain.name]
                },
                ViewerCertificate: {
                    ACMCertificateArn: domain.certificate.arn,
                    SSLSupportMethod: "sni-only",
                    MinimumProtocolVersion: "TLSv1.2_2021",
                    // Certificate: "arn:aws:acm:us-east-1:530281287850:certificate/4386d4d4-ec77-4039-9975-185121af3cf2",
                    // CertificateSource: "acm"
                }
            },
            Id: project.cloudfront_id,
            IfMatch: response.ETag
        }

        const updateDistributionCommand = new UpdateDistributionCommand(updateDistributionInput);
        const updateDistributionResponse = await client.send(updateDistributionCommand);
        console.log("updateDistributionResponse", updateDistributionResponse); // successful response





        // const input = {
        //   // AssociateAliasRequest
        //   TargetDistributionId: distributionId, // required
        //   Alias: "cdn.worththebeans.com", // required
        // };
        // const command = new AssociateAliasCommand(input);
        // const response = await client.send(command);
        // console.log(response); // successful response

        // CREATE PROJECT
        // const project = await Project.create({
        //   name,
        //   bucket_name: s3BucketName,
        //   bucket_url: Location,
        //   api_key,
        // });
        res.status(201).json({ success: true, data: updateDistributionResponse });
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
