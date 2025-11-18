import glucoseData from '../data/glucose.json';
import stepsData from '../data/steps.json';
import sleepData from '../data/sleep.json';
import heartrateData from '../data/heartrate.json';
import insightsData from '../data/insights.json';

export type MetricType = 'glucose' | 'steps' | 'sleep' | 'heartrate';

export interface MetricData {
  current: {
    value: number;
    unit: string;
    timestamp: string;
    trend: 'up' | 'down' | 'flat';
  };
  history: Array<{
    date: string;
    value: number;
  }>;
}

export interface Insight {
  id: string;
  title: string;
  metric: string;
  timestamp: string;
  summary: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getMetric(type: MetricType): Promise<MetricData> {
    await delay(100);

    switch (type) {
      case 'glucose':
        return glucoseData as MetricData;
      case 'steps':
        return stepsData as MetricData;
      case 'sleep':
        return sleepData as MetricData;
      case 'heartrate':
        return heartrateData as MetricData;
      default:
        throw new Error('Unknown metric type');
    }
  },

  async getInsights(): Promise<Insight[]> {
    await delay(100);
    return insightsData as Insight[];
  },

  async chatRespond(message: string): Promise<string> {
    await delay(200);

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('glucose')) {
      return `Your most recent glucose reading is ${glucoseData.current.value} ${glucoseData.current.unit}`;
    }

    if (lowerMessage.includes('steps')) {
      return `Your most recent step count is ${stepsData.current.value} ${stepsData.current.unit}`;
    }

    if (lowerMessage.includes('sleep')) {
      return `Your most recent sleep duration is ${sleepData.current.value} ${sleepData.current.unit}`;
    }

    if (lowerMessage.includes('heart')) {
      return `Your most recent heart rate is ${heartrateData.current.value} ${heartrateData.current.unit}`;
    }

    return 'I do not have data for that yet.';
  }
};
