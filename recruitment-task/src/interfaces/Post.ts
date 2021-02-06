import { CommentsPage } from "./CommentsPage";
import { User } from "./User";

export interface Post{
    id: string;
    title: string;
    body: string;
    user: User;
    comments: CommentsPage;
}