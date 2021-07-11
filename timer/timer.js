import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors, spacing } from '../utils/sizes';
import { CountDown } from '../src/components/CountDown';
import { RoundedButton } from '../src/components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setStart] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => setProgress(progress);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      //do something here for android
      // interval = setInterval( () => Vibration.vibrate(), 1000)
      // setTimeout( () => clearInterval(interval), 5000)
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setStart(false);
    vibrate();
    onTimerEnd();
  };

  const changeTime = (mins) => {
    setMinutes(mins);
    setProgress(1);
    setStart(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}> {`${focusSubject.charAt(0).toUpperCase()}${focusSubject.substr(1)}`}</Text>
      </View>

      <ProgressBar
        color="#5E84E2"
        style={{ height: 10, marginTop: spacing.sm }}
        progress={progress}
      />
      <View style={styles.roundedButton}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.roundedButton}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            onPress={() => setStart(false)}
            style={{ paddingTop: 20 }}
          />
        ) : (
          <RoundedButton
            title="start"
            onPress={() => setStart(true)}
            style={{ paddingTop: 20 }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" onPress={() => clearSubject()} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  roundedButton: {
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  clearSubject: {
    paddingBottom: 50,
    paddingLeft: 25,
  },
});
