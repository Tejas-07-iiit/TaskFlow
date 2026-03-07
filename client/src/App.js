import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveComponent } from './redux/componentSlice';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Home from './components/Home';
import Task from './components/Task';
import Admin from './components/Admin';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setActiveComponent("home"));
    }
  }, [dispatch]);

  return (
    <>
      <Login />
      <Register />
      <Home />
      <Profile />
      <Task />
      <Admin />
    </>
  );
}

export default App;