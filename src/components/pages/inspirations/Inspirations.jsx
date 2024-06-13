import React, { useState } from "react";
import { useAuth } from "../../../context/authProvider";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TextField,
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Inspirations.css";

const Inspirations = ({ ikeaData, setIkeaData, originalData, loading }) => {
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");

  const { userInfo, setUserInfo, toggleLoginWindow } = useAuth();

  const categories = ["Vintage", "Modern", "Contemporary", "Minimalist"];

  const handleSearch = () => {
    const isRoomPresent = originalData.current.rooms.some((room) => {
      return room.tags.includes(searchInput);
    });
    if (!isRoomPresent) {
      alert("No room found with this name, try another one!");
      return;
    }

    const updatedListByInput = originalData.current.rooms.filter((room) => {
      return room.tags.includes(searchInput);
    });

    setIkeaData({ rooms: updatedListByInput });
    setSearchInput("");
  };

  const handleCategorySelection = (category) => {
    if (!originalData.current.rooms) return;

    const updatedListByCategory = originalData.current.rooms.filter((room) => {
      return room.style === category;
    });

    setIkeaData({ rooms: updatedListByCategory });
  };

  const handleSortSelection = (selection) => {
    if (!ikeaData.rooms) return;

    if (selection === "popularity") {
      ikeaData.rooms.sort((a, b) => {
        return b.popularity - a.popularity;
      });
    } else if (selection === "newest added") {
      ikeaData.rooms.sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      });
    }
    setIkeaData({ rooms: ikeaData.rooms });
  };

  const handleFavouriteList = (id) => {
    const roomPrevieouslyAdded = userInfo?.favourites?.rooms?.some(
      (room) => room.id === id
    );
    if (roomPrevieouslyAdded) {
      alert("item already added to favourites");
      return;
    }

    const roomToAdd = ikeaData?.rooms?.find((room) => room.id === id);

    if (roomToAdd) {
      setUserInfo((prev) => ({
        ...prev,
        favourites: { rooms: [...prev.favourites.rooms, roomToAdd] },
      }));
      alert("added to favourites");
    }
  };

  return (
    <Box className="inspirations-container">
      <Box className="search-box">
        <TextField
          variant="outlined"
          autoComplete="off"
          placeholder="Search for room ideas..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="search-field"
          InputProps={{
            endAdornment: (
              <InputAdornment
                onClick={handleSearch}
                position="end"
                sx={{ color: "black", cursor: "pointer" }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box className="filter-box">
            {categories.map((category) => {
              return (
                <Button
                  key={category}
                  onClick={() => handleCategorySelection(category)}
                  className="category-button"
                >
                  {category}
                </Button>
              );
            })}
            <FormControl>
              <InputLabel className="sort-label" id="sort-select-label">
                Sort By
              </InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortInput}
                label="Sort By"
                onChange={(e) => setSortInput(e.target.value)}
                className="sort-select"
              >
                <MenuItem
                  onClick={() => handleSortSelection("popularity")}
                  value="popularity"
                >
                  Popularity
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortSelection("newest added")}
                  value="newest added"
                >
                  Newest Added
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="rooms-container">
            {ikeaData.rooms?.map((room) => {
              return (
                <Box key={room.id} className="room-item">
                  <CardMedia
                    component="img"
                    alt="room"
                    image={room.image}
                    title={room.name}
                    className="room-image"
                  />
                  <FavoriteIcon
                    onClick={() =>
                      userInfo?.userExists
                        ? handleFavouriteList(room.id)
                        : toggleLoginWindow()
                    }
                    className="favorite-icon"
                  />
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Inspirations;
