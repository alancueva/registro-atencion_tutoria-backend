import { CreateUserDto, UpdateUserDto, User, UserQueryParams, usuario_datos_dto, usuario_datos } from '../models/interface/usuario.interface';
import { IUsuario } from '../models/interface/usuario.interface';
import { CryptoUtil } from '../utils/CryptoUtil';
import pool from '../config/DatabaseConexion';

export class UserRepository {

  public async buscar_usuario(params: UserQueryParams): Promise<User[]> {
    try {
      const dni = params.dni || '';
      const nombre = params.nombre || '';
      const ape_pat = params.ape_pat || '';
      const ape_mat = params.ape_mat || '';
      const es_docente = params.es_docente || '';
      const es_tutor = params.es_tutor || '';

      const [rows]: any = await pool.query(
        'CALL sp_usuario_consulta(?, ?, ?, ?, ?, ?)',
        [dni, nombre, ape_pat, ape_mat, es_docente, es_tutor]
      );

      return (rows as any)[0] as User[];
    } catch (error) {
      console.error('Error en UserRepository.buscar_usuario:', error);
      throw error;
    }
  }

  public async recuperar_usuario(idusuario: number): Promise<IUsuario> {
    try {
      const [rows]: any = await pool.query('CALL sp_usuario_recuperar(?)', [idusuario]);
      const usuario = rows[0][0] as IUsuario;
      if (usuario && usuario.clave) {
        usuario.clave = await CryptoUtil.decrypt(usuario.clave);
      }
      return usuario;
    } catch (error) {
      console.error('Error in UserRepository.recuperar_usuario: ', error);
      throw error;
    }
  }

  public async verificar_clave(idusuario: number, clave_antigua: string, clave_nueva: string): Promise<string> {
    try {
      const encryptedOld = await CryptoUtil.encrypt(clave_antigua);
      const encryptedNew = await CryptoUtil.encrypt(clave_nueva);

      const [rows]: any = await pool.query('CALL sp_usuario_verificar_clave(?, ?, ?)', [idusuario, encryptedOld, encryptedNew]);

      const result = (rows as any)[0];

      if (result && result[0]?.mensaje) {
        return result[0].mensaje;
      }

      throw new Error('No se recibió mensaje del procedimiento almacenado.');

    } catch (error: any) {

      if (error.sqlMessage) {
        return error.sqlMessage;
      }

      console.error('Error en UserRepository.verificar_clave:', error);
      throw error;
    }
  }

  public async verificar_dni(dni: string): Promise<boolean> {
    try {
      const [rows]: any = await pool.query('CALL sp_usuario_verificar_dni(?)', [dni]);
      const result = (rows as any)[0];
      if (result && result[0] && typeof result[0].n_dni !== 'undefined') {
        return result[0].n_dni > 0;
      }
      return false;
    } catch (error) {
      console.error('Error in UserRepository.verificar_dni:', error);
      throw error;
    }
  }


  public async update_usuario_imagenPerfil(idusuario: number, imagen: Buffer): Promise<string | null> {

    try {
      const [rows]: any = await pool.query(
        'CALL sp_usuario_update_ImagenPerfil(?, ?)',
        [idusuario, imagen]
      );
      const result = (rows as any)[0];

      if (result && result[0] && typeof result[0].imagen !== 'undefined') {
        return result[0].imagen as string;
      }

      return null;
    } catch (error) {
      console.error('Error in UserRepository.update_usuario_imagenPerfil:', error);
      throw error;
    }
  }

  public async actualizar_datos_usuario(usuario: usuario_datos_dto): Promise<usuario_datos> {
    try {
      const [rows]: any = await pool.query('CALL sp_usuario_update_usuario(?, ?, ?, ?, ?, ?, ?)',
        [usuario.idusuario,
        usuario.dni,
        usuario.nombres,
        usuario.ape_pat,
        usuario.ape_mat,
        usuario.correo,
        usuario.usuario_modificacion
        ]
      );

      return rows[0][0] as usuario_datos;
    } catch (error) {
      console.error('Error in UserRepository.actualizar_datos_usuario:', error);
      throw error;
    }
  }

  public async insert_usuario(userData: CreateUserDto): Promise<boolean> {
    try {
      const encryptedClave = userData.clave ? await CryptoUtil.encrypt(userData.clave) : null;
      await pool.query('CALL sp_usuario_insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)',
        [userData.idrol_usuario,
        userData.dni,
        userData.nombre,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
          encryptedClave,
        userData.es_docente,
        userData.es_tutor,
        userData.idTurno,
        userData.idProgramaDeEstudio,
        userData.idsemestre,
        userData.imagen,
        userData.usuario_creacion,

        ]
      );

      return true;
    } catch (error) {
      console.error('Error in UserRepository.insert_usuario:', error);
      throw error;
    }
  }

  public async update_usuario(userData: UpdateUserDto): Promise<boolean> {
    try {
      const encryptedClave = userData.clave ? await CryptoUtil.encrypt(userData.clave) : null;
      await pool.query('CALL sp_usuario_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        userData.idusuario,
        userData.idrol_usuario,
        userData.dni,
        userData.nombre,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
        encryptedClave,
        userData.es_docente,
        userData.es_tutor,
        userData.vigencia,
        userData.idTurno,
        userData.idProgramaDeEstudio,
        userData.idsemestre,
        userData.imagen,
        userData.usuario_creacion,
      ]);

      return true;
    } catch (error) {
      console.error('Error in UserRepository.update_usuario:', error);
      throw error;
    }
  }


}