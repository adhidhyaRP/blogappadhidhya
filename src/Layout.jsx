import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import './Layout.css'
const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authorized");
    navigate('/login');
  };

  return (
    <div style={{position:"absolute",top:0,left:0,right:0}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><h1>TECH-EDGE</h1></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">BLOG</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/course">Available Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mycourses">My Courses</Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-success"
              style={{ float: 'right', width: '130px', height: '40px', borderRadius: '10px' }}
              onClick={logout}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
