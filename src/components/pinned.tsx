// 'use client'

// import { API_URL } from '@/config/config'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { Project } from './project'

// interface ProjectData {
//   id: number
//   title: string
//   description: string
//   budget: number
//   status: string
// }

// export function Pinned() {
//   const [firstProject, setFirstProject] = useState<ProjectData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
//         if (!userId) {
//           throw new Error('Telegram user ID not available')
//         }

//         const response = await axios.get<ProjectData[]>(`${API_URL}/projects`, {
//           headers: {
//             'auth': userId,
//             'Content-Type': 'application/json'
//           }
//         })

//         if (response.data?.length > 0) {
//           setFirstProject(response.data[0])
//         }
//       } catch (err) {
//         console.error('Failed to fetch projects:', err)
//         setError(err instanceof Error ? err.message : 'Failed to load projects')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [])

//   if (loading) {
//     return (
//       <>
//         <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
//           Pinned project
//         </h2>
//         <p>Loading project...</p>
//       </>
//     )
//   }

//   if (error) {
//     return (
//       <>
//         <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
//           Pinned project
//         </h2>
//         <p style={{color: 'red'}}>Error: {error}</p>
//       </>
//     )
//   }

//   if (!firstProject) {
//     return (
//       <>
//         <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
//           Pinned project
//         </h2>
//         <p>No projects available</p>
//       </>
//     )
//   }

//   return (
//     <>
//       <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
//         Pinned project
//       </h2>
//       <Project 
//         name={firstProject.title} 
//         description={firstProject.description} 
//         budget={firstProject.budget} 
//         status={firstProject.status} 
//       />
//     </>
//   )
// }

'use client'

import { API_URL } from '@/config/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Project } from './project'

interface ProjectData {
  id: number
  title: string
  description: string
  budget: number
  status: string
}

export function Pinned() {
  const [firstProject, setFirstProject] = useState<ProjectData | null>(null)
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

        const response = await axios.get<ProjectData[]>(`${API_URL}/projects`, {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        })

        if (response.data?.length > 0) {
          setFirstProject(response.data[0])
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <>
        <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
          Pinned project
        </h2>
        <p>Loading project...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
          Last project
        </h2>
        <p style={{color: 'red'}}>Error: {error}</p>
      </>
    )
  }

  if (!firstProject) {
    return (
      <>
        <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
          Last project
        </h2>
        <p>No projects available</p>
      </>
    )
  }

  return (
    <>
      <h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px'}}>
        Last project
      </h2>
      <Project 
        id={firstProject.id}  // Добавлен обязательный пропс id
        name={firstProject.title} 
        description={firstProject.description} 
        budget={firstProject.budget} 
        status={firstProject.status} 
      />
    </>
  )
}