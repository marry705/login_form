import path from 'path';
import Knex from 'knex';
import { User } from './types';
const dbPath = path.resolve(__dirname, 'dataBase/database.sqlite')

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
});

const data = [
    { id: 1, name: "company1" }, 
    { id: 2, name: "company2" }, 
    { id: 3, name: "company3" },
    { id: 4, name: "company4" },
    { id: 5, name: "company5" }
];

knex.schema.hasTable('companies')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('companies', (table: Knex.TableBuilder)  => {
                    table.increments('id').primary()
                    table.string('name')
                })
                .then(() => knex.table('companies').insert(data))
                .then(() => console.log('Table \'Сompanies\' created'))
                .catch((error: Error) => console.error(`There was an error creating table: ${error.message}`))
        }
    })
    .then(() => console.log('done'))
    .catch((error: Error) => console.error(`There was an error setting up the database: ${error.message}`));

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
                .then(() => console.log('Table \'Users\' created'))
                .catch((error: Error) => console.error(`There was an error creating table: ${error.message}`))
        } else {
            return knex.select('*').from('users')
                        .then((data: User[]) => console.log('data:', data))
                        .catch((error: Error) => console.error(`There was an error setting up the database: ${error.message}`))
        }
    })
    .then(() => console.log('done'))
    .catch((error: Error) => console.error(`There was an error setting up the database: ${error.message}`));



export default knex;