import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createApiClient } from '../api/client';
import { API_CONFIG } from '../api/config';

type Task = {
  id: number;
  task_type: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  created_at: string;
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    task_type: 'other',
    priority: 'medium',
  });

  const loadTasks = async () => {
    try {
      const api = createApiClient();
      const response = await api.get(API_CONFIG.TASKS);
      setTasks(response.data.tasks);
    } catch (error: any) {
      console.error('Load tasks error:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить задачи');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!newTask.title) {
      Alert.alert('Ошибка', 'Введите название задачи');
      return;
    }

    try {
      const api = createApiClient();
      await api.post(API_CONFIG.TASKS, newTask);
      setModalVisible(false);
      setNewTask({ title: '', description: '', task_type: 'other', priority: 'medium' });
      loadTasks();
      Alert.alert('Успешно', 'Задача создана');
    } catch (error: any) {
      console.error('Create task error:', error);
      Alert.alert('Ошибка', 'Не удалось создать задачу');
    }
  };

  const updateTaskStatus = async (taskId: number, status: string) => {
    try {
      const api = createApiClient();
      await api.put(`${API_CONFIG.TASKS}?id=${taskId}`, { status });
      loadTasks();
    } catch (error: any) {
      console.error('Update task error:', error);
      Alert.alert('Ошибка', 'Не удалось обновить задачу');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in_progress': return 'time';
      case 'cancelled': return 'close-circle';
      default: return 'ellipse-outline';
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
        <Ionicons 
          name={getStatusIcon(item.status) as any} 
          size={24} 
          color={item.status === 'completed' ? '#10b981' : '#6b7280'} 
        />
      </View>

      <Text style={styles.taskTitle}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.taskDescription}>{item.description}</Text>
      ) : null}

      <View style={styles.taskFooter}>
        <Text style={styles.taskType}>{item.task_type}</Text>
        {item.due_date && (
          <Text style={styles.taskDate}>
            Срок: {new Date(item.due_date).toLocaleDateString('ru-RU')}
          </Text>
        )}
      </View>

      {item.status !== 'completed' && (
        <View style={styles.taskActions}>
          {item.status === 'pending' && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => updateTaskStatus(item.id, 'in_progress')}
            >
              <Text style={styles.actionButtonText}>В работу</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => updateTaskStatus(item.id, 'completed')}
          >
            <Text style={styles.actionButtonText}>Завершить</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Задачи бухгалтеру</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadTasks();
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="list-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Задач пока нет</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Новая задача</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Название задачи *</Text>
          <TextInput
            style={styles.input}
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            placeholder="Например: Сформировать счёт на оплату"
          />

          <Text style={styles.label}>Описание</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={newTask.description}
            onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            placeholder="Дополнительные детали..."
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Тип задачи</Text>
          <View style={styles.chipGroup}>
            {['invoice', 'payment', 'report', 'consultation', 'other'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  newTask.task_type === type && styles.chipActive,
                ]}
                onPress={() => setNewTask({ ...newTask, task_type: type })}
              >
                <Text
                  style={[
                    styles.chipText,
                    newTask.task_type === type && styles.chipTextActive,
                  ]}
                >
                  {type === 'invoice' ? 'Счёт' : 
                   type === 'payment' ? 'Оплата' :
                   type === 'report' ? 'Отчёт' :
                   type === 'consultation' ? 'Консультация' : 'Другое'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Приоритет</Text>
          <View style={styles.chipGroup}>
            {['low', 'medium', 'high', 'urgent'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.chip,
                  newTask.priority === priority && styles.chipActive,
                ]}
                onPress={() => setNewTask({ ...newTask, priority })}
              >
                <Text
                  style={[
                    styles.chipText,
                    newTask.priority === priority && styles.chipTextActive,
                  ]}
                >
                  {priority === 'low' ? 'Низкий' :
                   priority === 'medium' ? 'Средний' :
                   priority === 'high' ? 'Высокий' : 'Срочный'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={createTask}>
            <Text style={styles.submitButtonText}>Создать задачу</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskType: {
    fontSize: 13,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  taskDate: {
    fontSize: 13,
    color: '#6b7280',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
