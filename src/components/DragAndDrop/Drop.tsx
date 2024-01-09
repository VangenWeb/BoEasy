import React, { type FC, type ReactNode } from "react";
import { Droppable, type DroppableProps } from "react-beautiful-dnd";
import styled from "@emotion/styled";

const Content = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "#f7f7f7" : "#fff")};
`;

interface IXDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  className?: string;
}

export const XDrop: FC<IXDrop> = ({ children, className, ...props }) => {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <Content
          {...provided.innerRef}
          ref={provided.innerRef}
          className={className}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </Content>
      )}
    </Droppable>
  );
};
