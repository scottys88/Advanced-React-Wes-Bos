import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import useForm from '../lib/useForm';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Get existing product
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  // Get mutation to update product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    <DisplayError error={error} />;
  }

  const { Product } = data;

  // Form to handle the updates

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
        // clearForm();
        //     // Go to product
        // Router.push({
        //   pathname: `/product/${res.data.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={loading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="price"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </label>
        <button type="submit">Update product</button>
      </fieldset>
    </Form>
  );
}
