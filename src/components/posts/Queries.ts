import { gql } from "@apollo/client";

export const GET_POST_BY_ID = gql`query getPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      body
      comments {
        data {
          id
          name
          email
          body
        }
      }
      user {
        username
      }
    }
  }
`;

export const DELETE_POST = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id)
}`;

export const CREATE_POST = gql`mutation createPost($post: CreatePostInput!){
  createPost(input: $post){
    title, body
  }
}`;