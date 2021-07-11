import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, colors, paddingSizes, spacing } from '../../utils/sizes';

const minutesTomillis = (mins) => mins * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);

  const interval = useRef(null);

  const countDown = useCallback(() => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }

      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesTomillis(minutes));
      return timeLeft;
    });
  }, [minutes, onProgress, onEnd]);

  useEffect(() => {
    setMillis(minutesTomillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused, countDown]);

  const hour = Math.floor(millis / 1000 / 60 / 60) % 60;
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(hour) > 0
        ? `${formatTime(hour)}:${formatTime(minute)}:${formatTime(seconds)}`
        : `${formatTime(minute)}:${formatTime(seconds)}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: paddingSizes.md,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
