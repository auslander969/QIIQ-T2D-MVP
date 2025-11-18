import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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

  const getGradientColors = () => {
    switch (type) {
      case 'sleep':
        return ['#5B4FD8', '#7B6FE8'];
      case 'glucose':
        return ['#E85D75', '#F07A8E'];
      case 'steps':
        return ['#D4853F', '#E09954'];
      case 'heartrate':
        return ['#2D8B72', '#3AA589'];
      default:
        return ['#5B7CFF', '#7B8FFF'];
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: title || 'Metric Detail',
            headerShown: true,
            headerStyle: { backgroundColor: '#0A0E27' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#5B7CFF" />
        </View>
      </>
    );
  }

  if (!metric) {
    return (
      <>
        <Stack.Screen
          options={{
            title: title || 'Metric Detail',
            headerShown: true,
            headerStyle: { backgroundColor: '#0A0E27' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <View style={styles.error}>
          <Text style={styles.errorText}>Failed to load metric data</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: title || 'Metric Detail',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0E27' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.currentCard}>
            <LinearGradient
              colors={getGradientColors()}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.label}>Current Value</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{metric.current.value}</Text>
                <Text style={styles.unit}>{metric.current.unit}</Text>
              </View>
              <Text style={styles.timestamp}>
                {new Date(metric.current.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </LinearGradient>
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
    backgroundColor: '#0A0E27',
  },
  content: {
    padding: 20,
  },
  currentCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradient: {
    padding: 24,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  value: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  unit: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
});
