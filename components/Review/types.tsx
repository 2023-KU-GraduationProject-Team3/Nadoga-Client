export interface ReviewProps {
  review_id: number;
  user_name: string;
  rating: number;
  content: string;
  profile_url?: string;
}

export interface ReviewSectionProps {
  reviews: Array<ReviewProps>;
}
