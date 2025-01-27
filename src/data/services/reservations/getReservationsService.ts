import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

const baseUrl = getStrapiURL();

export async function getReservationsService() {
  const url = new URL("/api/reservations", baseUrl);

  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Reservations Service Error:", error);
  }
}
