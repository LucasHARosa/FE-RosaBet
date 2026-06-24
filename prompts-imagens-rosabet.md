# Prompts para Geração de Imagens — RosaBet

Cor primária: **#E30B5D** (rosa vibrante)
Nome da marca: **ROSA BET**
Estilo: minimalista, moderno, premium, dark

---

## 1. Logo Principal (horizontal)

**Uso:** Header desktop, e-mail, materiais institucionais
**Dimensões:** 400x100px

### Prompt:

Logo horizontal para casa de apostas "ROSA BET". Do lado esquerdo, uma flor de rosa estilizada em formato circular com pétalas sobrepostas em rosa vibrante (#E30B5D) e contornos escuros finos entre as pétalas, com a letra "R" maiúscula branca e negrita integrada ao centro da flor. Do lado direito, a palavra "ROSA" em negrito branco com fonte sans-serif geométrica moderna, seguida de "BET" no mesmo tamanho mas com peso mais fino. Fundo escuro (#1e1e2e). Espaçamento equilibrado entre ícone e texto. Sem gradientes excessivos, visual limpo, profissional e marcante.

---

## 2. Logo Ícone / Favicon

**Uso:** Favicon, app icon, avatar
**Dimensões:** 512x512px

### Prompt:

Ícone de flor de rosa estilizada em formato circular, para favicon de casa de apostas. A rosa ocupa todo o espaço circular, com pétalas sobrepostas em rosa vibrante (#E30B5D) e contornos escuros finos entre as pétalas, criando profundidade. No centro da flor, a letra "R" maiúscula branca em fonte sans-serif moderna e negrita, levemente grande, integrada à composição da rosa. Fundo escuro (#1e1e2e). Estilo flat com leve profundidade nas pétalas. Visual marcante, limpo e reconhecível em tamanho pequeno. Sem texto externo, apenas o ícone.

---

## 3. Logo Mobile (compacto)

**Uso:** Header mobile, notificações push
**Dimensões:** 300x80px

### Prompt:

Logo compacta horizontal para header mobile de casa de apostas "ROSA BET". Do lado esquerdo, uma flor de rosa estilizada pequena em rosa vibrante (#E30B5D) com contornos escuros finos nas pétalas e a letra "R" branca negrita no centro. Do lado direito, o texto "ROSA BET" em uma única linha, branco, fonte sans-serif geométrica moderna, peso médio. Fundo escuro (#1e1e2e). Composição equilibrada, proporcional, sem elementos extras. Legível em telas pequenas.

---

## 4. Banner Hero — Home Page

**Uso:** Banner principal da página inicial
**Dimensões:** 1440x500px, JPEG ou WebP

### Prompt:

Banner hero ultra-wide para site de apostas esportivas. Fundo escuro dramático (#0d0d0d). No terço esquerdo, um brilho radial suave em rosa vibrante (#E30B5D) irradiando do centro para as bordas com opacidade decrescente. Silhueta geométrica abstrata de um estádio ou arquibancada em tons muito escuros (quase invisível) ao fundo. Dois terços direitos completamente escuros, reservados para sobreposição de texto e call to action. Sem pessoas, sem texto, sem logo na imagem. Clima cinematográfico, tenso e premium. Proporção ultra-wide.

---

## 5. Banner Hero — Casino

**Uso:** Banner da seção de casino
**Dimensões:** 1440x400px, JPEG ou WebP

### Prompt:

Banner ultra-wide para seção de cassino online premium. Fundo muito escuro (#0a0a0a). Brilho neon em rosa (#E30B5D) emanando do centro da imagem, com halos suaves desaparecendo para o preto nas bordas. Silhuetas semitransparentes de cartas de baralho, dados e fichas de pôquer dispersas em tons escuros com leve reflexo rosa. Lado esquerdo mais escuro para sobreposição de texto. Sem texto na imagem. Atmosfera luxuosa, misteriosa e sofisticada. Visual estilo cassino de alto padrão.

---

## 6. Background Afiliados

**Uso:** Seção de afiliados (bg-affiliates)
**Dimensões:** 1440x600px, JPEG ou PNG

### Prompt:

Imagem de fundo wide para seção de programa de afiliados de casa de apostas. Fundo escuro profundo com leve tom roxo escuro (#0d0010). Faixas de luz diagonais em rosa (#E30B5D) com 15% de opacidade, partindo do canto inferior esquerdo em direção ao canto superior direito, criando movimento. Pontos pequenos e linhas de conexão finas em rosa escuro distribuídos pelo fundo, sugerindo rede de parceiros e crescimento. Sem pessoas, sem texto, sem logo. Composição sutil e sofisticada que não compete com o conteúdo sobreposto.

---

## 7. Card de Promoção (genérico)

**Uso:** Cards de promoções e bônus
**Dimensões:** 600x300px, JPEG ou WebP

### Prompt:

Imagem de fundo para card de promoção de apostas esportivas. Fundo escuro (#111111). No lado direito, um brilho explosivo em rosa vibrante (#E30B5D) com raios de luz se espalhando, criando energia visual. No brilho, silhueta discreta de uma moeda dourada ou troféu em tom semi-opaco. Lado esquerdo escuro com degradê suave para receber texto de promoção. Sem texto na imagem. Sensação de premiação, entusiasmo e urgência. Visual moderno e impactante.

---

## 8. Placeholder — Card de Jogo de Casino

**Uso:** Cards de jogos de casino sem thumbnail
**Dimensões:** 300x200px, JPEG ou PNG

### Prompt:

Imagem placeholder minimalista para card de jogo de cassino. Fundo escuro (#1a1a1a) com textura muito sutil. No centro da imagem, um ícone de diamante ou naipe de copas estilizado em rosa (#E30B5D) com 25% de opacidade, tamanho médio, centralizado. Bordas levemente mais escuras criando vinheta suave. Sem texto, sem logo. Estética de caça-níqueis premium, discreto o suficiente para servir como placeholder sem chamar atenção excessiva.

---

## Dica para Logos

Se o texto "ROSA BET" sair distorcido, gere só o ícone da rosa com o "R" e adicione o texto manualmente depois via Canva ou Figma.

---

## Onde Substituir os Arquivos

Após gerar, salve aqui:

public/
  logo.svg           <- Logo ícone (item 2)
  logo-full.svg      <- Logo horizontal (item 1)
  logo-mobile.svg    <- Logo mobile (item 3)
  icon.svg           <- Favicon (item 2, 32x32)

src/assets/images/brand/
  logo.svg
  logo-full.svg
  logo-mobile.svg

src/assets/images/affiliates/
  bg-affiliates.png  <- Background afiliados (item 6)
