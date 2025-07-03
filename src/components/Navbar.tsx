// src/components/Navbar.tsx
import { motion } from 'framer-motion';

export const Navbar = () => {
  const navItems = [
    { name: 'Todos os Livros', href: '#all-books' },
    { name: 'Buscar por Autor', href: '#search-author' },
    { name: 'Buscar por ID', href: '#search-id' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </motion.nav>
  );
};