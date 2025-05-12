import React from "react";
import { Image, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

type SearchBarProps = {
  onPress?: () => void;
  placeHolder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ onPress, placeHolder, value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />

      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="#ab8bff"
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
