import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrap: {
        overflow: 'hidden',
    },
    avatar: {
        borderRadius: '50%',
        overflow: 'hidden',
    },
    online: {
        borderRadius: '50%',
        zIndex: 1,
        backgroundColor: '#0bb502',
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default styles;
