// src/components/BookCard.tsx
import { motion } from 'framer-motion';

interface Book {
  id: number;
  nome: string;
  autor: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const BookCard = ({ book }: { book: Book }) => (
  <motion.div
    variants={cardVariants}
    className="bg-card border border-primary/20 rounded-lg p-5 flex flex-col text-center items-center h-full"
  >
    <div className="mb-3 text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    </div>
    <h3 className="text-lg font-bold text-card-foreground text-balance">{book.nome}</h3>
    <p className="text-sm text-gray-400 mt-1">{book.autor}</p>
    <div className="mt-auto pt-4 text-xs text-primary/50">ID: {book.id}</div>
  </motion.div>
);