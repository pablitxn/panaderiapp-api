SELECT fn_drop_func('fn_find_post');

CREATE OR REPLACE FUNCTION fn_find_post(
  _id integer,
  _limit integer default NULL,
  _offset integer default NULL
)
RETURNS TABLE(
  id integer,
  title character varying,
  sub_title character varying,
  author character varying,
  src_background character varying,
  alt_background character varying,
  img_author character varying,
  brief_header character varying,
  article character varying,
  is_deleted boolean,
  is_draft boolean,
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
    SELECT 1 FROM post p
    WHERE p.id = _id
    AND p.is_deleted = false
    ) THEN
    RAISE EXCEPTION 'is invalid' USING HINT = 'id', ERRCODE = '22000';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.title,
    p.sub_title,
    p.author,
    p.src_background,
    p.alt_background,
    p.img_author,
    p.brief_header,
    p.article,
    p.is_deleted,
    p.is_draft,
    p.updated_at,
    p.created_at
  FROM post p
    WHERE (p.id = _id OR _id IS NULL)
    AND (p.is_deleted = false OR _id IS NOT NULL)
  ORDER BY p.id ASC
  LIMIT _limit
  OFFSET _offset;
END;
$$
LANGUAGE 'plpgsql' STABLE;
