const todosRouter = require("express").Router();


const client = require('../db');

//get all todos
todosRouter.get('/all',(req, res)=>{


	let query = (()=>{

		let q = req.query;
		if(q.completed){
			return q.completed == 'true' ? 'SELECT * FROM todos where completed=true' : 'SELECT * FROM todos where completed=false'
		}
		if(q.priority){
			q.priority = q.priority.toUpperCase();
			return q.priority == 'LOW' ? "SELECT * FROM todos where priority='LOW'"
										: q.priority == 'MID' ? "SELECT * FROM todos where priority='MID'"
															 : "SELECT * FROM todos where priority='HIGH'"
		}
		if(q.title){
			return `SELECT * FROM todos WHERE title ILIKE '%${q.title}%'`
		}

		if(q.timestamp){
			let tmp = 'SELECT * from todos where timestamp ' 
			tmp += q.lt ? '<' : 
				   q.lte ? '<=' : 
				   q.eq ? '=' : 
				   q.neq ? '!=' :
				   q.gt ? '>':
				   q.gte ? '>=':
				  '='

			//TODO validate the timestamp format
			tmp += ` '${q.timestamp}'`

			return tmp;
		}

		return 'SELECT * FROM todos';

	})();


	console.log("QUERY ", query);

	client.query(query, (err, result)=>{
		if(err){
			console.log(err);
			res.status(500).send('Error Retrieving');
			return;
		}
		// console.log(result);
		res.status(200).send(result.rows)
	})
})

//add todo
todosRouter.post('/', (req, res)=>{
	let {title, priority="LOW"} = req.body;
	priority = priority.toUpperCase();

	if(!title){
		res.status(400).send("invalid data | pass valid title");
		return;
	}
	let query = 'INSERT INTO todos(title, priority, completed, timestamp) VALUES($1, $2, $3,$4) ';
	client.query(query, [title, priority, false, new Date().toISOString() ], function (err, result) {
        if (err) {
            console.log("Error Saving : ", err);
            res.status(500).send('Error Saving')
        }else{
        	console.log('SAVED Successfully')
        	res.status(200).send("Saved Successfully");
        }
        
    });

	console.log("REQUEST ", req.body);
})

//remove todo

todosRouter.delete('/:id', (req, res)=>{
	let {id} = req.params;
	let query = "DELETE FROM todos WHERE id=$1"

	client.query(query, [id], (err, result)=>{
		if(err){
			res.status(500).send("Failed to delete");
			return;
		}
		res.status(200).send('Successfully Deleted')
	})
})



//change status

todosRouter.post('/update/:id', (req, res)=>{
	let {id} = req.params;
	let {completed, priority} = req.body;
	completed = completed == undefined ? true : completed ? true : false;

	priority = priority && priority.toUpperCase();
	if( !(priority == 'HIGH' || priority == 'LOW' || priority == "MID")){
		res.status(400).send('Invalid Priority');
		return;
	}

	!id && res.status(400).end();

	let query = priority ? "UPDATE todos SET priority=$1 where id = $2" : "UPDATE todos SET completed=$1 where id = $2"

	client.query(query, [priority ? priority: completed, id], (err, result)=>{
		if(err){
			res.status(500).send('Failed to update');
			console.log(err);
			return;
		}
		res.status(200).send('Successfully Updated');
	})
})

// change priority

//get by params




module.exports = todosRouter;