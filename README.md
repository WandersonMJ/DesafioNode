# DesafioNode


Este projeto foi desenvolvido para que seja possível realizar o _CRUD_ simples do seu repositório 
de maneira simples composto por 5 funções e sem a utilização de um banco de dados.


São as rotas : 
- GET "/repositories" - ela possui um filtro por titulo, casos a condição não seja preenchida ele retorna todos os repositórios

- POST "/repositories" - cria um repositório com as suas informações (titulo, url, techs) e os salva na variavel com um uuid e 0 likes

- PUT "/repositories/:id" - edita um repositório informado com o parametro de id informado

- DELETE "/repositories/:id" - Deleta um repositório do id informado 

- POST "/repositories/:id/like" - Essa rota acrescenta em 1 o contador de likes de um repositório, no caso o repositório do id informado.


Muito obrigado por ler até aqui.
