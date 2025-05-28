'use client'

import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'

export default function Fin() {
	return (
		<>
			<div className='Page'>
				<h2 style={{color: '#1E1E1E', fontWeight: '500',  margin: '0', marginTop: '20px'}}>Analytics Dashboard</h2>
			</div>
			<div>
				{/* <BarChart />
				<DoughnutChart /> */}
				<AnalyticsDashboard />
			</div>
		</>
	)
}