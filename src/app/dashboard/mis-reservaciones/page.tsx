"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCalendarDays } from "react-icons/fa6";

// This would come from your API/database
const reservations = [
  {
    id: 1,
    startDate: "2024-01-25",
    startTime: "10:00",
    endDate: "2024-01-25",
    endTime: "11:00",
    resource: "Laboratorio de Física",
    status: "Reservado",
  },
  {
    id: 2,
    startDate: "2024-01-26",
    startTime: "14:00",
    endDate: "2024-01-26",
    endTime: "16:00",
    resource: "Auditorio Principal",
    status: "Pendiente",
  },
  {
    id: 3,
    startDate: "2024-01-27",
    startTime: "09:00",
    endDate: "2024-01-27",
    endTime: "10:00",
    resource: "Sala de Conferencias",
    status: "Cancelada",
  },
];

export default function MisReservaciones() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Mis reservaciones
          </h1>
          <p className="text-muted-foreground">
            Aquí podrás ver el historial de tus reservaciones y su estado actual
          </p>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha y hora de inicio</TableHead>
                <TableHead>Fecha y hora de finalización</TableHead>
                <TableHead>Recurso</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FaCalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {reservation.startDate} {reservation.startTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {reservation.endDate} {reservation.endTime}
                  </TableCell>
                  <TableCell>{reservation.resource}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        reservation.status === "Confirmada"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
