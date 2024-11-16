import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CourseList.css';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handlePurchase = async (courseId, amount) => {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

    if (!userId) {
      alert('User is not logged in.');
      return;
    }

    try {
      const { data: order } = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/payment/order`, {
        amount,
        currency: 'INR',
        courseId,
        userId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAYKEY,
        amount: order.amount,
        currency: order.currency,
        name: 'IT Courses',
        description: 'Purchase Course',
        order_id: order.id,
        handler: async (response) => {
          await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/payment/success`, {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
          });

          alert('Payment successful, course added to your list.');
        },
        prefill: {
          name: 'Your Name', // Replace with actual name if available
          email: 'Your Email', // Replace with actual email if available
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <div className="course-item" key={course._id}>
            <img src={course.image} alt={course.title} />
            <h2>{course.title}</h2>
            <p>₹{course.price}</p>
            <button onClick={() => handlePurchase(course._id, course.price)}>
              Purchase
            </button>
            <Link to={`/course/${course._id}`} className="details-button">
              Course Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
