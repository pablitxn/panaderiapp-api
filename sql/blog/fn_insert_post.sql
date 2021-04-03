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

