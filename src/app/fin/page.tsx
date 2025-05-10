'use client'

import { BarChart } from '@/components/barchart'
import { DoughnutChart } from '@/components/doughnutchart'
import { LineChart } from 'lucide-react'

export default function Fin() {
	return (
		<>
			<div className='Page'>
				<h2 style={{color: '#1E1E1E', fontWeight: '500',  margin: '0', marginTop: '20px'}}>Finance</h2>
			</div>
			<div>
				<BarChart />
				<DoughnutChart />
				<LineChart
			</div>
		</>
	)
}