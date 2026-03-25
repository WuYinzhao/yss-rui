import ReactEcharts from 'echarts-for-react';
import React, { forwardRef, useEffect, useRef } from 'react';
const Chart: React.FC<any> = (props: any) => {
  const {
    optionDefault,
    optionChange,
    style = { width: '100%', height: '100%' },
    onEvents = [],
    registerEvents = {},
    notMerge = false,
    lazyUpdate = false,
    renderWithSVG = false,
  } = props;

  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (optionChange && Object.keys(optionChange).length > 0) {
      chartRef.current?.getEchartsInstance().setOption(optionChange);
    }
  }, [optionChange]);

  useEffect(() => {
    const registerEventsKey = Object.keys(registerEvents);
    if (registerEventsKey.length) {
      const zRender = chartRef.current?.getEchartsInstance()?.getZr();
      if (zRender) {
        registerEventsKey.forEach((key) => {
          zRender.on(key, registerEvents[key]);
        });
      }
    }
  }, []);
  return (
    <ReactEcharts
      option={optionDefault}
      notMerge={notMerge}
      ref={chartRef}
      style={{ ...style }}
      onEvents={onEvents}
      opts={
        renderWithSVG
          ? {
              renderer: 'svg',
            }
          : {}
      }
      lazyUpdate={lazyUpdate}
    />
  );
};

export default forwardRef(Chart as any);
