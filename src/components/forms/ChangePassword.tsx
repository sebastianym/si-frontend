"use client"

import { Button, Input } from '@nextui-org/react';
import React from 'react'
import { useFormState } from 'react-dom';
import { ZodErrors } from '../custom/ZodErrors';
import { changePasswordAction } from '@/data/actions/auth/changePasswordAction';

const INITIAL_STATE = {
	zodErrors: null,
	strapiErrors: null,
	data: null,
	message: null,
};

export default function ChangePasswordForm() {

	const [formState, formAction] = useFormState(changePasswordAction, INITIAL_STATE);

	return (
		<form className="border border-black/10 rounded-lg p-8 max-xl:mb-5">
			<div className="mb-6">
				<label className="block text-black/70 font-semibold mb-2" htmlFor="current-password">
					Contraseña actual
				</label>
				<div className="relative">
					<Input type="password" radius='sm' id="password" name="password" />
				</div>
			</div>
			<div className="mb-6">
				<label className="block text-black/70 font-semibold mb-2" htmlFor="new-password">
					Nueva contraseña
				</label>
				<div className="relative">
					<Input type="password" radius='sm' id="password" name="password" />
				</div>
			</div>
			<div className="mb-6">
				<label className="block text-black/70 font-semibold mb-2" htmlFor="confirm-password">
					Confirmar contraseña
				</label>
				<div className="relative">
					<Input type="password" radius='sm' id="password" name="password" />
				</div>
			</div>

			<Button color="primary" variant='solid' radius='sm' size='lg' type='submit'>Cambiar contraseña</Button>
		</form>
	);
}