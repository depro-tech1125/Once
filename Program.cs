using System;
using System.Collections.Generic;
using System.Linq;

namespace Once
{
    internal class Program
    {
        private static List<int> RealizarOperaciones(List<int> numeros, int divisor)
        {
            List<int> list = new List<int>();
            for (int i = 1; i < numeros.Count; i++)
            {
                int item = (numeros[i - 1] + numeros[i]) / divisor;
                list.Add(item);
            }
            return list;
        }

        private static Dictionary<int, int> CountRepeats(List<int> numbers)
        {
            Dictionary<int, int> dictionary = new Dictionary<int, int>();
            foreach (int number in numbers)
            {
                if (dictionary.ContainsKey(number))
                {
                    dictionary[number]++;
                }
                else
                {
                    dictionary[number] = 1;
                }
            }
            return dictionary;
        }

        private static void DisplayRepeats(Dictionary<int, int> repeats)
        {
            foreach (KeyValuePair<int, int> repeat in repeats)
            {
                if (repeat.Value > 1)
                {
                    Console.WriteLine($"{repeat.Key:D2} se repite: {repeat.Value} veces");
                }
            }
        }

        private static void Main(string[] args)
        {
            List<int> list = new List<int>();
            for (int i = 0; i < 11; i++)
            {
                Console.Write($"Ingresa el valor para variable {i + 1}: ");
                int item = Convert.ToInt32(Console.ReadLine());
                list.Add(item);
            }

            Console.Write("`nNumeros ingresados: `n");
            foreach (int item3 in list)
            {
                Console.Write($"{item3:D2}, ");
            }
            Console.WriteLine();

            List<int> list2 = RealizarOperaciones(list, 3);
            List<int> list3 = RealizarOperaciones(list, 4);
            List<int> list4 = RealizarOperaciones(list, 5);

            Console.WriteLine("`n ** Resultados para el Vector1: ** `n");
            Console.Write("Con el numero 3: ");
            foreach (int item4 in list2)
            {
                Console.Write($"{item4:D2}, ");
            }
            Console.WriteLine();

            Console.Write("Con el numero 4: ");
            foreach (int item5 in list3)
            {
                Console.Write($"{item5:D2}, ");
            }
            Console.WriteLine();

            Console.Write("Con el numero 5: ");
            foreach (int item6 in list4)
            {
                Console.Write($"{item6:D2}, ");
            }
            Console.WriteLine();

            List<int> list5 = new List<int>();
            foreach (int item7 in list)
            {
                string source = item7.ToString().PadLeft(2, '0');
                int item2 = Convert.ToInt32(new string(source.Reverse().ToArray()));
                list5.Add(item2);
            }

            Console.WriteLine("`n ** Resultados para el Vector2 - con digitos invertidos: ** `n");
            Console.Write("Numeros en el Vector2:`n");
            foreach (int item8 in list5)
            {
                Console.Write($"{item8:D2}, ");
            }
            Console.WriteLine();

            List<int> list6 = RealizarOperaciones(list5, 3);
            List<int> list7 = RealizarOperaciones(list5, 4);
            List<int> list8 = RealizarOperaciones(list5, 5);

            Console.Write("`nCon el numero 3: ");
            foreach (int item9 in list6)
            {
                Console.Write($"{item9:D2}, ");
            }
            Console.WriteLine();

            Console.Write("Con el numero 4: ");
            foreach (int item10 in list7)
            {
                Console.Write($"{item10:D2}, ");
            }
            Console.WriteLine();

            Console.Write("Con el numero 5: ");
            foreach (int item11 in list8)
            {
                Console.Write($"{item11:D2}, ");
            }
            Console.WriteLine();

            List<int> list9 = new List<int>();
            list9.AddRange(list2);
            list9.AddRange(list3);
            list9.AddRange(list4);
            list9.AddRange(list6);
            list9.AddRange(list7);
            list9.AddRange(list8);

            Console.WriteLine("`n ** Resultados de todas las operaciones: ** `n");
            DisplayRepeats(CountRepeats(list9));

            List<int> list10 = new List<int>();
            list10.AddRange(list2);
            list10.AddRange(list3);
            list10.AddRange(list4);
            Dictionary<int, int> dictionary = CountRepeats(list10);

            Console.WriteLine("`nResultados en Vector1 que se repiten 1 vez:");
            for (int j = 0; j <= 30; j++)
            {
                if (dictionary.ContainsKey(j) && dictionary[j] == 1)
                {
                    Console.WriteLine($"{j:D2} se repite 1 vez");
                }
            }

            Console.ReadLine();
        }
    }
}
