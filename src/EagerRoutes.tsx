import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AntiHeroesPage from "./pages/AntiHeroesPage";
import HeroesPage from "./pages/HeroesPage";
import VillainsPage from "./pages/VillainsPage";

const EagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/anti-heroes" element={<AntiHeroesPage />} />
      <Route path="/heroes" element={<HeroesPage />} />
      <Route path="/villains" element={<VillainsPage />} />
    </Routes>
  );
};

export default EagerRoutes;
