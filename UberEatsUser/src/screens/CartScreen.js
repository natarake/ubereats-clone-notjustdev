import { FlatList, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CartListItem from "../components/CartListItem";
import { useCartContext } from "../contexts/CartContext";

const CartScreen = () => {
  const { restaurant, cartLists } = useCartContext();

  return (
    <View style={styles.page}>
      <FontAwesome name="arrow-left" size={24} color="black" />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.text}>Your Items</Text>

      <FlatList
        data={cartLists}
        renderItem={({ item }) => <CartListItem cartList={item} />}
      />

      <View style={styles.separator} />
      <View style={{ flex: 1 }}>
        <View style={styles.totalRow}>
          <Text>Subtotal</Text>
          <Text>$18.99</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Total</Text>
          <Text>$18.99</Text>
        </View>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Create Order</Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 24,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 19,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
    margin: "auto",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    color: "#525252",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "black",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
