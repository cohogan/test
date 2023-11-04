import Head from "next/head";
import { Container, Stack, Typography, Chip } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch("/api/project");
      const { data } = await res.json();
      setProjects(data);
      setLoading(false);
    };
    getProjects();
  }, []);

  return (
    <>
      <Head>
        <title>Projects | CloudMagic</title>
        <meta name="description" content="View all your projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Projects
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        View and manage all of your projects
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        CloudMagic provisions file storage and a CDN for your projects in seconds.
        </Typography>

        <Stack direction="row" spacing={2} sx={{mb: "40px"}} justifyContent={"center"}>
          <Chip clickable label="Create a project" variant="outlined" icon={<PlusIcon />}  component={Link} href="/create"/>
          </Stack>
        <div style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
          {projects.map(project => (
            <div style={{margin: "1rem", overflow: "wrap"}} key={project.name}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

      </Container>
    </>
  );
}
