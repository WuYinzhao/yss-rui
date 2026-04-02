import { Chart } from '@orinui/components';

export default () => {
  const optionDefault = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ name: '示例', type: 'bar', data: [120, 200, 150] }],
  };

  return (
    <div style={{ height: 360, border: '1px solid #f0f0f0' }}>
      <Chart
        optionDefault={optionDefault}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
