import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokedex/:name" element={<PokemonDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
