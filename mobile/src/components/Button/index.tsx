import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

import { Icon } from "@rneui/base";

import Colors from '../../global/style';
import styles from "./style";

type ButtonProps = {
  colorButton?: string;
  colorText?: string;
  colorBorder?: string;
  title: string;
  link?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = ({
  colorButton,
  colorText,
  colorBorder,
  title,
  link,
  onPress,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: link ? "transparent" : colorButton,
        borderColor: colorBorder,
      }}
      {...rest}
      onPress={onPress} 
    >
      <Text
        style={{
          ...styles.titleButton,
          color: link ? Colors.primaryColor : colorText,
        }}
      >
        {title}
      </Text>
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
