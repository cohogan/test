import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlanCard({plan, planLength}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined' sx={{borderColor: (plan.title === "Professional") && "primary.main", borderWidth: (plan.title === "Professional") && "3px", borderRadius: "1.5rem", padding: "2rem"}}>
                <CardHeader
                  title={plan.title}
                  // subheader={plan.subheader}
                  titleTypographyProps={{ align: 'center', fontWeight: 800 }}
                  // subheaderTypographyProps={{
                  //   align: 'center',
                  // }}
                  // sx={{
                  //   backgroundColor: (theme) =>
                  //     theme.palette.mode === 'light'
                  //       ? theme.palette.grey[200]
                  //       : theme.palette.grey[700],
                  // }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight={800}>
                      ${(planLength === "monthly") ? plan.price.monthly : plan.price.annually}
                    </Typography>
                    <Typography variant="h6">
                      {(planLength == "monthly") ?  "/mo" : "/yr"}
                    </Typography>
                  </Box>
                  <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
                    {plan.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth disableElevation variant={plan.buttonVariant} sx={{borderRadius: ".375rem"}}>
                    {plan.buttonText}&nbsp;<span aria-hidden="true">&rarr;</span>
                  </Button>
                </CardActions>
              </Card>
    </Box>
  );
}