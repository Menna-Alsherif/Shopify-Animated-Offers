// ************* Helper description *************

import { gql } from "@apollo/client";

export const GET_SCRIPTS = gql`
  {
    scriptTags(first: 10) {
      edges {
        node {
          id
          src
        }
      }
    }
  }
`;

export const INSERT_SCRIPT = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
        src
      }
      userErrors {
        field
        message
      }
    }
  }
`;
