import Head from "next/head";
import { Button, Container, Typography, Breadcrumbs, Divider, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText } from "@mui/material";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Dashboard() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

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
              Settings
            </Typography>
          </Breadcrumbs>

          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={true} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={false} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={false} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>

          <Divider color="error" sx={{mb: "15px"}}/>
          <Typography fontWeight="800" sx={{ color: "error.main" }}>
              Danger Zone
            </Typography>

      </Container>
      </Sidebar>
    </>
  );
}
