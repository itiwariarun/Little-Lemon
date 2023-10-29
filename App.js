import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useMemo, useReducer } from "react";
import { Alert } from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Dish from "./screens/Dish";

import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./AuthContext";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const initialState = {
  isLoading: true,
  isOnboardingCompleted: false,
};

function reducer(prevState, action) {
  switch (action.type) {
    case "onboard":
      return {
        ...prevState,
        isLoading: false,
        isOnboardingCompleted: action.isOnboardingCompleted,
      };
    default:
      return prevState;
  }
}

export default function App({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        const isOnboardingCompleted = !!getProfile; // Check if profile data exists
        dispatch({ type: "onboard", isOnboardingCompleted });
      } catch (e) {
        console.error(e);
      }
    };

    checkOnboardingStatus();
  }, []);

  const authContext = useMemo(() => {
    return {
      onboard: async (data) => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
        } catch (e) {
          console.error(e);
        }

        dispatch({ type: "onboard", isOnboardingCompleted: true });
      },
      update: async (data) => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
          Alert.alert("Success", "Successfully saved changes!");
        } catch (e) {
          console.error(e);
        }
      },
      logout: async () => {
        try {
          await AsyncStorage.clear();
        } catch (e) {
          console.error(e);
        }

        dispatch({ type: "onboard", isOnboardingCompleted: false });
      },
    };
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar backgroundColor="#f4ce14" />
      <NavigationContainer>
        <Stack.Navigator
        
        >
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen name="Home" component={Home}   options={({ route }) => ({
            headerShown: route.params?.showHeader ?? false, // Conditionally hide the header
          })}/>
                  <Stack.Screen name="Dish" component={Dish}/>
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen name="Onboarding" component={Onboarding}   options={({ route }) => ({
              headerShown: route.params?.showHeader ?? false, // Conditionally hide the header
            })}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
