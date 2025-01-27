import { getReservationsService } from "@/data/services/reservations/getReservationsService";

export default async function getReservationsAction() {
  const reservations = await getReservationsService();
  return reservations;
}
