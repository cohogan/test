import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // const projects = await Project.find({ });
        const s3Client = new S3Client({ region: "us-west-1" });
        const command = new ListObjectsV2Command({
          Bucket: req.query.project_name,
        });
        const data = await s3Client.send(command);
        console.log(data);

        res.status(200).json({ success: true, data: data.Contents });
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
