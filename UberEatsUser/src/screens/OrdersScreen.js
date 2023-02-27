import { FlatList, StyleSheet, Text, View } from "react-native";
import orders from "../../assets/data/orders";
import OrderListItem from "../components/OrderListItem";

const OrdersScreen = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 19,
    textAlign: "center",
  },
});
