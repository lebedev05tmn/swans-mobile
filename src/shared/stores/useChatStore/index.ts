import { create } from 'zustand';
import socket from '@/src/shared/config/socket';
import { router } from 'expo-router';

type TMessage = {
    message_id: number;
    chat_id: number;
    sender_id: string;
    recipient_id: string;
    message_text: string;
    sending_time: string;
    is_readen: boolean;
    images: string[];
    response_message_id: number | null;
    reaction_sender: string | null;
    reaction_recipient: string | null;
};

type TMetaData = {
    chat_id: number | null;
    name: string | null;
    online: boolean | null;
    profile_picture: string | null;
    verify: boolean | null;
};

type TChatState = {
    connected: boolean;
    messages: TMessage[];
    metadata: TMetaData;
};

type TChatActions = {
    connect: (token: string) => void;
    joinChat: (chatId: number) => void;
};

type ChatStore = TChatState & {
    actions: TChatActions;
};

const useChatStore = create<ChatStore>((set, get) => ({
    connected: false,
    messages: [],
    metadata: {
        chat_id: null,
        name: null,
        online: null,
        profile_picture: null,
        verify: null,
    },

    actions: {
        connect: (token) => {
            if (get().connected) return;

            socket.io.opts.extraHeaders = {
                Authorization: `Bearer ${token}`,
            };

            socket.connect();

            socket.on('connect', () => {
                socket.emit('registration');
                set({ connected: true });
                console.log('🟢 Socket подключён');

                socket.on('registrated', (data) => {
                    console.log('✅ Зарегистрирован:', data.socket_id);
                });

                socket.on('chat-metadata', (meta) => {
                    console.log('ℹ️ Метаданные чата:', meta);
                    set({ metadata: meta });
                });

                socket.on('new-message', ({ message }) => {
                    console.log('📨 Новое сообщение:', message);
                    set((state) => ({
                        messages: [...state.messages, message],
                    }));
                });

                socket.on('message-is-readen', (data) => {
                    console.log('✅ Сообщение прочитано:', data);
                });

                socket.on('message-is-reacted', (data) => {
                    console.log('😊 Реакция на сообщение:', data);
                });

                socket.on('message-is-edited', (data) => {
                    console.log('✏️ Сообщение отредактировано:', data);
                });

                socket.on('message-is-deleted', ({ message_id }) => {
                    console.log('🗑️ Сообщение удалено:', message_id);
                });

                socket.on('error', (err) => {
                    console.error('❌ Socket error:', err);
                });
            });
        },
        joinChat: (chatId) => {
            socket.emit('join-chat', { chatId });
            console.log(`🔗 Присоединились к чату ${chatId}`);
            router.push(`/chat`);
        },
    },
}));

export default useChatStore;
