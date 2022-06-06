# Boas-vindas ao repositório do projeto Car Shop!

---

# Sumário

- [Habilidades Desenvolvidas](#habilidades)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Para testar o projeto](#testar-o-projeto)
- [Endpoint's](#endpoint)
  - [Para POST car](#carsPost)
  - [Para cars por ID GET](#cars)
  - [Para cars delete por ID DELETE](#deleteId)

---

## Habilidades desenvolvidas: <a name="habilidades"></a>

 - Modelar dados com **MongoDB** através do **mongoose**;
 - Construir uma **API REST** com princípios de Programação Orientada a Objetos e SOLID;
 - Realizado Testes de integração;
 - Utilizar Generics em TypeScript

---

## O que foi desenvolvido: <a name="o-que-foi-desenvolvido"></a>

Nesse projeto foi aplicado os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos. Isso foi feito utilizando o banco de dados `MongoDB`.

---

## Para testar o projeto: <a name="testar-o-projeto"></a>

1. Clone o repositório
  * `https://github.com/Thiago-FR/project-car-shop-mongoDB.git`.
  * Entre na pasta do repositório que você acabou de clonar

1.1 Instale as dependências
  * `npm install`

1.2 Inicie a API.
  * `npm start`

---

# Endpoint's <a name="endpoint"></a>

### Para POST car <a name="carsPost"></a>

* Endpoint: `/cars`

Body
```json
 {
    "model": "Opala",
    "year": 1990,
    "color": "Black",
    "status": false,
    "buyValue": 2000,
    "doorsQty": 2,
    "seatsQty": 2,
}
 ```

### Para GET cars <a name="cars"></a>

* Endpoint: `/cars`

### Para cars por ID GET <a name="carsId"></a>

* Endpoint: `/cars/:id`

### Para cars delete por ID DELETE <a name="deleteId"></a>

* Endpoint: `/cars/:id`
