import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { DataStore } from "aws-amplify";
import { Dish } from "../models";
import { useCartContext } from "../contexts/CartContext";

const DishDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [dish, setDish] = useState([]);
  const { addDishToCart } = useCartContext();

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    if (id)
      DataStore.query(Dish, id)
        .then(setDish)
        .catch((error) => console.log(error));
  }, [id]);

  const onAddtoCart = async () => {
    await addDishToCart(dish, quantity);
    navigation.goBack();
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  if (!dish) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FontAwesome name="arrow-left" size={24} color="black" />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {dish.description}
      </Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={20}
          color="red"
          onPress={handleDecrease}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={20}
          color="green"
          onPress={handleIncrease}
        />
      </View>

      <Pressable onPress={onAddtoCart} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to cart (${getTotal()})
        </Text>
      </Pressable>
    </View>
  );
};

export default DishDetailsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  name: {
    fontWeight: "700",
    fontSize: 25,
    marginVertical: 10,
  },
  desc: {
    color: "gray",
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 15,
    color: "#696969",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
});
