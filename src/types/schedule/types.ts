import { Layout } from "react-grid-layout";

// export type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

// export interface CustomLayout extends Omit<Layout, 'resizeHandles'> {
//   title: string;
//   content: string;
//   resizeHandles: ResizeHandle[];
// }

export type CustomLayout = Layout & {
  title: string;
  content: string;
}
