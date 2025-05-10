'use client'

import { Project } from '@/components/project'
import { API_URL } from '@/config/config'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  status: string
  budget: number
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }

        const response = await axios.get(`${API_URL}/projects`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        setProjects(response.data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="Page">
        <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
          Projects
        </h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '20px'
        }}>
          <div className="loader"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="Page">
        <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
          Projects
        </h2>
        <p style={{ color: 'red', padding: '20px' }}>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            background: '#1E1E1E',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="Page">
      <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
        Projects
      </h2>
      
      <div style={{ marginTop: '20px' }}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Project 
              key={project.id}
              id={project.id}  // Передаем обязательный пропс id
              name={project.title}
              description={project.description}
              budget={project.budget}
              status={project.status}
            />
          ))
        ) : (
          <p style={{ padding: '20px' }}>No projects found</p>
        )}
      </div>
    </div>
  )
}