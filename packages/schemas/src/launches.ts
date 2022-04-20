import { Static, Type } from "@sinclair/typebox";

export const LaunchSchema = Type.Object(
  {
    id: Type.String({
      description: "ID do lançamento",
      examples: ["5eb87cd9ffd86e000604b32a"],
    }),
    name: Type.String({
      description: "Nome do lançamento",
      examples: ["FalconSat"],
    }),
    date: Type.Number({
      description: "Data e hora do lançamento em timestamp",
      examples: [1143239400],
    }),
  },
  { title: "Lançamento", description: "Uma missão de lançamento" }
);
export type Launch = Static<typeof LaunchSchema>;

export const LaunchParamsSchema = Type.Object({
  id: LaunchSchema.properties.id,
});
export type LaunchParams = Static<typeof LaunchParamsSchema>;
