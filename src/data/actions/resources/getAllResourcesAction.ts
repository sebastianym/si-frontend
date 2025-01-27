import { getAllResourcesService } from "@/data/services/resources/getAllResourcesService";

export default async function getAllResourcesAction() {
  const reservations = await getAllResourcesService();
  return reservations;
}
