// projeto/frontend/src/pages/index.tsx
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

import { Navbar } from '@/components/Navbar';
import { BookCard } from '@/components/BookCard';
import { Section } from '@/components/Section';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

interface Book {
  id: number;
  nome: string;
  autor: string;
}

const API_BASE_URL = "http://localhost:3000";

// --- Componente para a Seção "Todos os Livros" ---
const AllBooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then(response => setBooks(response.data))
      .catch(err => console.error("Erro ao buscar todos os livros", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-center text-primary animate-pulse">Carregando...</div>;

  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book, index) => (
         <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
            <BookCard book={book} />
         </motion.div>
      ))}
    </motion.div>
  );
};

// --- Componente para a Seção "Busca por Autor" ---
const SearchByAuthorSection = () => {
  const [author, setAuthor] = useState('');
  const [result, setResult] = useState<Book[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearched(true);
    axios.get(`${API_BASE_URL}/books/author/${author}`)
      .then(response => setResult(response.data))
      .catch(() => setResult([]));
  };
  
  return (
    <>
      <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-3 mb-8">
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Digite o nome do autor" className="w-full px-4 py-2 bg-input border border-primary/30 rounded-md focus:outline-none focus:ring-2 ring-primary"/>
        <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90">Buscar</button>
      </form>
      {searched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {result.length > 0 ? result.map(book => <BookCard key={book.id} book={book} />) : <p className="col-span-full text-center">Nenhum livro encontrado para este autor.</p>}
        </div>
      )}
    </>
  );
};

// --- Componente para a Seção "Busca por ID" ---
const SearchByIdSection = () => {
  const [id, setId] = useState('');
  const [result, setResult] = useState<Book | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearched(true);
    axios.get(`${API_BASE_URL}/books/${id}`)
      .then(response => setResult(response.data))
      .catch(() => setResult(null));
  };
  
  return (
    <>
      <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-3 mb-8">
        <input type="number" value={id} onChange={e => setId(e.target.value)} placeholder="Digite o ID do livro" className="w-full px-4 py-2 bg-input border border-primary/30 rounded-md focus:outline-none focus:ring-2 ring-primary"/>
        <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90">Buscar</button>
      </form>
      {searched && (
        <div className="flex justify-center">
            {result ? <BookCard book={result} /> : <p className="text-center">Nenhum livro encontrado com este ID.</p>}
        </div>
      )}
    </>
  );
};

// --- Página Principal ---
export default function Home() {
  return (
    <div className={`bg-background ${poppins.className}`}>
      <Navbar />
      <main className="pt-16">
        <Section id="all-books" title="Nossa Coleção Completa" subtitle="Explore todos os livros disponíveis em nosso catálogo.">
          <AllBooksSection />
        </Section>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <Section id="search-author" title="Buscar por Autor" subtitle="Encontre livros escritos pelo seu autor favorito.">
          <SearchByAuthorSection />
        </Section>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <Section id="search-id" title="Buscar por ID" subtitle="Procure um livro específico usando seu número de identificação.">
          <SearchByIdSection />
        </Section>
      </main>
      <footer className="text-center py-6 border-t border-primary/10 mt-10">
        <p className="text-sm text-gray-500">Livraria Fictícia &copy; 2025</p>
      </footer>
    </div>
  );
}