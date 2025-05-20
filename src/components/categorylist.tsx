// import { Category } from './category'

// export function CategoryList() {
// 	return (
// 		<>
// 			<h2 style={{color: '#1E1E1E', fontWeight: '500', margin: '0', marginTop: '20px', 				marginBottom: '20px'}}>
//         Category
//       </h2>

//       <div style={{
//         display: 'flex',
//         overflowX: 'auto',
//         gap: '12px',
//         paddingBottom: '8px',
//         WebkitOverflowScrolling: 'touch',
//       }}>
//         <Category color={'#ffda55'} classp={'WebApp'} title={'design'} projects={2}/>
//         <Category color={'#33ccff'} classp={'WebApp'} title={'development'} projects={4}/>
//         <Category color={'#ff7f50'} classp={'Bot'} title={'development'} projects={1}/>
//       </div>

// 		</>
// 	)
// }

'use client'

import { API_URL } from '@/config/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Category } from './category'

interface CategoryData {
  category: string
  project_count: number
}

const categoryColors: Record<string, string> = {
  web_app_development: '#33ccff',
  web_app_design: '#ffda55',
  bot_development: '#ff7f50',
  ui_ux_design: '#9b59b6',
  video_editing: '#2ecc71'
}

const categoryTitles: Record<string, string> = {
  web_app_development: 'Web App Development',
  web_app_design: 'Web App Design',
  bot_development: 'Bot Development',
  ui_ux_design: 'UI/UX Design',
  video_editing: 'Video Editing'
}

const categoryShortNames: Record<string, string> = {
  web_app_development: 'WebDev',
  web_app_design: 'Design',
  bot_development: 'Bot',
  ui_ux_design: 'UI/UX',
  video_editing: 'Video'
}

export function CategoryList() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
        if (!userId) {
          throw new Error('Не удалось получить ID пользователя Telegram')
        }

        const response = await axios.get(`${API_URL}/projects/categories`, {
          headers: {
            'auth': userId.toString(),
            'Content-Type': 'application/json'
          }
        })

        setCategories(response.data)
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err)
        setError('Не удалось загрузить категории')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <div>Загрузка категорий...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <h2 style={{
        color: '#1E1E1E',
        fontWeight: '500',
        margin: '0',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        Categories
      </h2>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '12px',
        paddingBottom: '8px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {categories.map((cat) => (
          <Category
            key={cat.category}
            color={categoryColors[cat.category] || '#cccccc'}
            classp={categoryShortNames[cat.category] || cat.category}
            title={categoryTitles[cat.category] || cat.category}
            projects={cat.project_count}
          />
        ))}
      </div>
    </>
  )
}