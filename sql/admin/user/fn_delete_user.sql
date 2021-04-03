SELECT fn_drop_func('fn_delete_user');

CREATE OR REPLACE FUNCTION fn_delete_user(_id integer)
RETURNS TABLE(
  id integer,
  name character varying,
  email character varying
)
  AS
$$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM user_ u WHERE u.id = _id) THEN
    RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  UPDATE user_ u
  SET  is_deleted = true
  WHERE u.id = _id;

    RETURN QUERY SELECT
      u.id,
      u.name,
      u.email
    FROM user_ u WHERE u.id = _id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;
