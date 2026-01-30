import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createApiClient } from '../api/client';
import { API_CONFIG } from '../api/config';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const api = createApiClient();
      const response = await api.get(`${API_CONFIG.AI_CHAT}?limit=50`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Load chat error:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText.trim(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const api = createApiClient();
      const response = await api.post(API_CONFIG.AI_CHAT, {
        message: userMessage.content,
      });

      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Прокрутка вниз
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error: any) {
      console.error('Send message error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте позже.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.aiMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  const quickCommands = [
    'Мне нужен счёт',
    'Когда сдавать НДС?',
    'Нужна консультация',
    'Статус моих задач',
  ];

  if (initialLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.botIconLarge}>
            <Ionicons name="chatbubbles" size={48} color="#2563eb" />
          </View>
          <Text style={styles.emptyTitle}>AI-ассистент бухгалтера</Text>
          <Text style={styles.emptySubtitle}>
            Я помогу вам с бухгалтерскими вопросами и создам задачи для вашего бухгалтера
          </Text>

          <View style={styles.quickCommandsContainer}>
            <Text style={styles.quickCommandsTitle}>Попробуйте спросить:</Text>
            {quickCommands.map((cmd, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickCommand}
                onPress={() => setInputText(cmd)}
              >
                <Text style={styles.quickCommandText}>{cmd}</Text>
                <Ionicons name="arrow-forward" size={16} color="#2563eb" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Напишите сообщение..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={loading || !inputText.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  botIconLarge: {
    width: 96,
    height: 96,
    backgroundColor: '#eff6ff',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  quickCommandsContainer: {
    width: '100%',
  },
  quickCommandsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  quickCommand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickCommandText: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: '500',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#2563eb',
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1f2937',
  },
  userMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2563eb',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
