'use client';

import React, { useRef } from 'react';
import PostCard from './PostCard';
import { usePostContext } from '../context/post_context';

export default function Feed() {
  const { feedPosts, likePost } = usePostContext();
  const feedRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="bg-gray-400 shadow-md rounded-lg p-4 max-h-screen overflow-auto"
      ref={feedRef}
    >
      {feedPosts.length === 0 ? (
        <div className="text-center text-gray-500 mt-6">
          No posts available yet. Create a post to get started!
        </div>
      ) : (
        feedPosts.map((post) => (
          <PostCard key={post.id} post={post} handleLike={likePost} />
        ))
      )}
    </div>
  );
}
