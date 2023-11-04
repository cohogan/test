import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { ACMClient, RequestCertificateCommand, GetCertificateCommand, DescribeCertificateCommand } from "@aws-sdk/client-acm";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  
  switch (method) {
    case "POST":
      try {
        const { domainId } = req.body;
        // Check if project exists
        const project = await Project.findOne({
            domains: {
              $elemMatch: {
                _id: domainId,
              }
            }
          });

        if (!project) {
          res.status(400).json({ success: false, error: "Project not found" });
          return;
        }

        const domain = project.domains.find(domain => domain._id.toString() === domainId);
        console.log("HAH", project.domains)

        // Create certificate with AWS Certificate Manager
        const client = new ACMClient({ region: "us-east-1" }); // required for CloudFront distrubution to be in US East (N. Virginia)
        
        const getCertificateInput = { // GetCertificateRequest
            CertificateArn: domain.certificate.arn
        };
        const getCertificateCommand = new DescribeCertificateCommand(getCertificateInput);
        const getCertificateResponse = await client.send(getCertificateCommand);
        
        const certificate = getCertificateResponse.Certificate;

        
        if (!certificate.DomainValidationOptions) {
            res.status(400).json({ success: false, error: "Awaiting Validation Options" });
            return;
        }

        console.log("CERT", certificate.DomainValidationOptions[0].ResourceRecord)

        // domains is an array of objects, so we need to find the domain object with the matching domainId
        // add a field on that domain object, and save project
        project.domains = project.domains.map(domain => {
            if (domain._id.toString() === domainId) {
                domain.certificate = {
                    name: certificate.DomainValidationOptions[0].ResourceRecord.Name,
                    type: certificate.Type,
                    value: certificate.DomainValidationOptions[0].ResourceRecord.Value,
                    status: certificate.Status,
                    arn: certificate.CertificateArn
                }
            }
            return domain;
        });
        await project.save();       
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
