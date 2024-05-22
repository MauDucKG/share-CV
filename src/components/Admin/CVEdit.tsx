import { ArrayInput, BooleanInput, DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const CVEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled fullWidth />
            <DateInput source="date.start_date" fullWidth />
            <TextInput source="type" fullWidth />
            <TextInput source="slug" disabled fullWidth />
            <TextInput source="tags" fullWidth />
            <TextInput source="category" fullWidth />
            <TextInput source="summary" fullWidth />
            <TextInput source="location" fullWidth />
            <TextInput source="title" fullWidth />
            <TextInput source="status" fullWidth />
            <DateInput source="createdTime" fullWidth />
            <BooleanInput source="fullWidth" fullWidth />
            <TextInput source="experience" fullWidth />
            {/* <ArrayInput source="author" fullWidth>
                <SimpleFormIterator> */}
                <TextInput source="author[0].id" fullWidth label = "Author ID"/>
                <TextInput source="author[0].name" fullWidth label = "Author Name"/>
                <TextInput source="author[0].profile_photo" fullWidth label = "Author Profile Photo"/>
                {/* </SimpleFormIterator>
            </ArrayInput> */}
        </SimpleForm>
    </Edit>
);