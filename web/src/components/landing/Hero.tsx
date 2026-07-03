"use client";

// --- REFERENCIA DE ESTILO ---
// Este componente está inspirado en el diseño de image_0.png,
// utilizando su paleta de colores para una estética artesanal y natural.
// ----------------------------

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center bg-[#fdfaf5]" // Base crema suave de image_0.png
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(253,250,245,0.7) 0%, rgba(253,250,245,0.9) 100%), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4 max-w-3xl">
        {/* Título secundario en marrón café profundo */}
        <p className="text-[#3a2a1a] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          Experiencia Premium
        </p>

        {/* Título principal en terracota/marrón cálido de image_0.png */}
        <h1 className="text-5xl md:text-7xl font-semibold text-[#8c5a3c] mb-6 leading-[1.1] tracking-tight">
          Arcanum<br />
          <span className="text-[#2a3c2a]">Coffee</span> {/* Un toque de verde bosque, también de image_0.png */}
        </h1>

        {/* Texto descriptivo en marrón suave */}
        <p className="text-[#5c4a3a] text-lg md:text-xl mb-12 leading-relaxed font-normal">
          Donde cada taza es una obra de arte. Granos seleccionados,<br className="hidden md:block" />
          tostados con maestría para despertar tus sentidos.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {/* Botón principal en terracota con texto claro */}
          <a
            href="#menu"
            onClick={e => { e.preventDefault(); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-9 py-3 bg-[#8c5a3c] text-[#fdfaf5] rounded-lg font-semibold hover:bg-[#7a4e34] transition-colors duration-300 text-base shadow-md shadow-black/10 tracking-wide"
          >
            Ver Menú
          </a>
          
          {/* Botón secundario con borde, usando marrón café */}
          <a
            href="#about"
            onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-9 py-3 border-2 border-[#3a2a1a]/30 text-[#3a2a1a] rounded-lg font-semibold hover:bg-[#3a2a1a]/5 transition-colors duration-300 text-base tracking-wide"
          >
            Nuestra Historia
          </a>
        </div>
      </div>
    </section>
  );
}