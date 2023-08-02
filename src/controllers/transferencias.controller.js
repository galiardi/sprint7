import { transferenciaModel } from '../models/transferencia.model.js';

async function crearTransferencia(req, res) {
  const response = {
    message: 'Crear transferencia',
    data: null,
    error: null,
  };

  const transferencia = req.body;
  const { emisor, receptor, monto } = transferencia;

  if (!emisor || !receptor || !monto) {
  }

  if (!emisor || !receptor || !monto) {
    response.error = 'Faltan parámetros';
    return res.status(400).send(response);
  }

  const result = await transferenciaModel.crearTransferencia(transferencia);

  if (result === false) {
    response.error = 'Error al crear la transferencia';
    return res.status(500).send(response);
  }

  if (result === 'Saldo insuficiente') {
    response.error = result;
    return res.status(400).send(response);
  }

  // retorna los errores establecidos en el procedure
  if (result.sqlState === '45000') {
    response.error = result.sqlMessage;
    return res.status(400).send(response);
  }

  response.data = true;
  return res.status(201).send(response);
}

async function obtenerTodasTransferencias(req, res) {
  const response = {
    message: 'Obtener transferencias',
    data: null,
    error: null,
  };

  const result = await transferenciaModel.obtenerTodasTransferencias();

  if (result === false) {
    response.error = 'Error al obtener las transferencias';
    return res.statuts(500).send(response);
  }

  console.log(result);
  response.data = result;
  return res.status(200).send(response);
}

export { crearTransferencia, obtenerTodasTransferencias };
