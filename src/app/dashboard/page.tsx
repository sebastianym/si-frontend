"use client";

import getUnitsAction from "@/data/actions/units/getUnitsAction";
import { UnitMinimal } from "@/lib/types/Unit";
import { Button } from "@nextui-org/react";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

export default function DashboardPage() {

	const [units, setUnits] = useState<UnitMinimal[] | null>(null);
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const fetchUnits = async () => {
			const unitsObtained = await getUnitsAction();
			setUnits(unitsObtained.data);
		}
		fetchUnits();
	}, []);

	return (
		<div className="container">
			<div className="rounded-lg">
				<div
					className="flex min-h-[480px] rounded-lg flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-14 pb-14"
					style={{
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%), url("/assets/dashboard.png")',
						borderRadius: "0px 0px 20px 20px",
					}}
				>
					<div className="flex flex-col gap-2 text-left">
						<h1
							className="text-white text-4xl font-semibold leading-tight max-lg:text-center max-lg:mb-5"
						>
							Reserva tus espacios o materiales
						</h1>
						<h2 className="text-white font-normal leading-normal max-lg:text-center max-lg:mb-5">
							Espacios fisicos, materiales y equipos de la Universidad Distrital Francisco José de Caldas
						</h2>
					</div>
					<label className="flex flex-col min-w-40 h-14 w-full max-w-[680px] @[680px]:h-16">
						<div className="flex w-full flex-1 items-stretch rounded-xl h-full">
							<div
								className="text-[#648771] flex border border-[#dce5df] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0"
								data-icon="MagnifyingGlass"
								data-size="20px"
								data-weight="regular"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
									<path
										d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
									></path>
								</svg>
							</div>
							<input
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Salones, auditorios, laboratorios, equipos, etc."
								className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111714] focus:outline-0 focus:ring-0 border border-[#dce5df] bg-white focus:border-[#dce5df] h-full placeholder:text-[#648771] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
							/>
							<div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#dce5df] bg-white pr-[7px]">
								<Link href={`/dashboard/reservar/buscador/${search}`}>
									<Button size="md" radius="sm" color="primary">Buscar</Button>
								</Link>
							</div>
						</div>
					</label>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mt-10 mb-6">Unidades disponibles</h2>
				{!units ? (
					// Mostrar el estado de carga hasta que 'units' exista
					<div className="max-md:mx-10 transition-all animate-pulse">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
							<div className="flex border rounded-3xl min-h-[250px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-10 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
								<LuLoader2 size={26} className="mr-2 text-black/50 animate-spin" />
								<p className="text-black/80">Cargando unidades...</p>
							</div>
						</div>
					</div>
				) : (
					// Filtrar las unidades activas
					(() => {
						const activeUnits = units.filter((unit) => unit.attributes.is_active);

						return activeUnits.length > 0 ? (
							// Mostrar unidades disponibles que están activas
							<div className="max-md:mx-10 transition-all">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
									{activeUnits.map((unit) => (
										<Link
											href={`/dashboard/reservar/unidad/${unit.attributes.slug}`}
											className="flex min-h-[250px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-10 pb-10 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
											key={unit.id}
											style={{
												backgroundSize: "cover",
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%), url(${unit.attributes.image.data.attributes.url})`,
												borderRadius: "24px",
											}}
										>
											<div>
												<p className="text-tiny text-white/60 uppercase font-bold">Unidad destacada</p>
												<h4 className="text-white font-medium text-large">{unit.attributes.name}</h4>
											</div>
										</Link>
									))}
								</div>
							</div>
						) : (
							// Mostrar mensaje si no hay unidades activas disponibles
							<div className="flex border rounded-3xl min-h-[250px] flex-col gap-1 bg-cover bg-center bg-no-repeat items-center justify-center px-10 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
								<p className="text-black/80">No hay unidades disponibles en este momento.</p>
								<p>Si crees que se trata de un error, comunícate con un empleado del establecimiento</p>
							</div>
						);
					})()
				)}
			</div>
		</div>
	);
}