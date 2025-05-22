// // @ts-nocheck
// // src/app/projects/category/[category]/page.tsx
// 'use client'

// import { Project } from '@/components/project'
// import axios from 'axios'
// import { useEffect, useState } from 'react'


// export default function CategoryProjectsPage({ params }) {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)


//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         setError(null)
        
//         const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
//         if (!userId) {
//           throw new Error('Telegram user ID not available')
//         }
//         // ${API_URL}
//         const response = await axios.get(`http://localhost:8000/get_projects_by_category?category=web_app_design`, {
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
//       <div style={{ padding: '20px' }}>
//         <h2>Loading projects...</h2>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div style={{ padding: '20px', color: 'red' }}>
//         <h2>Error loading projects</h2>
//         <p>{error}</p>
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
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ marginBottom: '20px' }}>
//         {params.category.replace(/_/g, ' ')} Projects
//       </h2>
      
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <Project 
//             key={project.id}
//             id={project.id}
//             name={project.title}
//             description={project.description}
//             budget={project.budget}
//             status={project.status}
//           />
//         ))
//       ) : (
//         <p>No projects found in this category</p>
//       )}
//     </div>
//   )
// }


// src/app/projects/category/[category]/page.tsx
'use client'

import { Project } from '@/components/project'
import axios from 'axios'
import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function CategoryProjectsPage({ params }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        if (!userId) throw new Error('Telegram auth required')

        const res = await axios.get(`${API_URL}/api/projects/by-category`, {
          params: { category: params.category },
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })
        
        setData(res.data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [params.category])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div style={{ padding: '20px' }}>
      <h2>{params.category.replace(/_/g, ' ')} Projects</h2>
      {data?.data?.length > 0 ? (
        data.data.map(project => (
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
        <p>No projects found</p>
      )}
    </div>
  )
}