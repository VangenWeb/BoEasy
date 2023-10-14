import styled from "@emotion/styled";
import {
  Button as BaseButton,
  Card as BaseCard,
  CardContent as BaseCardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { type TaskPeriod } from "~/server/api/bll/types";
import { Period } from "~/util/getPeriod";
import { useMediaQuery } from "~/util/hooks/useMediaQuery";
import { potentialErrorHandling } from "~/util/potentialErrorHandling";
import { RouterInputs, api } from "~/utils/api";
const Card = styled(BaseCard)`
  display: flex;

  flex-direction: column;

  width: 500px;
  height: 800px;
`;

const CardContent = styled(BaseCardContent)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled(BaseButton)``;

interface TaskForm {
  title: string;
  description: string;
  expires: Dayjs | null;
  groupId: string;
  userId: string;
  period: TaskPeriod;
  periodState?: Dayjs;
}

interface CreateTaskCardProps {
  groupId?: string;
  userId?: string;
  period?: TaskPeriod;
  periodState?: Dayjs;
}

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({
  groupId,
  userId,
  period,
  periodState,
}) => {
  const { mobile } = useMediaQuery();

  const util = api.useContext();

  const { control, register, getValues } = useForm<TaskForm>({
    defaultValues: {
      title: "",
      description: "",
      expires: null as Dayjs | null,
      groupId: groupId ?? "",
      userId: userId ?? "",
      period: period,
      periodState: periodState,
    },
  });

  const { mutate } = api.task.createTask.useMutation({});

  function handleSubmission() {
    const values = getValues();
    const cleanedForm: RouterInputs["task"]["createTask"] = {
      userId: values.userId,
      groupId: values.groupId,

      name: values.title,
      description: values.description,

      expires: dayjs(values.expires).toDate(),
      period: values?.periodState?.toDate(),
      periodically: values.period,
    };

    if (values.period && values.periodState) {
    }

    if (typeof cleanedForm.expires !== "object") {
      console.warn("Date is invalid");
      return;
    }

    mutate(cleanedForm, {
      onSuccess: () => {
        util.user.getUserGroupTasks
          .invalidate({
            userId: cleanedForm.userId,
          })
          .catch(potentialErrorHandling);
      },
      onError: (error) => {
        potentialErrorHandling(new Error(error.message));
      },
    });
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Opprett Oppgave" />
      <CardContent
        sx={{
          height: "100%",
        }}
      >
        <TextField
          variant="outlined"
          size="medium"
          label="Tittel"
          {...register("title")}
        />
        <TextField
          variant="outlined"
          size="medium"
          label="Description"
          multiline
          rows={3}
          {...register("description")}
        />
        {mobile ? (
          <Controller
            control={control}
            name="expires"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <MobileDateTimePicker
                  label="Date"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        ) : (
          <Controller
            control={control}
            name="expires"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DateTimePicker
                  label="Date"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        )}
      </CardContent>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{
          m: 2,
        }}
        onClick={handleSubmission}
      >
        Opprett
      </Button>
    </Card>
  );
};
