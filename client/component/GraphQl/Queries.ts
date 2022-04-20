import { gql } from "@apollo/client";

export const loadUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;
