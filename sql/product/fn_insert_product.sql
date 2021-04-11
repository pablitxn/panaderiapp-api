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

