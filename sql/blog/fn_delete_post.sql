SELECT fn_drop_func('fn_delete_post');

CREATE OR REPLACE FUNCTION fn_delete_post(_id integer)
RETURNS TABLE(
  id integer,
  title character varying,
  author character varying
)
  AS
$$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM post p WHERE p.id = _id) THEN
    RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  UPDATE post p
  SET  is_deleted = true
  WHERE p.id = _id;

    RETURN QUERY SELECT
      p.id,
      p.title,
      p.author
    FROM post p WHERE p.id = _id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;
