import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "la_cart_v1";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, quantity = 1, size = null } = action;
      const key = `${product.id}::${size || "_"}`;
      const existing = state.items.find((i) => i.key === key);
      const items = existing
        ? state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [
            ...state.items,
            {
              key,
              product_id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              size,
              quantity,
            },
          ];
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.key !== action.key) };
    case "UPDATE_QTY":
      return {
        items: state.items
          .map((i) =>
            i.key === action.key ? { ...i, quantity: Math.max(1, action.quantity) } : i
          ),
      };
    case "CLEAR":
      return { items: [] };
    case "REPLACE":
      return { items: action.items || [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "REPLACE", items: JSON.parse(raw) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo(() => {
    const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = state.items.reduce((s, i) => s + i.quantity, 0);
    return {
      items: state.items,
      count,
      subtotal,
      open,
      setOpen,
      add: (product, opts) => {
        dispatch({ type: "ADD", product, quantity: opts?.quantity || 1, size: opts?.size || null });
        setOpen(true);
      },
      remove: (key) => dispatch({ type: "REMOVE", key }),
      updateQty: (key, quantity) => dispatch({ type: "UPDATE_QTY", key, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
