import { Datagrid, EmailField, List, TextField, DateField, ArrayField } from 'react-admin';

export const CVList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" label = "Name"/>
            <TextField source="tags" />
            <TextField source="category" />
            {/* <TextField source="summary" /> */}
            <TextField source="location" />
            <DateField source="createdTime" />
            <TextField source="experience" />
            <TextField source="author[0].name" label = "Author"/>
            <TextField source="status[0]" label = "Hide"/>

        </Datagrid>
    </List>
);