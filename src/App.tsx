import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionExplorerPage from './pages/MissionExplorerPage';
import MissionDetailPage from './pages/MissionDetailPage';
import CategoryPage from './pages/CategoryPage';
import StageRoadmapPage from './pages/StageRoadmapPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorer" element={<MissionExplorerPage />} />
            <Route path="/missions/:id" element={<MissionDetailPage />} />
            <Route path="/moon" element={<CategoryPage category="moon" />} />
            <Route path="/mars" element={<CategoryPage category="mars" />} />
            <Route path="/deep-space" element={<CategoryPage category="deep-space" />} />
            <Route path="/maps" element={<StageRoadmapPage moduleKey="maps" />} />
            <Route path="/3d-viewer" element={<StageRoadmapPage moduleKey="3d-viewer" />} />
            <Route path="/learn" element={<StageRoadmapPage moduleKey="learn" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
