'use client'

import ChangePasswordForm from "@/components/forms/ChangePassword";
import { HiMiniLockClosed } from "react-icons/hi2";

export default function Seguridad() {
	
    return (
        <div className="p-2">
            <div className="border border-black/10  rounded-lg p-8 gap-x-5 mb-5 xl:flex items-center">
                <HiMiniLockClosed className="xl:w-52 h-full xl:p-8 w-20 p-2 max-xl:mb-5 bg-blue-200 rounded-md text-white" />
                <div>
                    <h3 className="text-black/80 font-semibold text-lg mb-4">Seguridad de mi cuenta</h3>
                    <p className="text-black text-justify">
                        En esta sección, puedes actualizar la contraseña de tu cuenta para mantenerla segura.
                        Recomendamos cambiar tu contraseña periódicamente y utilizar una combinación de letras,
                        números y caracteres especiales para mejorar la seguridad. Asegúrate de elegir una
                        contraseña única que no utilices en otros sitios web. Si tienes alguna duda o necesitas ayuda,
                        no dudes en contactar a nuestro equipo de soporte.
                    </p>
                </div>
            </div>

            <div className="xl:grid grid-flow-col grid-cols-2 gap-5">

				<ChangePasswordForm></ChangePasswordForm>

                <div className="border border-black/10  rounded-lg p-8 max-xl:mb-5 h-fit">
                    <div>
                        <h4 className="text-black/70 font-semibold text-lg text-md mb-2">Requisitos de la Contraseña</h4>
                        <ul className="list-disc list-inside text-black">
                            <li>Debe tener al menos 8 caracteres.</li>
                            <li>Debe contener al menos una letra mayúscula.</li>
                            <li>Debe contener al menos un número.</li>
                            <li>Debe contener al menos un símbolo especial (p. ej., !@#$%^&*).</li>
                        </ul>
                    </div>

                    
					{/** Aqui el error */}

                </div>
            </div>
        </div>
    );
}