import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_IMAGE =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Restaurant", { id: restaurant.id });
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <Image
        source={{
          uri: restaurant.image.startsWith("http")
            ? restaurant.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            ${restaurant.deliveryFee.toFixed(2)} · {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime} min
          </Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingView: {
    height: 25,
    width: 25,
    borderRadius: 30,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 12,
  },
});
