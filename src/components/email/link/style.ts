import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  linkContainer: {
    marginTop: 20, 
    alignItems: 'center',
  },
  activeLink: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#404040',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  disabledLink: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#404040',
  },
});