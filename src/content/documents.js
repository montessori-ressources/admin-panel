// in src/Comments.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  DateInput,
  DateField,
  SimpleShowLayout,
  SimpleForm,
  ReferenceField,
  FormDataConsumer,
  ReferenceInput,
  FileInput,
  FileField,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  SelectField,
  ImageField,
  ArrayField,
  ChipField,
  Labeled,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const choices = [
  { id: "file", name: "File" },
  { id: "nomenclature", name: "Nomenclature" },
];

export const DocumentList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <SelectField source="type" choices={choices} />
      <ReferenceField
        label="Category"
        source="category_id"
        reference="categories"
      >
        <ChipField source="title" />
      </ReferenceField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

const ConditionalFileField = ({ record, ...rest }) =>
  record && record.type === "file" ? (
    <Labeled label="File">
      <FileField
        source="file.src"
        title="file.title"
        record={record}
        {...rest}
      />
    </Labeled>
  ) : null;

const ConditionalCardsField = ({ record, ...rest }) =>
  record && record.type === "nomenclature" ? (
    <ArrayField source="cards" record={record} {...rest}>
      <Datagrid>
        <TextField label="Name" source="name" />
        <ImageField label="File" source="file.src" title="file.title" />
      </Datagrid>
    </ArrayField>
  ) : null;

export const DocumentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <SelectField source="type" choices={choices} />
      <ReferenceField
        label="Category"
        source="category_id"
        reference="categories"
      >
        <TextField source="title" />
      </ReferenceField>
      <TextField source="title" />
      <RichTextField source="description" />
      <DateField source="createdate" options={{ disabled: true }} />
      <ConditionalFileField />
      <DateField source="lastupdate" options={{ disabled: true }} />

      <ConditionalCardsField />
    </SimpleShowLayout>
  </Show>
);

export const DocumentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        fullWidth
        source="type"
        choices={choices}
        helperText="the tool currently support either file (just a pdf file) or nomenclature (a set of images and text that will be arranged automatically in pdf for output)"
      />
      <EditCreate />
    </SimpleForm>
  </Create>
);

export const DocumentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DateInput source="createdate" options={{ disabled: true }} />
      <DateInput source="lastupdate" options={{ disabled: true }} />
      <SelectField source="type" choices={choices} />
      <EditCreate />
    </SimpleForm>
  </Edit>
);

const EditCreate = () => (
  <>
    <TextInput source="title" helperText="Name of the document" fullWidth />
    <TextInput
      source="author"
      helperText="Provide author name for credit"
      fullWidth
    />
    <ReferenceInput
      fullWidth
      label="Category"
      source="category_id"
      reference="categories"
    >
      <SelectInput
        optionText="title"
        helperText="Select here the category for this document"
      />
    </ReferenceInput>

    <FormDataConsumer>
      {({ formData, ...rest }) =>
        formData.type === "file" && (
          <FileInput
            source="file"
            label="File"
            accept="application/pdf"
            helperText="For a file document you must upload a pdf here"
            {...rest}
          >
            <FileField source="src" title="title" />
          </FileInput>
        )
      }
    </FormDataConsumer>

    <FormDataConsumer>
      {({ formData, ...rest }) =>
        formData.type === "nomenclature" && (
          <ArrayInput source="cards">
            <SimpleFormIterator>
              <TextInput label="Label" source="name" />
              <FileInput
                source="file"
                label="File"
                accept="image/*"
                helperText="Provide one image per card"
                {...rest}
              >
                <ImageField source="src" title="title" />
              </FileInput>
            </SimpleFormIterator>
          </ArrayInput>
        )
      }
    </FormDataConsumer>

    <RichTextInput
      source="description"
      helperText="This description field is not used yet."
    />
  </>
);
