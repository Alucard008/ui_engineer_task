'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../types/post';

export default function StoryModal({
  story,
  onClose,
}: {
  story: Post;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src={story.user.profilePic}
            alt={story.user.name}
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
          />
          <h3 className="text-lg font-bold">{story.user.name}</h3>
          <p className="text-gray-500 text-sm">{story.timestamp}</p>
          <p className="mt-4 text-center">{story.content}</p>
        </div>
      </motion.div>
    </div>
  );
}
