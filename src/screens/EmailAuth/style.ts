import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    width: screenWidth * 0.88,
    alignSelf: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'MontserratAlternates-Medium',
    color: '#FF0000',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  
});

export default styles;