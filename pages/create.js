import Head from "next/head";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");

  async function onSubmit(e) {
    e.preventDefault()
    const createResPromise = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createRes = await createResPromise.json();
    console.log(createRes);
    
    console.log(name)
  }
  return (
    <>
      <Head>
        <title>Create | CloudMagic</title>
        <meta name="description" content="Create a new project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Create
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        Create a new project
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        CloudMagic makes sure that you get the full value of your RSUs, no matter what the market does.
        </Typography>
        
        <>
        <form onSubmit={(e) => onSubmit(e)}>
        {/* make a form here that asks for a project name */}
        <TextField id="outlined-basic" label="Project name" variant="outlined" sx={{mb: "40px", width: "100%"}} onChange={(e) => setName(e.target.value)}/>
        {/* REGION (doesn't matter very much bc of cdn) */}


        <Button variant="contained" type="submit" disableElevation fullWidth>Create project</Button>
        </form>
        </>

      </Container>
    </>
  );
}
