// @ts-nocheck
// src/app/projects/category/[category]/page.tsx
'use client'

import { useEffect, useState } from 'react'

export default function CategoryProjectsPage({ params }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }

        const response = await axios.get(`${API_URL}/projects/category/${params.category}`, {
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
  }, [params.category])

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Loading projects...</h2>
      </div>
    )
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
      <h2 style={{ marginBottom: '20px' }}>
        {params.category.replace(/_/g, ' ')} Projects
      </h2>
      
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
