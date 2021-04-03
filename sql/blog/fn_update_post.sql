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
