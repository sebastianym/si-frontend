import { getUnitsService } from "@/data/services/units/getUnitsService";
import { Unit } from "@/lib/types/Unit";

export default async function getUnitsAction() {
    const units = await getUnitsService();
    return units.data as Unit[];
}