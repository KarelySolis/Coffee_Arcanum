export default function About() {
  return (
    <section id="about" className="bg-[#2a3c2a] py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#b79b8c] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">
            Nuestra Historia
          </p>
          <h2 className="text-4xl font-semibold text-[#fdfaf5] mb-6 leading-tight tracking-tight">
            Pasión destilada en cada grano
          </h2>
          <p className="text-[#fdfaf5]/80 leading-relaxed mb-4 font-light">
            Arcanum Coffee nació de la obsesión por encontrar la taza perfecta. Viajamos a las
            montañas de Huila, Veracruz y Antigua para seleccionar granos que cuentan historias
            de terroir y dedicación.
          </p>
          <p className="text-[#fdfaf5]/80 leading-relaxed mb-8 font-light">
            Nuestros tostadores artesanales trabajan pequeños lotes con precisión científica y
            sensibilidad de barista, preservando los perfiles de sabor únicos de cada origen.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center border-t border-[#fdfaf5]/10 pt-6">
            {[["10+", "Años"], ["15", "Orígenes"], ["100%", "Artesanal"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-[#fdfaf5] text-3xl font-semibold">{n}</p>
                <p className="text-[#b79b8c] text-xs uppercase tracking-wider mt-1 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden h-80 md:h-full min-h-[400px] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
            alt="Barista preparando café"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}