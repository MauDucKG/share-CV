import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
    
type Props = {
    name: string;
    columnNames: string[];
    values: number[];
};

export const ColumnChartVer : React.FC<Props> = ({name, columnNames, values}) => {
    const data = columnNames.map((name, index) => ({
        name: name,
        candidate: values[index],
        }));
    

return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{ justifyContent: 'center', textAlign: 'center' }}> {name} </h4>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BarChart width={500} height={300} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                </XAxis>
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="candidate" fill="#8884d8" barSize={40} /> */}
                <Bar dataKey="candidate" fill="#67F7BB" barSize={40} />

            </BarChart>
        </div>
    </div>
);
};
