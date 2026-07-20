import Layout from './components/Layout';
import Hero from './sections/Hero';
import QueEs from './sections/QueEs';
import Servicios from './sections/Servicios';
import Experiencia from './sections/Experiencia';
import Requisitos from './sections/Requisitos';
import Ludoteca from './sections/Ludoteca';
import Galeria from './sections/Galeria';
import Contacto from './sections/Contacto';

export default function App() {
  return (
    <Layout>
      <Hero />
      <QueEs />
      <Servicios />
      <Experiencia />
      <Requisitos />
      <Ludoteca />
      <Galeria />
      <Contacto />
    </Layout>
  );
}
