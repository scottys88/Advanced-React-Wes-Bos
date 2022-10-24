import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/CartState';
import formatMoney from '../lib/formatMoney';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser, CURRENT_USER_QUERY } from './User';

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
      __typename
    }
  }
`;

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export function CartItem({ cartItem, deleteCartItem }) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>{formatMoney(product.price * cartItem.quantity)}</p>
        <em>
          {cartItem.quantity} &times; {formatMoney(product.price)}
          &nbsp; each
        </em>
      </div>
      <button type="button" onClick={() => deleteCartItem(cartItem.id)}>
        Remove from cart
      </button>
    </CartItemStyles>
  );
}

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function Cart() {
  const me = useUser();
  const data = useCart();

  const [deleteCartItem, { loading, error }] = useMutation(
    DELETE_CART_ITEM_MUTATION
  );

  if (!me) {
    return <p>No user</p>;
  }

  const handleDeleteItemClick = (id) => {
    deleteCartItem({
      variables: {
        id,
      },
      update,
    });
  };

  return (
    <CartStyles open={data.cartOpen}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
        <CloseButton type="button" onClick={data.toggleCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            deleteCartItem={handleDeleteItemClick}
          />
        ))}
      </ul>
      <footer>{formatMoney(calcTotalPrice(me.cart))}</footer>
    </CartStyles>
  );
}
