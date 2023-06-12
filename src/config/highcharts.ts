import Highcharts from 'highcharts';

const HIGHCHARTS_CONFIG: Highcharts.Options = {
  credits: {
    enabled: false,
  },
  chart: {
    zooming: {
      type: 'x',
    },
    backgroundColor: '#121619',
  },
  title: {
    text: ``,
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    visible: true,
    lineWidth: 0,
    title: {
      text: '',
    },
    tickColor: '#242A2E',
    labels: {
      style: {
        color: '#242A2E',
      },
    },
  },
  yAxis: {
    visible: true,
    gridLineColor: '#242A2E',
    tickColor: '#242A2E',
    tickWidth: 1,
    labels: {
      style: {
        color: '#242A2E',
      },
    },
    title: {
      text: '',
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    style: {
      fontSize: '8px',
      fontFamily: 'Inter',
      color: '#fff',
    },
    borderRadius: 5,
    backgroundColor: '#21252B',
    shadow: false,
  },
  plotOptions: {
    line: {
      marker: {
        enabled: false,
      },
      lineWidth: 1.5,
      states: {
        hover: {
          lineWidth: 1.5,
        },
      },
      threshold: null,
    },
    column: {
      pointPadding: 0.1,
      borderWidth: 0,
    },
  },
};

export default HIGHCHARTS_CONFIG;
