import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Forgotpassword from './components/Auth/Forgotpassword';
import Resetpassword from './components/Auth/Resetpassword';
import Register from './components/Auth/Register';
// import Availablebooks from './components/Home/Availablebooks';
// import Addtocart from './components/Home/Addtocart';
// import Purchasedbooks from './components/Home/Purchasedbooks';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Bloghome from './components/Pages/Bloghome';
import BlogDetail from './components/Pages/BlogDetail';
import CourseList from './components/Pages/CourseList';
import CourseDetails from './components/Pages/CourseDetails';
import MyCourses from './components/Pages/Mycourses';
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("authorized");
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:id/:token" element={<Resetpassword />} />

        <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
          {/* {/* <Route path="availablebooks" element={<ProtectedRoute element={< Availablebooks/>} />} /> */}
          <Route path="" element={<ProtectedRoute element={<Bloghome />} />} />
          <Route path="/blog/:id" element={<ProtectedRoute element={<BlogDetail />} /> } />
          <Route path="/course" element={<ProtectedRoute element={<CourseList />} /> } />
          <Route path="/course/:id" element={<ProtectedRoute element={<CourseDetails />} /> } />
          <Route path="/mycourses" element={<ProtectedRoute element={<MyCourses />} /> } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
