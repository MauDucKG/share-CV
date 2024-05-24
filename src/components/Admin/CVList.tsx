import {
    Datagrid,
    TextField,
    DateField,
    CreateButton,
    FilterButton,
    FilterForm,
    ListBase,
    Pagination,
    TextInput,
    SearchInput
} from 'react-admin';
import { Stack } from '@mui/material';


const postFilters = [
    <SearchInput key="title" source="q" alwaysOn />,
    // <TextInput key="title" label="Title" source="title" />,
    // <TextInput key="tags" label="Tags" source="tags" />,
    // <TextInput key="category" label="Category" source="category" />,
    // <TextInput key="location" label="Location" source="location" />,
    // <TextInput key="experience" label="Experience" source="experience" />,
    // <TextInput key="author" label="Author" source="author[0].name" />,
    // <TextInput key="status" label="Status" source="status[0]" />,
];

const ListToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
        <FilterForm filters={postFilters} />
        <div>
            <FilterButton filters={postFilters} disableSaveQuery />
        </div>
    </Stack>
)

export const CVList = () => (
    <ListBase>
        <ListToolbar />
        <Datagrid rowClick="edit">
            <TextField source="title" label="Name" />
            <TextField source="tags" />
            <TextField source="category" />
            <TextField source="location" />
            <DateField source="createdTime" />
            <TextField source="experience" />
            <TextField source="author[0].name" label="Author" />
            <TextField source="status[0]" label="Hide" />
        </Datagrid>
        <Pagination />
    </ListBase>
);