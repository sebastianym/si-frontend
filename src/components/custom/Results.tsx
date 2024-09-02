import { Resource } from "@/lib/types/Resource";
import { Button, Chip } from "@nextui-org/react";
import { IoMdCheckmark } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

type ResultsProps = {
	results: Resource[] | null;
};

export function Results({ results }: ResultsProps) {
	if (results && results.length > 0) {
		return (
			<div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all">
				{results.map((resource, index) => (
					<div className=" flex flex-col justify-between rounded-3xl border hover:translate-x-0.5 hover:-translate-y-0.5 transition-all" key={index} onClick={() => console.log("item pressed")}>

						<div className="overflow-visible p-0 relative">
							{resource.image && resource.image.url ? (
								<div className="w-full h-[180px]" style={{
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${resource.image.url})`,
									borderRadius: "20px 20px 0 0",
								}}>
								</div>
							) : (
								<div className="w-full h-[140px] bg-gray-200 flex items-center justify-center">
									<p>Imagen no disponible</p>
								</div>
							)}

							<div className="flex items-center gap-x-1 absolute bg-blue-500 text-white px-3 text-sm py-0.5 rounded-md top-4 right-4">
								<IoLocationSharp />
								<p>Sede {resource.location.location_name}</p>
							</div>

							<div className="p-5 pb-3">
							<p className="text-xl font-semibold mb-1">{resource.name}</p>
							<p className="text-sm mb-1">{resource.description}</p>
						</div>
						</div>

						<div className="p-5 pt-0">
							<button className="w-full border-2 rounded-lg py-2 bg-gray-200">Reservar</button>
						</div>


					</div>
				))}
			</div>
		);
	}

	return null;
}

