## Descrição

Este projeto foi desenvolvido em Nodejs, utilizando framework NestJs.

## Por que NestJs?

Afim de agilizar o desenvolvimento e utilização do padrão oferecido pelo framework.

## O banco de dados

Para este projeto foi avaliado melhor utilizar o MongoDB, pois a estutura de banco não terá relações com muitas collections, a estrutura é simples.

## Estrutura

No projetos temos algumas separações de arquivos com suas responsabilidades:

- create-cpf-input: Arquivo contendo as validações dos inputs ao criar um novo cpf, este arquivo é instanciado na criação de um novo cpf;
- cpf.entity: Arquivo com a estrutura básica da coleção e seus tipos, seria a model do sistema;
- cpf.module: Arquivo base, que serve como um pacote dos arquivos da coleção CPF. No NestJs, os arquivos são todos importados no app.module, é possível importar todos manualmente dentro deste arquivo um a um, controller, entity, service, porém criando um module ao invés de importar todos esses arquivos e poluir o app.module, criamos um module com as importações da coleção uma única vez;
- cpf.service: Responsável pela regra de negócio que será retornada pelo controller;
- cpfs.controller: Contém as rotas getAll(), checkCpf(), create() e delete(), cujo a lógica está no cpf.service;
- common/test/TestUtil: Criamos uma classe para gerar um cpf mockado para nossos testes.

## Instalação

```bash 
  - Copie o .env.example e cole com o nome .env;
```
```bash 
  - Rode o comando docker-compose up;
```
## Testes

No projeto estamos testando o cpf.service e todas suas funções com os mocks, utilizamos o Jest para os testes.

- Teste getAll: Testa a lista de cpfs, para isso criamos nosso cpf mockado duas vezes e fizemos o seguinte teste se a lista tem o tamanho de dois e se o método mockado é chamado uma vez;

- Teste checkCPF: Testa o retorno da consulta por cpf, mockamos um cpf e testamos se o objeto contém a estrutura {cpf: 'cpfMockado'} no json e se o método mockado é chamado uma vez, também mockamos um cpf nulo para testar a exception cpf não encontrado e se o método mckado foi chamado uma vez;

- Teste create: Mockamos um cpf e testamos se foi retornado um objeto com cpf e se o método mockado foi chamado uma vez, também testamos a exception quando existe um cpf;

- Teste delete: Mockamos um cpf e testamos o deletar desse cpf, testamos se o deletar retorna um valor verdadeiro e se o método mockado foi chamado uma vez, também testamos quando um cpf não existe no banco na hora de deletar;

- Teste cpfIsValid: Geramos um cpf válido e chamamos a função para verificar, caso seja verdadeiro o cpf é válido, testamos um cpf nulo para testar a exception de quando um cpf não é válido.

## Comandos teste
```bash
# unit tests
$ npm run test

$ npm run test:watch

# test coverage
$ npm run test:cov
```
## Documentação

- Há logs no console;
- Há uma collection das rotas utilizadas na api, na raiz do projeto (cpf.postman_collection.json);
- na pasta /diagrams, contém diagramas de atividade de cada função.

- Autor - Jonathan Cruz
- Website - [https://jonathansc92.github.io/jonathancruzdev/?language=ptBr]

