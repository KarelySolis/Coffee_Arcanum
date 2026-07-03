export type TipoUsuario = "Admin" | "Cajero";

export interface Usuario {
  UsuarioId: number;
  NombreUsuario: string;
  TipoUsuario: TipoUsuario;
}

export interface UsuarioCreate {
  NombreUsuario: string;
  Contrasena: string;
  TipoUsuario: TipoUsuario;
}

export interface UsuarioUpdate extends UsuarioCreate {}
