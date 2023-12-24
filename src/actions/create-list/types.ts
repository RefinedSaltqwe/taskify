import { type z } from "zod";
import { type List } from "@prisma/client";

import { type ActionState } from "@/lib/create-safe-actions";

import { type CreateList } from "./schema";

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
