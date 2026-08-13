import {
    AttendanceStatus,
} from "../../generated/graphql";
import attendanceService from "../../../services/attendance/attendance.service";
import { GraphQLContext } from "../../../types/context";
import { requireAuth, requireRole, Role } from "../../../utils/auth";
import { CreateAttendanceInput } from "../../generated/graphql";

export const attendanceResolvers = {
    Mutation: {
        async createAttendance(_: unknown, { input }: { input: CreateAttendanceInput }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.createAttendance(input);
        },
        async checkIn(_: unknown, { employeeId }: { employeeId: number }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.checkIn(employeeId);
        },
        async checkOut(_: unknown, { employeeId }: { employeeId: number }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.checkOut(employeeId);
        },
        async saveAttendance(_: unknown, { employeeId, date, status }: { employeeId: number, date: string, status: AttendanceStatus }, context: GraphQLContext) {
            requireAuth(context)
            requireRole(context, [Role.HR, Role.ADMIN]);
            return await attendanceService.saveAttendance(employeeId, date, status)
        }
    },
    Query: {
        async getAttendanceByEmployeeId(_: unknown, { employeeId }: { employeeId: number }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.getAttendanceByEmployeeId(employeeId);
        },
        async getAttendanceById(_: unknown, { id }: { id: number }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.getAttendanceById(id);
        },
        async getAttendanceByDate(_: unknown, { date }: { date: string }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.getAttendanceByDate(date);
        },
        async getAttendanceByEmployee(_: unknown, { employeeId, fromDate, toDate }: { employeeId: number, fromDate: string, toDate: string }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.getAttendanceByEmployee(employeeId, fromDate, toDate);
        },
        async getAttendanceSummary(_: unknown, { employeeId, month }: { employeeId: number, month: string }, context: GraphQLContext) {
            requireAuth(context);
            return await attendanceService.getAttendanceSummary(employeeId, month);
        }
    },
}