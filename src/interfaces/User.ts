import { Address } from "cluster";
import { Company } from "./Company";
import { PostsPage } from "./PostsPage";

export interface User{
    id: string;
    username?: string;
    name?: string;
    email?: string;
    adress?: Address;
    phone?: string;
    website?: string;
    company?: Company;
    posts?: PostsPage;
}
export interface UserDetails{
    id: string;
    name?: string;
    posts?: PostsPage;
}