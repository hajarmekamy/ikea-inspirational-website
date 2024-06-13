import React from "react";
import { Button, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box className="home-container">
      <Box className="home-content">
        <Box className="home-text-group">
          <Typography className="home-heading">
            Need
            <br />
            Inspiration?
          </Typography>
          <Typography className="home-text">
            Explore our curated IKEA room styles.
            <br /> Find inspiration and transform your space
            <br /> with unique decor ideas.
          </Typography>
          <Button
            onClick={() => navigate("/inspirations")}
            variant="contained"
            size="large"
            className="home-button"
            endIcon={<ArrowForwardIcon />}
          >
            Learn more
          </Button>
        </Box>
      </Box>
      <Box className="landing-pg-image"></Box>
    </Box>
  );
};

export default Home;
