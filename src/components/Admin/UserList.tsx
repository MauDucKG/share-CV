import { Datagrid, EmailField, List, TextField, DateField, ArrayField, ImageField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="login" />
            <TextField source="name" />
            <TextField source="role" />

            <TextField source="email" />
            {/* <TextField source="bio" /> */}
            {/* <TextField source="location" /> */}
            <ImageField source="avatar" />
            {/* <TextField source="experience" /> */}
            
            <DateField source="createdTime" />
            {/* <TextField source="name" /> */}

        </Datagrid>
    </List>
);