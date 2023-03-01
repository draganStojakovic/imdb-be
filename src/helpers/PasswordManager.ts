import { hash } from 'bcryptjs';
import { compare } from 'bcryptjs';

class PasswordManager {
  private salts = 10;

  public async hash(password: string) {
    return await hash(password, this.salts);
  }

  public async compare(plainPassword: string, hashedPassword: string) {
    return await compare(plainPassword, hashedPassword);
  }
}

const passwordManager = new PasswordManager();
export default passwordManager;