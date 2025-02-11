"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getReservationsAction from "@/data/actions/reservations/getReservationsAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCalendarDays } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import { defaultAlert } from "@/lib/utils/alerts/defaultAlert";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { StarRating } from "@/components/custom/starRating";

export default function MisReservaciones() {
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<any>([]);
  // Estados para el modal de calificación
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingReservation, setRatingReservation] = useState<any>(null);
  const [ratingData, setRatingData] = useState({
    scheduleCompliance: 0,
    resourceQuality: 0,
    staffCourtesy: 0,
    comments: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserMeLoader();

      const fetchReservations = async () => {
        try {
          const reservationsObtained = await fetch(
            `https://si-strapi-backend.onrender.com/api/users/${user.data.id}?populate=*`
          );
          const data = await reservationsObtained.json();
          console.log("Reservations obtained:", data.reservations);
          setReservations(data.reservations);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReservations();
    };
    fetchData();
  }, []);

  const handleCancelReservation = async (reservation: any) => {
    try {
      const response = await fetch(
        `https://si-strapi-backend.onrender.com/api/reservations/${reservation.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        defaultAlert("Éxito", "Reserva cancelada con éxito", "success");
        // Actualizamos el estado eliminando la reserva cancelada
        setReservations((prev: any) =>
          prev.filter((res: any) => res.id !== reservation.id)
        );
      } else {
        defaultAlert("Error", "No se pudo cancelar la reserva", "error");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      defaultAlert("Error", "No se pudo cancelar la reserva", "error");
    }
  };

  // Abre el modal de calificación para la reserva seleccionada
  const openRatingModal = (reservation: any) => {
    setRatingReservation(reservation);
    setShowRatingModal(true);
  };

  // Maneja el envío de la calificación
  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Se calcula el total como la suma de los tres parámetros
    const total =
      (Number(ratingData.scheduleCompliance) +
      Number(ratingData.resourceQuality) +
      Number(ratingData.staffCourtesy))/3;

    const payload = {
      data: {
        rating: {
          scheduleCompliance: ratingData.scheduleCompliance,
          resourceQuality: ratingData.resourceQuality,
          staffCourtesy: ratingData.staffCourtesy,
          total: total,
          comments: ratingData.comments,
        },
      },
    };

    console.log("Rating payload:", payload);

    try {
      const response = await fetch(
        `https://si-strapi-backend.onrender.com/api/reservations/${ratingReservation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        defaultAlert("Éxito", "Recurso calificado con éxito", "success");
        // Opcional: actualizar el estado local para reflejar la calificación
        setShowRatingModal(false);
        // Reiniciamos el formulario
        setRatingData({
          scheduleCompliance: 0,
          resourceQuality: 0,
          staffCourtesy: 0,
          comments: "",
        });
      } else {
        defaultAlert("Error", "No se pudo calificar el recurso", "error");
      }
    } catch (error) {
      console.error("Error rating resource:", error);
      defaultAlert("Error", "No se pudo calificar el recurso", "error");
    }
  };

  // Renderizamos la interfaz principal junto con el modal (si está abierto)
  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center animate-pulse">
          <LuLoader2
            size={26}
            className="mr-2 text-black/50 animate-spin mb-5"
          />
          <p className="text-black/80">Cargando reservas...</p>
        </div>
      ) : reservations && reservations.length > 0 ? (
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Mis reservaciones
              </h1>
              <p className="text-muted-foreground">
                Aquí podrás ver el historial de tus reservaciones y su estado
                actual
              </p>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha y hora de inicio</TableHead>
                    <TableHead>Fecha y hora de finalización</TableHead>
                    <TableHead>Estado</TableHead>
                    {/* Columna de acciones */}
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation: any) => {
                    const startTime = new Date(reservation.startTime);
                    const now = new Date();
                    // Se permite cancelar solo si faltan al menos 1 hora para el inicio
                    const canCancel =
                      startTime.getTime() - now.getTime() >= 3600000;

                    return (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FaCalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{startTime.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(reservation.endTime).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              reservation.status === "Reserved"
                                ? "bg-green-100 text-green-800"
                                : reservation.status === "Loaned"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {/* Si el estado es Reserved y se puede cancelar, se muestra la opción de cancelar */}
                          {reservation.status === "Reserved" && canCancel && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="focus:outline-none">
                                <FiMoreVertical className="h-5 w-5 text-muted-foreground" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleCancelReservation(reservation)
                                  }
                                >
                                  Cancelar reserva
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          {/* Si el estado es Returned, se muestra la opción para calificar el recurso */}
                          {reservation.status === "Returned" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="focus:outline-none">
                                <FiMoreVertical className="h-5 w-5 text-muted-foreground" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openRatingModal(reservation)}
                                >
                                  Calificar recurso
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          {/* Si el estado es Loaned o no se cumple la condición para cancelar,
                              no se muestra ninguna acción */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-black/80">No se encontraron reservas...</p>
        </div>
      )}

      {/* Modal para calificar el recurso */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Calificar recurso</h2>
            <form onSubmit={handleRatingSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Cumplimiento de Horario</label>
                <StarRating
                  rating={ratingData.scheduleCompliance}
                  onRatingChange={(value) => setRatingData({ ...ratingData, scheduleCompliance: value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Calidad del Recurso</label>
                <StarRating
                  rating={ratingData.resourceQuality}
                  onRatingChange={(value) => setRatingData({ ...ratingData, resourceQuality: value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Cortesía del Personal</label>
                <StarRating
                  rating={ratingData.staffCourtesy}
                  onRatingChange={(value) => setRatingData({ ...ratingData, staffCourtesy: value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Comentarios</label>
                <textarea
                  value={ratingData.comments}
                  onChange={(e) =>
                    setRatingData({
                      ...ratingData,
                      comments: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
