// import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
// import { Doughnut } from 'react-chartjs-2'


// ChartJS.register(ArcElement, Tooltip, Legend);

// export const DoughnutChart = () => {
//   const data = {
//     labels: ['Red', 'Blue', 'Yellow'],
//     datasets: [
//       {
//         label: 'My First Dataset',
//         data: [300, 50, 100],
//         backgroundColor: [
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
//       <Doughnut data={data} />
//     </div>
//   );
// };

// @ts-nocheck
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = () => {
  const [categoryStats, setCategoryStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }
        
        const response = await fetch(`http://localhost:8000/projects/categories`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch category stats')
        }

        const data = await response.json()
        setCategoryStats(data)
      } catch (err) {
        console.error('Failed to fetch category stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryStats()
  }, [])

  if (loading) return <div>Loading category statistics...</div>
  if (error) return <div>Error: {error}</div>
  if (!categoryStats.length) return <div>No category data available</div>

  const categoryNames = {
    web_app_design: 'Web App Design',
    web_app_development: 'Web Development',
    bot_development: 'Bot Development',
    ui_ux_design: 'UI/UX Design',
    video_editing: 'Video Editing'
  }

  const labels = categoryStats.map(item => categoryNames[item.category] || item.category)
  const projectCounts = categoryStats.map(item => item.project_count)

  const backgroundColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Projects by Category',
        data: projectCounts,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: '#fff',
        borderWidth: 1,
        hoverOffset: 15,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    cutout: '70%',
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Projects by Category</h3>
      <Doughnut data={data} options={options} />
    </div>
  )
}