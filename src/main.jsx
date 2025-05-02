import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext .jsx';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App.jsx';
import DetailView from './pages/DetailView.jsx';
import FavoritePokemon from './pages/FavoritePokemon.jsx';

createRoot(document.getElementById('root')).render(
  <FavoritesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon/:id" element={<DetailView />} />
        <Route path="/favorite-Pokemon" element={<FavoritePokemon />} />
      </Routes>
    </BrowserRouter>
  </FavoritesProvider>
);
