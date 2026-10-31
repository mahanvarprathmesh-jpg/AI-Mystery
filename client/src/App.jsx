import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateMystery from './pages/CreateMystery.jsx';
import NotFound from './pages/NotFound.jsx';
import InvestigationRoom from './pages/InvestigationRoom.jsx';
import Results from './pages/Results.jsx';

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<CreateMystery />} />
    <Route path="/case/:id" element={<InvestigationRoom />} />
    <Route path="/case/:id/results" element={<Results />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
