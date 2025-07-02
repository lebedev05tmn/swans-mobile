import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    maxWidth: screenWidth * 0.88,
    alignItems: 'center',
  },
});

export default styles;