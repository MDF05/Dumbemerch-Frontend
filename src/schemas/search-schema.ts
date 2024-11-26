import { z } from "zod"

export const searchSchema = z.object({
    searchQuery: z.string({ message: "must be string" }).email("email is required"),
})

export type SearchSchema = z.infer<typeof searchSchema>