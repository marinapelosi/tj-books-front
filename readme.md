# TJ BOOKS - App Front

Para acessar a documentação do Back, [clique aqui](https://github.com/marinapelosi/tj-books-api).

## Sumário
- Introdução
- Requisitos
- Instalação
- Documentação técnica
  - Por que front-end em React e Materio?
  - Imagens de Telas

------

## Introdução

TJ Books é um projeto feito em React e Materio como intermediador do Material-UI, para que possamos ter componentes estilizados no padrão bootstrap, seguindo as diretrizes de Design para melhor experiência do usuário com o React.

## Requisitos

Certifique-se de ter o Node.js e o npm instalados em seu sistema antes de prosseguir.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Laragon caso Windows: Recomendada a instalação do console Laragon, para utilizar o node e outras linhas de comando.](https://laragon.org/)

## Instalação

1. Clone o repositório em sua máquina:

   ```bash
   git clone git@github.com:marinapelosi/tj-books-front.git

2. Acesse o diretório:

   ```bash
   cd tj-books-front

3. Mantenha a branch main:

   ```bash
   git checkout main

4. Instale todas as dependências:

   ```bash
   npm install

5. Mantenha a URL da api atualizada no `.env`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000

6. Levante o ambiente de desenvolvimento:

   ```bash
   npm run dev

7. Depois de levantar o ambiente, basta acessar a URL no navegador. 

> Por padrão npm, a url é http://localhost:3000
----

## Documentação Técnica

### Por que front-end em React e Materio?

React para que possamos ter componentes disponíveis pela comunidade e documentação para utilização do framework, NextJS.
Materio é como um bootstrap, só que para ReactJS/NextJs, seguindo as diretrizes de Design para melhor experiência do usuário com o React e proporcionar uma interface agradável.
Mesmo assim, vários componentes foram adicionados manualmente para uso no ReactJS, pois são bem específicos, como export para pdf, excel, multi selectores, dentre outros.

### Imagens de Telas

O Dashboard é um extra adicionado ao projeto para sugerir melhorias no quesito stats de dados, como contadores, estatísticas futuras e parametrizações que podem ser inseridos.
![1-dashboard.png](doc-imgs%2F1-dashboard.png)

As imagens a seguir representam os padrões de layout e funcionamento envolvendo Autores, Assuntos e Livros.

![2-autores-lista.png](doc-imgs%2F2-autores-lista.png)
![3-form-cadastro-edicao-autor-tratamento-erro.png](doc-imgs%2F3-form-cadastro-edicao-autor-tratamento-erro.png)
![4-assuntos-lista.png](doc-imgs%2F4-assuntos-lista.png)
![5-form-assunto.png](doc-imgs%2F5-form-assunto.png)
![6-retorno-msg-sucesso-exemplo.png](doc-imgs%2F6-retorno-msg-sucesso-exemplo.png)
![7-erro-validacao-repetido.png](doc-imgs%2F7-erro-validacao-repetido.png)
![8-exemplo-deletar.png](doc-imgs%2F8-exemplo-deletar.png)
![9-lista-livro.png](doc-imgs%2F9-lista-livro.png)
![10-livro-cadastro.png](doc-imgs%2F10-livro-cadastro.png)
![11-livro-edicao.png](doc-imgs%2F11-livro-edicao.png)
![12-relatorio.png](doc-imgs%2F12-relatorio.png)
![13-relatorio-pdf.png](doc-imgs%2F13-relatorio-pdf.png)
![14-relatorio-csv.png](doc-imgs%2F14-relatorio-csv.png)
