import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Cart, CartList } from "../models";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartLists, setCartLists] = useState([]);

  useEffect(() => {
    if (cart) {
      DataStore.query(CartList, (cl) => cl.cartID.eq(cart.id))
        .then(setCartLists)
        .catch((error) => console.log(error.message));
    }
  }, [cart]);

  useEffect(() => {
    DataStore.query(Cart, (c) =>
      c.restaurantID.eq(restaurant?.id).userID.eq(dbUser?.id)
    )
      .then((carts) => setCart(carts[0]))
      .catch((error) => console.log(error.message));
  }, [dbUser, restaurant]);

  const addDishToCart = async (dish, quantity) => {
    console.log(dish, quantity);
    // get existing cart or create new one
    let theCart = cart || (await createNewCart());
    // create a Cartlist item and save to data store
    const newItem = DataStore.save(
      new CartList({ quantity, Dish: dish, cartID: theCart.id })
    );
    setCartLists([...cartLists, newItem]);
  };

  const createNewCart = async () => {
    const newCart = await DataStore.save(
      new Cart({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setCart(newCart);
    return newCart;
  };

  return (
    <CartContext.Provider
      value={{ addDishToCart, setRestaurant, cart, cartLists, restaurant }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);
