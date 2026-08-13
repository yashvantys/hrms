import { prisma } from "../../config/database";
import { AttendanceStatus, CreateAttendanceInput } from "../../graphql/generated/graphql";
import attendanceRepository from "../../repositories/attendance.repository";
import { startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

const timezone = "Asia/Kolkata";
const now = new Date();
const indiaNow = toZonedTime(now, timezone);
const indiaStartOfDay = startOfDay(indiaNow);
const attendanceDate = fromZonedTime(
  indiaStartOfDay,
  timezone
);

class AttendanceService {
  async createAttendance(input: CreateAttendanceInput) {
    const { employeeId } = input;
    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      }
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    if (!employee.isActive) {
      throw new Error("Employee is inactive");
    }
    return await attendanceRepository.createAttendance(input);
  }
  async checkIn(employeeId: number) {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (!employee.isActive) {
      throw new Error("Employee is inactive");
    }

    const existing = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: attendanceDate,
        },
      },
    });

    if (existing) {
      throw new Error("Employee already checked in today");
    }
    return attendanceRepository.createAttendance({
      employeeId,
      date: attendanceDate.toISOString(),
      checkIn: now.toISOString(),
      status: AttendanceStatus.Present,
    });
  }
  async checkOut(employeeId: number) {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    if (!employee.isActive) {
      throw new Error("Employee is inactive");
    }
    const existing = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: attendanceDate,
        },
      },
    });
    if (!existing) {
      throw new Error("Employee has not checked in today");
    }
    if (existing.checkOut) {
      throw new Error("Employee has already checked out today");
    }
    return await attendanceRepository.updateAttendance(existing.id, {
      checkOut: now.toISOString(),
    });
  }
  async getAttendanceByEmployeeId(employeeId: number) {
    return await attendanceRepository.getAttendanceByEmployeeId(employeeId);
  }
  async getAttendanceById(id: number) {
    return await attendanceRepository.getAttendanceById(id);
  }
  async getAttendanceByDate(date: string) {
    return await attendanceRepository.getAttendanceByDate(date);
  }
  async getAttendanceByEmployee(employeeId: number, fromDate: string, toDate: string) {
    if (new Date(fromDate) > new Date(toDate)) {
      throw new Error("fromDate cannot be greater than toDate");
    }
    return await attendanceRepository.getAttendanceByEmployee(employeeId, fromDate, toDate);
  }
  async getAttendanceSummary(employeeId: number, month: string) {
    return await attendanceRepository.getAttendanceSummary(employeeId, month);
  }
  async saveAttendance(
    employeeId: number,
    date: string,
    status: AttendanceStatus
  ) {
    const attendanceDate = fromZonedTime(
      `${date}T00:00:00`,
      "Asia/Kolkata"
    );

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (!employee.isActive) {
      throw new Error("Employee is inactive");
    }

    return attendanceRepository.saveAttendance(
      employeeId,
      attendanceDate,
      status
    );
  }
}
export default new AttendanceService();
