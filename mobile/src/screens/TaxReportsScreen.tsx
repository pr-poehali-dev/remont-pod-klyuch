import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createApiClient } from '../api/client';
import { API_CONFIG } from '../api/config';

type TaxReport = {
  id: number;
  report_type: string;
  report_name: string;
  description: string;
  due_date: string;
  frequency: string;
  status: 'upcoming' | 'submitted' | 'overdue';
  submitted_at: string | null;
  reminder_days: number;
  days_until_due: number | null;
  is_urgent: boolean;
};

export default function TaxReportsScreen() {
  const [reports, setReports] = useState<TaxReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReports = async () => {
    try {
      const api = createApiClient();
      const today = new Date();
      const nextYear = new Date(today.getFullYear() + 1, 11, 31);
      
      const response = await api.get(
        `${API_CONFIG.TAX_REPORTS}?from_date=${today.toISOString().split('T')[0]}&to_date=${nextYear.toISOString().split('T')[0]}`
      );
      setReports(response.data.reports);
    } catch (error: any) {
      console.error('Load reports error:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить календарь отчётов');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const markAsSubmitted = async (reportId: number) => {
    try {
      const api = createApiClient();
      await api.put(`${API_CONFIG.TAX_REPORTS}?id=${reportId}`, {
        status: 'submitted',
      });
      loadReports();
      Alert.alert('Успешно', 'Отчёт отмечен как поданный');
    } catch (error: any) {
      console.error('Update report error:', error);
      Alert.alert('Ошибка', 'Не удалось обновить отчёт');
    }
  };

  const getStatusColor = (report: TaxReport) => {
    if (report.status === 'submitted') return '#10b981';
    if (report.status === 'overdue') return '#ef4444';
    if (report.is_urgent) return '#f97316';
    return '#3b82f6';
  };

  const getStatusText = (report: TaxReport) => {
    if (report.status === 'submitted') return 'Подан';
    if (report.status === 'overdue') return 'Просрочен';
    if (report.is_urgent) return `Срочно! ${report.days_until_due} дн.`;
    return `Через ${report.days_until_due} дн.`;
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'vat': return 'receipt';
      case 'income_tax': return 'cash';
      case 'personal_tax': return 'person';
      case 'insurance': return 'shield-checkmark';
      default: return 'document-text';
    }
  };

  const renderReport = ({ item }: { item: TaxReport }) => (
    <TouchableOpacity 
      style={[
        styles.reportCard,
        item.is_urgent && styles.reportCardUrgent,
      ]}
      onLongPress={() => {
        if (item.status !== 'submitted') {
          Alert.alert(
            'Отметить как поданный?',
            `Отчёт: ${item.report_name}`,
            [
              { text: 'Отмена', style: 'cancel' },
              { text: 'Да, подан', onPress: () => markAsSubmitted(item.id) },
            ]
          );
        }
      }}
    >
      <View style={styles.reportHeader}>
        <View style={styles.reportIcon}>
          <Ionicons 
            name={getReportTypeIcon(item.report_type) as any} 
            size={24} 
            color="#2563eb" 
          />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
          <Text style={styles.statusText}>{getStatusText(item)}</Text>
        </View>
      </View>

      <Text style={styles.reportName}>{item.report_name}</Text>
      
      {item.description && (
        <Text style={styles.reportDescription}>{item.description}</Text>
      )}

      <View style={styles.reportFooter}>
        <View style={styles.dueDateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.dueDate}>
            Срок: {new Date(item.due_date).toLocaleDateString('ru-RU')}
          </Text>
        </View>
        
        {item.frequency && (
          <View style={styles.frequencyBadge}>
            <Text style={styles.frequencyText}>
              {item.frequency === 'monthly' ? 'Ежемесячно' :
               item.frequency === 'quarterly' ? 'Квартально' :
               item.frequency === 'annual' ? 'Годовой' : 'Разовый'}
            </Text>
          </View>
        )}
      </View>

      {item.status === 'submitted' && item.submitted_at && (
        <View style={styles.submittedInfo}>
          <Ionicons name="checkmark-circle" size={16} color="#10b981" />
          <Text style={styles.submittedText}>
            Подан {new Date(item.submitted_at).toLocaleDateString('ru-RU')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const upcomingReports = reports.filter(r => r.status === 'upcoming');
  const submittedReports = reports.filter(r => r.status === 'submitted');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Календарь отчётов ФНС</Text>
      </View>

      <FlatList
        data={reports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadReports();
        }}
        ListHeaderComponent={
          <View style={styles.stats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{upcomingReports.length}</Text>
              <Text style={styles.statLabel}>Предстоящих</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                {submittedReports.length}
              </Text>
              <Text style={styles.statLabel}>Поданных</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#f97316' }]}>
                {reports.filter(r => r.is_urgent).length}
              </Text>
              <Text style={styles.statLabel}>Срочных</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Отчётов не найдено</Text>
          </View>
        }
      />

      <View style={styles.info}>
        <Ionicons name="information-circle-outline" size={20} color="#2563eb" />
        <Text style={styles.infoText}>
          Удерживайте отчёт, чтобы отметить как поданный
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reportCardUrgent: {
    borderColor: '#f97316',
    borderWidth: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  reportName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  frequencyBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  frequencyText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  submittedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submittedText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '500',
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
  info: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eff6ff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#2563eb',
  },
});
