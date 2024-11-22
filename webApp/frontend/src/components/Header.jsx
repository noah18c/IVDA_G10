import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
          }}
        >
          IKEA Recommender System
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" sx={{ color: "white" }}>
            Choices
          </Button>
          <Button component={Link} to="/recomendations" sx={{ color: "white" }}>
            Recommendations
          </Button>
          <Button component={Link} to="/summary" sx={{ color: "white" }}>
            Summary
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
