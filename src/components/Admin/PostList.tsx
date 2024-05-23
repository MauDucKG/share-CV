import { Datagrid, EmailField, List, TextField, DateField, ArrayField, ImageField } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="tags" />
            <TextField source="summary" />
            {/* <TextField source="category" /> */}
            {/* <TextField source="content" /> */}
            {/* <TextField source="location" /> */}
            <DateField source="createdTime" />
            <ImageField source="thumbnail" />
            
            <TextField source="author[0].name" label = "Author"/>
            <TextField source="status[0]" label = "Hide"/>

            {/* <TextField source="name" /> */}

        </Datagrid>
    </List>
);