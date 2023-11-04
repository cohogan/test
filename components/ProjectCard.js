import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ProjectCard({project}) {
  return (
    <Box component={Link} href={`/p/${project.name}/dashboard`} sx={{minWidth: 275, color: "inherit", textDecoration: "none"}}>
      <Card variant="outlined" sx={{borderRadius: "15px", border: "1px solid gray"}}>
    <CardContent>
      <Typography variant="h5" component="div">
        {project.name}
      </Typography>
      <Typography sx={{}} color="text.secondary">
      {project.bucket_url}
      </Typography>
      <Typography sx={{}} color="text.secondary">
      Updated {new Date(project.updated_at).toLocaleDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More&nbsp;<span aria-hidden="true">&rarr;</span></Button>
    </CardActions>
      </Card>
    </Box>
  );
}