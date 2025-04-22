import { CreateUserDto, UpdateUserDto, User, UserQueryParams } from '../models/interface/usuario.interface';
import { IUsuario } from '../models/interface/usuario.interface';
import { CryptoUtil } from '../utils/CryptoUtil';
import pool from '../config/DatabaseConexion';

export class UserRepository {

  public async buscar_usuario(params: UserQueryParams): Promise<User[]> {
    let connection;
    try {
      connection = await pool.getConnection();
      const dni = params.dni || '';
      const nombre = params.nombre || '';
      const ape_pat = params.ape_pat || '';
      const ape_mat = params.ape_mat || '';
      const es_docente = params.es_docente || '';
      const es_tutor = params.es_tutor || '';

      const [rows] = await connection.query(
        'CALL sp_usuario_consulta(?, ?, ?, ?, ?, ?)',
        [dni, nombre, ape_pat, ape_mat, es_docente, es_tutor]
      );

      connection.release();

      return (rows as any)[0] as User[];
    } catch (error) {
      console.error('Error en UserRepository.buscar_usuario:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  public async recuperar_usuario(idusuario: number): Promise<IUsuario[]> {
    let connection;
    try {
      connection = await pool.getConnection();

      const [rows] = await connection.query('CALL sp_usuario_recuperar(?)', idusuario);

      connection.release();

      return (rows as any)[0] as IUsuario[];
    } catch (error) {
      console.error('Error in UserRepository.recuperar_usuario: ', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  public async verificar_clave(idusuario: number, clave_antigua: string, clave_nueva: string): Promise<string> {
    let connection;
    try {
      connection = await pool.getConnection();
      const encryptedOld = await CryptoUtil.encrypt(clave_antigua);
      const encryptedNew = await CryptoUtil.encrypt(clave_nueva);
      
      const [rows] = await connection.query('CALL sp_usuario_verificar_clave(?, ?, ?)', [idusuario, encryptedOld, encryptedNew]);

      const result = (rows as any)[0];
      if (result && result[0] && typeof result[0].mensaje !== 'undefined') {
        return result[0].mensaje as string;
      }
      return 'No se recibió mensaje del procedimiento.';
    } catch (error: any) {
      
      if (error.sqlMessage) {
        return error.sqlMessage;
      }
      console.error('Error en UserRepository.verificar_clave:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  public async verificar_dni(dni: string): Promise<boolean> {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query('CALL sp_usuario_verificar_dni(?)', [dni]);
      const result = (rows as any)[0];
      if (result && result[0] && typeof result[0].n_dni !== 'undefined') {
        return result[0].n_dni > 0;
      }
      return false;
    } catch (error) {
      console.error('Error in UserRepository.verificar_dni:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


  public async update_usuario_imagenPerfil(idusuario: number, imagen: Buffer): Promise<string | null> {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(
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
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


  public async insert_usuario(userData: CreateUserDto): Promise<boolean> {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.query('CALL sp_usuario_insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)',
        [userData.idrol_usuario,
        userData.dni,
        userData.nombre,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
        CryptoUtil.encrypt(userData.clave),
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
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  public async update_usuario(userData: UpdateUserDto): Promise<boolean> {
    let connection;
    try {
      connection = await pool.getConnection();

      await connection.query('CALL sp_usuario_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        userData.idusuario,
        userData.idrol_usuario,
        userData.dni,
        userData.nombre,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
        CryptoUtil.encrypt(userData.clave),
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
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


}