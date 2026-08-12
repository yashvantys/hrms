import { prisma } from "../config/database";
import { CreateDepartmentInput } from "../graphql/generated/graphql";

class DepartmentRepository {
  async getAllDepartments() {
    return prisma.department.findMany({
      include: {
        employees: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getDepartment(id: string) {
    return prisma.department.findUnique({ where: { id: Number(id) } });
  }
  async createDepartment(input: CreateDepartmentInput) {
    return prisma.department.create({
      data: input,
    });
  }
  async updateDepartment(id: string, input: CreateDepartmentInput) {
    return prisma.department.update({
      where: { id: Number(id) },
      data: input,
    });
  }
  async deleteDepartment(id: string) {
    return prisma.department.update({
      where: { id: Number(id) },
      data: {
        isActive: false,
      },
    });
  }
}
export default new DepartmentRepository();
