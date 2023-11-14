# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs

---

## URL

_Server_

```
http://localhost:3000 or http://localhost:5000
```

---

## Run Server

_Server_

```
"npm start" or "node index.js" or "nodemon index.js"
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful endpoints

### GET /pokemon

> Get list of Pokemon

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    data:{"pokemon": [
	   "name":<string>,
       "id":<String-uuid>
	   ]
}
    "message": "Success"

}
```

---

### GET /pokemon/:uuid

> Get detail pokemon by id/uuid

_Request Params_

```
/<uuid>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    data:{"abilities": [
	   "name":<string>,
       "id":<String-uuid>
	   ]
    ,
    ...}
}
    "message": "Success"

}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### POST /catch/pokemon/:uuid

> Catch Pokemon with UUID/ID

_Request Params_

```
/<uuid>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
   data:{
	   "name":<string>,
       "id":<String-uuid>,
       "renameCount":<number>
     }
   message: `Success catch pokemon : ${pokemonData.name}`,

OR

   message: `you failed to catch pokemon : ${pokemonData.name}, Try Again`,

}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### GET /myPokemon

> Get by list My Pokemon

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
     data:{"myPokemon": [
	   "name":<string>,
       "id":<String-uuid>,
       "renameCount":<number>
	   ]
     }
    "message": "Success"

}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### DELETE /release/pokemon/:uuid

> Add release Pokemon

_Request Params_

```
/<uuid>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

number: randomNumber,
message: `Pokemon : ${pokemonData.name} release`,

      OR

number: randomNumber,
message: `you failed to release pokemon : ${pokemonData.name}, Try Again`,

}
```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```

---

### PATCH /rename/pokemon/:uuid

> rename pokemon

_Request Params_

```
/<uuid>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
     data:{
	   "name":<string>,
       "id":<String-uuid>,
       "renameCount":<number>
     }
     message: `Success Rename from :  ${dataMyPokemon.name} , to : ${newName}`,

}
```

_Response (404 - NOT FOUND)_

```
{
    "message": "Data Not Found"
}
```

---
