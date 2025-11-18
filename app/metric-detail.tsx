import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { api, MetricData, MetricType } from '../api/client';
import SimpleChart from '../components/SimpleChart';

export default function MetricDetailScreen() {
  const params = useLocalSearchParams();
  const type = params.type as MetricType;
  const title = params.title as string;

  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<MetricData | null>(null);

  useEffect(() => {
    loadMetric();
  }, [type]);

  const loadMetric = async () => {
    try {
      const data = await api.getMetric(type);
      setMetric(data);
    } catch (error) {
      console.error('Failed to load metric:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: title || 'Metric Detail', headerShown: true }} />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </>
    );
  }

  if (!metric) {
    return (
      <>
        <Stack.Screen options={{ title: title || 'Metric Detail', headerShown: true }} />
        <View style={styles.error}>
          <Text style={styles.errorText}>Failed to load metric data</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: title || 'Metric Detail', headerShown: true }} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.currentCard}>
            <Text style={styles.label}>Current Value</Text>
            <Text style={styles.value}>
              {metric.current.value} <Text style={styles.unit}>{metric.current.unit}</Text>
            </Text>
            <Text style={styles.timestamp}>
              {new Date(metric.current.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
          </View>

          <SimpleChart data={metric.history} unit={metric.current.unit} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  currentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  value: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  unit: {
    fontSize: 24,
    fontWeight: '400',
    color: '#8E8E93',
  },
  timestamp: {
    fontSize: 13,
    color: '#8E8E93',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});
