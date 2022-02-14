import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import SideNav from './components/SideNav';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/Alert/AlertState';
import AuthState from './context/Auth/AuthState';
import NavState from './context/Navbar/NavState';
import Archive from './components/Archive';
import Bin from './components/Bin';
function App() {
  return (
    <AuthState>
      <AlertState>
        <NoteState>
          <NavState>
            <BrowserRouter>
              <Navbar />
              <Alert />
              <SideNav />
              <div className="container">

                <Routes>
                  <Route path="/" element={<Home path="/"/>} />
                  {/* <Route path="/about" element={<About />} /> */}
                  <Route path="/reminders" element={<Home path={"reminders"} />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/bin" element={<Bin />} />
                  <Route path="/login" element={<Auth mode='login' />} />
                  <Route path="/signup" element={<Auth mode='signup' />} />
                </Routes>
              </div>
            </BrowserRouter>
          </NavState>
        </NoteState>
      </AlertState>
    </AuthState>
  );
}

export default App;
