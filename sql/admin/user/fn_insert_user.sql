SELECT fn_drop_func('fn_insert_user');

CREATE OR REPLACE FUNCTION fn_insert_user(
  _given_name character varying,
  _family_name character varying,
  _name character varying,
  _nickname character varying,
  _brief_description character varying,
  _email character varying,
  _firm character varying,
  _picture character varying
)
RETURNS TABLE (
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
DECLARE
    _id integer;
BEGIN
    IF EXISTS(SELECT 1 FROM user_ u WHERE u.email = _email) THEN
        RAISE EXCEPTION 'already exists' USING HINT = 'email', ERRCODE = '22000';
    END IF;


    INSERT INTO user_ (
      given_name,
      family_name,
      name,
      nickname,
      brief_description,
      email,
      firm,
      picture,
      updated_at,
      created_at
    )
    VALUES (
      _given_name,
      _family_name,
      _name,
      _nickname,
      _brief_description,
      _email,
      _firm,
      _picture,
      current_timestamp,
      current_timestamp
    );

    _id := currval(pg_get_serial_sequence('user_','id'));

    RETURN QUERY
    SELECT * FROM fn_find_user(_id)
    LIMIT 1;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;

