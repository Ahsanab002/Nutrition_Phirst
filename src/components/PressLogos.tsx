const PressLogos = () => {
  const pressLogos = [
    { name: "Vogue", alt: "As seen in Vogue" },
    { name: "Forbes", alt: "Featured in Forbes" },
    { name: "WWD", alt: "Covered by WWD" },
    { name: "The Zoe Report", alt: "Featured in The Zoe Report" },
    { name: "Coveteur", alt: "Featured in Coveteur" },
    { name: "NewBeauty", alt: "Featured in NewBeauty" },
    { name: "Cosmopolitan", alt: "Featured in Cosmopolitan" },
    { name: "Marie Claire", alt: "Featured in Marie Claire" },
    { name: "Byrdie", alt: "Featured in Byrdie" },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground tracking-wider">
            AS SEEN IN
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {pressLogos.map((logo) => (
            <div
              key={logo.name}
              className="text-muted-foreground font-medium text-sm md:text-base tracking-wide hover:opacity-80 transition-opacity"
            >
              {logo.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressLogos;