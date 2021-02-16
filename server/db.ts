import path from 'path';
import Knex from 'knex';
const dbPath = path.resolve(__dirname, 'dataBase/database.sqlite')

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
});

knex.schema.hasTable('users')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users', (table: Knex.TableBuilder)  => {
                table.increments('id').primary()
                table.string('companyId')
                table.string('name')
                table.string('email')
                table.string('password')
            })
            .then(() => {
                console.log('Table \'Users\' created')
            })
            .catch((error: Error) => {
                console.error(`There was an error creating table: ${error.message}`)
            })
        }
    })
    .then(() => console.log('done'))
    .catch((error: Error) => {
        console.error(`There was an error setting up the database: ${error.message}`)
    });

export default knex;