import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-detail-container">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <h1>{blog.title}</h1>
      <p>By {blog.author} | {new Date(blog.date).toLocaleDateString()}</p>
      <div className="blog-content">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;
