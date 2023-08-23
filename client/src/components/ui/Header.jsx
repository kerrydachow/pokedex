import {
  Box,
  IconButton,
  Button,
  useTheme,
  Typography,
  Tooltip,
} from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ColorModeContext } from "../../theme";
import { UserProfileContext } from "../../contexts/UserProfile.Context";
import { ROUTES } from "../../lib/constants";

// Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CatchingPokemonOutlinedIcon from "@mui/icons-material/CatchingPokemonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const Header = () => {
  const { user, logout } = useContext(UserProfileContext);
  console.log(user);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      margin="auto"
      p={2}
      maxWidth="xl"
    >
      {/* Logo and title */}
      <Box display="flex">
        <Button
          component={RouterLink}
          to="/"
          variant="filled"
          startIcon={<CatchingPokemonOutlinedIcon />}
        >
          <Typography>PokeAPI</Typography>
        </Button>
      </Box>

      {/* Icons */}
      <Box display="flex">
        {user?.userType === "admin" ? 
        (
          <IconButton component={RouterLink} to={ROUTES.ADMIN_PANEL}>
            <Tooltip title="Admin Panel">
              <AdminPanelSettingsOutlinedIcon />
            </Tooltip>
          </IconButton>
        ) : null}

        {/*  Color mode toggle */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Tooltip title="Dark Mode">
              <DarkModeOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Light Mode">
              <LightModeOutlinedIcon />
            </Tooltip>
          )}
        </IconButton>

        {/* Logout */}
        {user ? (
          <IconButton onClick={logout}>
            <Tooltip title="Logout">
              <LogoutOutlinedIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <IconButton component={RouterLink} to={ROUTES.LOGIN}>
            <Tooltip title="Login">
              <LoginOutlinedIcon />
            </Tooltip>
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Header;
