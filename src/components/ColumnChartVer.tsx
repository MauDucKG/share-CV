import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { useEffect, useState} from 'react';

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

export const ColumnChartVer : React.FC<Props> = ({name, columnNames, values}) => {
    const [chartWidth, setChartWidth] = useState(0);
    const [charHeight, setChartHeight] = useState(0);


    useEffect(() => {
        const handleResize = () => {
        setChartWidth(window.innerWidth * 0.55);
        setChartHeight(window.innerHeight * 0.4)
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
        <h4 style={{ justifyContent: 'center', textAlign: 'center' }}> {name} </h4>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BarChart width={chartWidth} height={charHeight} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#1ED851'}}>
                </XAxis>
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="candidate" fill="#8884d8" barSize={40} /> */}
                <Bar dataKey="candidate" fill={data[0].fill} barSize={40} />

            </BarChart>
        </div>
    </div>
);
};
