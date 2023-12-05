import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import Transaction from 'arweave/node/lib/transaction';

export default class Signer {

  private jwk: JWKInterface;
  public arweave: Arweave;

  constructor({ jwk }: { jwk: JWKInterface }) {
    this.jwk = jwk;
    this.arweave = Arweave.init({});
  }

  async sign(transaction: Transaction): Promise<void> {
    return this.arweave.transactions.sign(transaction, this.jwk);
  }

  async getPublicAddress(): Promise<string> {
    return this.arweave.wallets.getAddress(this.jwk);
  }
}
