import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import FormPage from './components/FormPage';
import RequireSignedIn from './components/RequireSignedIn';
import SignupForm from './components/SignUp';
import { useAuth } from './AuthContext';

const App = () => {
  const { token, logout } = useAuth();

  return (
    <Router>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/employees">Employee List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/employees/add">Add Employee</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path="/employees" element={<RequireSignedIn><EmployeeList /></RequireSignedIn>} />
          <Route path="/employees/search" element={<RequireSignedIn><EmployeeList /></RequireSignedIn>} />
          <Route path="/employees/add" element={<RequireSignedIn><FormPage /></RequireSignedIn>} />
          <Route path="/employees/edit/:eid" element={<RequireSignedIn><FormPage /></RequireSignedIn>} />
          <Route path="/employees/:eid" element={<RequireSignedIn><EmployeeDetails /></RequireSignedIn>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;