import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DishListItems = ({ dish }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Dish", { id: dish.id });
  };
  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {dish.description}
        </Text>
        <Text style={styles.price}>${dish.price}</Text>
      </View>

      {dish.image && (
        <Image
          source={{ uri: dish.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
};

export default DishListItems;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  desc: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
  },
  image: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 5,
  },
});
