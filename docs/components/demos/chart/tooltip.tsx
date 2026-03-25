import { Chart, ChartTooltip } from '@yss-rui/components';
const { tooltipFormate } = ChartTooltip;

export default () => {
  const optionDefault = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return tooltipFormate(params, { unit: '(元)' });
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '示例',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
      },
    ],
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
