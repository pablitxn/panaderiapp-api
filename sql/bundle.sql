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



SELECT fn_drop_func('fn_insert_post');

CREATE OR REPLACE FUNCTION fn_insert_post(
  _title character varying,
  _sub_title character varying,
  _author character varying,
  _src_background character varying,
  _alt_background character varying,
  _img_author character varying,
  _brief_header character varying,
  _article character varying,
  _is_draft boolean
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
DECLARE
    _id integer;
BEGIN
    IF EXISTS(SELECT 1 FROM post a WHERE a.title = _title AND a.is_deleted = false) THEN
        RAISE EXCEPTION 'already exists' USING HINT = 'title', ERRCODE = '22000';
    END IF;

    IF _author IS NULL THEN
        RAISE EXCEPTION 'is empty' USING HINT = 'author', ERRCODE= '22000';
    END IF;

    IF _brief_header IS NULL THEN
        RAISE EXCEPTION 'is empty' USING HINT = 'brief_header', ERRCODE= '22000';
    END IF;

    IF _article IS NULL THEN
        RAISE EXCEPTION 'is empty' USING HINT = 'article', ERRCODE= '22000';
    END IF;

    INSERT INTO post (
      title,
      sub_title,
      author,
      src_background,
      alt_background,
      img_author,
      brief_header,
      article,
      is_draft,
      created_at
    )
    VALUES (
      _title,
      _sub_title,
      _author,
      _src_background,
      _alt_background,
      _img_author,
      _brief_header,
      _article,
      _is_draft,
      current_timestamp
    );

    _id := currval(pg_get_serial_sequence('post','id'));

    RETURN QUERY SELECT * FROM fn_find_post(_id)
    LIMIT 1;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;




SELECT fn_drop_func('fn_update_post');

CREATE OR REPLACE FUNCTION fn_update_post(
  _id integer,
  _title character varying,
  _sub_title character varying,
  _author character varying,
  _src_background character varying,
  _alt_background character varying,
  _img_author character varying,
  _brief_header character varying,
  _article character varying,
  _is_draft boolean
)
RETURNS TABLE(
  id integer,
  title character varying,
  author character varying,
  updated_at timestamp,
  created_at timestamp
)
AS
$$
BEGIN
  UPDATE post p
  SET
    title = _title,
    sub_title = _sub_title,
    author = _author,
    src_background = _src_background,
    alt_background = _alt_background,
    img_author = _img_author,
    brief_header = _brief_header,
    article = _article,
    is_draft = _is_draft,
    updated_at = current_timestamp
    WHERE p.id = _id;

    RETURN QUERY SELECT
      p.id,
      p.title,
      p.author,
      p.updated_at,
      p.created_at
    FROM post p WHERE p.id = _id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;



