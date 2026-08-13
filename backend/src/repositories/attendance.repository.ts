import { prisma } from "../config/database";
import { AttendanceStatus, CreateAttendanceInput } from "../graphql/generated/graphql";
import { addDays } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export class AttendanceRepository {
    async createAttendance(input: CreateAttendanceInput) {
        const { employeeId, date, checkIn, checkOut, status, remarks } = input;
        // Implementation for creating attendance record
        return await prisma.attendance.create({
            data: {
                employeeId,
                date,
                checkIn,
                checkOut,
                status: status ?? "PRESENT",
                remarks
            }
        });
    }
    async getAttendanceByEmployeeId(employeeId: number) {
        return await prisma.attendance.findMany({
            where: {
                employeeId
            }
        });
    }
    async getAttendanceById(id: number) {
        return await prisma.attendance.findUnique({
            where: {
                id
            },
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },

        });
    }
    async updateAttendance(id: number, input: Partial<CreateAttendanceInput>) {
        return await prisma.attendance.update({
            where: {
                id
            },
            data: input?.checkOut ? { checkOut: input.checkOut } : {}
        });
    }
    async getAttendanceByDate(date: string) {
        const timezone = "Asia/Kolkata";
        const start = fromZonedTime(
            `${date}T00:00:00`,
            timezone
        );
        const end = fromZonedTime(
            `${date}T00:00:00`,
            timezone
        );
        const endOfDay = addDays(end, 1);
        return await prisma.attendance.findMany({
            where: {
                date: {
                    gte: start,
                    lt: endOfDay,
                },
            },
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
    }
    async getAttendanceByEmployee(employeeId: number, fromDate: string, toDate: string) {
        const timezone = "Asia/Kolkata";
        const start = fromZonedTime(
            `${fromDate}T00:00:00`,
            timezone
        );
        const end = fromZonedTime(
            `${toDate}T00:00:00`,
            timezone
        );
        const endExclusive = addDays(end, 1);
        return await prisma.attendance.findMany({
            where: {
                employeeId,
                date: {
                    gte: start,
                    lte: endExclusive
                }
            },
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
            orderBy: {
                date: "asc",
            },
        });
    }
    async getAttendanceSummary(employeeId: number, month: string) {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        const records = await prisma.attendance.findMany({
            where: {
                employeeId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })
        const summary = {
            employeeId,
            month,
            present: records.filter(r => r.status === AttendanceStatus.Present).length,
            absent: records.filter(r => r.status === AttendanceStatus.Absent).length,
            late: records.filter(r => r.status === AttendanceStatus.Late).length,
            halfDay: records.filter(r => r.status === AttendanceStatus.HalfDay).length,
            leave: records.filter(r => r.status === AttendanceStatus.Leave).length,
            totalDays: records.length,
        };
        return summary;
    }
    async saveAttendance(
        employeeId: number,
        date: Date,
        status: AttendanceStatus
    ) {
        return prisma.attendance.upsert({
            where: {
                employeeId_date: {
                    employeeId,
                    date,
                },
            },
            create: {
                employeeId,
                date,
                status,
            },
            update: {
                status,
            },
        });
    }
}

export default new AttendanceRepository();