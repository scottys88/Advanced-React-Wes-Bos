import React, { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen((isOpen) => !isOpen);
  }

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  const all = useContext(LocalStateContext);

  return all;
}
