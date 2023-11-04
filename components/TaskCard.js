import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TaskCard({task}) {
  return (
    <Box sx={{ minWidth: 275, maxWidth: 275 }}>
      <Card variant="outlined" sx={{borderRadius: "15px", border: "1px solid gray"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={task.thumbnail}
        title="green iguana"
      />
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
      <Typography variant="h5" component="div">
        {task.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Starting at ${task.startingAt} per label
      </Typography>
      <Typography variant="body2">
        {task.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More&nbsp;<span aria-hidden="true">&rarr;</span></Button>
    </CardActions>
      </Card>
    </Box>
  );
}