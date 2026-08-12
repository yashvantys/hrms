import { CreateDepartmentInput, UpdateDepartmentInput } from "../../graphql/generated/graphql";
import departmentRepository from "../../repositories/department.repository";
import { createDepartmentSchema } from "../../validators/department.validator";
import { validate } from "../../validators/validate";


class DepartmentService {
    async getAllDepartments() {
        return departmentRepository.getAllDepartments()
    }

    async getDepartment(id: string) {
        return departmentRepository.getDepartment(id)
    }
    async createDepartment(input: CreateDepartmentInput) {
        const validatedInput = validate(createDepartmentSchema, input);
        return departmentRepository.createDepartment(validatedInput)
    }
    async updateDepartment(id: string, input: UpdateDepartmentInput) {
        const validatedInput = validate(createDepartmentSchema, input);
        return departmentRepository.updateDepartment(id, validatedInput)
    }
    async deleteDepartment(id: string) {
        return departmentRepository.deleteDepartment(id)
    }
}

export default new DepartmentService();