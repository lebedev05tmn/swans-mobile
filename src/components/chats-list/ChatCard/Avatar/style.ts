import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrap: {
        width: 64,
        height: 64,
        overflow: 'hidden',
    },
    avatar: {
        borderRadius: 32,
        width: 64,
        height: 64,
    },
    online: {
        width: 16,
        height: 16,
        borderRadius: '50%',
        zIndex: 1,
        backgroundColor: '#0bb502',
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
});

export default styles;
