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
import { UserProfileContext }from "../../contexts/UserProfile.Context";

// Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CatchingPokemonOutlinedIcon from "@mui/icons-material/CatchingPokemonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const Header = () => {
  const { user, logout } = useContext(UserProfileContext);
  console.log(user);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" margin="auto" p={2} maxWidth="xl">
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
        {/* Admin Panel */}
        <IconButton>
          <Tooltip title="Admin Panel">
            <AdminPanelSettingsOutlinedIcon />
          </Tooltip>
        </IconButton>

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
        <IconButton onClick={logout}>
          <Tooltip title="Logout" >
            <LogoutOutlinedIcon />
          </Tooltip>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
