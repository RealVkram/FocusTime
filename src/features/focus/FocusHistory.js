import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Vibration,
} from 'react-native';

import { fontSizes, spacing, colors } from '../../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item: { subject, status }, index }) => {
  return (
    <Text
      style={{ color: status > 1 ? 'red' : 'green', fontSize: fontSizes.md }}>
      {subject.charAt(0).toUpperCase() + subject.substr(1)}
    </Text>
  );
};
const cancelVibration = () => {
  Vibration.cancel();
};
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on :</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={70}
                title="clear"
                onPress={() => onClear() }
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
});
