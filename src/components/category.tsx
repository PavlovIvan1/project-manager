'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'


const baseColor = '#ffda55'

export function Category({ color, title, projects, classp, categoryId }) {

	const router = useRouter()

	const handleClick = () => {
		router.push(`/projects/category/${encodeURIComponent(categoryId)}`)
  }

	return (
		<>
			<div style={{ minWidth: '170px', height: '200px', background: color, padding: '10px', boxSizing: 'border-box',  borderRadius: '20px' }} onClick={handleClick}>
				<h3 style={{ fontWeight: '600', margin: '0' }}>{classp} <br /> <span style={{ fontWeight: '400' }}>{title}</span></h3>
				<span style={{ fontSize: '14px' }}>{projects} projects</span>

				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}>
					View all
					<div style={{ background: 'white', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
						<ArrowRight color={color} />
					</div>
				</div>

			</div>
		</>
	)
}