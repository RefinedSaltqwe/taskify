import { type z } from "zod";
import { type List } from "@prisma/client";
import { type UpdateList } from "./schema";
import { type ActionState } from "../../lib/create-safe-actions";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType, List>;
