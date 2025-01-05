import './globals.css';

import { PostProvider } from './context/post_context';
export const metadata = {
  title: 'Social Media Feed',
  description: 'A responsive social media feed with real-time updates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <PostProvider>{children}</PostProvider>
      </body>
    </html>
  );
}
