import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import DomainIcon from '@mui/icons-material/Domain';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import { Button, Stack } from '@mui/material';
import { alpha } from "@mui/material";

const drawerWidth = 240;
// const options = ['Dashboard', 'Custom Domains', 'Settings'];
const options = [
    {
        name: 'Dashboard',
        icon: (<DashboardIcon />)
    },
    {
        name: 'Custom Domains',
        icon: (<DomainIcon />)
    },
    {
        name: 'Analytics',
        icon: (<AnalyticsIcon />)
    },
    {
        name: 'Settings',
        icon: (<SettingsIcon />)
    }
]

console.log(options[0].icon)

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderWidth: 0 }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {options.map((option, index) => (
            <Button key={option.name} sx={{backgroundColor: (index===1 ? alpha("#35B578", 0.3) : "inherit"), borderRadius: "0px 15px 15px 0px", p: "15px", width: "190px", mb: ".5rem", justifyContent: "flex-start"}}>
            <Stack direction="row" spacing={2} alignItems={"flex-start"} justifyContent={"flex-start"}>
                {option.icon}
                <Typography variant="h6" sx={{fontSize: "0.875rem", fontWeight: 800}}>{option.name}</Typography>
            </Stack>
            </Button>
            ))}
            
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}