'use client';

import React from 'react';
import CreatePost from './CreatePost';
import Stories from './Stories';
import Feed from './Feed';

export default function Layout() {
  return (
    <div className="space-y-6">
      <Stories />
      <CreatePost />
      <Feed />
    </div>
  );
}
