// 'use client'

// import { API_URL } from '@/config/config'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// interface ProjectFormData {
//   title: string
//   description: string
//   budget: string // Храним как строку для удобства ввода
//   status: 'in_progress' | 'planned' | 'completed'
// }

// export default function CreateProjectPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState<ProjectFormData>({
//     title: '',
//     description: '',
//     budget: '',
//     status: 'in_progress'
//   })
//   const [errors, setErrors] = useState<Partial<ProjectFormData>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const validate = (): boolean => {
//     const newErrors: Partial<ProjectFormData> = {}
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Название проекта обязательно'
//     } else if (formData.title.length > 100) {
//       newErrors.title = 'Название должно быть короче 100 символов'
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Описание проекта обязательно'
//     }
    
//     if (!formData.budget) {
//       newErrors.budget = 'Бюджет обязателен'
//     } else if (isNaN(Number(formData.budget))) {
//       newErrors.budget = 'Бюджет должен быть числом'
//     } else if (Number(formData.budget) <= 0) {
//       newErrors.budget = 'Бюджет должен быть положительным'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!validate()) return
    
//     try {
//       setIsSubmitting(true)
//       const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
      
//       if (!userId) {
//         throw new Error('Не удалось получить ID пользователя Telegram')
//       }

//       await axios.post(`${API_URL}/projects`, {
//         title: formData.title,
//         description: formData.description,
//         status: formData.status,
//         budget: Number(formData.budget) 
//       }, {
//         headers: {
//           'auth': userId,
//           'Content-Type': 'application/json'
//         }
//       })

//       router.push('/projects')
//     } catch (error) {
//       console.error('Ошибка при создании проекта:', error)
//       alert('Не удалось создать проект. Пожалуйста, попробуйте ещё раз.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="page-container">
//       <h1 className="page-title">Создать новый проект</h1>
      
//       <form onSubmit={handleSubmit} className="project-form">
//         <div className="form-group">
//           <label htmlFor="title">Название проекта</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             maxLength={100}
//             className={errors.title ? 'input-error' : ''}
//             placeholder="Например: OZZO"
//           />
//           {errors.title && <span className="error-message">{errors.title}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Описание</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             className={errors.description ? 'input-error' : ''}
//             placeholder="Подробное описание вашего проекта"
//           />
//           {errors.description && (
//             <span className="error-message">{errors.description}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="budget">Бюджет ($)</label>
//           <input
//             type="number"
//             id="budget"
//             name="budget"
//             value={formData.budget}
//             onChange={handleChange}
//             min="0"
//             step="1000"
//             className={errors.budget ? 'input-error' : ''}
//             placeholder="Например: 1000000"
//           />
//           {errors.budget && <span className="error-message">{errors.budget}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="status">Статус</label>
//           <select
//             id="status"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//           >
//             <option value="in_progress">В работе</option>
//             <option value="planned">Запланирован</option>
//             <option value="completed">Завершён</option>
//           </select>
//         </div>

//         <div className="form-actions">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="submit-button"
//           >
//             {isSubmitting ? 'Создание...' : 'Создать проект'}
//           </button>
//         </div>
//       </form>

//       <style jsx>{`
//         .page-container {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
//         .page-title {
//           color: #1E1E1E;
//           font-weight: 500;
//           margin-bottom: 30px;
//         }
//         .project-form {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }
//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         label {
//           font-weight: 500;
//           color: #333;
//         }
//         input, textarea, select {
//           padding: 12px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-size: 16px;
//           font-family: inherit;
//         }
//         textarea {
//           resize: vertical;
//         }
//         .input-error {
//           border-color: #ff4d4f;
//         }
//         .error-message {
//           color: #ff4d4f;
//           font-size: 14px;
//         }
//         .submit-button {
//           padding: 14px 24px;
//           background-color: #1E1E1E;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 16px;
//           font-weight: 500;
//           transition: background-color 0.2s;
//         }
//         .submit-button:hover {
//           background-color: #333;
//         }
//         .submit-button:disabled {
//           background-color: #999;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   )
// }




'use client'

import { API_URL } from '@/config/config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProjectFormData {
  title: string
  description: string
  budget: string // Храним как строку для удобства ввода
  status: 'in_progress' | 'planned' | 'completed'
  category: 'web_app_development' | 'web_app_design' | 'bot_development' | 'ui_ux_design' | 'video_editing'
}

export default function CreateProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    budget: '',
    status: 'in_progress',
    category: 'web_app_development'
  })
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название проекта обязательно'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Название должно быть короче 100 символов'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание проекта обязательно'
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Бюджет обязателен'
    } else if (isNaN(Number(formData.budget))) {
      newErrors.budget = 'Бюджет должен быть числом'
    } else if (Number(formData.budget) <= 0) {
      newErrors.budget = 'Бюджет должен быть положительным'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    try {
      setIsSubmitting(true)
      const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
      
      if (!userId) {
        throw new Error('Не удалось получить ID пользователя Telegram')
      }

      await axios.post(`${API_URL}/projects`, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        category: formData.category,
        budget: Number(formData.budget) 
      }, {
        headers: {
          'auth': userId,
          'Content-Type': 'application/json'
        }
      })

      router.push('/projects')
    } catch (error) {
      console.error('Ошибка при создании проекта:', error)
      alert('Не удалось создать проект. Пожалуйста, попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { value: 'web_app_development', label: 'Разработка веб-приложений' },
    { value: 'web_app_design', label: 'Дизайн веб-приложений' },
    { value: 'bot_development', label: 'Разработка ботов' },
    { value: 'ui_ux_design', label: 'UI/UX дизайн' },
    { value: 'video_editing', label: 'Видеомонтаж' }
  ]

  return (
    <div className="page-container">
      <h1 className="page-title">Создать новый проект</h1>
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Название проекта</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            className={errors.title ? 'input-error' : ''}
            placeholder="Например: OZZO"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={errors.description ? 'input-error' : ''}
            placeholder="Подробное описание вашего проекта"
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="budget">Бюджет ($)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
            step="1000"
            className={errors.budget ? 'input-error' : ''}
            placeholder="Например: 1000000"
          />
          {errors.budget && <span className="error-message">{errors.budget}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="in_progress">В работе</option>
            <option value="planned">Запланирован</option>
            <option value="completed">Завершён</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Создание...' : 'Создать проект'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .page-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .page-title {
          color: #1E1E1E;
          font-weight: 500;
          margin-bottom: 30px;
        }
        .project-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-weight: 500;
          color: #333;
        }
        input, textarea, select {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          font-family: inherit;
        }
        textarea {
          resize: vertical;
        }
        .input-error {
          border-color: #ff4d4f;
        }
        .error-message {
          color: #ff4d4f;
          font-size: 14px;
        }
        .submit-button {
          padding: 14px 24px;
          background-color: #1E1E1E;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .submit-button:hover {
          background-color: #333;
        }
        .submit-button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}