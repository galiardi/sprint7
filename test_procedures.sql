DELIMITER **
    CREATE PROCEDURE transferir(
        IN emisor BIGINT UNSIGNED,
        IN receptor BIGINT UNSIGNED,
        IN monto DECIMAL
    )
    
    BEGIN
  
    /* IF (emisor = receptor) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El emisor no puede ser igual al receptor';
    END IF; */
    
    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);
    SET @receptor_state = (SELECT state FROM usuarios WHERE id_usuario= receptor);

    -- chequea si usuario no existe, No funciona.
    IF (@emisor_state = null OR @receptor_state = null) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
    END IF;

    -- chequea si usuario no existe o no existe por borrado logico
    -- PROBLEMA: no funciona esta comprobacion cuando paso un emisor que no existe, en todos los demas casos si funciona. why?????????????????????????????????????????
    IF (@emisor_state != 1 OR @receptor_state != 1) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
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



-- test procedure
DELIMITER **
    CREATE PROCEDURE test1(
        IN emisor BIGINT UNSIGNED
    )
    
    BEGIN
    
    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);
    SELECT @emisor_state;

    END **
DELIMITER ;



DELIMITER **
CREATE PROCEDURE test2(
        IN emisor BIGINT UNSIGNED
    )

    BEGIN
    
    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);

    -- chequea si usuario no existe, Si funciona.
    IF (@emisor_state IS NULL) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
    END IF;

    SELECT @emisor_state;
    END **
DELIMITER ;



DELIMITER **
    CREATE PROCEDURE test3(
        IN emisor BIGINT UNSIGNED,
        IN receptor BIGINT UNSIGNED
    )
    
    BEGIN
    
    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);
    SET @receptor_state = (SELECT state FROM usuarios WHERE id_usuario= receptor);

    -- chequea si usuario no existe o no existe por borrado logico
    -- PROBLEMA: no funciona esta comprobacion cuando paso un emisor que no existe, en todos los demas casos si funciona. why?????????????????????????????????????????
    --  RESPUESTA NULL no se compara, se necesita una comparacion previa para descartar nulls
    IF (@emisor_state != 1 OR @receptor_state != 1) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
    END IF;

    SELECT @emisor_state;
    END **
DELIMITER ;



DELIMITER **
    CREATE PROCEDURE test4(
        IN emisor BIGINT UNSIGNED,
        IN receptor BIGINT UNSIGNED
    )
    
    BEGIN
    
    SET @emisor_state = (SELECT state FROM usuarios WHERE id_usuario= emisor);
    SET @receptor_state = (SELECT state FROM usuarios WHERE id_usuario= receptor);

    -- chequea si usuario no existe o no existe por borrado logico
    -- PROBLEMA: no funciona esta comprobacion cuando paso un emisor que no existe, en todos los demas casos si funciona. why?????????????????????????????????????????
    -- RESPUESTA NULL no se puede comparar
    IF (@emisor_state = 0 OR @receptor_state = 0) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Al menos uno de los usuarios no existe';
    END IF;

    SELECT @emisor_state;
    END **
DELIMITER ;