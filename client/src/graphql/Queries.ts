import { gql } from "@apollo/client";

export const GET_USER_REPOSITORIES_QUERY = gql`
  query getRepositoriesFromUserName($user_name: String!) {   
    user(login: $user_name) {
      id
      repositories(first: 100) {
        nodes {
          isFork
          name
          description
          url
        }
      }
      starredRepositories(first: 100) {
        nodes {
          isFork
          name
          description
          url
        }
      }
      avatarUrl
    }
  }
`;