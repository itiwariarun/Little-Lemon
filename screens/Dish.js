import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Pressable,
} from "react-native";
const Dish = ({ route }) => {
  const { name, price, description, image } = route.params;

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require("../img/littleLemonLogo.png")}
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
    </View>
    <View style={styles.item}>
     
    <Image
      style={styles.itemImage}
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
      }}
    />
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>

   
  </View>
  </SafeAreaView>
  );
};

export default Dish;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 42,
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },

  item: {
    flex:1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#495e57",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 60,
    color: "#000000",
    paddingVertical: 20,
  },
  description: {
    fontSize:20,
    color: "#495e57",
    paddingHorizontal: 10,
    lineHeight:26,

  },
  price: {
    fontSize: 60,
    textAlign:'center',
    color: "#495e57",
    position: 40,
  },
  itemImage: {
    width: 410,
    height: 250,
  },

  delivery: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 15,
  },
});