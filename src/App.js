import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Navbar from "./components/navbar/NavBar";
import Inspirations from "./components/pages/inspirations/Inspirations";
import Favourites from "./components/pages/favourites/Favourites";
import AuthForm from "./components/authform/AuthForm";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const originalData = useRef([]);

  const [ikeaData, setIkeaData] = useState({ rooms: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("MockUpDataIkea.json");
        const data = await response.json();
        originalData.current = data;
        const shuffledRooms = data.rooms.sort(() => Math.random() - 0.5);
        setIkeaData({ rooms: shuffledRooms });
        setLoading(false);
      } catch (error) {
        alert("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/inspirations"
          element={
            <Inspirations
              ikeaData={ikeaData}
              setIkeaData={setIkeaData}
              originalData={originalData}
              loading={loading}
            />
          }
        />
        <Route element={<PrivateRoute />}>
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
      <AuthForm />
    </Router>
  );
};

export default App;
