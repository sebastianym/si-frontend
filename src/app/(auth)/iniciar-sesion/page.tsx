import { Button, Input } from '@nextui-org/react';
import { Link} from 'next-view-transitions';
import React from 'react'

export default function SignInRoute() {


    return (
        <div className='md:p-20 max-md:p-10 min-h-screen flex justify-center items-center bg-gray-200'>
            <div className='w-4/6 max-xl:w-full container'>
                <div className='w-full flex flex-wrap bg-white rounded-2xl'>
                    <div className="lg:w-1/2 transition-all lg:h-auto w-full h-52 relative lg:rounded-l-2xl max-lg:rounded-xl lg:order-1 order-2 max-lg:mt-5 max-sm:hidden">
                        <div className="absolute inset-0 lg:rounded-l-2xl max-lg:rounded-b-2xl brightness-[0.3]"
                            style={{
                                backgroundImage: "url('/auth/side-image.jpg')",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }} />
                    </div>
                    <div className='lg:w-1/2 mt-5 xl:p-20 lg:!p-12 p-12 !pb-6 max-sm:p-10 rounded-r-2xl max-lg:rounded-xl lg:order-2 order-1'>
                        <div className='mt-5'>
                            <span className='bg-blue-600/80 px-3 rounded-sm text-sm py-1 text-white'>IntegraServicios</span>
                            <h1 className='text-3xl font-semibold xl:mb-5 w-full pt-5 '>Acceso al sistema</h1>
                        </div>
                        <p className='mb-8 text-bg-black max-xl:text-justify text-black/80'>A continuación ingresa los datos requeridos para acceder con tu perfil al dashboard de clientes.</p>
                        <form>
                            <label>
                                <p className='text-black/80 font-medium'>Correo electrónico <span className='text-black/80 font-medium text-sm select-none'></span></p>
                            </label>
                            <Input type="email" radius='sm' placeholder='Ingresa tu email aquí' size='lg' className='mt-2' />
                            <br />
                            <label>
                                <p className='text-black/80 font-medium'>Contraseña <span className='text-black/80 font-medium text-sm select-none'></span></p>
                            </label>
                            <Input type="password" radius='sm' placeholder='Ingresa tu contraseña aquí' size='lg' className='mt-2' />
                            <br />

                            <Button
                                fullWidth
                                size='lg'
                                spinnerPlacement='end'
                                radius='sm'
                                className='bg-blue-500 text-white'
                                spinner={
                                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                                    </svg>
                                }>
                                Iniciar sesión
                            </Button>

                            <a className='w-fit mb-6 mt-2 font-medium block'>¿Olvidaste tu contraseña?</a>
                            <Link href={'/registrarse'} className='mt-5 text-black/80'>¿No tienes una cuenta? Regístrate</Link>
                            <a className='w-fit block'>¿Problemas para ingresar a tu cuenta?</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}