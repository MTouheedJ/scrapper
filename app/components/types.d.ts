export type searchResponse = {
  id: string;
  createdTime: string;
  Username: string;
  Followers: number;
  Likes: number;
  Profile_URL: string;
  Country: string;
  Hashtag: string;
  Source: string;
  Email: {
    error: string;
  };
  Phone: {
    error: string;
  };
};
