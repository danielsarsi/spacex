import { Static, Type } from "@sinclair/typebox";

export enum LaunchDatePrecision {
  Half = "half",
  Quarter = "quarter",
  Year = "year",
  Month = "month",
  Day = "day",
  Hour = "hour",
}

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
    date: Type.String({
      description: "Data e hora do lançamento em UTC",
      format: "date-time",
      examples: ["2022-04-21T15:16:00.000Z"],
    }),
    date_precision: Type.Enum(LaunchDatePrecision, {
      description: "Precisão da data e hora do lançamento",
      examples: [LaunchDatePrecision.Day],
    }),
    success: Type.Union([
      Type.Null(),
      Type.Boolean({
        description: "Sucesso do lançamento",
        examples: [true],
      }),
    ]),
  },
  { title: "Lançamento", description: "Uma missão de lançamento" }
);
export type Launch = Static<typeof LaunchSchema>;

export const LaunchParamsSchema = Type.Object({
  id: LaunchSchema.properties.id,
});
export type LaunchParams = Static<typeof LaunchParamsSchema>;
