import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    shadowColor: '#262626',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  icon: {
    width: 56,
    height: 56,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-SemiBold',
    fontWeight: '600',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: 'Roboto-Regular',
    color: '#8C8C8C',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12, 
  },
  button: {
    height:36,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight:500,
    lineHeight: 14,
    fontFamily: 'Roboto-Medium',
  },
});

export default styles;
