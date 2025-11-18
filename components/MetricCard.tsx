import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

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
    if (trend === 'up') return <TrendingUp size={20} color="#34C759" />;
    if (trend === 'down') return <TrendingDown size={20} color="#FF3B30" />;
    return <Minus size={20} color="#8E8E93" />;
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {getTrendIcon()}
      </View>
      <Text style={styles.value}>
        {value} <Text style={styles.unit}>{unit}</Text>
      </Text>
      <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  unit: {
    fontSize: 18,
    fontWeight: '400',
    color: '#8E8E93',
  },
  timestamp: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
