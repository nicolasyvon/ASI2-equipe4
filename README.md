<h1>Pokemon Card Game</h1>

<u>Auteurs :</u> </br> Nicolas Clain, Absa Sô, Mouna Azzouzi, Ivana Yemele </br>

<u>Principes :</u> </br> Cette application web permet de jouer au jeu de cartes Pokemon en ligne.  Celle-ci se compose de d'une page de connexion, d'une page d'achat et de vente de cartes et d'une page de jeu. Pour accéder aux différentes fonctionnalités de l'application il est essentiel de posséder un compte utilisateur. Une fois le compte créé si l'on veut accéder à la page de jeu on doit pour cela acheter des cartes via la boutique en ligne (5 cartes sont nécessaires au minimum afin de pouvoir jouer). </br> </br>
Concernant le jeu celui-ci permet de faire s'affronter différents pokemons entre-eux. Au début de la partie les joueurs commencent par sélectionner 5 pokemons qu'ils vont utiliser pour la partie parmis les pokemons qu'ils possèdent. Une fois cette sélection faite, on passe à la phase de jeu où les joueurs auront la possibilité d'attaquer un autre pokémon de l'équipe adverse. Cette phase de combat se fait en tour par tour. La première équipe à avoir tous ses pokémons out perd le combat et donne 10% de son argent à l'équipe gagnante.</br>

<u>Organisation du projet :</u></br> Concernant le projet celui se divise en 4 microservices(game, notification, user et chat), un front et un proxy. Concernant la communication entre le front et les différents microservices les deux méthodes retenus sont les requêtes https et les websockets. Il a été décidé que les requêtes https permettront au front de pouvoir communiquer avec les microservices et que ces microservices pourront répondre via l'utilisation de web sockets. 

<u>Détails des microservices :</u></br>
Game-service : Ce service permet de gérer toute la logique de jeu. Il utilise le port 6161 et si le proxy est activé est disponible à l'adresse : http://127.0.0.1:6060/game .
Plusieurs requêtes sont disponible sur ce serveur : <br>
- http://127.0.0.1:6060/game/createGame : requête POST permettant de créer une partie. Il est nécessaire de lui envoyer l'objet json suivant:

```json
{
    "gameName":"superGame",
    "userName":"user1",
    "id":7
}
``` 
Si tout se passe bien l'utilisateur recevra une réponse 200 du serveur avec le message: "Game created". Si jamais le nom de la game est déjà prise alors l'utilisateur recevra une réponse 500 du serveur avec le message : "Room name is already taken. Choose another".

- http://127.0.0.1:6060/game/joinGame : requête POST permettant de rejoindre une partie déjà créée Il est nécessaire de lui envoyer l'objet json suivant:
```json
{
    "gameName":"superGame",
    "userName":"user2",
    "id":2
}
``` 
Si tout se passe bien l'utilisateur recevra une réponse 200 du serveur avec le message: "Game joined". Sinon soit la game est pleine ou le nom de la game est déjà prise, dans ce cas là l'utilisateur recevra une réponse 500 du serveur avec le message adéquat. 
Lorsqu'un utilisateur rejoint la room les deux joueurs présent dans la room recevront par socket l'objet json suivant. L'évènement de la socket sera donc l'évènement "gameState" : 
```json
{
    "gameName":"superGame",
    "players":[ 
        {
            "id" : 1,
            "userName": "player1",
            "pokemons": [],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        },
        {
            "id" : 2,
            "userName": "player2",
            "pokemons": [],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        }
    ],
    "numberOfPlayer":2 //nombre max de joueurs dans la game 
}
``` 
- http://127.0.0.1:6060/game/choosePokemon : 
requête POST permettant à l'utilisateur de choisir les pokémons qui constitueront son équipe. Pour que cette requête fonctionne il est nécessaire de lui envoyer l'objet json suivant:
```json
{
    "gameName":"superGame",
    "userName":"user1",
    "id":7,
    "pokemonsId":[6,7,8,9,10]
}
```
Si cette requête fonctionne l'utilisateur recevra un réponse 200 du serveur, de plus il recevra par socket l'objet json suivant. De même l'évènement de la socket sera l'évènement "gameState".</br>
Exemple si un joueur à choisi ses pokemons:
```json
{
    "gameName":"superGame",
    "players":[ 
        {
            "id" : 1,
            "userName": "player1",
            "pokemons": [
                {
                    "id" : 1,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : 2,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : 3,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                }
            ],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        },
        {
            "id" : 2,
            "userName": "player2",
            "pokemons": [],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        }
    ],
    "numberOfPlayer":2 //nombre max de joueurs dans la game 
}
``` 
Exemple si deux joueur ont choisi leurs pokemons:
```json
{
    "gameName":string,
    "players":[ 
        {
            "id" : 1,
            "userName": "player1",
            "pokemons": [
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                }
            ],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        },
        {
            "id" : 2,
            "userName": "player2",
            "pokemons": [
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                }
            ],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        }
    ],
    "numberOfPlayer":2 //nombre max de joueurs dans la game 
}
```
- http://127.0.0.1:6060/game/attack :
requête POST permettant à un pokemon d'attaquer un autre pokemon. Pour que cette requête fonctionne il est nécessaire de lui envoyer l'objet json suivant:
```json
{
    "gameName":"superGame",
    "attackerId":7, 
    "pokemonAttackerId":7, 
    "defenderId":2, 
    "pokemonDefenderId":3 
}
```
A chaque attaque vous recevrez par socket l'évènement gameState avec l'objet json suivant:
```json
{
    "gameName":string,
    "players":[ 
        {
            "id" : 1,
            "userName": "player1",
            "pokemons": [
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                }
            ],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        },
        {
            "id" : 2,
            "userName": "player2",
            "pokemons": [
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                },
                {
                    "id" : id,
                    "name" : name,
                    "description" : description,
                    "family" : family,
                    "affinity" : affinity,
                    "imgUrl" : imgUrl,
                    "smallImgUrl" : smallImgUrl,
                    "energy" : energy,
                    "hp" : hp,
                    "defense" : defense,
                    "attack" : attack,
                    "price" : price,
                    "userId" : userId
                }
            ],
            "energy": 100,
            "numberOfPokemon": 5 // nombre de pokemon nécessaire dans une équipe
        }
    ],
    "numberOfPlayer":2 //nombre max de joueurs dans la game 
}
```
Cet objet permettra de voir le nombre de point de vie du pokemon qui a subit l'attaque et l'énergie du joueur à l'origine de l'attaque. Une fois que la partie est finie et qu'il y a un gagnant un évènement socket ("winner") est émis par le back permettant de notifier une fin de partie. 