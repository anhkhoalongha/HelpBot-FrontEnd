export type Style = {
  title?: string;
  color?: string;
  fontSize?: number;
};
type Project = {
  id: number;
  name: string;
  owner: string;
  chatbot: string;
  secretkey: string;
  script_QA: object;
  style_widget?: {
    title: string;
    color: string;
    fontSize: number;
  };
  flow_chart: {
    viewport: {
      x: number;
      y: number;
      zoom: number;
    };
    nodes: any[];
    edges: any[];
  };
};
export default Project;
