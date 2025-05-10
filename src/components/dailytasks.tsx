import { Task } from './task'



export function Daily() {
	return (
		<>
			<div>
				<div   style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h2 style={{color: '#1E1E1E', fontWeight: '500'}}>All projects</h2>
					<span style={{ color: '#246BFD' }}>see all</span>
				</div>
				<Task title={'Do programming'} time={'11:00 - 14:00'} progress={75} />
				<Task title={'Watch film'} time={'14:00 - 15:00'} progress={40} />
			</div>
		</>
	)
}