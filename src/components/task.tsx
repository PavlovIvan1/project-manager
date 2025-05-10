import Box from '@mui/material/Box'
import CircularProgress, {
	CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'


function CircularProgressWithLabel(
	props: CircularProgressProps & { value: number },
) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			{/* Серый фон (незаполненная часть) */}
			<CircularProgress
				variant="determinate"
				value={100}
				sx={{
					color: '#E0E0E0',
					position: 'absolute',
				}}
				size={60}
				thickness={4}
			/>
			{/* Основной прогресс (с закруглёнными краями) */}
			<CircularProgress
				variant="determinate"
				{...props}
				size={60}
				thickness={4}
				sx={{
					// Закругляем края прогресса
					'& .MuiCircularProgress-circle': {
						strokeLinecap: 'round',
					},
					color: '#f2ea4a',
					...props.sx, // Сохраняем переданные стили
				}}
			/>
			{/* Текст с процентами */}
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					sx={{ color: 'white', fontSize: '0.8rem' }}
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

interface TaskProps {
  progress: number;
  title: string;
  time?: string;
}

export function Task({ progress, title, time }: TaskProps) {
	return (
		<>
				<div style={{ marginTop: '10px' }}>
					<div style={{ backgroundColor:  '#F0F0F0', padding: '20px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div>
							<h3 style={{margin: '0', color:  '#1E1E1E', fontWeight: '500'}}>{title}</h3>
						</div>
						<CircularProgressWithLabel value={progress} />
					</div>
				</div>
		</>
	)
}