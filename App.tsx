import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Navigation} from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import FavoriteContextWrapper from './src/utils/FavoriteContextWrapper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FavoriteContextWrapper>
        <Navigation />
      </FavoriteContextWrapper>
    </GestureHandlerRootView>
  );
}

export default App;
