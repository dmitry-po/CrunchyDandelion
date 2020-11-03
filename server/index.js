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
const authRoutes = require('./routes/authRoutes');

const _getData = (tableName) => {
    return (
        (request, response) => {
            var query = `select * from ${tableName}`;
            sql.query(connectionString, query, (err, results) => {
                if (err) {
                    return console.error('error during query', err)
                }
                response.send(results);
            })
        }
    )
}
// database <--

const _query_builder = ( { tableName, fields, clauses} ) => {
    console.log(clauses)
    const selectedFields = typeof(fields) === 'undefined' ? '*' : ( Array.isArray(fields) ? fields.join(', ') : fields)
    var clauseStatement = Array.isArray(clauses) ? clauses.map(item => `${item.name} = ${item.value}`).join(' and ') : ''
    var queryStatement = `select ${selectedFields} from ${tableName}` + ( 
        clauseStatement.length > 0 ? ` where ${clauseStatement}` : '' )
    console.log(queryStatement)
    return queryStatement
}

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

const _getData2 = ({ query, response }) => {
    sql.query(connectionString, query, (err, results) => {
        if (err) {
            return console.error('error during query', err)
        }
        response.send(results);
    });
}

app.get('/orders', (request, response) => {
    const channelid = typeof(request.query.channelid) === 'undefined' ? '' : parseInt(request.query.channelid);
    const shiftid = typeof(request.query.shiftid) === 'undefined' ? '' : parseInt(request.query.shiftid);
    const carrierid = typeof(request.query.carrierid) === 'undefined' ? '' : request.query.carrierid;
    const tableName = 'Orders'
    var clauses = []
    if (channelid != '') clauses = [...clauses, {name:'ChannelId', value:channelid}]
    if (shiftid != '') clauses = [...clauses, {name:'ShiftId', value:shiftid}]
    if (carrierid != '') clauses = [...clauses, {name:'CarrierId', value:carrierid}]
    const query = _query_builder({tableName, clauses})
    _getData2({query, response});
});

app.get('/orderDetails', (request, response) => {
    if (typeof request.query.orderid === 'undefined') {
        response.send([])
    } else {
        var orderid = parseInt(request.query.orderid)
        var tableName = 'Orders'
        var clause = { name: 'OrderId', value: orderid }
        var query = `select top 1 * from ${tableName} where ${clause.name}=${clause.value}`;
        console.log(query)
        sql.query(connectionString, query, function (err, results) {
            if (err) {
                return console.error('error during query', err)
            }
            response.send(results[0]);
        })
    }
})

app.get('/orderLines', (request, response) => {
    if (typeof request.query.orderid === 'undefined') {
        response.send([])
    } else {
        var orderid = parseInt(request.query.orderid)
        var tableName = 'OrderLines'
        var clause = { name: 'OrderId', value: orderid }
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

app.use(authRoutes);

app.listen(apiPort, () => console.log(`Server running on ${apiPort}`));