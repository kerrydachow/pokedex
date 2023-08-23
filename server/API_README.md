# Table of Contents
1. [Show Multiple Pokemon](#get1)
2. [Get Pokemon By ID](#get2)
3. [Create New Pokemon](#post)
4. [Get Pokemon Image URL](#get3)
5. [Put a Pokemon](#put)
6. [Patch a Pokemon](#patch)
7. [Delete a Pokemon](#delete)

<br>

# Show Multiple Pokemon <a name="get1"></a>
  Returns json data about pokemons.

* **URL**

  `/api/v1/pokemons`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `None`

   **Optional:**
 
   `count=[integer]`

   `after=[integer]`

* **Data Params**

    `None`

* **Success Response:**

  * **API Call:** `/api/v1/pokemons/?count=2&after=10`
  * **Code:** 200 <br />
    **Content:**
    ```
    [
        {
            "base": {
            "HP": 50,
            "Attack": 20,
            "Defense": 55,
            "Speed": 30,
            "Special Attack": 25,
            "Special Defense": 25
            },
            "name": {
                "english": "Metapod",
                "japanese": "トランセル",
                "chinese": "铁甲蛹",
                "french": "Chrysacier"
            },
            "_id": "63435bab85eaaf91a910dab8",
            "id": 11,
            "type": [
                "Bug"
            ],
            "__v": 0
        },
        {
            "base": {
                "HP": 60,
                "Attack": 45,
                "Defense": 50,
                "Speed": 70,
                "Special Attack": 90,
                "Special Defense": 80
            },
            "name": {
                "english": "Butterfree",
                "japanese": "バタフリー",
                "chinese": "巴大蝶",
                "french": "Papilusion"
            },
            "_id": "63435bab85eaaf91a910dab9",
            "id": 12,
            "type": [
                "Bug",
                "Flying"
            ],
            "__v": 0
        }
    ]
    ```
    
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errMsg: "database reading error" }`

* **Sample Call (Thunder Client):**
    ```
    {
        "_id": "4968bf83-7c7e-435a-a78e-a79aae3831be",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemons",
        "url": "{{URL}}pokemons/?count=2&after=10",
        "method": "GET",
        "sortNum": 10000,
        "created": "2022-10-05T00:05:15.646Z",
        "modified": "2022-10-09T19:30:24.011Z",
        "headers": [],
        "params": [
            {
                "name": "count",
                "value": "2",
                "isPath": false
            },
            {
                "name": "after",
                "value": "10",
                "isPath": false
            }
        ],
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json[0].id",
                "action": "equal",
                "value": "11"
            },
            {
                "type": "json-query",
                "custom": "json",
                "action": "count",
                "value": "2"
            }
        ]
    }
    ```


<br>

# Get Pokemon By ID <a name="get2"></a>

  Returns json data about pokemon by its ID.
* **URL**

  `/api/v1/pokemon/:id`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Data Params**

    `None`

* **Success Response:**
  * **API Call:** `/api/v1/pokemon/77`
  * **Code:** 200 <br />
    **Content:**
    ```
    [
        {
        "base": {
            "HP": 50,
            "Attack": 85,
            "Defense": 55,
            "Speed": 90,
            "Special Attack": 65,
            "Special Defense": 65
            },
        "name": {
            "english": "Ponyta",
            "japanese": "ポニータ",
            "chinese": "小火马",
            "french": "Ponyta"
        },
        "_id": "63435bab85eaaf91a910dafa",
        "id": 77,
        "type": [
            "Fire"
        ],
        "__v": 0
        }
    ]
    ```
    
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errMsg: "Pokemon not found" }`
    
    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg: "CastError: Pass Pokemon ID between 1 and 809" }`

* **Sample Call (Thunder Client):**
    ```json
    {
        "_id": "3f37cbcb-a1e1-44ce-8109-1bc0507062c4",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemon",
        "url": "{{URL}}pokemon/1000",
        "method": "GET",
        "sortNum": 20000,
        "created": "2022-10-05T00:05:15.648Z",
        "modified": "2022-10-05T00:15:03.234Z",
        "headers": [],
        "params": [],
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json[0].name.english",
                "action": "equal",
                "value": "Ponyta"
            }
        ]
    }
    ```


<br>

# Create New Pokemon <a name="post"></a>
Create a new Pokemon.

* **URL**

  /api/v1/pokemon

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

   `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Added successfully }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg: {error name}: check your {error message}`

    OR

  * **Code:** 409 CONFLICT <br />
    **Content:** `{ errMsg: { code: 11000, msg: "Pokemon {id} already exists" }`

* **Sample Call (Thunder Client):**

    ```json
    {
        "_id": "9c934672-cc69-4bec-8517-c29c3eb17e01",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemon validation error",
        "url": "{{URL}}pokemon",
        "method": "POST",
        "sortNum": 28750,
        "created": "2022-10-05T00:05:15.652Z",
        "modified": "2022-10-09T21:12:22.451Z",
        "headers": [],
        "params": [],
        "body": {
            "type": "json",
            "raw": "{\n    \"name\": {\n      \"english\": \"test\",\n      \"japanese\": \"test\",\n      \"chinese\": \"test\",\n      \"french\": \"test\"\n    },\n    \"base\": {\n      \"HP\": 50,\n      \"Attack\": 20,\n      \"Defense\": 55,\n      \"Speed\": 30,\n      \"Speed Attack\": 25,\n      \"Speed Defense\": 25\n    },\n    \n    \"id\": 1000,\n    \"type\": [\n      \"Bug\"\n    ],\n    \"__v\": 0\n  }",
            "form": []
        },
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json.errMsg",
                "action": "contains",
                "value": "ValidationError"
            }
        ]
    }
    ```
<br>

# Get Pokemon Image URL <a name="get3"></a>

  Returns the image URL of the Pokemon

* **URL**

  `/api/v1/pokemonImage/:id`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ url:  https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/001.png }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errMsg:  "Pass Pokemon ID between 1 and 809" }`

<br>

# Put a Pokemon <a name="put"></a>
  Modify an entire document or upsert a new Pokemon

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: "Updated Successfully" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg : "Params ID: 2000 and Body ID: 1000 does not match!" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg: {error name}: check your {error message} }`

* **Sample Call (Thunder Client):**

  ```json
  {
        "_id": "40c3a913-cc0a-4b11-a1a0-0cbcb3475ea8",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemon",
        "url": "{{URL}}pokemon/2000",
        "method": "PUT",
        "sortNum": 65000,
        "created": "2022-10-05T00:05:15.658Z",
        "modified": "2022-10-09T21:23:24.597Z",
        "headers": [],
        "params": [],
        "body": {
            "type": "json",
            "raw": "{\n    \"name\": {\n      \"english\": \"test\",\n      \"japanese\": \"test\",\n      \"chinese\": \"test\",\n      \"french\": \"test\"\n    },\n    \"base\": {\n      \"HP\": 50,\n      \"Attack\": 20,\n      \"Defense\": 55,\n      \"Speed\": 30,\n      \"Speed Attack\": 25,\n      \"Speed Defense\": 25\n    },\n    \n    \"id\": 1000,\n    \"type\": [\n      \"Grass\"\n    ],\n    \"__v\": 0\n  }",
            "form": []
        },
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json.msg",
                "action": "equal",
                "value": "Updated Successfully"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.type[0]",
                "action": "equal",
                "value": "Grass"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.base.HP",
                "action": "equal",
                "value": "50"
            }
        ]
    }
  ```

<br>

# Patch a Pokemon <a name="patch"></a>
  Patch a Pokemon.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Updated Successfully}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg: {error name}: check your {error message} }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errMsg : "CastError: Pass Pokemon ID between 1 and 809" }`

* **Sample Call (Thunder Client):**

  ```json
    {
        "_id": "2cef655b-1f54-4b3a-87bd-7b8ec3e28290",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemon  patch",
        "url": "{{URL}}pokemon/1000",
        "method": "PATCH",
        "sortNum": 67500,
        "created": "2022-10-05T00:05:15.659Z",
        "modified": "2022-10-09T21:23:58.606Z",
        "headers": [],
        "params": [],
        "body": {
            "type": "json",
            "raw": "{\n    \"base\": {\n      \"HP\": 60,\n      \"Attack\": 20,\n      \"Defense\": 55,\n      \"Speed\": 30,\n      \"Special Attack\": 25,\n      \"Special Defense\": 25\n    }\n  }",
            "form": []
        },
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json.msg",
                "action": "equal",
                "value": "Updated Successfully"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.id",
                "action": "equal",
                "value": "1000"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.base.HP",
                "action": "equal",
                "value": "60"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.base.Attack",
                "action": "equal",
                "value": "20"
            }
        ]
    }
  ```

<br>

# Delete a Pokemon <a name="delete"></a>
  Delete a Pokemon and return its JSON.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: "Deleted Sucessfully!" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errMsg : "Pokemon not found" }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ errMsg : "Deletion Error" }`

* **Sample Call (Thunder Client):**

  ```json
    {
        "_id": "855cd80b-641b-40ea-b059-e5361eeb4475",
        "colId": "dabfc34d-00ed-4e64-bb48-81f35dae4c88",
        "containerId": "",
        "name": "pokemon",
        "url": "{{URL}}pokemon/1000",
        "method": "DELETE",
        "sortNum": 40000,
        "created": "2022-10-05T00:05:15.654Z",
        "modified": "2022-10-09T19:43:34.109Z",
        "headers": [],
        "params": [],
        "body": {
            "type": "json",
            "raw": "{\n    \"name\": {\n      \"english\": \"test\",\n      \"japanese\": \"test\",\n      \"chinese\": \"test\",\n      \"french\": \"test\"\n    },\n    \"base\": {\n      \"HP\": 50,\n      \"Attack\": 20,\n      \"Defense\": 55,\n      \"Speed\": 30,\n      \"Speed Attack\": 25,\n      \"Speed Defense\": 25\n    },\n    \n    \"id\": 1000,\n    \"type\": [\n      \"Bug\"\n    ],\n    \"__v\": 0\n  }",
            "form": []
        },
        "tests": [
            {
                "type": "res-body",
                "custom": "",
                "action": "isjson",
                "value": "true"
            },
            {
                "type": "json-query",
                "custom": "json.msg",
                "action": "equal",
                "value": "Deleted Successfully"
            },
            {
                "type": "json-query",
                "custom": "json.pokeInfo.id",
                "action": "equal",
                "value": "1000"
            }
        ]
    }
  ```