import { FlatList, StyleSheet } from "react-native";
import orders from "../../assets/data/orders";
import restaurants from "../../assets/data/restaurants";
import CartListItem from "../components/CartListItem";
import OrderDetailsHeader from "../components/OrderDetailsHeader";

const order = orders[0];
const restaurant = restaurants[0];

const OrderDetailsScreen = () => {
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={restaurant.dishes}
      renderItem={({ item }) => <CartListItem cartList={item} />}
    />
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
