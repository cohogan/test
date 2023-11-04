import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const project = await Project.findOne({ name: req.query.project_name });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedProject = await Project.findOne({ name: req.query.project_name });
        // TODO: Delete CloudFront distribution
        
        // TODO: Delete S3 bucket

        // TODO: Delete project from DB

        res.status(200).json({ success: true, data: deletedProject });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
