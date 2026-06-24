import { NextRequest, NextResponse } from "next/server";

const ruleContents: Record<string, string> = {
  rule_001:
    "Ao utilizar a RosaBet, você concorda com nossos Termos e Condições. É proibido o uso por menores de 18 anos. A RosaBet se reserva o direito de suspender contas suspeitas de fraude.",
  rule_002:
    "A RosaBet respeita sua privacidade conforme a LGPD (Lei 13.709/2018). Seus dados são utilizados apenas para prestação dos serviços e não são compartilhados com terceiros sem autorização.",
  rule_003:
    "As apostas são finais e não podem ser canceladas após confirmação. Resultados seguem as fontes oficiais das competições. Em caso de cancelamento de evento, apostas são reembolsadas.",
  rule_004:
    "O bônus de boas-vindas é de 100% até R$500. Requisito de rollover: 5x o valor do depósito + bônus em apostas com odds mínima de 1.5. Prazo de 30 dias para cumprir o rollover.",
  rule_005:
    "A RosaBet promove o jogo responsável. Você pode definir limites de depósito, apostas e sessão no seu perfil. Em caso de dependência, ligue 0800-123-4567 (SENAD).",
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const content = ruleContents[params.id] || "Conteúdo não encontrado.";
  return NextResponse.json({ _id: params.id, content });
}
