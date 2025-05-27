// @ts-nocheck
'use client'

import { Project } from '@/components/project'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CategoryProjectsPage({ params: initialParams }) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams() || initialParams

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }
        
        const response = await axios.get(`http://localhost:8000/get_projects_by_category?category=${params.id}`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        setProjects(response.data.projects || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [params.id])

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading projects...</div>
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error loading projects</h2>
        <p>{error}</p>
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
    <div style={{ padding: '20px' }}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Project 
            key={project.id}
            id={project.id}
            name={project.title}
            description={project.description}
            budget={project.budget}
            status={project.status}
          />
        ))
      ) : (
        <p>No projects found in this category</p>
      )}
    </div>
  )
}