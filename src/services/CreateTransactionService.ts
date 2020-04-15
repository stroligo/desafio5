import { Request } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface transDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: transDTO): Transaction {
    const { type, value } = data;
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error('Insufficient funds for this transaction');
    }

    return this.transactionsRepository.create(data);
  }
}

export default CreateTransactionService;
