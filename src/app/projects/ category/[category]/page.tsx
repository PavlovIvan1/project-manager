// @ts-nocheck
// src/app/projects/category/[category]/page.tsx
'use client'

import { Project } from '@/components/project'
import { API_URL } from '@/config/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// interface Project {
//   id: number
//   title: string
//   description: string
//   status: string
//   budget: number
// }

// export default function CategoryProjectsPage({
//   params,
// }: {
//   params: { category: string }
// }) {
//   const [projects, setProjects] = useState<Project[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         setError(null)
        
//         const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
//         if (!userId) {
//           throw new Error('Telegram user ID not available')
//         }

//         const response = await axios.get(`${API_URL}/projects/category/${params.category}`, {
//           headers: {
//             'auth': userId,
//             'Content-Type': 'application/json'
//           }
//         })

//         setProjects(response.data)
//       } catch (err) {
//         console.error('Failed to fetch projects:', err)
//         setError(err instanceof Error ? err.message : 'Unknown error')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [params.category])

//   if (loading) {
//     return (
//       <div className="Page">
//         <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
//           {params.category.replace(/_/g, ' ')} Projects
//         </h2>
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           padding: '20px'
//         }}>
//           <div className="loader"></div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="Page">
//         <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
//           {params.category.replace(/_/g, ' ')} Projects
//         </h2>
//         <p style={{ color: 'red', padding: '20px' }}>Error: {error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             padding: '8px 16px',
//             background: '#1E1E1E',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Try Again
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="Page">
//       <h2 style={{ color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px' }}>
//         {params.category.replace(/_/g, ' ')} Projects
//       </h2>
      
//       <div style={{ marginTop: '20px' }}>
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <Project 
//               key={project.id}
//               id={project.id}
//               name={project.title}
//               description={project.description}
//               budget={project.budget}
//               status={project.status}
//             />
//           ))
//         ) : (
//           <p style={{ padding: '20px' }}>No projects found in this category</p>
//         )}
//       </div>
//     </div>
//   )
// }

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