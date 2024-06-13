import { useAuth } from "../../../context/authProvider";
import { Typography, Box, CardMedia } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import "./Favourites.css";

const Favourites = () => {
  const { userInfo } = useAuth();
  return (
    <Box className="favourites-container">
      <Box className="favourites-header">
        <Typography className="favourites-title">Favourite list</Typography>
        {userInfo.favourites?.rooms?.length === 0 ? (
          <Box className="favourites-empty-box">
            <SentimentDissatisfiedIcon className="favourites-empty-box-icon" />
            <Typography>No items added yet.</Typography>
          </Box>
        ) : (
          <Box className="favourites-list">
            {userInfo?.favourites?.rooms?.map((room) => {
              return (
                <Box key={room.id} className="favourites-item">
                  <CardMedia
                    component="img"
                    alt="room"
                    image={room.image}
                    title={room.name}
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Favourites;
