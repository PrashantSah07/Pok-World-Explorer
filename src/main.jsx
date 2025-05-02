import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext .jsx';
import { ComparePokemonProvider } from './context/ComparePokemonContext.jsx';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App.jsx';
import DetailView from './pages/DetailView.jsx';
import FavoritePokemon from './pages/FavoritePokemon.jsx';
import ComparePokemon from './pages/ComparePokemon.jsx'

createRoot(document.getElementById('root')).render(
  <ComparePokemonProvider>
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
          <Route path="/favorite-Pokemon" element={<FavoritePokemon />} />
          <Route path="/compare-pokemon" element={<ComparePokemon />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  </ComparePokemonProvider>
);
