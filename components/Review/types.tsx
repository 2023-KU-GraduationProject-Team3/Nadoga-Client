export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  gender: number;
  age: number;
  genre: string;
}

export interface ReviewProps {
  review_id: number;
  user: User;
  rating: number;
  content: string;
  profile_url?: string;
}

export interface ReviewSectionProps {
  reviews: Array<ReviewProps>;
}
