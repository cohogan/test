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
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: "15px", mb: "15px"}}>
            <Link href="/projects" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "text.primary" }}>Projects</Typography>
            </Link>
            {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
            <Typography fontWeight="800" sx={{ color: "primary.main" }}>
            {router.query.project_name}
            </Typography>
          </Breadcrumbs>

          <Typography variant="h2" component="h2" fontWeight="800" sx={{mt: "15px", mb: "1.5rem", fontSize: "2.25rem"}}>
        {router.query.project_name}&nbsp;
        </Typography>
        
        <>
        <Typography variant="h5" component="h1" fontWeight="800" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
          API Key: <code>{project?.api_key}</code>
        </Typography>
        {/* DOMAINS */}
        {/* API_KEY */}
        {/* GRAPH OF NUMBER OF IMAGES OVER TIME */}
        {/* REGION? PROB WONT MATTER BC OF CDN */}
        </>

      </Container>
      </Sidebar>
    </>
  );
}
