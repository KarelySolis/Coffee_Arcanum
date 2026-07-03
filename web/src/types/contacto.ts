export interface Contacto {
  ContactoId: number;
  Nombre: string;
  Email: string;
  Mensaje: string;
}

export interface ContactoCreate {
  Nombre: string;
  Email: string;
  Mensaje: string;
}

export interface ContactoUpdate extends ContactoCreate {}
