

import React from "react";
import { View } from "react-native";
import Index from "./src/views";
import AboutPage from "./src/views/AboutPage";

const App=()=>{
  return (
    <View>
      <Index/>
      <AboutPage/>
    </View>
  );
};

export default App;