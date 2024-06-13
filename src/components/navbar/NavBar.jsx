import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../../assets/ikea_logo.png";
import "./NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo, toggleLoginWindow } = useAuth();

  return (
    <AppBar position="absolute" className="navbar">
      <Toolbar>
        <Box component="img" src={logo} alt="IKEA Logo" className="logo" />

        <Box className="menu-container">
          <MenuItem onClick={() => navigate("/")}>
            <Typography>Home</Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate("/inspirations")}>
            <Typography>Inspirations</Typography>
          </MenuItem>
          {userInfo?.userExists && (
            <MenuItem onClick={() => navigate("/favourites")}>
              <IconButton className="favorite-icon">
                <FavoriteIcon />
              </IconButton>
            </MenuItem>
          )}
          <MenuItem onClick={toggleLoginWindow}>
            <IconButton className="account-icon">
              <AccountCircle />
            </IconButton>
            <Typography>
              {userInfo?.userExists ? " Log out" : "Log in"}
            </Typography>
          </MenuItem>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
