export interface User {
    id: number;
    name: string;
    profilePic: string;
  }
  
  export interface Post {
    id: number;
    user: User;
    timestamp: string;
    content: string;
    image?: string;
    likes: number;
  }
  