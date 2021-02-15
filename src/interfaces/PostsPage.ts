import { PageMetaData } from "./PageMetaData";
import { PaginationLinks } from "./PaginationLinks";
import { Post } from "./Post";

export interface PostsPage{
    data: Post[];
    links: PaginationLinks;
    meta: PageMetaData;
}