/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TextInput
} from "react-native";

import InAppBilling from "react-native-billing";

const defaultState = {
  productDetails: null,
  transactionDetails: null,
  consumed: false,
  error: null
};

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    productId: "android.test.purchased",
    ...defaultState
  };

  resetState = () => {
    this.setState(defaultState);
  };

  getProductDetails = async () => {
    console.log("getProductDetails");
    try {
      this.resetState();
      await InAppBilling.open();
      const details = await InAppBilling.getProductDetails(
        this.state.productId
      );
      await InAppBilling.close();
      this.setState({ productDetails: JSON.stringify(details) });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
      await InAppBilling.close();
    }
  };

  purchaseProduct = async () => {
    console.log("purchaseProduct");
    try {
      this.resetState();
      await InAppBilling.open();
      const details = await InAppBilling.purchase(this.state.productId);
      console.log(details);
      await InAppBilling.close();
      this.setState({ transactionDetails: JSON.stringify(details) });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
      await InAppBilling.close();
    }
  };

  consumePurchase = async () => {
    console.log("consumePurchase");
    try {
      this.resetState();
      await InAppBilling.open();
      const details = await InAppBilling.consumePurchase(this.state.productId);
      console.log(details);
      await InAppBilling.close();
      this.setState({ consumed: true });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
      await InAppBilling.close();
    }
  };

  updateProductId = productId => {
    console.log("updateProductId: " + productId);
    this.setState({ productId });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native Billing</Text>
        <Text style={styles.instructions}>To get started, edit product Id</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <TextInput
          onChangeText={this.updateProductId}
          value={this.state.productId}
        />
        <Button onPress={this.getProductDetails} title="Get product details" />
        {this.state.productDetails && (
          <Text style={styles.text}>{this.state.productDetails}</Text>
        )}
        <Button
          onPress={this.purchaseProduct}
          title={"Purchase " + this.state.productId}
        />
        {this.state.transactionDetails && (
          <Text style={styles.text}>{this.state.transactionDetails}</Text>
        )}
        <Button
          onPress={this.consumePurchase}
          title={"Consume " + this.state.productId}
        />
        {this.state.consumed && (
          <Text style={styles.text}>Purchase consumed</Text>
        )}
        {this.state.error && (
          <Text style={[styles.text, { color: "red", marginTop: 10 }]}>
            Error:{"\n"}
            {this.state.error}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
