import './App.css';
import config from './config';
import Login from './pages/Login';

function App() {
  document.title = config.appName;
  return <Login />;
}

export default App;
