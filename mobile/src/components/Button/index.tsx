import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { Icon } from "@rneui/base";

import Colors from '../../global/style';
import styles from "./style";

type ButtonProps = {
  colorButton?: string;
  colorText?: string;
  colorBorder?: string;
  title: string;
  link?: boolean;
  elevation?: number;
  height?: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean;
}

const Button = ({
  colorButton,
  colorText,
  colorBorder,
  title,
  link,
  elevation,
  height,
  onPress,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        elevation: elevation,
        backgroundColor: link ? "transparent" : colorButton,
        borderColor: colorBorder,
        height: height
      }}
      {...rest}
      onPress={onPress}
    >
      {loading ?
        <ActivityIndicator
          color={Colors.whiteColor}
        />
        :
        <Text
          style={{
            ...styles.titleButton,
            color: link ? Colors.primaryColor : colorText,
          }}
        >
          {title}
        </Text>}
      {link ? (
        <Icon
          name="arrow-forward"
          type="material"
          size={18}
          color={Colors.whiteColor}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
