CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION fn_drop_func(_name text, OUT func_dropped int) AS
$func$
DECLARE
   _sql text;
BEGIN
   SELECT count(*)::int
        , string_agg(format('DROP FUNCTION %s(%s);'
                          , oid::regproc
                          , pg_get_function_identity_arguments(oid))
                   , ' ')
   FROM   pg_proc
   WHERE  proname = _name
   AND    pg_function_is_visible(oid)
   INTO   func_dropped, _sql;

   IF func_dropped > 0 THEN  -- only if function(s) found
      EXECUTE _sql;
   END IF;
END
$func$ LANGUAGE plpgsql;


SELECT fn_drop_func('fn_delete_product');

CREATE OR REPLACE FUNCTION fn_delete_product(_id integer)
RETURNS TABLE(
  id integer,
  name character varying
)
  AS
$$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM product p WHERE p.id = _id) THEN
    RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  UPDATE product p
  SET  is_deleted = true
  WHERE p.id = _id;

    RETURN QUERY SELECT
      p.id,
      p.name
    FROM product p WHERE p.id = _id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;



SELECT fn_drop_func('fn_find_product');

CREATE OR REPLACE FUNCTION fn_find_product(
  _id integer,
  _limit integer default NULL,
  _offset integer default NULL
)
RETURNS TABLE(
  id integer,
  name character varying,
  available boolean,
  is_deleted boolean,
  updated_at timestamp,
  created_at timestamp
)
AS
$$
BEGIN
  IF _offset IS NULL THEN
  _offset := 0;
  END IF;

  IF _id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM product p
    WHERE p.id = _id
    AND p.is_deleted = false
    ) THEN
    RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.available,
    p.is_deleted,
    p.updated_at,
    p.created_at
  FROM product p
    WHERE (p.id = _id OR _id IS NULL)
    AND (p.is_deleted = false OR _id IS NOT NULL)
  ORDER BY p.id ASC
  LIMIT _limit
  OFFSET _offset;
END;
$$
LANGUAGE 'plpgsql' STABLE;



SELECT fn_drop_func('fn_insert_product');

CREATE OR REPLACE FUNCTION fn_insert_product(
  _name character varying,
  _available boolean
)
RETURNS TABLE(
  id integer,
  name character varying,
  available boolean,
  is_deleted boolean,
  updated_at timestamp,
  created_at timestamp
)
AS
$$
DECLARE
    _id integer;
BEGIN
    IF EXISTS(SELECT 1 FROM product p WHERE p.name= _name AND p.is_deleted = false) THEN
        RAISE EXCEPTION 'already exists' USING HINT = 'name', ERRCODE = '22000';
    END IF;

    INSERT INTO product (
      name,
      available,
      created_at
    )
    VALUES (
      _name,
      _available,
      current_timestamp
    );

    _id := currval(pg_get_serial_sequence('product','id'));

    RETURN QUERY SELECT * FROM fn_find_product(_id)
    LIMIT 1;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;




SELECT fn_drop_func('fn_update_product');

CREATE OR REPLACE FUNCTION fn_update_product(
  _id integer,
  _name character varying,
  _available boolean
)
RETURNS TABLE(
  id integer,
  name character varying,
  available boolean,
  is_deleted boolean,
  updated_at timestamp,
  created_at timestamp
)
AS
$$
BEGIN
  UPDATE product p
  SET
    name = _name,
    available = _available,
    updated_at = current_timestamp
  WHERE p.id = _id;

    RETURN QUERY SELECT
      p.id,
      p.name,
      p.available,
      p.is_deleted,
      p.updated_at,
      p.created_at
    FROM product p WHERE p.id = _id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;



