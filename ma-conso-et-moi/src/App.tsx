import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BottomNavBar } from './components/BottomNavBar';
import { ToastContainer } from './components/Toast';
import { Home } from './pages/Home';
import { Challenges } from './pages/Challenges';
import { ChallengeDetail } from './pages/ChallengeDetail';
import { Actions } from './pages/Actions';
import { Rewards } from './pages/Rewards';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNavBar />
    </BrowserRouter>
  );
}
