import { postReservationService } from "@/data/services/reservations/postReservationService";

export default async function postReservationAction(reservationBody: {
  startTime: string;
  endTime: string;
  resource: string;
  user: string;
}) {
  const reservation = await postReservationService(reservationBody);
  return reservation;
}
