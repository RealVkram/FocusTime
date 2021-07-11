import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RoundedButton } from '../src/components/RoundedButton';
import {spacing} from "../utils/sizes"

export const Timing = ({
    onChangeTime
}) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={70} title={15} onPress={ () => onChangeTime(15)}/>
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={70} title={30} onPress={ () => onChangeTime(30)}/>
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={70} title={60} onPress={ () => onChangeTime(60)}/>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
    
  }

});
