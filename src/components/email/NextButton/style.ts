import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom:32,
    borderRadius: 16,
    
    width: '100%', 
    textAlign:'center',
  },
 
  text: {
    color: '#404040',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 18,
    textAlign:'center',
  },
});

export default styles;