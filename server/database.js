const sql = require('msnodesqlv8');
const dbname = 'CrunchyDandelionApp';
const server = '.';
const sqldriver = 'SQL Server Native Client 11.0'
const connectionString = `server=${server};Database=${dbname};Trusted_Connection=Yes;Driver={${sqldriver}}`;

export const _get_data = (tableName) => {
    return (
        (request, response) => {
            console.log('request for shops - sql')
            var query = `select * from ${tableName}`;
            sql.query(connectionString, query, function (err, results) {
                if (err) {
                    return console.error('error during query', err)
                }
                response.send(results);
            })
        }
    )
}