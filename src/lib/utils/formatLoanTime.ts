export function formatLoanTime(minimumLoanTime: number) {
    // Convertir el tiempo de préstamo en minutos y horas
    const totalMinutes = minimumLoanTime * 60;

    if (totalMinutes < 60) {
        // Si el tiempo es menor a una hora, mostrar minutos
        const roundedMinutes = Math.round(totalMinutes);
        return roundedMinutes === 1 ? "1 minuto" : `${roundedMinutes} minutos`;
    } else {
        // Si el tiempo es una hora o más, mostrar horas
        const hours = Math.floor(minimumLoanTime);
        const minutes = Math.round((minimumLoanTime - hours) * 60);
        
        if (hours === 1 && minutes === 0) {
            return "1 hora";
        } else if (hours > 0 && minutes > 0) {
            return `${hours} horas y ${minutes} minutos`;
        } else if (hours > 0) {
            return `${hours} horas`;
        } else {
            return `${minutes} minutos`;
        }
    }
}