import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import { UserProvider } from './pages/UserContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />

    
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<AddUser />} />
      </Routes>
    </UserProvider>
    </>
  );
}

export default App;
