import { BooleanInput, DateInput, Edit, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled fullWidth />
            <TextInput source="login" disabled fullWidth />
            <TextInput source="name" fullWidth />
            <TextInput source="avatar" fullWidth />
            <TextInput source="role" fullWidth />
            <TextInput source="email" fullWidth />
            <DateInput source="phone" fullWidth />
            <TextInput source="bio" fullWidth />
            <TextInput source="company" fullWidth />
            <TextInput source="location" fullWidth />
            <BooleanInput source="isRestricted" fullWidth />
            <DateInput source="createdTime" disabled fullWidth />
        </SimpleForm>
    </Edit>
);