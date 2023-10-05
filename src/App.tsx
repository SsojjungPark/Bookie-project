import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Novel from './pages/Novel';
import ReviewPost from './pages/ReviewPost';
import WriteReview from './pages/WirteReview';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/novel" element={<Novel />} />
      <Route path="/:category/:id" element={<ReviewPost />} />
      <Route path="/writeReview" element={<WriteReview />} />
    </Routes>
  );
}

export default App;
