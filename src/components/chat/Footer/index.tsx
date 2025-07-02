import React from 'react';
import { View } from 'react-native';
import styles from './style';
import { Paperclip, ArrowUp } from 'lucide-react-native';
import Input from '@/src/shared/ui/Input';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Paperclip />
            <Input viewStyle={styles.input} placeholder={'Сообщение'} />
            <View style={styles.sendMessageButton}>
                <ArrowUp color={'#FFF'} />
            </View>
        </View>
    );
};

export default Footer;
