import Head from 'next/head'
import Link from 'next/link'
import { Container, Typography, Grid, Stack, Button } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <title>CloudMagic</title>
        <meta name="description" content="Protect Your Paycheck with CloudMagic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
          <Grid container spacing={4} sx={{height: `calc(100vh - 64px)`}}>
          <Grid item md={8} sx={{marginTop: "auto", marginBottom: "auto"}}>
            <Typography
              variant="h1"
              sx={{
                marginBottom: "2rem",
                fontSize: {
                  xs: "3.5rem",
                  sm: "4rem",
                  md: "5rem",
                },
                fontWeight: "700",
              }}
            >
              Files made easy
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "2rem" }}>
              Host files in no time. Only pay for what you use. Free custom domains. Use your own AWS credits. Leave any time.
            </Typography>
            <div style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginRight: "1rem", borderRadius: "25px" }}
                href="/api/auth/login"
                LinkComponent={Link}
                disableElevation
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                style={{ borderRadius: "25px" }}
                href="/about"
                LinkComponent={Link}
              >
                Learn More&nbsp;<span aria-hidden="true">→</span>
              </Button>
            </div>
          </Grid>
        </Grid>
        {/* <div
          style={{
            margin: "2rem 0",
            borderRadius: "25px",
            overflow: "hidden",
            width: "100%",
            border: "1px solid gray",
          }}
        >
          <img
            src="/scyt.png"
            alt="Picture of the author"
            style={{ width: "100%" }}
          />
        </div> */}
          </Container>
    </>
  )
}
