import Highcharts from 'highcharts';

const FONT_COLOR = '#515151';
const BACKGROUND_COLOR = '#121619';
const HIGHCHARTS_CONFIG: Highcharts.Options = {
  credits: {
    enabled: false,
  },
  chart: {
    zooming: {
      type: 'x',
    },
    backgroundColor: BACKGROUND_COLOR,
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
    tickColor: FONT_COLOR,
    labels: {
      style: {
        color: FONT_COLOR,
      },
    },
  },
  yAxis: {
    visible: true,
    gridLineColor: FONT_COLOR,
    tickColor: FONT_COLOR,
    tickWidth: 1,
    labels: {
      style: {
        color: FONT_COLOR,
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
