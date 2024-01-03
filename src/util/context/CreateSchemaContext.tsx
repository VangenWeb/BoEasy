import {
  SchemaRecurrence,
  type Field,
  FieldType,
  SchemaAudience,
} from "@prisma/client";
import React from "react";
import { createContext, useState } from "react";
import { api } from "~/utils/api";

interface Schema {
  name: string;
  fields: Pick<Field, "name" | "type">[];
  recurrence: SchemaRecurrence;
  audience: SchemaAudience;
}

interface CurrentGroupContextProps {
  schema: Schema | null;
  setSchema: React.Dispatch<React.SetStateAction<Schema | null>>;
  setSchemaName: (name: string) => void;
  setSchemaRecurrence: (recurrence: SchemaRecurrence) => void;
  setSchemaAudience: (audience: SchemaAudience) => void;
  addField: (type: FieldType, name: string) => void;
  removeField: (index: number) => void;
  resetSchema: () => void;
  createSchema: (groupId: string, parentId: string) => void;
}

export const CreateSchemaContext = createContext<CurrentGroupContextProps>({
  schema: null,
  setSchema: () => void 0,
  setSchemaName: () => void 0,
  setSchemaRecurrence: () => void 0,
  setSchemaAudience: () => void 0,
  addField: () => void 0,
  removeField: () => void 0,
  resetSchema: () => void 0,
  createSchema: () => void 0,
});

interface CreateSchemaContextProviderProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
export const CreateSchemaContextProvider: React.CFC<
  CreateSchemaContextProviderProps
> = ({ children, onSuccess, onError }) => {
  const [schema, setSchema] = useState<Schema | null>({
    name: "",
    fields: [],
    recurrence: "none",
    audience: "none",
  });

  const { mutate: createSchemaMutation } = api.schema.createSchema.useMutation({
    onSuccess: () => {
      if (onSuccess) onSuccess();
      resetSchema();
    },
    onError: (err) => {
      if (onError) onError(err.message);
    },
  });

  function setSchemaName(name: string) {
    if (!!schema) {
      const newSchema: Schema = { ...schema };
      newSchema.name = name;
      setSchema(newSchema);
    }
  }

  function setSchemaRecurrence(recurrence: SchemaRecurrence) {
    if (!!schema) {
      const newSchema: Schema = { ...schema };
      newSchema.recurrence = recurrence;
      setSchema(newSchema);
    }
  }

  function setSchemaAudience(audience: SchemaAudience) {
    if (!!schema) {
      const newSchema: Schema = { ...schema };
      newSchema.audience = audience;
      setSchema(newSchema);
    }
  }

  function addField(type: FieldType, name: string) {
    if (!!schema) {
      const newSchema: Schema = { ...schema };
      if (newSchema.fields.some((field) => field.name === name)) {
        alert("Field name/text already exists");
        return;
      }
      newSchema.fields.push({ type, name });
      setSchema(newSchema);
    }
  }

  function removeField(index: number) {
    if (!!schema) {
      const newSchema: Schema = { ...schema };
      newSchema.fields.splice(index, 1);
      setSchema(newSchema);
    }
  }

  function resetSchema() {
    setSchema({ name: "", fields: [], recurrence: "none", audience: "none" });
  }

  function createSchema(groupId: string, parentId: string) {
    console.log(schema);
    if (!!schema) {
      createSchemaMutation({
        groupId,
        parentId,
        name: schema.name,
        recurrence: schema.recurrence,
        fields: schema.fields,
        audience: schema.audience,
      });
    }
  }

  return (
    <CreateSchemaContext.Provider
      value={{
        schema,
        setSchema,
        setSchemaName,
        setSchemaRecurrence,
        setSchemaAudience,
        addField,
        removeField,
        resetSchema,
        createSchema,
      }}
    >
      {children}
    </CreateSchemaContext.Provider>
  );
};
