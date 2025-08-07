import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BookingManager from './components/BookingManager';
import TransportManager from './components/TransportsManager'; // Assuming you have a TransportManager component

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/BookingManager" element={<BookingManager />} />
		<Route path="/TransportManager" element={<TransportManager />} />
        <Route path="*" element={<Login />} /> {/* Redirect các đường không hợp lệ về Login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
