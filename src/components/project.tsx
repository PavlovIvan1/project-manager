// import { API_URL } from '@/config/config'
// import axios from 'axios'
// import { ArrowRight, ChevronDown } from 'lucide-react'
// import { useState } from 'react'


// const backgroundColors = [
// 	'#008ebb',
//   '#008ebb'
// ]


// interface ProjectProps {
//   id: number
//   name: string
//   description: string
//   budget: number
//   status: string
//   onStatusChange?: (projectId: number, newStatus: string) => void
// }

// export function Project({ id, name, description, budget, status, onStatusChange }: ProjectProps) {
//   const [isChangingStatus, setIsChangingStatus] = useState(false)
//   const [currentStatus, setCurrentStatus] = useState(status)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
  
//   const randomBackground = backgroundColors[
//     Math.floor(Math.random() * backgroundColors.length)
//   ]
//   const lighterBg = `${randomBackground.replace('#', '')}40`
//   const textColor = '#FFFFFF'
//   const secondaryTextColor = `${textColor}CC`

//   const formattedBudget = new Intl.NumberFormat('en-US').format(budget)

//   const statusOptions = [
//     { value: 'planned', label: 'Запланирован' },
//     { value: 'in_progress', label: 'В работе' },
//     { value: 'completed', label: 'Завершён' }
//   ]

//   const getStatusDisplay = (status: string) => {
//     const option = statusOptions.find(opt => opt.value === status)
//     return option ? option.label : status
//   }

//   const handleStatusChange = async (newStatus: string) => {
//     setIsChangingStatus(true)
//     try {
//       const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id
      
//       if (!userId) {
//         throw new Error('Не удалось получить ID пользователя Telegram')
//       }

//       await axios.patch(`${API_URL}/projects/${id}/status`, {
//         new_status: newStatus
//       }, {
//         headers: {
//           'auth': userId,
//           'Content-Type': 'application/json'
//         }
//       })

//       setCurrentStatus(newStatus)
//       if (onStatusChange) {
//         onStatusChange(id, newStatus)
//       }
//     } catch (error) {
//       console.error('Ошибка при изменении статуса:', error)
//       alert('Не удалось изменить статус проекта')
//     } finally {
//       setIsChangingStatus(false)
//       setIsMenuOpen(false)
//     }
//   }

//   return (
//     <div style={{ 
//       background: randomBackground, 
//       padding: '20px', 
//       borderRadius: '25px', 
//       marginTop: '10px', 
//       color: textColor,
//       transition: 'background 0.3s ease',
//       position: 'relative'
//     }}>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1 }}>
//           <h1 style={{ 
//             margin: '0', 
//             padding: '0', 
//             fontSize: '18px',
//             fontWeight: '600'
//           }}>
//             {name}
//           </h1>
//           <p style={{ 
//             margin: '8px 0 0 0',
//             color: secondaryTextColor,
//             fontSize: '14px'
//           }}>
//             {description}
//           </p>
          
//           <div style={{ 
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             marginTop: '15px'
//           }}>
//             <div style={{
//               background: lighterBg,
//               padding: '6px 12px',
//               borderRadius: '20px',
//               fontSize: '12px',
//               fontWeight: '500'
//             }}>
//               ${formattedBudget}
//             </div>
            
//             <div 
//               style={{
//                 background: lighterBg,
//                 padding: '6px 12px',
//                 borderRadius: '20px',
//                 fontSize: '12px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px',
//                 cursor: 'pointer',
//                 position: 'relative'
//               }}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isChangingStatus ? 'Загрузка...' : getStatusDisplay(currentStatus)}
//               <ChevronDown size={14} />
              
//               {isMenuOpen && (
//                 <div style={{
//                   position: 'absolute',
//                   top: '100%',
//                   left: 0,
//                   background: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                   zIndex: 10,
//                   minWidth: '120px',
//                   overflow: 'hidden'
//                 }}>
//                   {statusOptions.map(option => (
//                     <div
//                       key={option.value}
//                       style={{
//                         padding: '8px 12px',
//                         color: '#333',
//                         fontSize: '12px',
//                         cursor: 'pointer',
//                         backgroundColor: option.value === currentStatus ? '#f5f5f5' : 'white',
//                       }}
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         handleStatusChange(option.value)
//                       }}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
        
//         <div style={{ 
//           background: lighterBg,
//           borderRadius: '50%',
//           width: '40px',
//           height: '40px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           cursor: 'pointer'
//         }}>
//           <ArrowRight size={20} color={textColor} />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { API_URL } from '@/config/config'
import axios from 'axios'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const backgroundColors = [
  '#008ebb',
  '#008ebb'
]

interface ProjectProps {
  id: number
  name: string
  description: string
  budget: number
  status: string
  onStatusChange?: (projectId: number, newStatus: string) => void
}

export function Project({ id, name, description, budget, status, onStatusChange }: ProjectProps) {
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const randomBackground = backgroundColors[
    Math.floor(Math.random() * backgroundColors.length)
  ]
  const lighterBg = `${randomBackground.replace('#', '')}40`
  const textColor = '#FFFFFF'
  const secondaryTextColor = `${textColor}CC`

  const formattedBudget = new Intl.NumberFormat('en-US').format(budget)

  const statusOptions = [
    // { value: 'planned', label: 'Запланирован' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'done', label: 'Завершён' }
  ]

  const getStatusDisplay = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option ? option.label : status
  }

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) {
      setIsMenuOpen(false);
      return;
    }
  
    setIsChangingStatus(true);
    try {
      const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      
      if (!userId) {
        throw new Error('Не удалось получить ID пользователя Telegram');
      }
  
      const response = await axios.patch(
        `${API_URL}/projects/${id}/status`,
        { new_status: newStatus },
        {
          headers: {
            'auth': userId,
            'Content-Type': 'application/json'
          }
        }
      );
  
      setCurrentStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(id, newStatus);
      }
    } catch (err) {
      let errorMessage = 'Не удалось изменить статус проекта';
      
      if (axios.isAxiosError(err)) {
        // Ошибка от Axios (HTTP ошибка)
        errorMessage = err.response?.data?.detail || err.message || errorMessage;
      } else if (err instanceof Error) {
        // Стандартная JavaScript ошибка
        errorMessage = err.message;
      }
      
      console.error('Ошибка при изменении статуса:', err);
      alert(errorMessage);
    } finally {
      setIsChangingStatus(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <div style={{ 
      background: randomBackground, 
      padding: '20px', 
      borderRadius: '25px', 
      marginTop: '10px', 
      color: textColor,
      transition: 'all 0.3s ease',
      position: 'relative',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            margin: '0', 
            padding: '0', 
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '1.4'
          }}>
            {name}
          </h1>
          <p style={{ 
            margin: '8px 0 0 0',
            color: secondaryTextColor,
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            {description}
          </p>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '15px'
          }}>
            <div style={{
              background: lighterBg,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center'
            }}>
              ${formattedBudget}
            </div>
            
            {/* Блок изменения статуса */}
            <div 
              style={{
                background: lighterBg,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                position: 'relative',
                border: `1px solid ${textColor}30`,
                userSelect: 'none',
                minWidth: '110px',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Нажмите для изменения статуса"
            >
              {isChangingStatus ? (
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  Загрузка...
                </span>
              ) : (
                <>
                  <span style={{ flex: 1 }}>
                    {getStatusDisplay(currentStatus)}
                  </span>
                  <ChevronDown 
                    size={16} 
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} 
                  />
                </>
              )}
              
              {/* Выпадающее меню статусов */}
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 5px)',
                  left: 0,
                  right: 0,
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  {statusOptions.map(option => (
                    <div
                      key={option.value}
                      style={{
                        padding: '10px 12px',
                        color: '#333',
                        fontSize: '13px',
                        cursor: 'pointer',
                        backgroundColor: option.value === currentStatus ? '#f5f5f5' : 'white',
                        transition: 'background-color 0.2s ease',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(option.value)
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div style={{ 
          background: lighterBg,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'transform 0.2s ease',
        }}>
          <ArrowRight size={20} color={textColor} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}