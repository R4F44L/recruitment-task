import { CommentsPage } from "./CommentsPage";
import { User } from "./User";

export interface Post{
    id: string;
    title: string;
    body: string;
    user: User;
    comments: CommentsPage;
}

export interface PostListItem {
    id: string;
    title: string;
}

export interface PostDetails{
    id: string;
    title: string;
    body: string;
    comments: {data: Array<{id: string, name: string, email: string, body: string}>};
    user: {username : string};
}