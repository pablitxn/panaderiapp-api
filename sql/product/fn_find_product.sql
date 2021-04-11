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
