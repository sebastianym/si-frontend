import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

const baseUrl = getStrapiURL();

interface ReservationBody {
    startTime: string;
    endTime: string;
    resource: string;
    user: string;
}

export async function postReservationService(reservationBody: ReservationBody) {
  const url = new URL("/api/reservations", baseUrl);

  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data: reservationBody }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Reservations Service Error:", error);
  }
}
