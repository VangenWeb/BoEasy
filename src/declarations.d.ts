import type React from "react";

declare module "react" {
  export type CFC<Props = object> = React.FC<React.PropsWithChildren<Props>>;
}
