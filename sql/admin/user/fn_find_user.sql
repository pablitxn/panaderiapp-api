SELECT fn_drop_func('fn_find_user');

CREATE OR REPLACE FUNCTION fn_find_user(
  _id integer,
  _limit integer default NULL,
  _offset integer default NULL
)
RETURNS TABLE(
  id integer,
  given_name character varying,
  family_name character varying,
  name character varying,
  nickname character varying,
  brief_description character varying,
  email character varying,
  firm character varying,
  picture character varying,
  updated_at timestamp,
  created_at timestamp
)
AS
$$
BEGIN
  IF _offset IS NULL THEN
  _offset := 0;
  END IF;

  IF _id IS NOT NULL AND NOT EXISTS
  (
    SELECT 1 FROM user_ u
      WHERE u.id = _id AND u.is_deleted = false
  ) THEN RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.given_name,
    u.family_name,
    u.name,
    u.nickname,
    u.brief_description,
    u.email,
    u.firm,
    u.picture,
    u.updated_at,
    u.created_at
  FROM user_ u
    WHERE (u.id = _id OR _id IS NULL)
    AND (u.is_deleted = false OR _id IS NOT NULL)
  ORDER BY u.id ASC
  LIMIT _limit
  OFFSET _offset;
END;
$$
LANGUAGE 'plpgsql' STABLE;
