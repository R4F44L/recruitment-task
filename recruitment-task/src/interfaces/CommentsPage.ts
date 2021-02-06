import { PageMetaData } from "./PageMetaData";
import { PaginationLinks } from "./PaginationLinks";
import { Comment } from "./Comment";

export interface CommentsPage{
    data: Comment[];
    links: PaginationLinks;
    meta: PageMetaData;
}