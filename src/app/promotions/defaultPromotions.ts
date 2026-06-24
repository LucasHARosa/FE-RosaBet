import { Promotion } from "@/interfaces/promotion";

export const defaultPromotions = [
  {
    _id: "1",
    name: "Bolão Grátis",
    active: true,
    description:
      "BOLÃO GRÁTIS é uma promoção pontual que será realizada em determinados períodos a serem definidos pela RosaBet.\n\n A cada R$50,00 (cinquenta reais) em depósitos, automaticamente o sistema gera um cupom para participação do Bolão Grátis. \n\n O Bolão Grátis é composto por 10 (dez) jogos. O Cliente escolhe 8 (oito) jogos como principais para acertar se o time da casa ganha, se dar empate ou se o time de fora vence. Os outros 2 (dois) jogos são os seus reservas, no caso de algum jogo ser suspenso, cancelado, adiado ou anulado, assim, deverá ser usado o primeiro jogo escolhido para ser o jogo reserva e assim sucessivamente. \n\n O Bolão Grátis só dura 48 horas a partir do recebimento do cupom, que é quando o depósito é confirmado. Após esse período, o cupom perde a validade e não poderá mais ser utilizado. \n\n Prêmios do Bolão: \n\n1- R$1.000,00, para 8 acertos; \n\n2- R$100,00, para 7 acertos; \n\n3- R$10,00, para 6 acertos. \n\nCaso o Cliente perca o prazo de realização do Bolão Grátis, este não terá direito a recorrer a novos bônus em decorrência dessa perda. Não acarretando à RosaBet nenhuma obrigação diante da perda desta promoção. O cupom que será gerado automaticamente com o depósito, não gera a obrigatoriedade ao Cliente de participar do Bolão Grátis. Desta forma, este somente participará da presente promoção se assim desejar.",
    brief_description:
      "A cada R$50,00 (cinquenta reais) em depósitos, automaticamente o sistema gera um cupom para participação do Bolão Grátis.",
    amount: 0,
    amount_type: "",
    end_date_string: "2 Dias após o depósito",
    type: "JACKPOT",
    type_icon: "sport",
    banner: "/promotion.png",
  },
  {
    _id: "2",
    name: "Placar Exato",
    active: true,
    description:
      "A ROSABET segue comprometida em oferecer as melhores vantagens do mercado de jogos on-line! \n\nPensando nisso criamos mais uma super promoção pra você cliente ROSABET! Veja como funciona o Placar Exato: \n\n A cada R$50,00 (cinquenta reais) depositados você recebe automaticamente um cupom Placar Exato; Este cupom vem com três jogos dos melhores campeonatos de futebol, para que o cliente possa preencher com os placares desejados. \n\nAí é só esperar as partidas e torcer para que o placar de cada uma delas seja o mesmo do seu cupom; Acertando os três placares você ganha R$500,00 (quinhentos reais), que serão creditados automaticamente na sua conta; Se muitos clientes acertarem o mesmo placar o prêmio não será dividido, os R$500,00 (quinhentos reais) estão garantidos no seu saldo. \n\nA promoção Placar Exato estará no ar por tempo indeterminado. O cupom do Placar Exato tem duração de 48 horas, a partir do recebimento do cupom (que acontece quando o depósito é confirmado). Após esse período o cupom perde a validade e não pode mais ser utilizado; Caso o cliente perca o prazo de realização da promoção Placar Exato, ele não terá direito a recorrer a novos bônus em decorrência dessa perda. Não acarretando a RosaBet nenhuma obrigação diante da perda dessa promoção;\n\n Lembrando que quanto mais dinheiro depositado, mais chances você tem de ganhar. Exemplo: Ao depositar R$200,00 (duzentos reais), o sistema vai gerar quatro cupons do Placar Exato. Bons jogos e boa sorte!",
    brief_description:
      "A cada R$50,00 (cinquenta reais) depositados você recebe automaticamente um cupom Placar Exato.",
    amount: 0,
    amount_type: "CUPONS",
    end_date_string: "2 Dias após o depósito",
    type: "CORRECT_SCORE",
    type_icon: "target",
    banner: "/promotion.png",
    end_date: new Date(),
  },
  {
    _id: "3",
    name: "Giros Grátis no ILottery",
    active: true,
    description:
      "A RosaBet turbinou as vantagens pra quem está chegando por aqui agora! Ao realizar o cadastro gratuito em nosso site, o novo cliente recebe um Combo de Promoções para aumentar as chances de faturar, incluindo os Giros Gratuitos.\n\n Funciona assim: \n\n1. Realizar o cadastro gratuito. \n\n2. Realizar o primeiro depósito a partir de R$10,00. \n\nVantagens para depósitos a partir de R$10,00, e menores que R$50,00: Após o registro, ao depositar a partir de dez reais, o cliente ganha, na hora, 20 giros em jogo da plataforma definida pela RosaBet.\n\n Além disso, também será ofertado um cupom da promoção Placar Exato, onde o cliente vai concorrer a R$500,00.",
    brief_description:
      "Após o registro, ao depositar a partir de dez reais, o cliente ganha, na hora, 20 giros em jogo da plataforma definida pela RosaBet.",
    amount: 0,
    amount_type: "GIROS",
    end_date: new Date(),
    type: "FREE_ROUNDS",
    type_icon: "gift",
    banner: "/promotion.png",
  },
  {
    _id: "4",
    name: "Bônus de Boas Vindas",
    active: true,
    description:
      "A RosaBet tem um presentão pra quem está chegando por aqui agora! Ao realizar o cadastro e fazer o primeiro depósito, a RosaBet dobra o valor depositado na sua conta (válido para depósitos entre R$50,00 e R$500,00). \n\nPor exemplo: Se você depositar R$200,00 vai receber mais R$200,00, totalizando R$400,00, para aproveitar o melhor das apostas esportivas e iLotery! \n\nSiga o passo a passo abaixo e ganhe o seu Bônus de Boas-vindas agora mesmo: \n\n1 - Cadastre-se em www.rosabet.com.br; \n\n2 - Acesse a sua conta e clique em “Deposite via PIX”;  \n\n3 - Escolha o seu método de pagamento favorito e o valor que deseja depositar;  \n\n4 - Após preencher o valor de depósito, assinale a caixinha aceitando o Bônus de Boas-vindas; \n\n5 - Clique em depositar e conclua o seu depósito normalmente;  \n\n6 - Pronto! Após o saldo ser creditado na conta, você receberá o mesmo valor em bônus e já pode começar a se divertir!",
    brief_description: "A RosaBet tem um presentão pra quem está chegando por aqui agora",
    amount: 0,
    amount_type: "BÔNUS",
    end_date: new Date(),
    end_date_string: "Após o depósito",
    type: "WELCOME_BONUS",
    type_icon: "gift",
    banner: "/promotion.png",
  },
] as Promotion[];
