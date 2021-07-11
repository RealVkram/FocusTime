import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/features/focus/focus';
import { Timer } from './timer/timer';
import { spacing } from './utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [focusHistory, setFocusHostory] = useState([]);
  const [data, setData] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHostory(JSON.parse(history));
        <ActivityIndicator size="large" color="#ffffff" />;
      }
    } catch (e) {
      console.log;
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  //update history and catche the updates
  // useEffect(() => {
  //   if (focusSubject) {
  //     setFocusHostory([...focusHistory, focusSubject]);
  //   }
  // }, [focusSubject]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHostory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    // useEffect( () => {
    //   fetch("https://weatherapi-com.p.rapidapi.com/timezone.json?q=lagos").then(resp => resp.json()).then(val => setData(val)).catch((e) => console.log(e)).finally(() => setIsLoading(false))
    // }, [])

    setFocusHostory([]);
  };
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELED);
            setFocusSubject('');
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS !== 'ios' ? spacing.md : spacing.lg,
    backgroundColor: 'purple',
  },
});
