import { Plugin } from "snail-plugin-api";

export type ReturnedPlugin = Plugin & { enabled: boolean };
export type Theme = {
  id: string;
  name?: string;
  css?: string | string[];
  description?: string;
  version?: string;
  enabled: boolean;
};
