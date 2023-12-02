import React from 'react'
import { get } from 'lodash'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const Chart = ({ title, dataset }: any) => {
  const labels = get(dataset, 'x', [])
  const data = get(dataset, 'y', [])

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Disable the x-axis grid background
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
            color: 'black',
            family: 'Prompt',
            weight: '600',
          },
        },
        ticks: {
          font: {
            size: 13,
            family: 'Prompt',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'จำนวน (ครั้ง)',
          font: {
            size: 16,
            color: 'black',
            family: 'Prompt',
            weight: '600',
          },
        },
        ticks: {
          font: {
            size: 13,
            family: 'Prompt',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        padding: 12,
        titleFont: {
          size: 16,
          family: 'Prompt',
        },
        bodyFont: {
          size: 13,
          family: 'Prompt',
        },
      },
    },
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          'rgb(158,1,66)',
          'rgb(213,62,79)',
          'rgb(244,109,67)',
          'rgb(253,174,97)',
          'rgb(254,224,139)',
          'rgb(230,245,152)',
          'rgb(171,221,164)',
          'rgb(102,194,165)',
          'rgb(50,136,189)',
          'rgb(94,79,162)',
          'rgb(84,48,5)',
          'rgb(140,81,10)',
          'rgb(191,129,45)',
          'rgb(223,194,125)',
          'rgb(246,232,195)',
          'rgb(199,234,229)',
          'rgb(128,205,193)',
          'rgb(53,151,143)',
          'rgb(1,102,94)',
          'rgb(0,60,48)',
        ],
        data,
      },
    ],
  }

  return <Bar data={chartData} options={options} />
}

export default Chart
