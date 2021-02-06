import { gql } from "@apollo/client";

export const GET_USERS = gql(`
    query getUsers {
        users {
        data {
            id
            name
            username
            email
            phone
            website
            company {
            name,
            catchPhrase,
            bs
            }
        }
        }
    }

`);