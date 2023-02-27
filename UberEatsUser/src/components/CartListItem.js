import { StyleSheet, Text, View } from "react-native";

const CartListItem = ({ cartList }) => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <Text>{cartList.quantity}</Text>
        </View>
        <Text style={styles.dishName}>{cartList.Dish.name}</Text>
        <Text style={styles.price}>${cartList.Dish.price}</Text>
      </View>
    </>
  );
};

export default CartListItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
  dishName: {
    fontWeight: "600",
  },
  price: {
    marginLeft: "auto",
  },
});
