import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
