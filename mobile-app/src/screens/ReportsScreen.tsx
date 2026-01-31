import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {taxReportsAPI} from '../api/client';

const ReportsScreen = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await taxReportsAPI.list({});
      setReports(data || []);
    } catch (error) {
      console.error('Failed to load reports:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  const getDaysUntilDueColor = (days: number) => {
    if (days < 0) return '#ef4444';
    if (days <= 3) return '#f59e0b';
    if (days <= 7) return '#eab308';
    return '#10b981';
  };

  const getDaysUntilDueText = (days: number) => {
    if (days < 0) return `Просрочено на ${Math.abs(days)} дн.`;
    if (days === 0) return 'Сегодня!';
    if (days === 1) return 'Завтра';
    return `Через ${days} дн.`;
  };

  const getReportTypeText = (type: string) => {
    switch (type) {
      case 'vat':
        return 'НДС';
      case 'income_tax':
        return 'Налог на прибыль';
      case 'property_tax':
        return 'Налог на имущество';
      case 'insurance':
        return 'Страховые взносы';
      default:
        return 'Другое';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.content}>
        {reports.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>Нет отчётов</Text>
            <Text style={styles.emptyText}>
              Календарь налоговой отчётности пуст
            </Text>
          </View>
        ) : (
          reports.map((report, index) => {
            const daysUntilDue = report.days_until_due ?? 999;
            const color = getDaysUntilDueColor(daysUntilDue);
            
            return (
              <View key={index} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportType}>
                    {getReportTypeText(report.report_type)}
                  </Text>
                  <View
                    style={[
                      styles.dueBadge,
                      {backgroundColor: color + '20'},
                    ]}>
                    <Text style={[styles.dueText, {color}]}>
                      {getDaysUntilDueText(daysUntilDue)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.reportTitle}>{report.title}</Text>

                <View style={styles.reportDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Срок сдачи:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(report.due_date).toLocaleDateString('ru-RU')}
                    </Text>
                  </View>

                  {report.frequency && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Периодичность:</Text>
                      <Text style={styles.detailValue}>
                        {getFrequencyText(report.frequency)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

const getFrequencyText = (frequency: string) => {
  switch (frequency) {
    case 'monthly':
      return 'Ежемесячно';
    case 'quarterly':
      return 'Ежеквартально';
    case 'annual':
      return 'Ежегодно';
    case 'one_time':
      return 'Однократно';
    default:
      return frequency;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reportType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  dueBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dueText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  reportDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
});

export default ReportsScreen;
