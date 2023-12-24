import { type z } from "zod";
import { type Card } from "@prisma/client";
import { type UpdateCard } from "./schema";
import { type ActionState } from "../../lib/create-safe-actions";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>;
