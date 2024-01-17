import { createContext, useState } from "react";
import { type SchemaWithFields } from "~/components/modules/schemas";
import {
  type SchemaDataFieldObject,
  type SchemaDataObject,
} from "~/server/api/bll/files/types/schema";
import { api } from "~/utils/api";

interface CurrentFillShchemaContextProps {
  schemaData: SchemaDataObject;
  schemaLoaded: boolean;
  isSaved: boolean;
  createSchemaFromSchema: (schema: SchemaWithFields) => void;
  setFieldAnswer: (id: string, answer: string | boolean) => void;
  resetSchema: () => void;
  saveSchema: ({
    groupId,
    onSuccess,
    deliver,
  }: {
    groupId: string;
    onSuccess?: () => void;
    deliver: boolean;
  }) => void;
}

export const FillSchemaContext = createContext<CurrentFillShchemaContextProps>({
  schemaData: {
    schemaId: "",
    fields: [],
  },
  schemaLoaded: false,
  isSaved: false,
  createSchemaFromSchema: () => void 0,
  setFieldAnswer: () => void 0,
  resetSchema: () => void 0,
  saveSchema: () => void 0,
});

export const FillSchemaContextProvider: React.CFC = ({ children }) => {
  const initSchema = {
    schemaId: "",
    fields: [],
  };

  const [schemaData, setSchemaData] = useState<SchemaDataObject>(initSchema);
  const [isSaved, setIsSaved] = useState(false);
  const [schemaLoaded, setSchemaLoaded] = useState(false);

  const { mutate: saveSchemaData } = api.file.upsertSchemaData.useMutation({
    onSuccess: (res) => {
      setSchemaData({
        ...schemaData,
        schemaDataId: res.data?.schemaDataId,
      });
    },
  });

  function createSchemaFromSchema(schema: SchemaWithFields, override = false) {
    if (schemaLoaded && !override) return;

    setSchemaLoaded(true);

    const fields: SchemaDataFieldObject[] = schema.fields.map((field) => {
      switch (field.type) {
        case "checkbox":
          return {
            id: field.id,
            type: "checkbox",
            name: field.name,
            answer: false,
          };
        case "title":
          return {
            id: field.id,
            type: "title",
            name: field.name,
            answer: "",
          };
        default: {
          return {
            id: field.id,
            type: "text",
            name: field.name,
            answer: "",
          };
        }
      }
    });

    setSchemaData({
      ...schemaData,
      schemaId: schema.id,
      fields: fields,
    });
  }

  function resetSchema() {
    setSchemaData(initSchema);
    setIsSaved(false);
    setSchemaLoaded(false);
  }
  // I feel there's a more optimal way...
  // Index on the id? A mapping? It must be more optimal...
  // Todo: make this a key => value map.
  function setFieldAnswer(id: string, answer: string | boolean) {
    const newFields = schemaData.fields.map((field) => {
      if (field.id === id) {
        if (field.type === "text") {
          return {
            ...field,
            answer: answer as string,
          };
        }

        return {
          ...field,
          answer: answer === "true" ? true : false,
        };
        // Huh
      } else {
        return field;
      }
    });
    // this is insufficient for save state checking, Id probably need to do an Object compare.
    // But I want to rewrite everything with FillSchema, it's horrendous.
    setIsSaved(false);
    setSchemaData({
      ...schemaData,
      fields: newFields,
    });
  }

  function saveSchema({
    groupId,
    onSuccess,
    deliver,
  }: {
    groupId: string;
    onSuccess?: () => void;
    deliver: boolean;
  }) {
    saveSchemaData(
      {
        groupId: groupId,
        schemaData: schemaData,
        deliver: deliver,
      },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
            setIsSaved(true);
          }
        },
      },
    );
  }

  return (
    <FillSchemaContext.Provider
      value={{
        schemaData,
        schemaLoaded,
        isSaved,
        createSchemaFromSchema,
        setFieldAnswer,
        resetSchema,
        saveSchema,
      }}
    >
      {children}
    </FillSchemaContext.Provider>
  );
};
