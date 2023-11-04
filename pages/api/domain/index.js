import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { ACMClient, RequestCertificateCommand, GetCertificateCommand, DescribeCertificateCommand } from "@aws-sdk/client-acm";

function isFQDN(domainName) {
  // The regex pattern for a valid FQDN.
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

  // Match the string against the regex pattern.
  const match = regex.exec(domainName);

  // Return true if the match is not null, false otherwise.
  return match !== null;
}

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  
  switch (method) {
    case "POST":
      try {
        console.log("HALLO")
        const { project_name, domainName } = req.body;
        console.log("req.body", req.body)

        console.log("domainName", domainName)

        // Check if fully qualified domain name
        if (!isFQDN(domainName)) {
          res.status(400).json({ success: false, error: "Invalid domain name" });
          return;
        }

        // Check if project exists
        const project = await Project.findOne({ name: project_name });
        if (!project) {
          res.status(400).json({ success: false, error: "Project not found" });
          return;
        }

        // Create certificate with AWS Certificate Manager
        // reminder: because of delays immediatley after creating a certificate, we need to wait a few seconds before getting
        // the CNAME key and value the user needs to input into their DNS records 
        const client = new ACMClient({ region: "us-east-1" }); // required for CloudFront distrubution to be in US East (N. Virginia)
        
        const createCertificateInput = {
            DomainName: domainName,
            ValidationMethod: "DNS",
            KeyAlgorithm: "RSA_2048"
        }

        const createCertificateCommand = new RequestCertificateCommand(createCertificateInput);


        const createCertificateResponse = await client.send(createCertificateCommand);
        console.log("createCertificateResponse", createCertificateResponse); // successful response

        const certificateArn = createCertificateResponse.CertificateArn;
        // const certificateArn = "arn:aws:acm:us-east-1:530281287850:certificate/4386d4d4-ec77-4039-9975-185121af3cf2"


        console.log(certificateArn)
        
        project.domains.push({
          name: domainName,
          data: project.cloudfront_domain_name, // project cloudfront domain name
          active: true,
          default: true,
          certificate: {
            // name: "_7224837b63eaad48440c10ad5c6e962a.cdn.worththebeans.com",
            // type: "CNAME",
            // value: "_59fe7357822178ac09769f5178581ad0.fpwkmzyskh.acm-validations.aws.",
            status: "PENDING_CNAME_RECEPTION",
            arn: certificateArn
          }
        });

        await project.save();


        // const getCertificateInput = { // GetCertificateRequest
        //     CertificateArn: certificateArn
        //   };
        // const getCertificateCommand = new DescribeCertificateCommand(getCertificateInput);
        
        //   const getCertificateResponse = await client.send(getCertificateCommand);

        //   const certificate = getCertificateResponse.Certificate;


        res.status(201).json({ success: true, data: project });
      } catch (error) {
        // console.log(error.$response.body);
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
