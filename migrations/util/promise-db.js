function indexName(tableName, columns) {
  let name = `FK-${tableName}`;
  for (let col of columns) {
    name += `-${col}`;
  }
  return name;
}

class PromiseDB {
  constructor(db, tableName, columnSpec) {
    this.db = db;
    this.tableName = tableName;
    this.columnSpec = columnSpec;
  }

  addColumn(column, columnSpec) {
    return PromiseDB.addColumn(this.db, this.tableName, column, columnSpec);
  }

  changeColumn(column, columnSpec) {
    return PromiseDB.changeColumn(this.db, this.tableName, column, columnSpec);
  }

  removeColumn(column) {
    return PromiseDB.removeColumn(this.db, this.tableName, column);
  }

  createTable() {
    return PromiseDB.createTable(this.db, this.tableName, this.columnSpec);
  }

  dropTable() {
    return PromiseDB.dropTable(this.db, this.tableName);
  }

  addIndex(columns, unique, name) {
    return PromiseDB.addIndex(this.db, this.tableName, columns, unique, name);
  }

  removeIndex(columns, name) {
    return PromiseDB.removeIndex(this.db, this.tableName, columns, name);
  }

  addForeignKey(
    name,
    column,
    table,
    tableColumn = "id",
    rules = { onUpdate: "RESTRICT" }
  ) {
    return PromiseDB.addForeignKey(
      this.db,
      this.tableName,
      name,
      column,
      table,
      tableColumn,
      rules
    );
  }

  removeForeignKey(name) {
    return PromiseDB.removeForeignKey(this.db, this.tableName, name);
  }

  updateForeignKeyRules(name, rules) {
    return PromiseDB.updateForeignKeyRules(
      this.db,
      this.tableName,
      name,
      rules
    );
  }

  static createTable(db, tableName, columnSpec) {
    return new Promise((res, rej) => {
      db.createTable(tableName, columnSpec, PromiseDB.callback(res, rej));
    });
  }

  static dropTable(db, tableName) {
    return new Promise((res, rej) => {
      db.dropTable(tableName, PromiseDB.callback(res, rej));
    });
  }

  static renameTable(db, tableName, newTableName) {
    return new Promise((res, rej) => {
      db.renameTable(tableName, newTableName, PromiseDB.callback(res, rej));
    });
  }

  static addColumn(db, tableName, column, columnSpec) {
    return new Promise((res, rej) => {
      db.addColumn(tableName, column, columnSpec, PromiseDB.callback(res, rej));
    });
  }

  static changeColumn(db, tableName, column, columnSpec) {
    return new Promise((res, rej) => {
      db.changeColumn(
        tableName,
        column,
        columnSpec,
        PromiseDB.callback(res, rej)
      );
    });
  }

  static renameColumn(db, tableName, column, newColumn) {
    return new Promise((res, rej) => {
      db.renameColumn(
        tableName,
        column,
        newColumn,
        PromiseDB.callback(res, rej)
      );
    });
  }

  static removeColumn(db, tableName, column) {
    return new Promise((res, rej) => {
      db.removeColumn(tableName, column, PromiseDB.callback(res, rej));
    });
  }

  static addIndex(db, tableName, columns, unique = false, name) {
    return new Promise((res, rej) => {
      db.addIndex(
        tableName,
        name || indexName(tableName, columns),
        columns,
        unique,
        PromiseDB.callback(res, rej)
      );
    });
  }

  static removeIndex(db, tableName, columns, name) {
    return new Promise((res, rej) => {
      db.removeIndex(
        tableName,
        name || indexName(tableName, columns),
        PromiseDB.callback(res, rej)
      );
    });
  }

  static addForeignKey(
    db,
    tableName,
    name,
    column,
    table,
    tableColumn = "id",
    rules = { onUpdate: "RESTRICT" }
  ) {
    if (typeof name === "object") {
      const fields = name;
      return PromiseDB.addForeignKey(
        db,
        tableName,
        fields.name,
        fields.column,
        fields.table,
        fields.tableColumn,
        fields.rules
      );
    } else {
      return new Promise((res, rej) => {
        let fieldMapping = {};
        fieldMapping[column] = tableColumn;
        db.addForeignKey(
          tableName,
          table,
          name,
          fieldMapping,
          rules,
          PromiseDB.callback(res, rej)
        );
      });
    }
  }

  static removeForeignKey(db, tableName, name) {
    if (typeof name === "object") {
      const fields = name;
      return PromiseDB.removeForeignKey(db, tableName, fields.name);
    } else {
      return new Promise((res, rej) => {
        db.removeForeignKey(tableName, name, PromiseDB.callback(res, rej));
      });
    }
  }

  static updateForeignKeyRules(db, tableName, fields) {
    return PromiseDB.removeForeignKey(db, tableName, fields).then(() => {
      return PromiseDB.addForeignKey(db, tableName, fields);
    });
  }

  static run(tableName, columnSpec, action) {
    return (db, callback) => {
      const pdb = new PromiseDB(db, tableName, columnSpec);
      let result = action(pdb);
      if (result.then) {
        result.then(() => callback()).catch(callback);
      } else {
        callback();
      }
    };
  }

  static runSql(db, sql) {
    return new Promise((res, rej) => {
      db.runSql(sql, PromiseDB.callback(res, rej));
    });
  }

  static callback(res, rej) {
    return (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
      } else {
        res();
      }
    };
  }

  static upCreateTable(tableName, columnSpec) {
    return (db, callback) => {
      return PromiseDB.createTable(db, tableName, columnSpec)
        .then(() => callback())
        .catch(callback);
    };
  }

  static downDropTable(tableName) {
    return (db, callback) => {
      return PromiseDB.dropTable(db, tableName)
        .then(() => callback())
        .catch(callback);
    };
  }
}

module.exports = PromiseDB;
