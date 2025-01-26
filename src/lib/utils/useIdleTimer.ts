"use client"

import { useEffect, useRef } from "react";
import { logoutAction } from "@/data/actions/auth/logoutAction";
import { responseAlert } from "./alerts/responseAlert";
import { usePathname } from "next/navigation";

const IdleTimer = ({ timeout = 300000 }: { timeout?: number }) => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    const resetTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout( async() => {

            const informUser = await responseAlert("Estas inactivo", "¿Deseas seguir conectado?", "Seguir conectado", "Cerrar sesión", true);

            if (informUser) {
                resetTimer();
            } else {
                logoutAction();
            }
        }, timeout);
    };

    useEffect(() => {

        if (!pathname.startsWith('/dashboard')){
            console.log("Si")
            return;
        };

        const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

        const eventHandler = () => resetTimer();

        events.forEach(event => window.addEventListener(event, eventHandler));

        resetTimer(); // Inicia el temporizador la primera vez

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            events.forEach(event => window.removeEventListener(event, eventHandler));
        };
    }, [timeout]);

    return null;
};

export default IdleTimer;