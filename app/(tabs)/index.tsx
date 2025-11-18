import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MetricCard from '../../components/MetricCard';
import { api, MetricData, Insight } from '../../api/client';
import { User, Bell } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{
    glucose?: MetricData;
    steps?: MetricData;
    sleep?: MetricData;
    heartrate?: MetricData;
  }>({});
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const [glucose, steps, sleep, heartrate, insightsData] = await Promise.all([
        api.getMetric('glucose'),
        api.getMetric('steps'),
        api.getMetric('sleep'),
        api.getMetric('heartrate'),
        api.getInsights(),
      ]);

      setMetrics({ glucose, steps, sleep, heartrate });
      setInsights(insightsData.slice(0, 1));
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5B7CFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <User size={20} color="#FF6B9D" strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.greeting}>Good Morning, Alex</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Stage 2: The Ascent</Text>
              <Text style={styles.progressPercent}>45%</Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={['#FF6B9D', '#FFA06B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: '45%' }]}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

        <Link
          href="/sahha-test"
          style={{ marginBottom: 20, fontSize: 18, color: '#007AFF' }}
        >
          Go to Sahha Test
        </Link>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Today's Quests</Text>

          <View style={styles.questsContainer}>
            <TouchableOpacity style={styles.questItem}>
              <View style={styles.questIcon}>
                <Text style={styles.questEmoji}>🚶</Text>
              </View>
              <View style={styles.questText}>
                <Text style={styles.questTitle}>Take a short walk</Text>
                <Text style={styles.questSubtitle}>10 minutes to clear your mind</Text>
              </View>
              <View style={styles.checkbox} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.questItem}>
              <View style={styles.questIcon}>
                <Text style={styles.questEmoji}>📸</Text>
              </View>
              <View style={styles.questText}>
                <Text style={styles.questTitle}>Add a photo of your dinner</Text>
                <Text style={styles.questSubtitle}>Share what you're enjoying</Text>
              </View>
              <View style={styles.checkbox} />
            </TouchableOpacity>
          </View>

          {insights.length > 0 && (
            <TouchableOpacity
              style={styles.insightCard}
              onPress={() => router.push('/(tabs)/insights')}
            >
              <LinearGradient
                colors={['#1E3A5F', '#2A5280']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.insightGradient}
              >
                <Text style={styles.insightTitle}>{insights[0].title}</Text>
                <Text style={styles.insightSummary}>{insights[0].summary}</Text>
                <View style={styles.insightFooter}>
                  <Text style={styles.insightMetric}>{insights[0].metric}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Text style={styles.sectionTitle}>Your Metrics</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0A0E27',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressBar: {
    width: 120,
    height: 6,
    backgroundColor: '#1C1C2E',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8,
  },
  questsContainer: {
    backgroundColor: '#151932',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  questIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E2442',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questEmoji: {
    fontSize: 20,
  },
  questText: {
    flex: 1,
  },
  questTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  questSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3C3C43',
  },
  insightCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 20,
    minHeight: 140,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightSummary: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
    marginBottom: 12,
  },
  insightFooter: {
    marginTop: 'auto',
  },
  insightMetric: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B9FD3',
    textTransform: 'uppercase',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
  },
});

