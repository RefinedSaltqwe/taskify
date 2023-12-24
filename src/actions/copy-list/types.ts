import { type z } from "zod";
import { type List } from "@prisma/client";
import { type CopyList } from "./schema";
import { type ActionState } from "../../lib/create-safe-actions";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
