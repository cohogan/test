import * as React from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from "@/contexts/ThemeContext";

import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useUser } from "@auth0/nextjs-auth0/client";
import Avatar from "@/components/Avatar";
import { Stack, Typography } from "@mui/material";

const drawerWidth = 240;
const navItems = [{ name: "Donate", path: "/donate" }, { name: "Calculator", path: "/calculator" }, { name: "About", path: "/about"},
]
const navItemsAuthenticated = [{ name: "Donate", path: "/donate" }, { name: "Projects", path: "/projects" }, { name: "Quickstart", path: "/quickstart" }]

function ElevationScroll(props) {
    const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Navbar(props) {
    const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, error, isLoading } = useUser();

  const { darkMode, handleDarkMode } = useThemeMode();
  console.log("DARK MODE", darkMode);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      { user && (
        <>
        <div style={{ margin: "15px 0px" }}>
          <Avatar user={user} size={60} style={{marginLeft: "auto", marginRight: "auto"}} />
        </div>
        <Divider />
        </>
      )}
      <List>
        {(user ? navItemsAuthenticated : navItems).map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.path} passHref legacyBehavior>
              <Button fullWidth size="large" sx={{ textAlign: "center", fontWeight: 600, color: "inherit", ml:"10px", mr: "10px" }}>
                {/* <ListItemText primary={item.name} /> */}
                {item.name}
              </Button>
            </Link>
          </ListItem>
        ))}

        {!user && (
        <ListItem key={"auth"} disablePadding>
          <Button size="large" fullWidth sx={{fontWeight: 600, ml:"10px", mr: "10px"}}
          >
            Log in&nbsp;<span aria-hidden="true">&rarr;</span>
          </Button>
        </ListItem>

        )}

      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <ElevationScroll {...props}>
        <AppBar component="nav" color="inherit" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "block" } }}>
              <Link href="/" style={{ textDecoration: 'none', color: "inherit" }}>
                <Stack direction="row" alignItems="center" spacing={.5}>
                <Image src="/logo.svg" alt="logo" width={35} height={35} priority />
                <Typography sx={{fontWeight: 800, fontSize: "1.25rem"}}>CloudMagic</Typography>
                </Stack>
                {/* <Image src="/logo_dark_word.svg" alt="logo" height={40} width={40*3} priority /> */}
              </Link>
            </Box>
            <IconButton
              onClick={() => handleDarkMode()} color="inherit"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, marginLeft: "0px" }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "flex" }, marginLeft: "0px" }}>
              {(user ? navItemsAuthenticated : navItems).map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  passHref
                  legacyBehavior
                >
                  <Button sx={{ color: "inherit", fontWeight: "600" }}>{item.name}</Button>
                </Link>
              ))}
              {user ? (
                    <Avatar user={user} size={40} style={{marginLeft: "8px"}} />
              ) : (
              <Link href="/api/auth/login" passHref legacyBehavior>
              <Button sx={{ fontWeight: "600" }}
              >
                Log in&nbsp;<span aria-hidden="true">&rarr;</span>
              </Button>
              </Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box component="nav">
        <Drawer
          container={container}
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
