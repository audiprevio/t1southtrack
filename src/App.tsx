// @ts-nocheck
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import NavBar from './components/NavBar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PenguinComponentTwo from './components/PenguinComponentTwo';
import AddPenguinForm from './components/AddPenguinForm';
import PublicLayout from './Layouts/PublicLayout'; // Import your PublicLayout component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path=""
          element={<PublicLayout />} // Use PublicLayout for protected routes
        >
          <Route index element={<PenguinComponentTwo />} />
          <Route path="/add-penguin" element={<AddPenguinForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
