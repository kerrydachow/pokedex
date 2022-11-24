import React from "react";
import { tokens } from "../../theme";
import {
  Box,
  Grid,
  Container,
  Link,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box px={{xs: 3, sm: 10}} py={{xs: 5, sm: 10}} bgcolor={colors.redAccent[700]}>
      <Container fixed maxWidth="xl">
        <Grid container spacing={5} margin="auto">
            <Grid item xs={12} sm={3}>
              <Box><h3>Company</h3></Box>
              <Box>
                <Link href="/" color="inherit">Blog</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">About PokeAPI</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Careers</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box><h3>Help</h3></Box>
              <Box>
                <Link href="/" color="inherit">FAQ</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Live Chat</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Customer Support</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box><h3>Contact</h3></Box>
              <Box>
                <Link href="/" color="inherit">Email</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Phone</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Contact Us</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box>
                <IconButton>
                  <Tooltip title="Facebook">
                    <FacebookOutlinedIcon />
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip title="Github">
                    <GitHubIcon />
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip title="LinkedIn">
                    <LinkedInIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
        </Grid>
        <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 10}}>
          <h4>Pokemon API &reg; {new Date().getFullYear()}</h4>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
