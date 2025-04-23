import { Category } from "./category";

export interface Transaction {
    id?: number;
    transaction_type: 'income' | 'expense';
    category: Category;
    amount: number;
    date: string;
    description: string;
  }
  