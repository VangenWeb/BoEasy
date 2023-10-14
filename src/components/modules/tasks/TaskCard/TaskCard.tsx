import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import {
  Card as BaseCard,
  Button,
  CardHeader,
  IconButton,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { type TaskPeriod } from "~/server/api/bll/types";
import { type getUserPrimaryGroupTasks } from "~/server/api/bll/user/bll";
import { useDialog } from "~/util/hooks/useDialog";
import { CreateTaskCard } from "../CreateTaskCard/CreateTaskCard";
import { api } from "~/utils/api";
import { PeriodTranslations } from "~/components/consts";
import { Period } from "~/util/getPeriod";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const Card = styled(BaseCard)`
  position: relative;
  width: 700px;
  height: 300px;
`;

const AddTaskButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;
interface TaskCardProps {
  userId?: string;
  groupId?: string;
  period?: TaskPeriod;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  userId,
  groupId,
  period,
}) => {
  const session = useSession();
  const [periodState, setPeriodState] = useState<Dayjs>(
    new Period(period ?? "daily").getPeriodDayjs(),
  );
  const periodClass = new Period(period ?? "daily", periodState);

  const { primaryGroupId: sessionGroupId, id: sessionUserId } = session.data
    ?.user ?? {
    userId: "",
  };

  const { data: taskData } = api.user.getUserGroupTasks.useQuery(
    {
      userId: userId ?? "",
      groupId: groupId ?? "",
      period,
    },
    {
      cacheTime: 0,
      enabled: !!groupId && !!userId,
    },
  );

  const { handleToggle, DialogComponent } = useDialog({
    dialogContent: (
      <CreateTaskCard
        userId={userId ?? sessionUserId}
        groupId={groupId ?? sessionGroupId}
        period={period}
        periodState={periodState}
      />
    ),
  });

  return (
    <Card>
      <DialogComponent />
      <CardHeader
        title={`${
          period && periodState ? periodClass.getPeriodText() + " " : ""
        }Oppgaver`}
      />
      <div>
        <Button
          onClick={() => {
            setPeriodState(periodClass.nextPeriod().currentDate);
          }}
        >
          +
        </Button>
      </div>
      <AddTaskButton onClick={handleToggle}>
        <Add />
      </AddTaskButton>
      {taskData?.map((task) => <div key={task.id}>{task.name}</div>)}
    </Card>
  );
};
