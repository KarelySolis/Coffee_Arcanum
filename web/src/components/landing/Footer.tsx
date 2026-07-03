export default function Footer() {
  return (
    <footer className="bg-[#fdfaf5] border-t border-[#3a2a1a]/10 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-[#3a2a1a]">
        
        {/* Columna de la Marca */}
        <div className="md:col-span-1">
          <p className="font-semibold text-xl tracking-wide mb-4">
            ARCANUM COFFEE CO.
          </p>
          <p className="text-sm text-[#5c4a3a] leading-relaxed font-light">
            Café de especialidad con alma artesanal. Cada taza es una historia compartida.
          </p>
        </div>

        {/* Columna de Enlaces Rápidos (Estilo image_b1e046.jpg) */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#8c5a3c] mb-4">
            Explora
          </p>
          <ul className="space-y-2 text-sm text-[#5c4a3a] font-normal">
            <li><a href="#hero" className="hover:text-[#8c5a3c] transition-colors">Inicio</a></li>
            <li><a href="#menu" className="hover:text-[#8c5a3c] transition-colors">Menú</a></li>
            <li><a href="#about" className="hover:text-[#8c5a3c] transition-colors">Nuestra Historia</a></li>
          </ul>
        </div>

        {/* Columna de Contacto */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#8c5a3c] mb-4">
            Contacto
          </p>
          <ul className="space-y-2 text-sm text-[#5c4a3a] font-normal">
            <li className="hover:text-[#8c5a3c] transition-colors cursor-pointer">Av. Reforma 123, CDMX</li>
            <li className="hover:text-[#8c5a3c] transition-colors cursor-pointer">+52 55 1234 5678</li>
            <li className="hover:text-[#8c5a3c] transition-colors cursor-pointer">hola@arcanumcoffee.mx</li>
          </ul>
        </div>

        {/* Columna de Redes Sociales */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#8c5a3c] mb-4">
            Síguenos
          </p>
          <div className="flex gap-6 text-sm text-[#5c4a3a] font-medium">
            <a href="#" aria-label="Instagram" className="hover:text-[#8c5a3c] transition-colors">
              Instagram
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#8c5a3c] transition-colors">
              Facebook
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#8c5a3c] transition-colors">
              Twitter
            </a>
          </div>
        </div>

      </div>

      {/* Línea inferior de Copyright */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#3a2a1a]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5c4a3a]/70">
        <p>© 2026 Arcanum Coffee Co. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Política de Privacidad</a>
          <a href="#" className="hover:underline">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
