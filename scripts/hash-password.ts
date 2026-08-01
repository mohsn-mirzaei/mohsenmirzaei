import { hashPassword } from "../src/lib/admin/password";

const password = process.argv[2];

if (!password) {
  console.error('Usage: pnpm run admin:hash-password "<password>"');
  process.exit(1);
}

console.log(hashPassword(password));
