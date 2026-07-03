"use client";

const items = [
  { name: "Espresso Arcanum", desc: "Blend exclusivo de tres orígenes. Notas de chocolate oscuro y especias.", price: "$45", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400" },
  { name: "Cold Brew Reserve", desc: "24 horas de extracción en frío. Suave, dulce y sin acidez.", price: "$65", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" },
  { name: "Pour Over Ethiopia", desc: "Yirgacheffe natural. Jazmín, durazno y miel en cada sorbo.", price: "$80", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" },
  { name: "Latte de Temporada", desc: "Espresso con leche vaporizada y syrup artesanal de la estación.", price: "$55", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
  { name: "Café de Olla", desc: "Tradición mexicana: canela, piloncillo y café de altura.", price: "$40", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400" },
  { name: "Nitro Coffee", desc: "Cold brew infusionado con nitrógeno. Cremoso sin lácteos.", price: "$70", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-[#dcd5c9] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-[#8c5a3c] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
            Nuestra Oferta
          </p>
          <h2 className="text-4xl font-semibold text-[#3a2a1a] tracking-tight">
            Menú Arcanum
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <div 
              key={item.name} 
              className="bg-white rounded-xl overflow-hidden border border-[#3a2a1a]/10 hover:border-[#2a3c2a] hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-[#3a2a1a]/5 mix-blend-multiply group-hover:bg-[#2a3c2a]/10 transition-colors duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-baseline gap-4 mb-3">
                    <h3 className="text-[#2a3c2a] font-semibold text-lg tracking-wide">
                      {item.name}
                    </h3>
                    <span className="text-[#8c5a3c] font-semibold whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[#2a3c2a]/90 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
              
              <div className="px-6 pb-6 pt-2 flex justify-end">
                <button className="w-8 h-8 rounded-full border border-[#8c5a3c]/30 text-[#8c5a3c] flex items-center justify-center text-sm font-medium group-hover:bg-[#2a3c2a] group-hover:border-[#2a3c2a] group-hover:text-[#fdfaf5] transition-colors duration-300">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}