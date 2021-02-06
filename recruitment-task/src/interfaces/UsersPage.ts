import { PageMetaData } from "./PageMetaData";
import { PaginationLinks } from "./PaginationLinks";
import { User } from "./User";

export interface UsersPage{
    data: User[];
    links: PaginationLinks;
    meta: PageMetaData;
}