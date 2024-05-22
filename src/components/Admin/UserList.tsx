import { Datagrid, EmailField, List, TextField, DateField, ArrayField, ImageField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="login" />
            <TextField source="name" />
            <TextField source="role" />

            <TextField source="email" />
            {/* <TextField source="phone" /> */}
            {/* <TextField source="bio" /> */}
            <TextField source="company" />
            <TextField source="location" />

            <ImageField source="avatar"/>
            
            <DateField source="createdTime" />
            {/* <TextField source="name" /> */}

        </Datagrid>
    </List>
);