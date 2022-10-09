import { gql, useQuery } from '@apollo/client';
import React from 'react';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        #   Query cart when have it
      }
    }
  }
`;

export function useUser() {
  const data = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}

export default function User() {
  return <div>User</div>;
}
