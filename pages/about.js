import Head from "next/head";
import { Container, Typography, Grid, Chip } from "@mui/material";
import PlanCard from "@/components/PlanCard";
import { useState } from "react";

const plans = [
  {
    title: 'Free',
    price: {monthly: 0, annually: 0},
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Professional',
    subheader: 'Most popular',
    price: {monthly: 15, annually: 150},
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: {monthly: 30, annually: 300},
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

export default function Ads() {
  const [planLength, setPlanLength] = useState("monthly");
  return (
    <>
      <Head>
        <title>About | CloudMagic</title>
        <meta name="description" content="See how you can protect your RSUs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        About
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        Don&apos;t let market volatility ruin your RSUs 
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        CloudMagic makes sure that you get the full value of your RSUs, no matter what the market does.
        </Typography>

        <>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{mb: "20px"}}>
          {(planLength === "monthly") ? (
            <>
            <Chip label="Monthly" variant="filled" color="primary" sx={{mr: "10px"}} clickable onClick={() => setPlanLength("monthly")}/>
            <Chip label="Annually" variant="outlined" clickable onClick={() => setPlanLength("annually")}/>
            </>
          ) : (
            <>
            <Chip label="Monthly" variant="outlined" sx={{mr: "10px"}} clickable onClick={() => setPlanLength("monthly")}/>
            <Chip label="Annually" variant="filled" color="primary" clickable onClick={() => setPlanLength("annually")}/>
            </>
          )}
        </Grid>
        </>

        <Grid container spacing={5} alignItems="flex-end" sx={{mb: "40px"}}>
          {plans.map((plan) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={plan.title}
              xs={12}
              sm={plan.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <PlanCard plan={plan} planLength={planLength} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
