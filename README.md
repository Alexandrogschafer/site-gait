# GAIT — Grupo de Pesquisa em Análise Espacial e Inteligência Territorial

Site institucional do GAIT, grupo de pesquisa vinculado à Universidade
Federal do Pampa (UNIPAMPA), certificado pelo CNPq.

🔗 **Site publicado:** https://alexandrogschafer.github.io/site-gait/

## Sobre

O GAIT promove avanços científicos, tecnológicos e sociais por meio do
desenvolvimento e aplicação de métodos de análise espacial, inteligência
territorial, geotecnologias, ciência de dados e inteligência artificial,
apoiando o planejamento, a gestão e a governança territorial em contextos
urbanos e rurais.

## Stack

Site estático, sem framework e sem build step:

- HTML5 semântico
- CSS puro (`css/style.css`)
- JavaScript vanilla (`js/main.js`)
- Fontes via Google Fonts (Space Grotesk, Source Serif 4, JetBrains Mono)

## Estrutura

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── logo/
```

## Rodando localmente

Não há dependências nem build. Basta servir os arquivos estáticos:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Deploy

Publicado via GitHub Pages a partir da branch `main`.

## Contato

- E-mail: alexandro.schafer@unipampa.edu.br
- Instituição: Universidade Federal do Pampa (UNIPAMPA)
