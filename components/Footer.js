import { Stack, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{padding: "1rem 2rem"}}>
      <Typography variant="body2" component="p" color="text.secondary">
      &copy; 2023 CloudMagic Inc. All Rights Reserved
      </Typography>
    </Stack>
  )
}
