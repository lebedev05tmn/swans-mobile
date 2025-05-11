import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  inputView: {
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
  },
  inputViewFocused: {
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#373737',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
  },
  inputViewDisabled: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
  },
  textInput: {
    color: '#000',
    width: '100%',
    height: '100%',
    fontSize: 16,
    lineHeight: 18,
    paddingVertical: 0,
  },
  textInputDisabled: {
    color: '#A3A3A3',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
