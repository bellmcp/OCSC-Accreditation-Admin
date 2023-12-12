//@ts-nocheck
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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { Stack } from '@mui/material'
import { Button, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { GetApp as DownloadIcon } from '@material-ui/icons'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const Chart = ({ title, dataset, startDate, endDate }: any) => {
  const theme = useTheme()
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

  const div2PDF = (e: any) => {
    const input = window.document.getElementsByClassName(title)[0]
    const paddingX = 20

    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL('image/png')
      const pdf = new jsPDF('l', 'pt')

      // Calculate the position and size with padding
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth - 2 * paddingX
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Calculate the centered position with padding
      const xPos = (pdfWidth - imgWidth) / 2
      const yPos = (pdfHeight - imgHeight) / 2

      pdf.addImage(img, 'png', xPos, yPos, imgWidth, imgHeight)
      pdf.save(
        `สถิติผู้ใช้งานของส่วนราชการ_${title}_${startDate}_${endDate}.pdf`
      )
    })
  }

  return (
    <div>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={2}
        style={{ marginBottom: 48, paddingLeft: 24, paddingRight: 24 }}
      >
        <Typography
          component='h2'
          variant='h6'
          style={{
            fontSize: '1.7rem',
            fontWeight: 600,
            lineHeight: '1.3',
            zIndex: 3,
            color: theme.palette.secondary.main,
          }}
        >
          {title}
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<DownloadIcon />}
          onClick={(e) => div2PDF(e)}
        >
          ส่งออกเป็นไฟล์ PDF
        </Button>
      </Stack>
      <div className={title}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default Chart
