import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RestaurantItem from "../components/RestaurantItem";
import { DataStore } from "aws-amplify";
import { Restaurant } from "./../models";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  // const fetchRestaurants = async () => {
  //   const results = await DataStore.query(Restaurant);
  //   setRestaurants(results);
  // };

  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
    // fetchRestaurants();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
