import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyCourses.css';

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
        if (!userId) throw new Error('User ID not found');

        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/mycourses/${userId}`);
        setMyCourses(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="my-courses-container">
      <h1>My Courses</h1>
      <div className="my-courses-list">
        {myCourses.map(course => (
          <div className="my-course-item" key={course._id}>
            <img src={course.image} alt={course.title} />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
