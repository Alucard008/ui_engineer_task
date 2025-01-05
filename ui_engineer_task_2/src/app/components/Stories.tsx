'use client';

import React, { useEffect, useState } from 'react';
import { usePostContext } from '../context/post_context';
import { Post } from '../types/post';
import { motion } from 'framer-motion';
import StoryModal from './StoryModal';

const STORY_DURATION = 30000; // 30 seconds per story

export default function Stories() {
  const { storyPosts } = usePostContext();
  const [activeStories, setActiveStories] = useState<Record<number, number>>(
    {}
  ); // Track active story index for each user
  const [progress, setProgress] = useState<Record<number, number>>({});
  const [selectedStory, setSelectedStory] = useState<Post | null>(null); // To track selected story

  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(storyPosts).forEach((userId) => {
        const numericUserId = parseInt(userId, 10);

        if (storyPosts[numericUserId]) {
          const currentIndex = activeStories[numericUserId] || 0;

          if (progress[numericUserId] >= 100) {
            // Move to the next story or remove the current one
            if (currentIndex < storyPosts[numericUserId].length - 1) {
              // Move to next story
              setActiveStories((prev) => ({
                ...prev,
                [numericUserId]: currentIndex + 1,
              }));
              setProgress((prev) => ({ ...prev, [numericUserId]: 0 }));
            } else {
              // Remove the oldest story for this user
              storyPosts[numericUserId].shift();
              setActiveStories((prev) => ({ ...prev, [numericUserId]: 0 }));
              setProgress((prev) => ({ ...prev, [numericUserId]: 0 }));

              if (storyPosts[numericUserId].length === 0) {
                delete storyPosts[numericUserId];
              }
            }
          } else {
            // Increment the progress for the current story
            setProgress((prev) => ({
              ...prev,
              [numericUserId]: (prev[numericUserId] || 0) + 3.33, // Increment progress
            }));
          }
        }
      });
    }, 1000); // 1-second interval for smoother updates

    return () => clearInterval(interval);
  }, [storyPosts, activeStories, progress]);

  useEffect(() => {
    // Reset progress when new stories are added
    Object.keys(storyPosts).forEach((userId) => {
      const numericUserId = parseInt(userId, 10);

      if (!progress[numericUserId]) {
        setActiveStories((prev) => ({ ...prev, [numericUserId]: 0 }));
        setProgress((prev) => ({ ...prev, [numericUserId]: 0 }));
      }
    });
  }, [storyPosts]);

  if (Object.keys(storyPosts).length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No stories available yet.
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto flex space-x-4">
        {Object.entries(storyPosts).map(([userId, stories]) => {
          const numericUserId = parseInt(userId, 10);
          const storyArray = stories as Post[];
          const currentIndex = activeStories[numericUserId] || 0;

          return (
            <div
              key={numericUserId}
              className="relative flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => setSelectedStory(storyArray[currentIndex])} // Open story in modal
            >
              <motion.div
                className="relative w-16 h-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={storyArray[currentIndex].user.profilePic}
                  alt={storyArray[currentIndex].user.name}
                  className="w-full h-full rounded-full border-2 border-blue-500"
                />
              </motion.div>

              {/* Timer Bar */}
              <motion.div
                className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: '100%' }} // Start at full width
                animate={{
                  width: `${100 - (progress[numericUserId] || 0)}%`, // Decrease width as progress increases
                }}
                transition={{
                  duration: 1,
                  ease: 'linear',
                }}
              >
                <div className="h-full bg-blue-500"></div>
              </motion.div>

              <p className="text-sm mt-2">
                {storyArray[currentIndex].user.name}
              </p>
              <p className="text-xs text-gray-500">
                {currentIndex + 1}/{storyArray.length} Stories
              </p>
            </div>
          );
        })}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}
