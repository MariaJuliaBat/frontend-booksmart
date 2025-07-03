// src/components/Section.tsx
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const Section = ({ id, title, subtitle, children }: SectionProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
    className="py-20"
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-lg text-gray-400 mt-2">{subtitle}</p>
      </div>
      {children}
    </div>
  </motion.section>
);