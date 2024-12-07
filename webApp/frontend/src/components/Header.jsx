import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0058a3" }}>
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
            color: "#ffe53a",
            fontWeight: "bold",
            "&:hover": { color: "#ffffff" },
          }}
        >
          IKEA Recommender System
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#ffe53a",
              fontWeight: "bold",
              "&:hover": { color: "#ffffff" }, 
            }}
          >
            Choices
          </Button>
          <Button
            component={Link}
            to="/recommendations"
            sx={{
              color: "#ffe53a",
              fontWeight: "bold",
              "&:hover": { color: "#ffffff" }, 
            }}
          >
            Recommendations
          </Button>
          {/* <Button
            component={Link}
            to="/summary"
            sx={{
              color: "#ffe53a",
              fontWeight: "bold", 
              "&:hover": { color: "#ffffff" },
            }}
          >
            Summary
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
