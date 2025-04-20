export interface User {
  idusuario: number
  idrol_usuario: number
  rol: string
  dni: string
  nombres: string
  ape_pat: string
  ape_mat: string
  correo: string
  es_docente: string
  es_tutor: string
  vigencia: number
}

export interface UserQueryParams {
  dni?: string
  nombre?: string
  ape_pat?: string
  ape_mat?: string
  es_docente?: string
  es_tutor?: string
}

export interface CreateUserDto {
  idrol_usuario: number
  dni: string
  nombres: string
  ape_pat: string
  ape_mat: string
  correo: string
  es_docente: string
  es_tutor: string
  vigencia: number
}

export interface UpdateUserDto extends CreateUserDto {
  idusuario: number
}

