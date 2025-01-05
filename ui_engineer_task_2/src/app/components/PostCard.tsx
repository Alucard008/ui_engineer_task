'use client';
import React, { useState } from 'react';
import { Post } from '../types/post';

export default function PostCard({
  post,
  handleLike,
}: {
  post: Post;
  handleLike: (id: number, liked: boolean) => void; // Include `liked` parameter to determine action
}) {
  const [userLiked, setUserLiked] = useState(false); // Track if the user has liked this post

  const handleLikeClick = () => {
    if (!userLiked) {
      handleLike(post.id, true); // Like the post
    } else {
      handleLike(post.id, false); // Unlike the post
    }
    setUserLiked(!userLiked); // Toggle the liked state
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={post.user.profilePic}
          alt={post.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <h3 className="text-lg font-bold">{post.user.name}</h3>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="Post" className="w-full rounded-md mb-4" />
      )}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLikeClick}
          className={`font-semibold ${
            userLiked ? 'text-red-500' : 'text-blue-500'
          }`}
        >
          {userLiked ? 'Unlike' : 'Like'}
        </button>
        <span>{post.likes} Likes</span>
      </div>
    </div>
  );
}
