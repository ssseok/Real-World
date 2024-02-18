export interface User {
  user_id?: number;
  username?: string;
  access_token?: string;
  refresh_token?: string;
  profile_image?: string;
  bio?: string;
  email?: string;
  password?: string;
  following?:boolean;
}
