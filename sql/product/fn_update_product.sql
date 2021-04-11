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
