import { usuarioModel } from '../models/usuario.model.js';

async function crearUsuario(req, res) {
  const response = {
    message: 'Crear usuario',
    data: null,
    error: null,
  };

  const { nombre, balance } = req.body;
  console.log(req.body);

  if (!nombre || !balance) {
    response.error = 'Faltan parámetros';
    return res.status(400).send(response);
  }

  const result = await usuarioModel.crearUsuario({ nombre, balance });

  if (result === false) {
    response.error = 'Error al crear usuario';
    return res.status(500).send(response);
  }

  response.data = true;
  return res.status(201).send(response);
}

async function obtenerTodosUsuarios(req, res) {
  const response = {
    message: 'Obtener todos los usuarios',
    data: null,
    error: null,
  };

  const result = await usuarioModel.obtenerTodosUsuarios();

  if (result === false) {
    response.error = 'Error al obtener los usuarios';
    return res.status(500).send(response);
  }

  response.data = result;
  return res.status(200).send(response);
}

async function actualizarUsuario(req, res) {
  const response = {
    message: 'Actualizar usuario',
    data: null,
    error: null,
  };

  const { id } = req.query;
  const { nombre, balance } = req.body;
  console.log(id, nombre, balance);
  if (!id || !nombre || !balance) {
    response.error = 'Faltan parámetros';
    return res.status(400).send(response);
  }

  const result = await usuarioModel.actualizarUsuario({ id, nombre, balance });

  if (result === false) {
    response.error = 'Error al actualizar usuario';
    return res.status(500).send(response);
  }

  if (result === 'El usuario no existe') {
    response.error = result;
    return res.status(400).send(response);
  }

  response.data = true;
  return res.status(200).send(response);
}

async function borrarUsuario(req, res) {
  const response = {
    message: 'Borrar usuario',
    data: null,
    error: null,
  };

  const { id } = req.query;

  if (!id) {
    response.error = 'Faltan parámetros';
    return res.status(400).send(response);
  }

  const result = await usuarioModel.borrarUsuario(id);

  if (result === false) {
    response.error = 'Error al borrar usuario';
    return res.status(500).send(response);
  }

  if (result === 'El usuario no existe') {
    response.error = result;
    return res.status(400).send(response);
  }

  response.data = true;
  return res.status(200).send(response);
}
export { crearUsuario, obtenerTodosUsuarios, actualizarUsuario, borrarUsuario };
