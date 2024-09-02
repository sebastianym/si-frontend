import { getUnitsService } from "@/data/services/units/getUnitsService";
import { UnitsMinimalResponse } from "@/lib/types/Unit";

export default async function getUnitsAction() {
    const units = await getUnitsService();
    return units as UnitsMinimalResponse;
}