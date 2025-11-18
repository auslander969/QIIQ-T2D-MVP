import { View, Text, StyleSheet } from 'react-native';

interface ChartProps {
  data: Array<{ date: string; value: number }>;
  unit: string;
}

export default function SimpleChart({ data, unit }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getBarHeight = (value: number) => {
    const normalized = (value - minValue) / range;
    return Math.max(normalized * 150, 10);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 7 Days</Text>
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.value}>{item.value}</Text>
            <View style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  { height: getBarHeight(item.value) }
                ]}
              />
            </View>
            <Text style={styles.label}>{formatDate(item.date)}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: 8,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 11,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 4,
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 24,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  label: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
  },
  unit: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});
