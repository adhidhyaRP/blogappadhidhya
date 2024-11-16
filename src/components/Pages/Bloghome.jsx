import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="homepage-container">
      <header className="header">
        
        <h1>Welcome to TechEdge: Your Gateway to IT Excellence</h1>
<p>At TechEdge, we believe in empowering individuals with the knowledge and skills required to thrive in the rapidly evolving world of Information Technology. Whether you're just starting your journey or looking to advance your career, our platform offers a wealth of resources, insightful blogs, and top-tier courses designed to keep you at the forefront of the IT industry.
</p>
<h1>Explore Our Blog</h1>
<p>
Dive into our expertly curated blogs that cover the latest trends, advancements, and best practices in IT. From deep dives into artificial intelligence and machine learning to comprehensive guides on software development and data science, our blog is your go-to source for staying informed and inspired.</p>      </header>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div className="blog-item" key={blog._id} onClick={() => handleBlogClick(blog._id)}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-info">
              <h2>{blog.title}</h2>
              <p>By {blog.author} | {new Date(blog.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
