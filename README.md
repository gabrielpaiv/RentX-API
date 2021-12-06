# RentX API 🚘

## Cadastro de carros

**RF**
Deve ser possível cadastrar um novo carro.

<!-- Deve ser possível listar todas as categorias. -->

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.

<!-- Não deve ser possível alterar a placa de um carro já cadastrado. -->

O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um administrador.

## Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome da carro

**RN**
O usuário não precisa estar logado no sistema.

## Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

<!-- Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros -->

**RN**
O usuário responsável pelo cadastro deve ser um administrador.
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.

## Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário responsável pelo cadastro deve ser um administrador.
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro

## Aluguel de carros

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
O usuário deve estar logado na aplicação
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

## Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação

## Listagem de alugueis para o usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação
