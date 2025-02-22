import Chart from 'chart.js/auto';

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export function createLineChart(ctx, data, options = {}) {
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data,
    options: { ...defaultChartOptions, ...options }
  });
}

export function createBarChart(ctx, data, options = {}) {
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data,
    options: { ...defaultChartOptions, ...options }
  });
}