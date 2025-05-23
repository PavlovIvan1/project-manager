import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'


ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
      <Doughnut data={data} />
    </div>
  );
};