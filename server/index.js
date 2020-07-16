const express = require('express');
const cors = require('cors');
const app = express();
const apiPort = 3000;

// database -->
const sql = require('msnodesqlv8');
const dbname = 'CrunchyDandelionApp';
const server = '.';
const sqldriver = 'SQL Server Native Client 11.0'
const connectionString = `server=${server};Database=${dbname};Trusted_Connection=Yes;Driver={${sqldriver}}`;

const _getData = (tableName) => {
    return (
        (request, response) => {
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
// database <--

app.use(cors());

app.get('/', (request, response) => {
    var page = '<html><head></head><body><img src="https://media.makeameme.org/created/henlo-human.jpg"></body></html>'
    response.send(page);
})

app.get('/channels', _getData('Channels'));

app.get('/shifts', (request, response) => {
    if (typeof request.query.channelid === 'undefined') {
        response.send([])
    } else {
        var channelid = parseInt(request.query.channelid)
        var tableName = 'Shifts'
        var clause = { name: 'ChannelId', value: channelid }
        var query = `select * from ${tableName} where ${clause.name}=${clause.value}`;
        console.log(query)
        sql.query(connectionString, query, function (err, results) {
            if (err) {
                return console.error('error during query', err)
            }
            response.send(results);
        })
    }
})

app.get('/orders', _getData('Orders'));

app.listen(apiPort, () => console.log(`Server running on ${apiPort}`));