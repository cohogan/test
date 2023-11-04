import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { Chip, CircularProgress, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import { useEffect } from "react";

export default function DomainCard({ domain, style, onRefresh }) {

  async function updateCnameValidation() {
    const res = await fetch(`/api/domain/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({domainId: domain._id}),
    });

    const { success, data } = await res.json();
    if (!success) {
      console.log("error")
      // wait for 3 seconds and try again
      setTimeout(() => {
        updateCnameValidation()
      }, 3000)
      return
    }
    onRefresh(data)
    console.log(data)
  }

  useEffect(() => {
    if (domain.certificate.status === "PENDING_CNAME_RECEPTION") {
      console.log("PENDING_CNAME_RECEPTION")
      updateCnameValidation()
    } else if (domain.certificate.status === "PENDING_VALIDATION") {
      console.log("PENDING_VALIDATION")
      // updateCnameValidation()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain.certificate.status])

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{ borderRadius: "15px", border: "1px solid gray", ...style }}
      >
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
              {domain?.name}
            </Typography>
            <Chip label="Default" variant="filled" />
          </Stack>

          
            <StatusBar domain={domain} />
        </CardContent>
      </Card>
    </Box>
  );
}

function StatusBar({ domain }) {
  console.log(domain.certificate.status)
  if (domain.certificate.status === "PENDING_CNAME_RECEPTION") {
    return (
      <>
      <Stack direction="row" spacing={4} sx={{ mt: "20px" }}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <CircularProgress size={20} color="inherit" />
          <Typography variant="body2">Loading CNAME Records</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems={"center"}>
          <RuleIcon color="error" />
          <Typography variant="body2">Configuration Not Complete</Typography>
        </Stack>
        </Stack>
      </>
    );
  }

  else if (domain.certificate.status === "PENDING_VALIDATION") {
  // else if (domain.certificate.status === "PENDING_CNAME_RECEPTION") {
    return (
    <>
    <Stack direction="row" spacing={4} sx={{ mt: "20px", mb: "20px" }}>
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <RuleIcon color="error" />
        <Typography variant="body2">Configuration Not Complete</Typography>
      </Stack>
      </Stack>
      <Divider />
      <Box sx={{ mt: "20px", mb: "20px" }}>
      Set the following records on your DNS provider to continue:
      <TableContainer component="div" >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" style={{fontWeight: 800}}>Type</TableCell>
            <TableCell component="th" style={{fontWeight: 800}}>Name</TableCell>
            <TableCell component="th" style={{fontWeight: 800}}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">
              CNAME
              </TableCell>
              <TableCell>{domain.certificate.name}</TableCell>
              <TableCell>{domain.certificate.value}</TableCell>
            </TableRow>
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">
              CNAME
              </TableCell>
              <TableCell>{domain.name}</TableCell>
              <TableCell>d1hi43ov6zpw84.cloudfront.net.</TableCell>
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </>
    )
  }
  return (
    <Stack direction="row" spacing={4} sx={{ mt: "20px" }}>
    <Stack direction="row" spacing={1} alignItems={"center"}>
      <CheckIcon color="primary" />
      <Typography variant="body2">Valid Configuration</Typography>
    </Stack>
    <Stack direction="row" spacing={1} alignItems={"center"}>
      <CheckIcon color="primary" />
      <Typography variant="body2">Active</Typography>
    </Stack>
    </Stack>
  );
}
