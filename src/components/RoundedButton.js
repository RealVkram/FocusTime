import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

import { fontSizes, paddingSizes, colors, spacing} from "../../utils/sizes"

export const RoundedButton = (
  {style = {},
  textStyle = {},
  size = 130,
    ...props}
) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: colors.white,
      borderWidth: 2,
      marginTop: 5
      
    },
    text: {
      color: colors.white,
      fontSize: size/4,
      marginTop: Platform.OS === 'android' ? spacing.md  : spacing.md       
    },
  });
