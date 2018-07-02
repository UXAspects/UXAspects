export interface ConduitProperties {
  id: number | string;
  acceptsInput?: boolean | string[];
  producesOutput?: boolean;
  changeDetection?: (x: any, y: any) => boolean;
  map?: any;
}

export const defaultConduitProps: Partial<ConduitProperties> = {
  acceptsInput: true,
  producesOutput: true,
};
