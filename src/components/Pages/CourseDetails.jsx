import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CourseList.css'

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{course.title}</h1>
      <img src={course.image} alt={course.title} />
      <p><strong>Price:</strong> 
      ${course.price}</p>
      <p><strong>Introduction:</strong> {course.introduction}</p>
      <p><strong>Tools Covered:</strong> {course.toolsCovered.join(', ')}</p>
      <p><strong>Program Overview:</strong> {course.programOverview}</p>
    </div>
  );
}

export default CourseDetails;
