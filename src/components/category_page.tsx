// @ts-nocheck
'use client'

import { API_URL } from '@/config/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Category } from './category'

const categoryColors = {
  web_app_development: '#33ccff',
  web_app_design: '#ffda55',
  bot_development: '#ff7f50',
  ui_ux_design: '#9b59b6',
  video_editing: '#2ecc71'
}

const categoryDisplayConfig = {
  web_app_development: {
    keyword: 'Web App',
    subtitle: 'Development'
  },
  web_app_design: {
    keyword: 'Web App',
    subtitle: 'Design'
  },
  bot_development: {
    keyword: 'Bot',
    subtitle: 'Development'
  },
  ui_ux_design: {
    keyword: 'UI/UX',
    subtitle: 'Design'
  },
  video_editing: {
    keyword: 'Video',
    subtitle: 'Editing'
  }
}

export function CategoryGrid() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    return <div style={{ padding: '16px', textAlign: 'center' }}>Загрузка категорий...</div>
  }

  if (error) {
    return <div style={{ padding: '16px', color: 'red', textAlign: 'center' }}>{error}</div>
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{
        color: '#1E1E1E',
        fontWeight: '500',
        margin: '0 0 20px 0'
      }}>
        Categories
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        {categories.map((cat) => {
          const config = categoryDisplayConfig[cat.category] || { 
            keyword: cat.category.split('_')[0], 
            subtitle: cat.category.split('_').slice(1).join(' ') 
          }
          
          return (
            <div key={cat.category} style={{ width: '100%' }}>
              <Category
                color={categoryColors[cat.category] || '#cccccc'}
                classp={config.keyword}
                title={config.subtitle}
                projects={cat.project_count}
                categoryId={cat.category}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}