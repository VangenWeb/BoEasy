/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type FC, type ReactNode } from "react";
import { Draggable, type DraggableProps } from "react-beautiful-dnd";

interface IXDrag extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

export const XDrag: FC<IXDrag> = ({
  className,
  children,
  dragAll = true,
  ...props
}) => {
  console.log(React.isValidElement(children));
  if (!React.isValidElement(children)) return <div />;
  return (
    <Draggable {...props}>
      {(provided) => {
        const dragHandleProps = dragAll ? provided.dragHandleProps : {};
        return (
          <div
            className={className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...dragHandleProps}
          >
            {React.cloneElement(children, { provided } as any)}
          </div>
        );
      }}
    </Draggable>
  );
};
