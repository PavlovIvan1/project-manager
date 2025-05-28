//@ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import { BarChart } from './barchart'
import { DoughnutChart } from './doughnutchart'

export const AnalyticsDashboard = () => {
  const [generalStats, setGeneralStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGeneralStats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }
        
        const response = await fetch(`http://localhost:8000/analytics`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch general stats')
        }

        const data = await response.json()
        setGeneralStats(data)
      } catch (err) {
        console.error('Failed to fetch general stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGeneralStats()
  }, [])

  if (loading) return <div>Loading dashboard...</div>
  if (error) return <div>Error: {error}</div>
  if (!generalStats) return <div>No data available</div>

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Analytics Dashboard</h1>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard 
          title="Total Earned" 
          value={`$${generalStats.total_earned}`} 
          color="#4bc0c0"
        />
        <StatCard 
          title="Total Projects" 
          value={generalStats.total_projects} 
          color="#36a2eb"
        />
        <StatCard 
          title="Completed" 
          value={generalStats.status_stats?.done || 0} 
          color="#ff6384"
        />
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        marginTop: '30px'
      }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <BarChart />
        </div>
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '10px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <DoughnutChart />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, color }) => (
  <div style={{ 
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }}>
    <h3 style={{ color: '#666', marginBottom: '10px' }}>{title}</h3>
    <p style={{ 
      fontSize: '24px', 
      fontWeight: 'bold',
      color: color,
      margin: 0
    }}>{value}</p>
  </div>
)