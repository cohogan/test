// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dbConnect from "@/utils/dbConnect";
// import Project from "@/models/Project";


export default async function handler(req, res) {
  const { method } = req;
  // await dbConnect();
  switch (method) {
    case "GET":
      try {
        // const { filename, api_key } = req.query;

        // const project = await Project.findOne({ api_key: api_key });
        // if (!project) {
        //     return res.status(400).json({ success: false });
        // }

        // const bucket = project.bucket;

        // const client = new S3Client({
        //   region: "us-west-1",
        //   credentials: {
        //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //   },
        // });

        // const putObjectParams = {
        //   Bucket: bucket,
        //   Key: filename,
        //   ContentType: "image/jpeg", // set the content type of your image file
        //   // Body: req.body // the binary data of your image feil
        // };

        // const command = new PutObjectCommand(putObjectParams);
        // const url = await getSignedUrl(client, command, { expiresIn: 3600 });
        // console.log(url);

        // const presignedUrl = await getPresignedUrl(req, res);
        // res.status(200).json({ success: true, data: presignedUrl });
        res.ststus(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
