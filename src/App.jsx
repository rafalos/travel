import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import Form from './components/Account/NewPlace/Form';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import Booking from './components/Account/Bookings/Booking';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />}>
            <Route path='bookings/' element={<BookingsPage />} />
            <Route path='bookings/:id' element={<Booking />} />
            <Route path='places/' element={<PlacesPage />} />
            <Route path='places/:id' element={<Form />} />
            <Route path='places/new' element={<Form />} />
          </Route>

          <Route path='/place/:id' element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
