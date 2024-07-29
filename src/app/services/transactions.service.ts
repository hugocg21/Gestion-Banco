import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactions: Transaction[] = [
    // Enero
    {
      id: 1,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-01-01'),
      description: 'Salario de enero',
    },
    {
      id: 2,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-01-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 3,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-01-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 4,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-01-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 5,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-01-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 6,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-01-12'),
      description: 'Cine y cena',
    },
    {
      id: 7,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-01-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 8,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-01-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 9,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-01-20'),
      description: 'Curso online',
    },
    {
      id: 10,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-01-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 11,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-01-24'),
      description: 'Compra de ropa',
    },
    {
      id: 12,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-01-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 13,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-01-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 14,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-01-27'),
      description: 'Salario de enero',
    },
    {
      id: 15,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-01-28'),
      description: 'Concierto',
    },
    {
      id: 16,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-01-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 17,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-01-30'),
      description: 'Trabajo freelance',
    },
    {
      id: 18,
      type: 'expense',
      category: 'Salud',
      amount: 150,
      date: new Date('2024-01-31'),
      description: 'Visita médica',
    },
    {
      id: 19,
      type: 'income',
      category: 'Venta',
      amount: 350,
      date: new Date('2024-01-31'),
      description: 'Venta de artículos usados',
    },
    {
      id: 20,
      type: 'expense',
      category: 'Educación',
      amount: 200,
      date: new Date('2024-01-31'),
      description: 'Libros',
    },
    {
      id: 21,
      type: 'income',
      category: 'Inversiones',
      amount: 500,
      date: new Date('2024-01-31'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 22,
      type: 'expense',
      category: 'Ropa',
      amount: 150,
      date: new Date('2024-01-31'),
      description: 'Compra de ropa',
    },
    {
      id: 23,
      type: 'expense',
      category: 'Hogar',
      amount: 250,
      date: new Date('2024-01-31'),
      description: 'Gastos del hogar',
    },
    {
      id: 24,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-01-31'),
      description: 'Salario de enero',
    },
    {
      id: 25,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 200,
      date: new Date('2024-01-31'),
      description: 'Cine',
    },

    // Febrero
    {
      id: 26,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-02-01'),
      description: 'Salario de febrero',
    },
    {
      id: 27,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-02-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 28,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-02-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 29,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-02-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 30,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-02-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 31,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-02-12'),
      description: 'Cine y cena',
    },
    {
      id: 32,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-02-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 33,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-02-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 34,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-02-20'),
      description: 'Curso online',
    },
    {
      id: 35,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-02-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 36,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-02-24'),
      description: 'Compra de ropa',
    },
    {
      id: 37,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-02-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 38,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-02-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 39,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-02-27'),
      description: 'Salario de febrero',
    },
    {
      id: 40,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-02-28'),
      description: 'Concierto',
    },
    {
      id: 41,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-02-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 42,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-02-29'),
      description: 'Trabajo freelance',
    },
    {
      id: 43,
      type: 'expense',
      category: 'Salud',
      amount: 150,
      date: new Date('2024-02-29'),
      description: 'Visita médica',
    },
    {
      id: 44,
      type: 'income',
      category: 'Venta',
      amount: 350,
      date: new Date('2024-02-29'),
      description: 'Venta de artículos usados',
    },
    {
      id: 45,
      type: 'expense',
      category: 'Educación',
      amount: 200,
      date: new Date('2024-02-29'),
      description: 'Libros',
    },
    {
      id: 46,
      type: 'income',
      category: 'Inversiones',
      amount: 500,
      date: new Date('2024-02-29'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 47,
      type: 'expense',
      category: 'Ropa',
      amount: 150,
      date: new Date('2024-02-29'),
      description: 'Compra de ropa',
    },
    {
      id: 48,
      type: 'expense',
      category: 'Hogar',
      amount: 250,
      date: new Date('2024-02-29'),
      description: 'Gastos del hogar',
    },
    {
      id: 49,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-02-29'),
      description: 'Salario de febrero',
    },
    {
      id: 50,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 200,
      date: new Date('2024-02-29'),
      description: 'Cine',
    },

    // Marzo
    {
      id: 51,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-03-01'),
      description: 'Salario de marzo',
    },
    {
      id: 52,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-03-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 53,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-03-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 54,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-03-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 55,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-03-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 56,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-03-12'),
      description: 'Cine y cena',
    },
    {
      id: 57,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-03-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 58,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-03-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 59,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-03-20'),
      description: 'Curso online',
    },
    {
      id: 60,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-03-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 61,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-03-24'),
      description: 'Compra de ropa',
    },
    {
      id: 62,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-03-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 63,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-03-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 64,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-03-27'),
      description: 'Salario de marzo',
    },
    {
      id: 65,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-03-28'),
      description: 'Concierto',
    },
    {
      id: 66,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-03-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 67,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-03-30'),
      description: 'Trabajo freelance',
    },
    {
      id: 68,
      type: 'expense',
      category: 'Salud',
      amount: 150,
      date: new Date('2024-03-31'),
      description: 'Visita médica',
    },
    {
      id: 69,
      type: 'income',
      category: 'Venta',
      amount: 350,
      date: new Date('2024-03-31'),
      description: 'Venta de artículos usados',
    },
    {
      id: 70,
      type: 'expense',
      category: 'Educación',
      amount: 200,
      date: new Date('2024-03-31'),
      description: 'Libros',
    },
    {
      id: 71,
      type: 'income',
      category: 'Inversiones',
      amount: 500,
      date: new Date('2024-03-31'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 72,
      type: 'expense',
      category: 'Ropa',
      amount: 150,
      date: new Date('2024-03-31'),
      description: 'Compra de ropa',
    },
    {
      id: 73,
      type: 'expense',
      category: 'Hogar',
      amount: 250,
      date: new Date('2024-03-31'),
      description: 'Gastos del hogar',
    },
    {
      id: 74,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-03-31'),
      description: 'Salario de marzo',
    },
    {
      id: 75,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 200,
      date: new Date('2024-03-31'),
      description: 'Cine',
    },

    // Abril
    {
      id: 76,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-04-01'),
      description: 'Salario de abril',
    },
    {
      id: 77,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-04-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 78,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-04-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 79,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-04-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 80,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-04-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 81,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-04-12'),
      description: 'Cine y cena',
    },
    {
      id: 82,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-04-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 83,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-04-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 84,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-04-20'),
      description: 'Curso online',
    },
    {
      id: 85,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-04-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 86,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-04-24'),
      description: 'Compra de ropa',
    },
    {
      id: 87,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-04-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 88,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-04-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 89,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-04-27'),
      description: 'Salario de abril',
    },
    {
      id: 90,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-04-28'),
      description: 'Concierto',
    },
    {
      id: 91,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-04-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 92,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-04-30'),
      description: 'Trabajo freelance',
    },

    // Mayo
    {
      id: 93,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-05-01'),
      description: 'Salario de mayo',
    },
    {
      id: 94,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-05-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 95,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-05-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 96,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-05-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 97,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-05-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 98,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-05-12'),
      description: 'Cine y cena',
    },
    {
      id: 99,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-05-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 100,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-05-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 101,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-05-20'),
      description: 'Curso online',
    },
    {
      id: 102,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-05-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 103,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-05-24'),
      description: 'Compra de ropa',
    },
    {
      id: 104,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-05-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 105,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-05-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 106,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-05-27'),
      description: 'Salario de mayo',
    },
    {
      id: 107,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-05-28'),
      description: 'Concierto',
    },
    {
      id: 108,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-05-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 109,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-05-30'),
      description: 'Trabajo freelance',
    },
    {
      id: 110,
      type: 'expense',
      category: 'Salud',
      amount: 150,
      date: new Date('2024-05-31'),
      description: 'Visita médica',
    },
    {
      id: 111,
      type: 'income',
      category: 'Venta',
      amount: 350,
      date: new Date('2024-05-31'),
      description: 'Venta de artículos usados',
    },
    {
      id: 112,
      type: 'expense',
      category: 'Educación',
      amount: 200,
      date: new Date('2024-05-31'),
      description: 'Libros',
    },
    {
      id: 113,
      type: 'income',
      category: 'Inversiones',
      amount: 500,
      date: new Date('2024-05-31'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 114,
      type: 'expense',
      category: 'Ropa',
      amount: 150,
      date: new Date('2024-05-31'),
      description: 'Compra de ropa',
    },
    {
      id: 115,
      type: 'expense',
      category: 'Hogar',
      amount: 250,
      date: new Date('2024-05-31'),
      description: 'Gastos del hogar',
    },
    {
      id: 116,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-05-31'),
      description: 'Salario de mayo',
    },
    {
      id: 117,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 200,
      date: new Date('2024-05-31'),
      description: 'Cine',
    },

    // Junio
    {
      id: 118,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-06-01'),
      description: 'Salario de junio',
    },
    {
      id: 119,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-06-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 120,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-06-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 121,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-06-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 122,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-06-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 123,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-06-12'),
      description: 'Cine y cena',
    },
    {
      id: 124,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-06-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 125,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-06-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 126,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-06-20'),
      description: 'Curso online',
    },
    {
      id: 127,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-06-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 128,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-06-24'),
      description: 'Compra de ropa',
    },
    {
      id: 129,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-06-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 130,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-06-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 131,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-06-27'),
      description: 'Salario de junio',
    },
    {
      id: 132,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-06-28'),
      description: 'Concierto',
    },
    {
      id: 133,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-06-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 134,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-06-30'),
      description: 'Trabajo freelance',
    },

    // Julio
    {
      id: 135,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-07-01'),
      description: 'Salario de julio',
    },
    {
      id: 136,
      type: 'expense',
      category: 'Alquiler',
      amount: 1000,
      date: new Date('2024-07-05'),
      description: 'Pago de alquiler',
    },
    {
      id: 137,
      type: 'expense',
      category: 'Supermercado',
      amount: 150,
      date: new Date('2024-07-06'),
      description: 'Compra en supermercado',
    },
    {
      id: 138,
      type: 'expense',
      category: 'Transporte',
      amount: 50,
      date: new Date('2024-07-07'),
      description: 'Gastos de transporte',
    },
    {
      id: 139,
      type: 'income',
      category: 'Freelance',
      amount: 500,
      date: new Date('2024-07-10'),
      description: 'Trabajo freelance',
    },
    {
      id: 140,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 100,
      date: new Date('2024-07-12'),
      description: 'Cine y cena',
    },
    {
      id: 141,
      type: 'expense',
      category: 'Salud',
      amount: 200,
      date: new Date('2024-07-15'),
      description: 'Compra de medicamentos',
    },
    {
      id: 142,
      type: 'income',
      category: 'Venta',
      amount: 300,
      date: new Date('2024-07-18'),
      description: 'Venta de artículos usados',
    },
    {
      id: 143,
      type: 'expense',
      category: 'Educación',
      amount: 250,
      date: new Date('2024-07-20'),
      description: 'Curso online',
    },
    {
      id: 144,
      type: 'expense',
      category: 'Restaurante',
      amount: 80,
      date: new Date('2024-07-22'),
      description: 'Cena en restaurante',
    },
    {
      id: 145,
      type: 'expense',
      category: 'Ropa',
      amount: 120,
      date: new Date('2024-07-24'),
      description: 'Compra de ropa',
    },
    {
      id: 146,
      type: 'income',
      category: 'Inversiones',
      amount: 400,
      date: new Date('2024-07-25'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 147,
      type: 'expense',
      category: 'Hogar',
      amount: 300,
      date: new Date('2024-07-26'),
      description: 'Gastos del hogar',
    },
    {
      id: 148,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-07-27'),
      description: 'Salario de julio',
    },
    {
      id: 149,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 150,
      date: new Date('2024-07-28'),
      description: 'Concierto',
    },
    {
      id: 150,
      type: 'expense',
      category: 'Supermercado',
      amount: 100,
      date: new Date('2024-07-29'),
      description: 'Compra en supermercado',
    },
    {
      id: 151,
      type: 'income',
      category: 'Freelance',
      amount: 600,
      date: new Date('2024-07-30'),
      description: 'Trabajo freelance',
    },
    {
      id: 152,
      type: 'expense',
      category: 'Salud',
      amount: 150,
      date: new Date('2024-07-31'),
      description: 'Visita médica',
    },
    {
      id: 153,
      type: 'income',
      category: 'Venta',
      amount: 350,
      date: new Date('2024-07-31'),
      description: 'Venta de artículos usados',
    },
    {
      id: 154,
      type: 'expense',
      category: 'Educación',
      amount: 200,
      date: new Date('2024-07-31'),
      description: 'Libros',
    },
    {
      id: 155,
      type: 'income',
      category: 'Inversiones',
      amount: 500,
      date: new Date('2024-07-31'),
      description: 'Rendimientos de inversiones',
    },
    {
      id: 156,
      type: 'expense',
      category: 'Ropa',
      amount: 150,
      date: new Date('2024-07-31'),
      description: 'Compra de ropa',
    },
    {
      id: 157,
      type: 'expense',
      category: 'Hogar',
      amount: 250,
      date: new Date('2024-07-31'),
      description: 'Gastos del hogar',
    },
    {
      id: 158,
      type: 'income',
      category: 'Salario',
      amount: 3000,
      date: new Date('2024-07-31'),
      description: 'Salario de julio',
    },
    {
      id: 159,
      type: 'expense',
      category: 'Entretenimiento',
      amount: 200,
      date: new Date('2024-07-31'),
      description: 'Cine',
    },
  ];

  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  addTransaction(transaction: Transaction): void {
    transaction.id = this.transactions.length ? Math.max(...this.transactions.map((t) => t.id)) + 1 : 1;
    this.transactions.push(transaction);
  }

  getTotals(): Observable<{ income: number; expense: number }> {
    return this.getTransactions().pipe(
      map((transactions) => {
        const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense };
      })
    );
  }

  getTotalsByCategory(): Observable<{ [category: string]: number }> {
    return this.getTransactions().pipe(map((transactions) => {
      return transactions.reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += t.amount;
        return acc;
      }, {} as { [category: string]: number });
    }));
  }

  getCategories(): string[] {
    return [...new Set(this.transactions.map((transaction) => transaction.category))];
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
  }

  getTransactionsByMonth(year: number, month: number): Observable<Transaction[]> {
    return this.getTransactions().pipe(map((transactions) => transactions.filter((t) => t.date.getFullYear() === year && t.date.getMonth() === month)));
  }

  getAnnualIncomeExpense(): Observable<{ income: number, expense: number }[]> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return this.getTransactions().pipe(
      map(transactions => {
        const result = Array(12).fill(null).map(() => ({ income: 0, expense: 0 }));
        transactions.forEach(t => {
          const month = t.date.getMonth();
          if (t.date.getFullYear() === currentYear && month <= currentMonth) {
            if (t.type === 'income') {
              result[month].income += t.amount;
            } else {
              result[month].expense += t.amount;
            }
          }
        });
        return result;
      })
    );
  }

  getAnnualExpensesByCategory(): Observable<{ [category: string]: number }> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return this.getTransactions().pipe(
      map((transactions) => {
        const annualTransactions = transactions.filter(
          t => t.date.getFullYear() === currentYear && t.type === 'expense' && t.date.getMonth() <= currentMonth
        );
        return annualTransactions.reduce((acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = 0;
          }
          acc[t.category] += t.amount;
          return acc;
        }, {} as { [category: string]: number });
      })
    );
  }

  getMonthlyExpensesByCategory(year: number, month: number): Observable<{ [category: string]: number }> {
    return this.getTransactions().pipe(
      map((transactions) => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const monthlyTransactions = transactions.filter(
          t => t.date.getFullYear() === year && t.date.getMonth() === month - 1 && t.type === 'expense' && (year < currentYear || (year === currentYear && t.date.getMonth() <= currentMonth))
        );
        return monthlyTransactions.reduce((acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = 0;
          }
          acc[t.category] += t.amount;
          return acc;
        }, {} as { [category: string]: number });
      })
    );
  }
}
