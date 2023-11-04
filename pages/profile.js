import Head from "next/head";
import { Container, Typography, Grid, Chip } from "@mui/material";
import PlanCard from "@/components/PlanCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";


export default function Ads() {
    const { user, error, isLoading } = useUser();

    function logout({ returnTo }) {
        fetch("/api/auth/logout");
        // redirect to the homepage

    }

  return (
    <>
      <Head>
        <title>Profile | CloudMagic</title>
        <meta name="description" content="See how you can protect your RSUs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Profile
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        {user?.nickname}
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        Hobby Plan
        </Typography>

        {/* logout button with auth0 */}
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        <Chip label="Logout" clickable component="a" href="/api/auth/logout" />
        </Typography>

      </Container>
    </>
  );
}
