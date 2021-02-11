import { Post } from "./Post";

export interface Comment{
    id: string;
    name: string;
    email: string;
    body: string;
    post: Post;
}

export interface CommentInput {
    comment : {

        name: string;
        email: string;
        body: string;
    }
}