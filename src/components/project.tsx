'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

interface ProjectProps {
  id: number
  name: string
  description: string
  budget: number
  status: string
}

export function Project({ id, name, description, budget, status }: ProjectProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/projects/${id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return '#33ccff'
      case 'planned':
        return '#ffda55'
      case 'completed':
        return '#2ecc71'
      default:
        return '#cccccc'
    }
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '500' }}>{name}</h3>
        <span style={{ 
          background: getStatusColor(status),
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          color: 'white'
        }}>
          {status.replace('_', ' ')}
        </span>
      </div>
      <p style={{ margin: '10px 0', color: '#666' }}>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#1E1E1E', fontWeight: '500' }}>${budget}</span>
      </div>
    </div>
  )
}