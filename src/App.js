import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Auth from './components/Auth';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/Alert/AlertState';
import AuthState from './context/Auth/AuthState';
function App() {
  return (
    <AuthState>
      <AlertState>
        <NoteState>

          <BrowserRouter>
            <Navbar />
            <Alert />
            <div className="container">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Auth mode='login' />} />
                <Route path="/signup" element={<Auth mode='signup' />} />
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
       </AlertState>
      </AuthState>
      );
}

      export default App;
