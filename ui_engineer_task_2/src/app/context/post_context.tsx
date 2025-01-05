'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../types/post';
import { mockUsers } from '../data/mockData';

interface PostContextType {
  feedPosts: Post[];
  storyPosts: Record<number, Post[]>; // Group story posts by user ID
  addPost: (
    post: Partial<Post> & {
      type: 'feed' | 'story';
      text?: string;
      image?: string;
    }
  ) => void;
  likePost: (postId: number, liked: boolean) => void; // Adjusted to accept `liked`
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [storyPosts, setStoryPosts] = useState<Record<number, Post[]>>({});

  const addPost = (
    post: Partial<Post> & {
      type: 'feed' | 'story';
      text?: string;
      image?: string;
    }
  ) => {
    const newPost: Post = {
      id: Date.now(),
      user: post.user || mockUsers[0],
      timestamp: post.timestamp || new Date().toLocaleString(),
      content: post.text || post.content || '',
      image: post.image || '',
      likes: post.likes || 0,
    };

    if (post.type === 'feed') {
      setFeedPosts((prev) => [newPost, ...prev]);
    } else if (post.type === 'story') {
      setStoryPosts((prev) => {
        const userStories = prev[newPost.user.id] || [];
        return { ...prev, [newPost.user.id]: [...userStories, newPost] };
      });
    }
  };

  const likePost = (postId: number, liked: boolean) => {
    setFeedPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: liked ? post.likes + 1 : post.likes - 1, // Increment or decrement likes
            }
          : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ feedPosts, storyPosts, addPost, likePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
