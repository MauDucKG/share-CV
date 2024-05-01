import React from 'react';
import { useEffect, useState, useRef} from 'react';
import { BarChart, Bar, YAxis, XAxis, Tooltip, Legend} from 'recharts';
import styled from "@emotion/styled"

type Props = {
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

export const ColumnChartHor: React.FC<Props> = ({ columnNames, values }) => {
  const [chartWidth, setChartWidth] = useState(0);
  const [charHeight, setChartHeight] = useState(0);
  const [charWord, setChartWord] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.55);
      setChartHeight(window.innerHeight * 0.7)
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
    <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BarChart width={chartWidth} height={charHeight} data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" tick={{ fill: '#FC21CC' }} interval={0} width={charWord} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="candidate" fill={data[0].fill} barSize="30" />
        </BarChart>
      </div>
    </div>
  );
};


const StyledWrapper = styled.div`
.box-demand-job {
  background: #333333;
  border: 1px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px 24px;
  position: relative;
  transition: .3s
}
`
