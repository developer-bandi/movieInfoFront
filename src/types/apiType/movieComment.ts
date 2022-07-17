export interface MovieCommentApiData {
  id: number;
  content: string;
  createdAt: Date;
  User: {
    id: number;
    nick: string;
  };
}
