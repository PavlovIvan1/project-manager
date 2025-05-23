// // @ts-nocheck
// // src/app/projects/category/[category]/page.tsx
// 'use client'

// import { Project } from '@/components/project'
// import axios from 'axios'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'


// export default function CategoryProjectsPage({ params }) {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const router = useRouter()


//   useEffect(() => {
//     console.log('params', params)
//     const category = router.query.id
//     console.log('category', category)
//     console.log('router', router)


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

// @ts-nocheck
// src/app/projects/category/[category]/page.tsx
'use client'

import { Project } from '@/components/project'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CategoryProjectsPage({ params: initialParams }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams() || initialParams

  useEffect(() => {
    console.log('params', params)
    const category = params.category
    console.log('category', category)

    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        
        if (!userId) {
          throw new Error('Telegram user ID not available')
        }
        
        const response = await axios.get(`http://localhost:8000/get_projects_by_category?category=${category}`, {
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