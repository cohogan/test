import Head from "next/head";
import { Button, Container, Typography } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

const projects = [
  {
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},
{
  name: "image-wrapper",
  num_assets: 1,
  num_size: "1.2 MB"
},

]

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | CloudMagic</title>
        <meta name="description" content="View all your assets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Quickstart
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        The only tutorial you&apos;ll ever need
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        Use our API to upload your first image.
        </Typography>
        
        <>
        {/* STEP BY STEP GUIDE */}
        <Typography variant="h2" component="h2" fontWeight="800" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Step 1: Create a project
        </Typography>
        <Typography variant="p" component="p" color="text.secondary" sx={{mb: "40px"}}>
        Create a project via <Link href="/create">the create page on the dashboard</Link>. You will get an API key which you&apos;ll need in the next steps. You now have all you need to start uploading!
        </Typography>

        <Typography variant="h2" component="h2" fontWeight="800" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Step 2: Use the API to get a presigned URL
        </Typography>
        <Typography variant="p" component="p" color="text.secondary" sx={{mb: "40px"}}>
        Make the following request to our API to get a presigned URL:
        </Typography>

        {/* show in all different client and server applications */}
        <pre>
        <code>
        curl -X POST https://api.CloudMagic.xyz/api/project/project/upload -H
        </code>
        </pre>

        <Typography variant="p" component="p" color="text.secondary" sx={{mb: "40px"}}>
        You&apos;ll get back a response that looks something like this:
        </Typography>

        </>

      </Container>
    </>
  );
}
