import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api, Insight } from '../../api/client';
import { Menu, Bell } from 'lucide-react-native';

export default function InsightsScreen() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const data = await api.getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return 'Today';
    } else if (diffHours < 48) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getGradientColors = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'sleep':
        return ['#5B4FD8', '#7B6FE8'];
      case 'glucose':
        return ['#E85D75', '#F07A8E'];
      case 'steps':
        return ['#D4853F', '#E09954'];
      case 'heartrate':
      case 'heart rate':
        return ['#2D8B72', '#3AA589'];
      case 'hrv':
        return ['#1E5F5C', '#2A7A76'];
      default:
        return ['#1E3A5F', '#2A5280'];
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'sleep':
        return '🛌';
      case 'glucose':
        return '🩸';
      case 'steps':
        return '👟';
      case 'heartrate':
      case 'heart rate':
        return '❤️';
      case 'hrv':
        return '📊';
      default:
        return '💡';
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
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Story</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <Text style={styles.tabLabel}>TODAY</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {insights.map((insight, index) => (
            <TouchableOpacity key={insight.id} style={styles.card} activeOpacity={0.8}>
              <LinearGradient
                colors={getGradientColors(insight.metric)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{getMetricIcon(insight.metric)}</Text>
                  </View>
                  <View style={styles.metricBadge}>
                    <Text style={styles.metricLabel}>{insight.metric}</Text>
                  </View>
                </View>

                <Text style={styles.title}>{insight.title}</Text>
                <Text style={styles.summary}>{insight.summary}</Text>

                <View style={styles.footer}>
                  <View style={styles.avatarGroup}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>🧘</Text>
                    </View>
                  </View>
                  <Text style={styles.timestamp}>{formatTimestamp(insight.timestamp)}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          <View style={styles.divider}>
            <Text style={styles.dividerText}>YESTERDAY</Text>
          </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0A0E27',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0A0E27',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B7CFF',
    letterSpacing: 1,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    minHeight: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  metricBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 26,
  },
  summary: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  divider: {
    marginTop: 24,
    marginBottom: 16,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B7CFF',
    letterSpacing: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
  },
});
