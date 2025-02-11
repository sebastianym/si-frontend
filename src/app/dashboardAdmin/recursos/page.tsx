"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Plus } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  description: string;
  image: string;
  resource_type: string;
  location: string;
  is_active: boolean;
  slug: string;
  identifier:string
}

export default function AdminDashboard() {
  // Estado para la lista de recursos
  const [resources, setResources] = useState<Resource[]>([]);
  // Estado para controlar la apertura del modal
  const [isOpen, setIsOpen] = useState(false);
  // Estado para determinar si se está editando (o creando)
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
    identifier:""
  });

  // Función para cargar los recursos desde el backend
  const fetchResources = async () => {
    try {
      const res = await fetch(
        "https://si-strapi-backend.onrender.com/api/resources"
      );
      const json = await res.json();
      // Se asume que la respuesta es { data: [ { id, attributes: { ... } }, ... ] }
      const fetchedResources = json.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
      console.log(fetchedResources);
      setResources(fetchedResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  // Cargar los recursos al montar el componente
  useEffect(() => {
    fetchResources();
  }, []);

  // Actualizar el estado del formulario cuando se seleccione un recurso para editar
  useEffect(() => {
    if (editingResource) {
      setFormData({
        name: editingResource.name,
        description: editingResource.description,
        is_active: editingResource.is_active,
        identifier:editingResource.identifier
      });
    } else {
      setFormData({
        name: "",
        description: "",
        is_active: true,
        identifier:""
      });
    }
  }, [editingResource]);

  // Función para guardar (crear o actualizar) un recurso
  const handleSubmit = async () => {
    // Se arma el objeto a enviar en el body, incluyendo valores por defecto para image y generando el slug
    const resourceData = {
      name: formData.name,
      description: formData.description,
      image: "/placeholder.svg", // Valor por defecto
      is_active: formData.is_active,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      identifier:formData.identifier
    };

    console.log(resourceData);

    try {
      if (editingResource) {
        // Actualización (PUT)
        const res = await fetch(
          `https://si-strapi-backend.onrender.com/api/resources/${editingResource.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: resourceData,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Error updating resource");
        }
      } else {
        // Creación (POST)
        const res = await fetch(
          "https://si-strapi-backend.onrender.com/api/resources",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: resourceData,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Error creating resource");
        }
      }
      // Recargar la lista de recursos y cerrar el modal
      fetchResources();
      setIsOpen(false);
      setEditingResource(null);
    } catch (error) {
      console.error("Error saving resource:", error);
    }
  };

  // Función para eliminar un recurso (DELETE)
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `https://si-strapi-backend.onrender.com/api/resources/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Error deleting resource");
      }
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  // Configuración para editar un recurso: se abre el modal y se actualiza el estado correspondiente
  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administración de Recursos</h1>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setEditingResource(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingResource(null)}>
              <Plus className="mr-2 h-4 w-4" />
              {editingResource ? "Editar Recurso" : "Crear Recurso"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? "Editar Recurso" : "Crear Nuevo Recurso"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  placeholder="Nombre del recurso"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  placeholder="Descripción del recurso"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource_type">Identificador</Label>
                <Input
                  id="resource_type"
                  value={formData.identifier}
                  placeholder="Identificador"
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="is_active">Activo</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Identificador</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{resource.description}</TableCell>
                <TableCell>{resource.identifier}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      resource.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {resource.is_active ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(resource)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(resource.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
