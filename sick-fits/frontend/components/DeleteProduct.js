import { useMutation } from '@apollo/client';
import { ApolloCache } from '@apollo/client/cache';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error, data }] = useMutation(
    DELETE_PRODUCT_MUTATION
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm('Are you sure you want to delete this item?')) {
          // Delete
          const res = await deleteProduct({
            variables: {
              id,
            },
            update,
          }).catch((err) => alert(err.message));
          console.log('Delete');
          console.log(res);
        }
      }}
    >
      {children}
    </button>
  );
}
