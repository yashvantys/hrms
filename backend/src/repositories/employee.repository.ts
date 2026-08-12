import { Role as PrismaRole } from "@prisma/client";
import { prisma } from "../config/database";
import {
  CreateEmployeeInput,
  CreateUserInput,
  EmployeeSearchInput,
  EmployeeSortField,
  UpdateEmployeeInput,
} from "../graphql/generated/graphql";

export class EmployeeRepository {
  async employees(input: EmployeeSearchInput) {
    const { first, after, search, sortBy, departmentId } = input;
    const employees = await prisma.employee.findMany({
      take: first + 1,
      include: {
        department: true,
      },
      where: {
        isActive: true,
        ...(departmentId && {
          departmentId,
        }),
        OR: [
          {
            employeeCode: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
        ],
      },
      ...(after && {
        skip: 1,
        cursor: {
          id: Number(after),
        },
      }),
      orderBy: sortBy
        ? {
            [this.mapSortField(sortBy.field)]: sortBy?.order?.toLowerCase(),
          }
        : {
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
      where: { id: Number(id) },
    });
  }
  async findByEmail(email: string) {
    return prisma.employee.findUnique({ where: { email } });
  }

  async createEmployeeWithUser(
    userInput: CreateUserInput,
    employeeInput: CreateEmployeeInput,
  ) {
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
        departmentId: data.departmentId ?? 0,
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
    });
  }

  private mapSortField(field: EmployeeSortField) {
    switch (field) {
      case EmployeeSortField.EmployeeCode:
        return "employeeCode";
      case EmployeeSortField.FirstName:
        return "firstName";
      case EmployeeSortField.LastName:
        return "lastName";
      case EmployeeSortField.Email:
        return "email";
      case EmployeeSortField.JoiningDate:
        return "joiningDate";
      default:
        return "joiningDate";
    }
  }
}

export default new EmployeeRepository();
