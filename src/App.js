import { useContext } from 'react';
import './App.css';
import config from './config';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Header from './pages/header/Header';

function App() {
  document.title = config.appName;
  const { state } = useContext(AuthContext);

  console.log(state)
  if (!state.isLoggedIn) {
    return <Login />;
  }
  else {
    return <div>
      <Header />
    </div>
  }
}

export default App;
