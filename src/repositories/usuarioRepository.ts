import { CreateUserDto, UpdateUserDto, User, UserQueryParams } from '../models/usuarioDTO';
import pool from '../config/DatabaseConexion';
import {IUsuario} from '../models/interface/usuario.interface';

export class UserRepository {

  async buscar_usuario(params: UserQueryParams): Promise<User[]> {
    let connection;
    try {
      connection = await pool.getConnection();


      const dni = params.dni || '';
      const nombre = params.nombre || '';
      const ape_pat = params.ape_pat || '';
      const ape_mat = params.ape_mat || '';
      const es_docente = params.es_docente || '';
      const es_tutor = params.es_tutor || '';

      // Call the stored procedure
      const [rows] = await connection.query(
        'CALL sp_usuario_consulta(?, ?, ?, ?, ?, ?)',
        [dni, nombre, ape_pat, ape_mat, es_docente, es_tutor]
      );

      connection.release();

      return (rows as any)[0] as User[];
    } catch (error) {
      console.error('Error in UserRepository.findUsers:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async recuperar_usuario(idusuario: number): Promise<IUsuario[]> {
    let connection;
    try {
      connection = await pool.getConnection();

      const [rows] = await connection.query( 'CALL sp_usuario_recuperar(?)', idusuario );

      connection.release();

      return (rows as any)[0] as IUsuario[];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async insert_usuario(userData: CreateUserDto): Promise<boolean> {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.query('CALL sp_usuario_insert(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userData.idrol_usuario,
        userData.dni,
        userData.nombres,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
        userData.es_docente,
        userData.es_tutor,
        userData.vigencia]
      );

      return true;
    } catch (error) {
      console.error('Error in UserRepository.createUser:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async update_usuario(userData: UpdateUserDto): Promise<boolean> {
    let connection;
    try {
      connection = await pool.getConnection();

      await connection.query('CALL sp_usuario_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        userData.idusuario,
        userData.idrol_usuario,
        userData.dni,
        userData.nombres,
        userData.ape_pat,
        userData.ape_mat,
        userData.correo,
        userData.es_docente,
        userData.es_tutor,
        userData.vigencia
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