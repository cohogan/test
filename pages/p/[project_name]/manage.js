import Head from "next/head";
import { Button, Container, Typography, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProject = async () => {
      const res = await fetch(`/api/project/${router.query.project_name}`);
      const { data } = await res.json();
      setProject(data);
      setLoading(false);
    };
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | CloudMagic</title>
        <meta name="description" content="View all your assets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar>
        <Container>
          {/* <Typography variant="h5" component="h1" fontWeight="800" sx={{mt: "15px", mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Dashboard
        </Typography> */}

          <Breadcrumbs aria-label="breadcrumb" sx={{mt: "15px", mb: "15px"}}>
            <Link href="/projects" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "text.primary" }}>Projects</Typography>
            </Link>
            <Link
              href={{
                pathname: `/p/[project_name]/dashboard`,
                query: router.query,
              }}
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ color: "text.primary" }}>{router.query.project_name}</Typography>
            </Link>
            {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
            <Typography fontWeight="800" sx={{ color: "primary.main" }}>
              Manage Content
            </Typography>
          </Breadcrumbs>

          {/* <Typography variant="h2" component="h2" fontWeight="800" sx={{mt: "15px", mb: "1.5rem", fontSize: "2.25rem"}}>
        {router.query.project_name}&nbsp;
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}}>
        The content in this project is deployed with a CDN.
        </Typography> */}

          <>
            {/* <Typography variant="h5" component="h1" fontWeight="800" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
          API Key: <code>{project?.api_key}</code>
        </Typography> */}
            <video
              width="320"
              height="240"
              autoplay
              muted
              controls
              controlslist={"nodownload"}
              style={{ borderRadius: "4px" }}
            >
              <source
                src="https://d1hi43ov6zpw84.cloudfront.net/test.mp4"
                type="video/mp4"
              />
              {/* <source src="movie.ogg" type="video/ogg"/> */}
              Your browser does not support the video tag.
            </video>

            
          </>
        </Container>
      </Sidebar>
    </>
  );
}
