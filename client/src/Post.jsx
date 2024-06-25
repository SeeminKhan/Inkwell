import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt={title} className="object-cover w-full h-64" />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/post/${_id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="mr-2">By {author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
