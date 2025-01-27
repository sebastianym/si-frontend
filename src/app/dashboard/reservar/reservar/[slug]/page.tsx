"use client";

import { useEffect, useState, useCallback } from "react";
import { MapPin, Clock, Info, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { responseAlert } from "@/lib/utils/alerts/responseAlert";
import getResourceSlugAction from "@/data/actions/resources/getResourceSlugAction";
import { Resource } from "@/lib/types/Resource";
import { LuLoader2 } from "react-icons/lu";

interface TimeSlot {
  start: string;
  end: string;
  selected: boolean;
}

export default function ResourceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [date, setDate] = useState<Date>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showError, setShowError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const now = new Date();

  // Memoize the function to prevent recreation on every render
  const generateTimeSlots = useCallback((selectedDate: Date) => {
    const slots: TimeSlot[] = [];
    const isSaturday = selectedDate.getDay() === 6;
    const startHour = 6;
    const endHour = isSaturday ? 15 : 20;

    for (let i = startHour; i < endHour; i++) {
      if (
        selectedDate.toDateString() == now.toDateString() &&
        i <= now.getHours()
      ) {
        continue;
      } else {
        slots.push({
          start: `${i}:00`,
          end: `${i + 1}:00`,
          selected: false,
        });
      }
    }
    return slots;
  }, []);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resourceObtained = await getResourceSlugAction({
          slug: params.slug,
        });
        console.log(resourceObtained);
        setResource(resourceObtained);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResource(null);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setTimeSlots(generateTimeSlots(selectedDate));
    }
  };

  const handleTimeSlotClick = (index: number) => {
    const newTimeSlots = timeSlots.map((slot, i) => ({
      ...slot,
      selected: i === index ? !slot.selected : slot.selected,
    }));

    const now = new Date();

    const isValid = newTimeSlots.every((slot) => {
      const [startHour] = slot.start.split(":").map(Number);
      return !(
        date?.toDateString() === now.toDateString() &&
        startHour < now.getHours() &&
        slot.selected
      );
    });

    if (!isValid) {
      setShowError(true);
      return;
    }

    setTimeSlots(newTimeSlots);
    setShowError(false);
  };

  const handleReserve = async () => {
    if (!date) {
      setDateError(true);
      return;
    }
    if (!timeSlots.some((slot) => slot.selected)) {
      setShowError(true);
      return;
    }
    const reservation = await responseAlert(
      "¿Deseas reservar el recurso?",
      "Por favor confirma si deseas proceder con la reserva del recurso seleccionado.",
      "Reservar",
      "Cancelar",
      false
    );

    if (reservation) {
    } else {
    }
    console.log("Reserving resource:", {
      date: date,
      timeSlots: timeSlots.filter((slot) => slot.selected),
    });
  };

  if (!resource && loading) {
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <LuLoader2 size={26} className="mr-2 text-black/50 animate-spin mb-5" />
        <p className="text-black/80">Cargando información del recurso...</p>
      </div>
    );
  }

  if (resource?.is_active === true && resource !== null) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {resource?.image.formats.small.url ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${resource.image.formats.small.url})`,
                  borderRadius: "20px",
                }}
              ></div>
            ) : (
              <div className="w-full h-[140px] bg-gray-200 flex items-center justify-center">
                <p>Imagen no disponible</p>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Sede {resource?.location.location_name}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {resource?.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {resource?.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Horarios disponibles (tiempo mínimo: 1 hora)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Selecciona una fecha y hora(s)</span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date
                        ? format(date, "PPP", { locale: es })
                        : "Selecciona una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const now = new Date();
                        now.setHours(0, 0, 0, 0);
                        return date < now || date.getDay() === 0;
                      }}
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {dateError && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Debes seleccionar una fecha válida (no domingos ni fechas
                    pasadas)
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={slot.selected ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSlotClick(index)}
                  >
                    {slot.start} - {slot.end}
                  </Button>
                ))}
              </div>

              {showError && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Debes seleccionar al menos un horario para realizar la
                    reserva
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className="w-full bg-black text-white"
                size="lg"
                onClick={handleReserve}
              >
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black/80">El recurso no está disponible...</p>
      </div>
    );
  }
}
