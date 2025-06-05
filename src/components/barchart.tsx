// import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
// import { Bar } from 'react-chartjs-2'


// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export const BarChart = () => {
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Earned ',
//         data: [65000, 59000, 80000, 81000, 56000, 55000, 40000,],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(201, 203, 207, 0.2)',
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)',
//           'rgb(255, 205, 86)',
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(153, 102, 255)',
//           'rgb(201, 203, 207)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// @ts-nocheck
'use client'

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const BarChart = () => {
  const [monthlyStats, setMonthlyStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }
        
        const response = await fetch(`https://bug-free-invention-x5wq9g59qqr7cv5p5-8000.app.github.dev//analytics/monthly`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch monthly stats')
        }

        const data = await response.json()
        setMonthlyStats(data)
      } catch (err) {
        console.error('Failed to fetch monthly stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMonthlyStats()
  }, [])

  if (loading) return <div>Loading monthly statistics...</div>
  if (error) return <div>Error: {error}</div>
  if (!monthlyStats.length) return <div>No monthly data available</div>

  const labels = monthlyStats.map(item => {
    const [year, month] = item.month.split('-')
    return new Date(year, month-1).toLocaleString('default', { month: 'short' })
  })

  const earnedData = monthlyStats.map(item => item.total_earned)
  const projectCountData = monthlyStats.map(item => item.project_count)

  const data = {
    labels,
    datasets: [
      {
        label: 'Earned ($)',
        data: earnedData,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
      {
        label: 'Projects Completed',
        data: projectCountData,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      }
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Projects Statistics',
      },
    },
  }

  return <Bar data={data} options={options} />
}