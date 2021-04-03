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