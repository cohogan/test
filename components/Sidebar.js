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
import ManageIcon from '@mui/icons-material/ManageSearch';
// import TransformationsIcon from '@mui/icons-material/Transform';
import { Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;
// const options = ['Dashboard', 'Custom Domains', 'Settings'];
const options = [
    {
        name: 'Dashboard',
        icon: (<DashboardIcon />),
        path: '/dashboard'
    },
    {
        name: 'Manage Content',
        icon: (<ManageIcon />),
        path: '/manage'
    },
    // {
    //     name: 'Transformations',
    //     icon: (<TransformationsIcon />),
    //     path: '/transformations'
    // },
    {
        name: 'Custom Domains',
        icon: (<DomainIcon />),
        path: '/domains'
    },
    {
        name: 'Analytics',
        icon: (<AnalyticsIcon />),
        path: '/analytics'
    },
    {
        name: 'Settings',
        icon: (<SettingsIcon />),
        path: '/settings'
    }
]

console.log(options[0].icon)

function isActive(path, currentPath) {
    return currentPath.endsWith(path);
}

export default function ClippedDrawer({ children }) {
    const router = useRouter();
    const theme = useTheme();
    const { asPath } = router;
    
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
                <Link href={{
                    pathname: `/p/[project_name]${option.path}`,
                    query: router.query,
                  }} passHref legacyBehavior key={option.name}>
            <Button sx={{backgroundColor: (isActive(option.path, asPath) ? `${theme.palette.primary.main}4D` : "inherit"), color: (isActive(option.path, asPath) ? "-moz-initial" : "inherit"), borderRadius: "0px 25px 25px 0px", p: "15px", width: "200px", mb: ".5rem", justifyContent: "flex-start"}}>
            <Stack direction="row" spacing={2} alignItems={"flex-start"} justifyContent={"flex-start"}>
                {option.icon}
                <Typography variant="h6" sx={{fontSize: "0.875rem", fontWeight: 800}}>{option.name}</Typography>
            </Stack>
            </Button>
            </Link>
            ))}
            
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}