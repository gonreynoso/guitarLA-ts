export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

//?HEREDA TODOS LOS ATRIBUTOS de Guitar y agrega quantity en el nuevo type CartItem
export type CartItem = Guitar & {
  quantity: number;
};

//!Utility Types
//? Metodo Pick:HEREDA SOLO LOS ATRIBUTOS ELEGIDOS del componente de referencia y los agrega al nuevo componente junto a quantity
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//   quantity: number
// }

//? Metodo Omit: HEREDA TODOS LOS ATRIBUTOS Y OMITE SOLO LOS ATRIBUTOS ELEGIDOS del componente de referencia y no los agrega al nuevo componente junto a quantity
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//   quantity: number
// }
