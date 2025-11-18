import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import MetricCard from '../../components/MetricCard';
import { api, MetricData } from '../../api/client';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{
    glucose?: MetricData;
    steps?: MetricData;
    sleep?: MetricData;
    heartrate?: MetricData;
  }>({});

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const [glucose, steps, sleep, heartrate] = await Promise.all([
        api.getMetric('glucose'),
        api.getMetric('steps'),
        api.getMetric('sleep'),
        api.getMetric('heartrate'),
      ]);

      setMetrics({ glucose, steps, sleep, heartrate });
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Your Health Metrics</Text>

        <Link
          href="/sahha-test"
          style={{ marginBottom: 20, fontSize: 18, color: '#007AFF' }}
        >
          Go to Sahha Test
        </Link>

        {metrics.glucose && (
          <MetricCard
            title="Glucose"
            value={metrics.glucose.current.value}
            unit={metrics.glucose.current.unit}
            timestamp={metrics.glucose.current.timestamp}
            trend={metrics.glucose.current.trend}
            onPress={() => router.push('/metric-detail?type=glucose&title=Glucose')}
          />
        )}

        {metrics.steps && (
          <MetricCard
            title="Steps"
            value={metrics.steps.current.value}
            unit={metrics.steps.current.unit}
            timestamp={metrics.steps.current.timestamp}
            trend={metrics.steps.current.trend}
            onPress={() => router.push('/metric-detail?type=steps&title=Steps')}
          />
        )}

        {metrics.sleep && (
          <MetricCard
            title="Sleep"
            value={metrics.sleep.current.value}
            unit={metrics.sleep.current.unit}
            timestamp={metrics.sleep.current.timestamp}
            trend={metrics.sleep.current.trend}
            onPress={() => router.push('/metric-detail?type=sleep&title=Sleep')}
          />
        )}

        {metrics.heartrate && (
          <MetricCard
            title="Heart Rate"
            value={metrics.heartrate.current.value}
            unit={metrics.heartrate.current.unit}
            timestamp={metrics.heartrate.current.timestamp}
            trend={metrics.heartrate.current.trend}
            onPress={() => router.push('/metric-detail?type=heartrate&title=Heart%20Rate')}
          />
        )}
      </View>
    </ScrollView>
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
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
});

