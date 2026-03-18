import { useState, useMemo } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from "@mui/material/Skeleton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../auth/AuthContext";
import config from "../config";

const NAV_LINKS = [
  { label: "Memory", to: "/game/memory" },
  { label: "Whack-a-Mole", to: "/whack-a-mole" },
  { label: "Animal", to: "/game/animal" },
];

const Navbar = () => {
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logoutUrl = useMemo(() => {
    const returnUrl = encodeURI(global.location.toString());
    const url = `${config.authApiPrefix}/login?r=${returnUrl}`;
    return url;
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" className="nabar">
      <Toolbar>
        {/* Hamburger — mobile only */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open navigation"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 1, display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          GenerAItor
        </Typography>

        {/* Inline links — desktop only */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              className="navbar-link"
              component={RouterLink}
              to={to}
              sx={{ ml: 3, my: 3, display: "block", textDecoration: "none" }}
            >
              {label}
            </Link>
          ))}
        </Box>

        {/* Spacer so user button stays right on mobile */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />

        {user === null ? (
          <Skeleton />
        ) : (
          <>
            <Button color="inherit" onClick={handleMenu}>
              {user.email}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem href="https://github.com/ikenley/game" component="a">
                <ListItemIcon>
                  <GitHubIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Github Source</ListItemText>
              </MenuItem>
              <MenuItem href={logoutUrl} component="a">
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 220 }} role="presentation">
          <Typography variant="h6" sx={{ px: 2, pt: 2, pb: 1 }}>
            GenerAItor
          </Typography>
          <Divider />
          <List>
            {NAV_LINKS.map(({ label, to }) => (
              <ListItem
                key={to}
                component={RouterLink}
                to={to}
                onClick={() => setDrawerOpen(false)}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
