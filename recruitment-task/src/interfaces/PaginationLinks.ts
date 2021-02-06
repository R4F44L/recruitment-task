import { PageLimitPair } from "./PageLimitPair";

export interface PaginationLinks {
    first: PageLimitPair;
    prev: PageLimitPair;
    next: PageLimitPair;
    last: PageLimitPair;
}