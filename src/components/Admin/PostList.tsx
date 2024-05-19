import { Datagrid, EmailField, List, TextField, DateField, ArrayField, ImageField } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="tags" />
            <TextField source="summary" />

            {/* <TextField source="category" /> */}
            {/* <TextField source="summary" /> */}
            {/* <TextField source="location" /> */}
            <DateField source="createdTime" />
            {/* <TextField source="experience" /> */}
            
            <TextField source="author[0].name" label = "Author"/>
            {/* <TextField source="name" /> */}

        </Datagrid>
    </List>
);