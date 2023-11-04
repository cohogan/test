import Head from "next/head";
import { Button, Container, Stack, TextField, Typography, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DomainCard from "@/components/DomainCard";


export default function Dashboard() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [customDomain, setCustomDomain] = useState("");

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

  async function onSubmit(e) {
    e.preventDefault();
    // const res = await fetch(`/api/project/${router.query.project_name}/domain`, {
      const res = await fetch(`/api/domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainName: customDomain, project_name: router.query.project_name }),
    });
    const { data } = await res.json();
    setProject(data);
  }

  console.log("project", project)

  
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
              Domains
            </Typography>
          </Breadcrumbs>
      {/* <Typography variant="h5" component="h1" fontWeight="800" sx={{mt: "15px", mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Domains
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" sx={{mt: "15px", mb: "1.5rem", fontSize: "2.25rem"}}>
        {router.query.project_name}&nbsp;
        </Typography> */}
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}}>
        These are the domains that you can use to access your assets.
        </Typography>
        
        <>
          <form onSubmit={(e) => onSubmit(e)}>
        <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"flex-start"} sx={{mb: "1.5rem", maxWidth: "800px"}}>
        <TextField id="domain" label="Add New Custom Domain" variant="outlined" fullWidth placeholder="cdn.exmaple.com" onChange={(e) => setCustomDomain(e.target.value)}/>
        <Button type="submit" variant="contained" sx={{height: "100%"}} disableElevation>Add</Button>
        </Stack>
        </form>

        {project?.domains.map((domain) => (
          <DomainCard domain={domain} key={domain.name} onRefresh={setProject} style={{maxWidth: "800px", marginBottom: "15px"}}/>
        ))}
        </>

      </Container>
      </Sidebar>
    </>
  );
}
