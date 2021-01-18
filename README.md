
# <center> OYE! Rickshaw Assignment</center> #
# <p align = "right" > Role <i> Backend </i> </p> # 
## <center> TODO APP REST API ###

---
## TOOLS/TECHNOLOGY USED ##
1. Nodejs, Expressjs
2. Postgresql

---

## ENVIRONMENT SETUP (windows)
### Database 
	- Install Postgresql
	- Open pssql shell
	- login to the shell using username and password
	
	- CREATE DATABASE oye_assignment
	- CREATE TABLE todos (
			id serial primary key,
			priority VARCHAR(50) DEFAULT 'LOW' NOT NULL,
			title VARCHAR(50) NOT NULL, 
			completed BOOLEAN DEFAULT false NOT NULL, 
			timestamp DATE NOT NULL
		);



### NODEJS
	- Install Nodejs
	- update .env credentials.
	- `npm start`


---
# API USAGE
   Root url `http://localhost:3030/todos`
 
##  Add todo
	endpoint : '/'
	method : 'POST'
	body : {title : <string>, priority : ['HIGH', 'LOW', "MID"] default 'LOW'}
	example :

			fetch('http://localhost:3030/todos',{
				method : 'POST',
				headers :{
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({title : 'OYERICK Code Review', priority : 'HIGH'})
			})
		

### NOTE 
    todo is saved with id(Primary key) , timestamp, completed=false


## Delete Todo
	endpoint : '/<ID>'
	method : 'DELETE'
	example :

			fetch('http://localhost:3030/todos/1',{
				method : 'DELETE',
			})
		

## Update Todo (change status, priority)
	endpoint : '/'
	method : 'POST'
	body :
	{
		completed : [true | false] 
		priority : ['HIGH', 'LOW', "MID"]
	}	
	
	example :
		
			fetch('http://localhost:3030/todos/update/<ID>',{
				method : 'POST',
				headers :{
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({completed:true})
			})
		

### NOTE
Empty body set completed to true


### Todo Lookup ! 
	endpoint : '/all'
	method : 'GET'
	example :
			fetch('http://localhost:3030/todos/all?timestamp=2021-01-18&gt')

## USAGE
	
	1. BY TITLE
		`fetch('http://localhost:3030/todos/all?title=review')`

	2. BY DATE
		`fetch('http://localhost:3030/todos/all?timestamp=2021-01-18&lte')`

<b> Syntax </b>  timestamp=YYYY-MM-DD&cond[eq,neq,lt,lte,gt,gte]

	3. BY STATUS
		`fetch('http://localhost:3030/todos/all?completed=true')`



