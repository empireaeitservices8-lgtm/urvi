const USP_ITEMS = [
  {
    icon: "✦",
    title: "Timeless Design",
    desc: "Thoughtfully designed pieces that transcend seasons",
  },
  {
    icon: "◈",
    title: "Premium Quality",
    desc: "Made with attention to every stitch and detail",
  },
  {
    icon: "❋",
    title: "Effortless Style",
    desc: "Designed for the modern, graceful wardrobe",
  },
  {
    icon: "◉",
    title: "Seamless Shopping",
    desc: "Easy returns, fast delivery, elegant packaging",
  },
];

export default function USPStrip() {
  return (
    <section className="bg-[#F5F3EF] border-y border-[#E8E4DC]">
      <div className="container-urvi py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {USP_ITEMS.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
              <span className="text-2xl text-[#C9A84C] flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] mb-1">
                  {item.title}
                </p>
                <p className="text-[0.8125rem] text-[#5C5C5C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
