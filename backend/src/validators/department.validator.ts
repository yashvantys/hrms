import {z}  from "zod";

export const createDepartmentSchema = z.object({        
    name: z.string().min(2).max(50),
    code: z.string().min(2).max(10),
    description: z.string().optional(),
    isActive: z.boolean().optional()
});