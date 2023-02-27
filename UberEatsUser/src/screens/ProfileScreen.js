import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { useAuthContext } from "../contexts/AuthContext";
import { User } from "../models";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { sub, dbUser, setDbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "");
  const [long, setLong] = useState(dbUser?.long + "" || "");

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          lat: parseFloat(lat),
          long: parseFloat(long),
          sub,
        })
      );
      setDbUser(user);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.address = address;
        updated.lat = parseFloat(lat);
        updated.long = parseFloat(long);
      })
    );
    setDbUser(user);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <AntDesign
          name="back"
          size={24}
          color="white"
          onPress={() => setOpen(false)}
        />
        <Text style={styles.headerText}>Edit Account</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: "https://png.pngitem.com/pimgs/s/218-2182769_faceless-male-avatar-in-suit-clip-arts-male.png",
            }}
            style={styles.image}
          />
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={24}
              color="#3b444b"
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Please update user information to</Text>
          <Text style={styles.text}>begin using the app</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Full Name</Text>
          <TextInput
            style={styles.textinput}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <Text style={styles.title}>Address</Text>
          <TextInput
            style={styles.textinput}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <Text style={styles.title}>Latitude</Text>
          <TextInput
            style={styles.textinput}
            value={lat}
            onChangeText={setLat}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <Text style={styles.title}>Longitude</Text>
          <TextInput
            style={styles.textinput}
            value={long}
            onChangeText={setLong}
            placeholder="Longitude"
            keyboardType="numeric"
          />
          <Pressable onPress={onSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.signOutRow} onPress={() => Auth.signOut()}>
        <MaterialCommunityIcons name="logout-variant" size={24} color="gray" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#ff8c52",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    marginLeft: 16,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    position: "relative",
  },
  imageView: {
    backgroundColor: "#ff8c52",
    height: 64,
    width: 64,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 30,
  },
  iconContainer: {
    position: "absolute",
    top: -4,
    right: -4,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  text: {
    color: "rgb(156, 163, 175)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  detailsContainer: {
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: "rgb(229, 231, 235)",
  },
  itemContainer: {
    padding: 8,
  },
  specialContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  specialFlex: {
    flex: 1,
  },
  specialText: {
    fontSize: 12,
    color: "rgb(22, 163, 74)",
    fontWeight: "500",
  },
  title: {
    color: "rgb(156, 163, 175)",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
  },
  textinput: {
    fontWeight: "500",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "rgb(107, 114, 128)",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 16,
    backgroundColor: "#ff8c52",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  signOutRow: {
    marginHorizontal: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  signOutText: {
    color: "rgb(34, 197, 94)",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
});
