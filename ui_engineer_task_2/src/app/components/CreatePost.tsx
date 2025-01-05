'use client';

import React, { useState } from 'react';
import { usePostContext } from '../context/post_context';

export default function CreatePost() {
  const { addPost } = usePostContext();
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<'feed' | 'story'>('feed');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!text.trim()) return;

    addPost({
      type,
      text,
      image: type === 'feed' ? image || undefined : undefined,
    });

    setText('');
    setImage(null);
    setType('feed'); // Reset to default type
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Styled Radio Buttons */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="feed"
            checked={type === 'feed'}
            onChange={() => setType('feed')}
            className="appearance-none w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
          />
          <span className="text-gray-700">Feed Post</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="story"
            checked={type === 'story'}
            onChange={() => setType('story')}
            className="appearance-none w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
          />
          <span className="text-gray-700">Story Post</span>
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {type === 'feed' && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )}
      {type === 'feed' && image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Post
      </button>
    </div>
  );
}
