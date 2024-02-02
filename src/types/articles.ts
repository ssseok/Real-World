type AuthorProps = {
  author_id: number;
  bio?: string;
  profile_image: string;
  username: string;
};

interface ArticleProps {
  article_id: number;
  author: AuthorProps;
  body: string;
  created_at: string;
  description: string;
  favorite_count: number;
  is_favorited?: boolean;
  tag_list?: string[];
  title: string;
  updated_at: string;
}
