import { type z } from "zod";
import { type Board } from "@prisma/client";
import { type UpdateBoard } from "./schema";
import { type ActionState } from "../../lib/create-safe-actions";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
