import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost} className="max-w-2xl mx-auto p-4 bg-zinc-950 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
      />
     <Editor
        value={content}
        onChange={setContent}
        className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="w-full mb-4"
        theme="snow"
      />
      <button
        type="submit"
        className="w-full p-2 bg-cyan-900 hover:bg-cyan-950 text-white font-bold rounded-md"
        style={{ marginTop: '5px' }}
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
