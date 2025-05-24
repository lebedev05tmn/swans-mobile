import Header from '@/src/components/chat/Header';
import { FC } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { closeModal, showModal } from '@/src/shared/hooks/useModal/index';
import { Trash } from 'lucide-react-native';


const Chat: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text>Chat</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="Открыть модальное окно (закрытие по оверлею)"
                onPress={() =>
                    showModal({
                        icon: <Trash />,
                        title: 'Удалить аккаунт?',
                        subTitle: 'Вы уверены, что хотите удалить аккаунт без права восстановления?',
                        closeOnOverlayClick: true,
                        buttons: [
                            {
                              title: 'Удалить',
                              onPress: () => {},
                              containerStyle: {
                                backgroundColor: 'white',
                                borderColor: 'red',
                                borderWidth: 1,
                              },
                              textStyle: {
                                color: 'red',
                              },
                            },
                            {
                              title: 'Отменить',
                              onPress: closeModal,
                              containerStyle: {
                                backgroundColor: '#333333',
                              },
                              textStyle: {
                                color: 'white',
                              },
                            },
                          ]
                          
                    })}
                
            />
            <Button
                title="Открыть модальное окно (без закрытия по оверлею)"
                onPress={() =>
                    showModal({ title: 'Только по кнопке "назад"', closeOnOverlayClick: false },)
                }
            />
            
        </View>
        </SafeAreaView>
        
    );
};

export default Chat;
