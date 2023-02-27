import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";

import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
Amplify.configure({ ...config, Analytics: { disabled: true } });

import AuthContextProvider from "./src/contexts/AuthContext";
import CartContextProvider from "./src/contexts/CartContext";

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <CartContextProvider>
          <RootNavigator />
        </CartContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
