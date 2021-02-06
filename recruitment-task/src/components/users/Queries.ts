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


export const GET_USER_BY_ID = gql(`
    query getUsers($id: ID!) {
        user(id: $id) {
            id
      name
    posts {
      data{
        id,title
      }
    }
    }
}
`);