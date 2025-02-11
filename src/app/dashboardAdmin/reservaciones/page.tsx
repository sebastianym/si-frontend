"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getReservationsAction from "@/data/actions/reservations/getReservationsAction";
import { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";

export default function MisReservaciones() {
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<any>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsObtained = await getReservationsAction();
        console.log("Reservations obtained:", reservationsObtained);
        setReservations(reservationsObtained.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Función para actualizar el estado de una reserva
  const handleUpdateStatus = async (
    id: any,
    newStatus: "Loaned" | "Returned"
  ) => {
    try {
      const response = await fetch(
        `https://si-strapi-backend.onrender.com/api/reservations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              status: newStatus,
            },
          }),
        }
      );

      if (response.ok) {
        // Actualizamos el estado local de la reserva para reflejar el cambio
        setReservations((prevReservations: any[]) =>
          prevReservations.map((r) => {
            if (r.id === id) {
              return {
                ...r,
                attributes: {
                  ...r.attributes,
                  status: newStatus,
                },
              };
            }
            return r;
          })
        );
      } else {
        console.error(
          "Error updating reservation status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <LuLoader2 size={26} className="mr-2 text-black/50 animate-spin mb-5" />
        <p className="text-black/80">Cargando reservas...</p>
      </div>
    );
  }

  if (reservations && reservations.length > 0 && !loading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Reservaciones</h1>
            <p className="text-muted-foreground">
              Aquí podrás ver las reservaciones y modificar su estado actual
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
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation: any) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FaCalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(
                            reservation.attributes.startTime
                          ).toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        reservation.attributes.endTime
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {reservation.attributes.resource.data.attributes.identifier}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          reservation.attributes.status === "Reserved"
                            ? "bg-green-100 text-green-800"
                            : reservation.attributes.status === "Loaned"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reservation.attributes.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {/* Solo se muestran las acciones si la reserva no está en estado "Returned" */}
                      {reservation.attributes.status !== "Returned" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="focus:outline-none">
                            <FiMoreVertical className="h-5 w-5 text-muted-foreground" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {reservation.attributes.status === "Reserved" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(
                                    reservation.id,
                                    "Loaned"
                                  )
                                }
                              >
                                cambiar a prestado
                              </DropdownMenuItem>
                            )}
                            {reservation.attributes.status === "Loaned" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(
                                    reservation.id,
                                    "Returned"
                                  )
                                }
                              >
                                cambiar a retornado
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black/80">No se encontraron reservas...</p>
      </div>
    );
  }
}
