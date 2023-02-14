import { DarkMode, LightMode, SportsEsports, Leaderboard } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ColorModeContext } from "App";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { AppRoutes } from "types/routes";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchGamePath = useMatch(AppRoutes.Game);
  const colorMode = React.useContext(ColorModeContext);
  const matches480 = useMediaQuery('(min-width:480px)');

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar alt="logo" src="logo.png" sx={{ width: 50, height: 50, mr: 2 }} />
        <Typography variant="h4" sx={{ mr: 'auto' }}>
          Сапёр
        </Typography>
        {matchGamePath ? (
          <IconButton color="inherit" onClick={() => navigate(AppRoutes.Leaders)}>
            <Leaderboard sx={{ mr: '5px' }} />
            {matches480 && ('Рекорды')}
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={() => navigate(AppRoutes.Game)}>
            <SportsEsports sx={{ mr: '5px' }} />
            {matches480 && ('Играть')}
          </IconButton>
        )
        }
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}