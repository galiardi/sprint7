CREATE DATABASE bancosolar;

USE bancosolar;

CREATE TABLE usuarios(
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  balance DECIMAL NOT NULL CHECK (balance >= 0),
  state INT NOT NULL DEFAULT 1
);

CREATE TABLE transferencias(
  id_transferencia SERIAL PRIMARY KEY,
  emisor BIGINT UNSIGNED NOT NULL,
  receptor BIGINT UNSIGNED NOT NULL,
  monto DECIMAL NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (emisor) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (receptor) REFERENCES usuarios(id_usuario)
);

DELIMITER **
    CREATE PROCEDURE transferir(
        IN emisor BIGINT UNSIGNED,
        IN receptor BIGINT UNSIGNED,
        IN monto DECIMAL
    )
    
    BEGIN
    -- lanza error si emisor es igual a receptor
    -- si son iguales, el usuario sumara dinero a su cuenta en vez de quedar igual
    IF (emisor = receptor) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El emisor no puede ser igual al receptor';
    END IF;

    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);
    SET @receptor_state = (SELECT state FROM usuarios WHERE id_usuario= receptor);

    -- lanza error si algun usuario no existe. Ademas es necesario descartar null para hacer la siguiente comprobacion
    IF (@emisor_state IS NULL OR @receptor_state IS NULL) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
    END IF;

    -- lanza error si algun usuario tiene borrado logico
    IF (@emisor_state = 0 OR @receptor_state = 0) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios ha sido eliminado';
    END IF;

    SET @balance_emisor = (SELECT balance FROM usuarios WHERE id_usuario= emisor);
    SET @balance_receptor = (SELECT balance FROM usuarios WHERE id_usuario= receptor);
    SET @nuevo_balance_emisor = @balance_emisor - monto;
    SET @nuevo_balance_receptor = @balance_receptor + monto;

    UPDATE usuarios SET balance = @nuevo_balance_emisor WHERE id_usuario = emisor;
    UPDATE usuarios SET balance = @nuevo_balance_receptor WHERE id_usuario = receptor;

    INSERT INTO transferencias (emisor, receptor, monto) VALUES (emisor, receptor, monto);
    
    SELECT LAST_INSERT_ID();
    END **
DELIMITER ;

-- SHOW PROCEDURE STATUS WHERE DB = 'bancosolar';