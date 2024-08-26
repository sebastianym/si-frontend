import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

export function BookingSystem() {
	return (
		<div className="flex">
			<Input
				type="text"
				placeholder="Ingresa el nombre del servicio o recurso"
				variant="bordered"
				size="lg"
				radius="sm"
				startContent={
					<IoSearchOutline className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
				}
			/>

		</div>

	);
}

