import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { ACMClient, RequestCertificateCommand, GetCertificateCommand, DescribeCertificateCommand } from "@aws-sdk/client-acm";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { project_name, domainName } = req.body;
        
        const project = await Project.findOne({ name: project_name });
        console.log(project)
        
        project.domains.push({
          name: "cdn.worththebeans.com",
          data: "d1hi43ov6zpw84.cloudfront.net.",
          active: true,
          default: true,
          // CNAME to verify SSL certificate
          certificate: {
            name: "_7224837b63eaad48440c10ad5c6e962a.cdn.worththebeans.com",
            type: "CNAME",
            value: "_59fe7357822178ac09769f5178581ad0.fpwkmzyskh.acm-validations.aws.",
            status: "PENDING_VALIDATION",
          }
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
