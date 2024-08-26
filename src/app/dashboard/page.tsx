import { BookingSystem } from "@/components/custom/BookingSystem";

export default function DashboardPage() {
	return (
		<div className="">
			<h1 className='text-2xl font-semibold text-black/70 mb-6 max-sm:pt-8 max-sm:pl-5'>
				Sistema de préstamos de la Universidad Distrital
			</h1>

			<p className='text-black/60 max-sm:pt-8 max-sm:pl-5'>
				Bienvenido al sistema de préstamos de la Universidad Distrital, aquí podrás realizar reservas de los diferentes servicios que ofrece la universidad.
			</p>

			<BookingSystem></BookingSystem>
			

		</div>
	);
}