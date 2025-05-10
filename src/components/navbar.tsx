// 'use client'

// import { BadgeDollarSignIcon, Folder, Home, Plus } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useRef, useState } from 'react'

// const iconRoutes = [
//   { path: '/', icon: Home },
//   { path: '/projects', icon: Folder },
//   { path: '/fin', icon: BadgeDollarSignIcon },
// ]

// export function NavBar() {
//   const pathname = usePathname()
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isModalOpen, setIsModalOpen] = useState(false) // Состояние модалки
//   const navRef = useRef<HTMLDivElement>(null)
//   const dotRef = useRef<HTMLDivElement>(null)

//   // Находим индекс текущего маршрута
//   useEffect(() => {
//     const newIndex = iconRoutes.findIndex(route => route.path === pathname)
//     if (newIndex !== -1 && newIndex !== currentIndex) {
//       setCurrentIndex(newIndex)
//     }
//   }, [pathname, currentIndex])

//   // Анимация точки
//   useEffect(() => {
//     if (!navRef.current || !dotRef.current) return

//     const nav = navRef.current
//     const dot = dotRef.current
//     const icons = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>

//     if (icons.length === 0 || currentIndex >= icons.length) return

//     const currentIcon = icons[currentIndex]
//     const iconRect = currentIcon.getBoundingClientRect()
//     const navRect = nav.getBoundingClientRect()

//     const x = iconRect.left - navRect.left + iconRect.width / 2 - 3
//     const y = iconRect.bottom - navRect.top - 8

//     dot.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
//     dot.style.transform = `translate(${x}px, ${y}px)`
//   }, [currentIndex])

//   return (
//     <div style={{ position: 'relative' }}>
//       {/* Навбар */}
//       <div ref={navRef} style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         background: 'white',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         padding: '10px 20px',
//         position: 'relative',
//       }}>
//         <div ref={dotRef} style={{
//           position: 'absolute',
//           width: '6px',
//           height: '6px',
//           borderRadius: '50%',
//           backgroundColor: '#f2ea4a',
//           left: 0,
//           top: 0,
//           transform: 'translate(0, 0)',
//           willChange: 'transform',
//         }} />

//         {/* Кнопка плюса с обработчиком */}
//         <div 
//           onClick={() => setIsModalOpen(true)}
//           style={{
//             background: 'black',
//             width: '50px',
//             height: '50px',
//             borderRadius: '100%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             cursor: 'pointer',
//             transition: 'transform 0.2s ease',
//           }} 
//           className="hover:scale-105"
//         >
//           <Plus color='white' width={35} height={35} strokeWidth={2} />
//         </div>

//         {iconRoutes.map((route, index) => {
//           const Icon = route.icon
//           const isActive = pathname === route.path
//           return (
//             <Link 
//               key={route.path} 
//               href={route.path} 
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '10px',
//                 borderRadius: '12px',
//                 position: 'relative',
//               }}
//               className="hover:bg-gray-100"
//             >
//               <Icon 
//                 width={30} 
//                 height={30} 
//                 color={isActive ? '#f2ea4a' : '#666666'}
//                 style={{
//                   transition: 'color 0.3s ease',
//                 }}
//               />
//             </Link>
//           )
//         })}
//       </div>
//     </div>
//   )
// }


'use client'

import { BadgeDollarSignIcon, Folder, Home, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const iconRoutes = [
  { path: '/', icon: Home },
  { path: '/projects', icon: Folder },
  { path: '/fin', icon: BadgeDollarSignIcon },
]

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Находим индекс текущего маршрута
  useEffect(() => {
    const newIndex = iconRoutes.findIndex(route => route.path === pathname)
    if (newIndex !== -1 && newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }, [pathname, currentIndex])

  // Анимация точки
  useEffect(() => {
    if (!navRef.current || !dotRef.current) return

    const nav = navRef.current
    const dot = dotRef.current
    const icons = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>

    if (icons.length === 0 || currentIndex >= icons.length) return

    const currentIcon = icons[currentIndex]
    const iconRect = currentIcon.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    const x = iconRect.left - navRect.left + iconRect.width / 2 - 3
    const y = iconRect.bottom - navRect.top - 8

    dot.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    dot.style.transform = `translate(${x}px, ${y}px)`
  }, [currentIndex])

  const handleCreateProject = () => {
    router.push('/projects/create')
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Навбар */}
      <div ref={navRef} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background: '#14141',
        background: 'white',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '10px 20px',
        position: 'relative',
      }}>
        <div ref={dotRef} style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#f2ea4a',
          left: 0,
          top: 0,
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }} />

        {/* Кнопка плюса с переходом на создание проекта */}
        <div 
          onClick={handleCreateProject}
          style={{
            background: 'black',
            width: '50px',
            height: '50px',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }} 
          className="hover:scale-105"
        >
          <Plus color='white' width={35} height={35} strokeWidth={2} />
        </div>

        {iconRoutes.map((route, index) => {
          const Icon = route.icon
          const isActive = pathname === route.path
          return (
            <Link 
              key={route.path} 
              href={route.path} 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '12px',
                position: 'relative',
              }}
              className="hover:bg-gray-100"
            >
              <Icon 
                width={30} 
                height={30} 
                color={isActive ? '#f2ea4a' : '#666666'}
                style={{
                  transition: 'color 0.3s ease',
                }}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}