import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface transDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // Finalizado ALL
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, transaction) => {
      return transaction.type === 'income'
        ? accumulator + transaction.value
        : accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, transaction) => {
      return transaction.type === 'outcome'
        ? accumulator + transaction.value
        : accumulator;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  // Ok ate o momento
  public create({ title, value, type }: transDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
