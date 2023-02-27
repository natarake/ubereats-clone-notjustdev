import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItems from "../components/DishListItems";
import RestaurantDetailsHeader from "../components/RestaurantDetailsHeader";

import { DataStore } from "aws-amplify";
import { Restaurant } from "./../models";
import { Dish } from "./../models";
import { useCartContext } from "../contexts/CartContext";

const RestaurantDetailsScreen = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id;

  const {
    setRestaurant: setCartRestaurant,
    cart,
    cartLists,
  } = useCartContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setCartRestaurant(null);
    // fetch the restaurant with the id
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish) => dish.restaurantID.eq(id))
      .then(setDishes)
      .catch((error) => console.log(error.message));
  }, [id]);

  useEffect(() => {
    setCartRestaurant(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => (
          <RestaurantDetailsHeader restaurant={restaurant} />
        )}
        data={dishes}
        renderItem={({ item }) => <DishListItems dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconImage}
        onPress={() => navigation.goBack()}
      />
      {cart && (
        <Pressable
          onPress={() => navigation.navigate("Cart")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Cart ({cartLists.length})</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconImage: {
    position: "absolute",
    top: 25,
    left: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 16,
    backgroundColor: "#ff8c52",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
