export interface FakeUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  cpf: string;
  password: string;
  token: string;
  credits: number;
  type: string;
  phone: string;
  birthDate: string;
  created_at: string;
  email_confirmed: boolean;
}

export const fakeUsers: FakeUser[] = [
  {
    _id: "user_001",
    name: "Usuário Demo",
    username: "demo@rosabet.com",
    email: "demo@rosabet.com",
    cpf: "123.456.789-00",
    password: "demo123",
    token: "fake-jwt-token-demo-001",
    credits: 500.0,
    type: "client",
    phone: "(11) 99999-9999",
    birthDate: "1990-01-01",
    created_at: "2024-01-01T00:00:00Z",
    email_confirmed: true,
  },
];

export function findUserByCredentials(username: string, password: string): FakeUser | undefined {
  return fakeUsers.find(
    (u) => (u.username === username || u.email === username) && u.password === password
  );
}

export function findUserByToken(token: string): FakeUser | undefined {
  return fakeUsers.find((u) => u.token === token);
}

export function findUserByCPF(cpf: string): FakeUser | undefined {
  return fakeUsers.find((u) => u.cpf === cpf);
}

export function createUser(data: Partial<FakeUser>): FakeUser {
  const newUser: FakeUser = {
    _id: `user_${Date.now()}`,
    name: data.name || "",
    username: data.username || data.email || "",
    email: data.email || "",
    cpf: data.cpf || "",
    password: data.password || "",
    token: `fake-jwt-token-${Date.now()}`,
    credits: 0,
    type: "client",
    phone: data.phone || "",
    birthDate: data.birthDate || "",
    created_at: new Date().toISOString(),
    email_confirmed: false,
  };
  fakeUsers.push(newUser);
  return newUser;
}
