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
