// Generated by Xata Codegen 0.27.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "players",
    columns: [
      { name: "name", type: "string" },
      { name: "position", type: "string" },
      { name: "age", type: "int" },
    ],
  },
  {
    name: "playersRandom",
    columns: [
      { name: "name", type: "string" },
      { name: "position", type: "string" },
      { name: "age", type: "int" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Players = InferredTypes["players"];
export type PlayersRecord = Players & XataRecord;

export type PlayersRandom = InferredTypes["playersRandom"];
export type PlayersRandomRecord = PlayersRandom & XataRecord;

export type DatabaseSchema = {
  players: PlayersRecord;
  playersRandom: PlayersRandomRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Garry-Tsaconas-s-workspace-38kbcp.us-east-1.xata.sh/db/learning",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
