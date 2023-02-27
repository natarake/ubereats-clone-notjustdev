import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RestaurantDetailsHeader = ({ restaurant }) => {
  return (
    <View>
      <Image
        source={{
          uri: restaurant.image,
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            ${restaurant.deliveryFee?.toFixed(1)} &#8226;{" "}
            {restaurant.rating?.toFixed(1)}
          </Text>
          <FontAwesome name="star" size={14} color="gold" />
        </View>
      </View>
      <Text style={styles.menu}>Menu</Text>
    </View>
  );
};

export default RestaurantDetailsHeader;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  titleContainer: {
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    color: "#525252",
    fontSize: 15,
    marginRight: 2,
  },
  menu: {
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#525252",
  },
});
