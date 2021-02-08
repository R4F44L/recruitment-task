import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`mutation postComment($comment: CreateCommentInput!){
    createComment(input: $comment){
      name, email, body
    }
  }`;