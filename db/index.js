const { Client } = require('pg');
const {PG_USER,PG_PASS} = process.env;

var connectionString = `postgres://${PG_USER}:${PG_PASS}@localhost:5432/oye_assignment`;
console.log(connectionString);
const client = new Client({
    connectionString: connectionString
});


client.connect()
.then(()=>{
	console.log("DB connected")
})
.catch(e=>{
	console.log("ERROR connecting to db", e
)})

module.exports = client;

