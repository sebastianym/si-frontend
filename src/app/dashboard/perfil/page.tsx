
'use client'

import { IoLayers } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Button } from "@nextui-org/react";


export default function Perfil() {

	return (
		<div>
			<div className="">
				<div className="lg:flex justify-between border border-black/10 rounded-lg p-8 items-center mb-5">
					<div className="lg:flex items-center gap-x-5">
						<CiUser className="ring-1 rounded-full ring-gray-300 p-5 w-24 h-24 ring-gray/20 text-gray-300 max-lg:mb-5 max-sm:m-auto" />
						<div>
							<h2 className="font-semibold text-black/70 text-xl mb-1 max-sm:text-center max-sm:mt-5">Nombre completo</h2>
							<p className="text-black/70 font-semibold mb-1 max-sm:text-center">Rol del usuario</p>
							<p className="text-black/70 max-sm:text-center">Email de usuarios</p>
						</div>
					</div>
					<div className="xl:flex items-center gap-x-5">
						<Button size="lg" radius="sm" variant="solid" color="primary" endContent={<IoLayers />}>
							Mis reservas
						</Button>
					</div>
				</div>
			</div>

			<div className="xl:grid grid-flow-col grid-cols-2 gap-5">
				<div>
					<div className="border border-black/10 rounded-lg p-8 max-xl:mb-5 h-fit mb-5">
						<div className="lg:flex justify-between gap-x-5 items-center mb-8">
							<h3 className="text-black/80 font-semibold text-lg">Información personal</h3>
						</div>
						<div className="lg:grid grid-cols-2 gap-x-5 mb-8">
							<div className="max-lg:mb-6">
								<label className="text-black/70 font-medium">Nombre completo</label>
								<p className="text-black/80">Nombre del usuario</p>
							</div>
							<div>
								<label className="text-black/70 font-medium">Correo electrónico</label>
								<p className="text-black/80">Email del usuario</p>
							</div>
						</div>
						<div className="lg:grid grid-cols-2 gap-x-5 mb-2">
							<div className="max-lg:mb-6">
								<label className="text-black/70 font-medium">Fecha de registro</label>
								<p className="text-black/80">Nombre de usuario</p>
							</div>
							<div>
								<label className="text-black/70 font-medium">Última conexión</label>
								<p className="text-black/80">Fecha de registro</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
