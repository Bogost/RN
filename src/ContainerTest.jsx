import React, { useState, useEffect } from "react";
import { View, Text, Button, Animated } from "react-native";
import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import { Api, Users } from "./api";
import { UserDetail } from "./UserDetail";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen - Pokaz</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate("Detail");
            Api.call("erwr");
          }}
        />
        <Button
          title="Go to Fader"
          onPress={() => {
            this.props.navigation.navigate("Fading");
            Api.call("erwr");
          }}
        />
      </View>
    );
  }
}

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [r] = useState(new Animated.Value(0));
  const [g] = useState(new Animated.Value(0));
  const [b] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000
      })
    ).start();
  }, []);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(r, {
        toValue: 255,
        duration: 1000
      })
    ).start();
  }, []);
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(g, {
        toValue: 255,
        duration: 2000
      })
    ).start();
  }, []);
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(b, {
        toValue: 255,
        duration: 4000
      })
    ).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        backgroundColor: "rgb(200,22" + b + ")",
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

class FadingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FadeInView style={{ width: 250, height: 50 }}>
          <Text>Fading Text</Text>
        </FadeInView>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.navigation.navigate("Home");
            Api.call("erwr");
          }}
        />
      </View>
    );
  }
}

class Detailcreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {Users.map(function(item) {
          return <UserDetail name={item.name} />;
        })}
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: {
    screen: Detailcreen
  },
  Fading: {
    screen: FadingScreen
  }
});

export const Apps = createBrowserApp(AppNavigator);
