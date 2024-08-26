import { logoutAction } from "@/data/actions/auth/logoutAction";
import { BsArrowReturnLeft } from "react-icons/bs";

export function LogoutButton() {
	return (
		<form action={logoutAction}>
			<button type="submit" className="flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10">
				<BsArrowReturnLeft className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
				<span className="ms-3 whitespace-nowrap">Cerrar sesión</span>
			</button>
		</form>
	);
}