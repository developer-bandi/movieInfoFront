export interface MovieCommentApiData {
  id: number;
  content: string;
  createdAt: string;
  User: {
    id: number;
    nick: string;
  };
}
