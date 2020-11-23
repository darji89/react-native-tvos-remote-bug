/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import reactNativeTvosController from "react-native-tvos-controller"

const App: () => React$Node = () => {
  const [toggle, setToggle] = useState(false);
  useEffect(function onMount() {
    reactNativeTvosController.connect();
    const tapSubscription = reactNativeTvosController.subscribe('TAP',
      (e) => {
        console.log("tapped");
        console.log(JSON.stringify(e));
        if (e.type === 'Select') {
          setToggle(true);
        }

        if (e.type === 'Menu') {
          setToggle(false);
        }
        /*
        e.type : "PlayPause" || "Menu" || "Select" || "UpArrow" || "DownArrow" || "LeftArrow" || "RightArrow"
        e.code : 0 || 1 || 2 || 3 || 4 || 5 || 6
        */
      });

    return tapSubscription;
  }, [])
  return (
    <View style={styles.root}>
      {toggle && (
        <TouchableOpacity hasTVPreferredFocus onPress={() => {
          console.log('press');
        }}>
          <Text style={styles.label}>Press me</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  label: {
    color: '#010101',
    fontSize: 32,
  }
});

export default App;
