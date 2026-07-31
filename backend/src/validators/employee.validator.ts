import { z } from "zod";

export const createEmployeeSchema = z.object({
    //employeeCode: z.string().min(3).max(20),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    phone: z.string().optional(),
    department: z.string().min(2),
    designation: z.string().min(2),
    salary: z.number().positive().optional(),
    joiningDate: z.iso.datetime(),
    userId: z.number().int().positive().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();