import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("Order", { id: order.id })}
        style={styles.container}
      >
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

        <View>
          <Text style={styles.name}>{order.Restaurant.name}</Text>
          <Text style={styles.price}>3 items &#8226; $38.45</Text>
          <Text>2 days ago &#8226; {order.status} </Text>
        </View>
      </Pressable>
      <View style={styles.separator} />
    </>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 15,
    borderRadius: 5,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
});
