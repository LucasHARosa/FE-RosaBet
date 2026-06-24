import { NextRequest, NextResponse } from "next/server";

const fakeTransactions = [
  {
    _id: "tx_001",
    type: "DEPOSIT",
    amount: 100.0,
    status: "COMPLETED",
    method: "PIX",
    created_at: "2024-06-01T10:00:00Z",
  },
  {
    _id: "tx_002",
    type: "WITHDRAWAL",
    amount: 50.0,
    status: "COMPLETED",
    method: "PIX",
    created_at: "2024-06-02T15:00:00Z",
  },
  {
    _id: "tx_003",
    type: "DEPOSIT",
    amount: 200.0,
    status: "PENDING",
    method: "PIX",
    created_at: new Date().toISOString(),
    pix_key: "rosabet@pix.com.br",
    pix_qrcode:
      "00020126580014BR.GOV.BCB.PIX0136rosabet-fake-key-123456789520400005303986540510.005802BR5910RosaBet6009SAO PAULO62070503***6304FAKE",
    pix_qrcode_image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(fakeTransactions);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const amount = body.amount || 100;

  return NextResponse.json({
    _id: `dep_${Date.now()}`,
    status: "PENDING",
    amount,
    method: "PIX",
    pix_key: "rosabet@pix.com.br",
    pix_qrcode:
      "00020126580014BR.GOV.BCB.PIX0136rosabet-fake-key-123456789520400005303986540510.005802BR5910RosaBet6009SAO PAULO62070503***6304FAKE",
    pix_qrcode_image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  });
}
