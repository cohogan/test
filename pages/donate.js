import Head from "next/head";
import { Container, Typography, Grid, Chip } from "@mui/material";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const DonationButton = ({ itemID, amount }) => {

  const stripePromise = loadStripe(
    "pk_live_51NMnPWKcmy0xa4EUU6fBx8NujX1Rqh5UtSsX0db7aEPNFWli7e9RQDRFxpSriyvMLVquuXhNj9Q4C5ZKCZ50IYkx00YWjVNcga"
  );

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//localpdf.tech/merge",
        cancelUrl: window.location.protocol + "//localpdf.tech/merge",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={handleClick}
    >
      Donate ${amount}
    </button>
  );
};


export default function Donate() {

  return (
    <>
      <Head>
        <title>Donate | CloudMagic</title>
        <meta name="description" content="See how you can protect your RSUs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Typography variant="h5" component="h1" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "1rem", color: "primary.main"}}>
        Donate
        </Typography>
        <Typography variant="h2" component="h2" fontWeight="800" align="center" sx={{mb: "1.5rem", fontSize: "2.25rem"}}>
        Help support CloudMagic
        </Typography>
        <Typography variant="h4" component="h4" color="text.secondary" sx={{mb: "40px", fontSize: "1.125rem"}} align="center">
        CloudMagic is free to use, but if you like it, please consider donating to help support the project.
        </Typography>

        <>
        <DonationButton itemID="price_1NMnWdKcmy0xa4EUXWS3kqpy" amount="5" />
        </>

      </Container>
    </>
  );
}
