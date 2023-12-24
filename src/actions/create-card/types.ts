import { type z } from "zod";
import { type Card } from "@prisma/client";
import { type CreateCard } from "./schema";
import { type ActionState } from "../../lib/create-safe-actions";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
