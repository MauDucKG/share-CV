import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { useEffect, useState} from 'react';

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

export const ColumnChartVer : React.FC<Props> = ({ columnNames, values}) => {
    const [chartWidth, setChartWidth] = useState(0);
    const [charHeight, setChartHeight] = useState(0);


    useEffect(() => {
        const handleResize = () => {
        setChartWidth(window.innerWidth * 1);
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
        candidates: values[index],
        fill: getRandomColor()
    }));
    

    return (
    <div style={{ alignItems: 'center' }}>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BarChart width={chartWidth} height={charHeight} data={data} >
        <CartesianGrid display="none" />
        <XAxis dataKey="candidates" tick={{ fill: '#1ED851' }} />
        <Tooltip labelFormatter={(label) => data[label].name}/>
        <Bar dataKey="candidates" fill={data[0].fill} barSize={chartWidth / 9} />
        </BarChart>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {data.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '20px', flexBasis: '28%', marginTop: '20px' }}>
            <div style={{ width: '20px', height: '10px', backgroundColor: item.fill, marginRight: '10px' }}></div>
            <div style={{ color: '#fff', fontFamily: 'Inter', fontSize: '14px', fontStyle: 'normal' }}>{item.name}</div>
            </div>
        ))}
    </div>

    </div>
);
};
