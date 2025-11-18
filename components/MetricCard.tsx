import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react-native';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  timestamp: string;
  trend: 'up' | 'down' | 'flat';
  onPress: () => void;
}

export default function MetricCard({ title, value, unit, timestamp, trend, onPress }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={18} color="#34C759" strokeWidth={2.5} />;
    if (trend === 'down') return <TrendingDown size={18} color="#FF3B30" strokeWidth={2.5} />;
    return <Minus size={18} color="#8E8E93" strokeWidth={2.5} />;
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffHours < 1) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getGradientColors = () => {
    switch (title.toLowerCase()) {
      case 'sleep':
        return ['#5B4FD8', '#7B6FE8'];
      case 'glucose':
        return ['#E85D75', '#F07A8E'];
      case 'steps':
        return ['#D4853F', '#E09954'];
      case 'heart rate':
        return ['#2D8B72', '#3AA589'];
      default:
        return ['#5B7CFF', '#7B8FFF'];
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.icon}>{getMetricIcon(title)}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.6)" strokeWidth={2} />
        </View>

        <View style={styles.content}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.unit}>{unit}</Text>
            <View style={styles.trendBadge}>
              {getTrendIcon()}
            </View>
          </View>
          <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function getMetricIcon(title: string): string {
  switch (title.toLowerCase()) {
    case 'sleep':
      return '🛌';
    case 'glucose':
      return '🩸';
    case 'steps':
      return '👟';
    case 'heart rate':
      return '❤️';
    default:
      return '📊';
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    minHeight: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  content: {
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  value: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.7,
    marginLeft: 4,
  },
  trendBadge: {
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
    paddingHorizontal: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
  },
});
