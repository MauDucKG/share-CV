import React from 'react';
import { useEffect, useState} from 'react';
import { BarChart, Bar, YAxis, XAxis, Tooltip, Legend} from 'recharts';

type Props = {
  name: string;
  columnNames: string[];
  values: number[];
};

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const ColumnChartHor: React.FC<Props> = ({ name, columnNames, values }) => {
  const [chartWidth, setChartWidth] = useState(0);
  const [charHeight, setChartHeight] = useState(0);
  const [charWord, setChartWord] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.55);
      setChartHeight(window.innerHeight * 0.75)
      setChartWord(window.innerWidth * 0.2)
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = columnNames.map((name, index) => ({
    name: name,
    candidate: values[index],
    fill: getRandomColor()
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4 style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}> {name} </h4>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BarChart width={chartWidth} height={charHeight} data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" tick={{ fill: '#FC21CC' }} interval={0} width={charWord} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="candidate" fill={data[0].fill} barSize={40} />
        </BarChart>
      </div>
    </div>
  );
};