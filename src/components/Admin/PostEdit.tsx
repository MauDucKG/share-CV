import { ArrayInput, BooleanInput, DateInput, Edit, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const PostEdit = () => (
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
            <TextInput source="content" fullWidth multiline/>
            {/* <ArrayInput source="author" fullWidth> */}
                <TextInput source="author[0].id" fullWidth label = "Author ID"/>
                <TextInput source="author[0].name" fullWidth label = "Author Name"/>
                <TextInput source="author[0].profile_photo" fullWidth label = "Author Profile Photo"/>
            {/* </ArrayInput> */}
            <TextInput source="title" fullWidth />
            <TextInput source="status" fullWidth />
            <DateInput source="createdTime" fullWidth />
            <BooleanInput source="fullWidth" fullWidth />
            <TextInput source="thumbnail" fullWidth />
            <DateInput source="experience" fullWidth />
        </SimpleForm>
    </Edit>
);