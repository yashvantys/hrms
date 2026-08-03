import { Role as PrismaRole } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateEmployeeInput, CreateUserInput, UpdateEmployeeInput } from "../graphql/generated/graphql";


export class EmployeeRepository {
    async employees(first: number, after?: string) {
        const employees = await prisma.employee.findMany({
            take: first + 1,
            ...(after && {
                skip: 1,
                cursor: {
                    id: Number(after),
                },
            }),
            orderBy: {
                id: "asc",
            },
        });

        const hasNextPage = employees.length > first;
        if (hasNextPage) {
            employees.pop();
        }
        return {
            edges: employees.map((employee) => ({
                cursor: employee.id.toString(),
                node: employee,
            })),
            pageInfo: {
                hasNextPage,
                endCursor:
                    employees.length > 0
                        ? employees[employees.length - 1].id.toString()
                        : null,
            },
        };
    }
    async employee(id: string) {
        return prisma.employee.findUnique({
            where: { id: Number(id) }
        })
    }
    async findByEmail(email: string) {
        return prisma.employee.findUnique({ where: { email } })
    }

    async createEmployeeWithUser(userInput: CreateUserInput, employeeInput: CreateEmployeeInput) {
        return prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    ...userInput,
                    role: userInput.role as PrismaRole,
                },
            });
            const employeeCode = await this.generateEmployeeCode();
            const employee = await tx.employee.create({
                data: {
                    ...employeeInput,
                    employeeCode,
                    userId: user.id,
                },
            });

            return employee;
        });
    }
    async generateEmployeeCode() {
        const lastEmployee = await prisma.employee.findFirst({
            orderBy: {
                id: "desc",
            },
        });
        const nextId = lastEmployee ? lastEmployee.id + 1 : 1;
        return `EMP${String(nextId).padStart(4, "0")}`;
    }
    async updateEmployee(id: string, data: Partial<UpdateEmployeeInput>) {
        return prisma.employee.update({
            where: { id: Number(id) },
            data: {
                firstName: data.firstName ?? "",
                lastName: data.lastName ?? "",
                phone: data.phone ?? "",
                department: data.department ?? "",
                designation: data.designation ?? "",
                salary: data.salary ?? "",
            },
        });
    }
    async deleteEmployee(id: string) {
        return prisma.employee.update({
            where: { id: Number(id) },
            data: { isActive: false },
        });
    }

    async findById(id: string) {
        return prisma.employee.findUnique({
            where: { id: Number(id), isActive: true },
        })
    }
}

export default new EmployeeRepository()