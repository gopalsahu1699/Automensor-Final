import Image from "next/image";

export default function ComparisonSection() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center">
     

      {/* Center Heading */}
      <div className="absolute top-20 w-full text-center z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-black">
          TURN TO THE NEW WAY
        </h2>
        <p className="text-l md:text-l  text-black">
          "wifi Based Home automation does not required any special wiring"
        </p>
      </div>

      {/* Split Layout */}
      <div className="flex w-full h-full">
        {/* LEFT - OLD */}
        <div className="w-1/2 bg-[#bfc2c1] flex flex-col items-center justify-center text-center px-8">
          <Image
            src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768528700/Switch_vzrmnz.webp"
            alt="Old Switch"
            width={120}
            height={120}
          />
          <p className="mt-6 text-lg text-black">
            Outdated Difficult to <br /> Maintain Old Fashioned
          </p>
        </div>

        {/* RIGHT - NEW */}
        <div className="w-1/2 bg-[#a0b8bb] flex flex-col items-center justify-center text-center px-8">
          <Image
            src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768528699/panel_1_fuot6k.webp"
            alt="Smart Switch"
            width={140}
            height={140}
          />
          <p className="mt-6 text-lg text-black">
            Cutting-Edge Technology <br />
            Easy To Maintain <br />
            Intelligent Touch Controls
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-6 w-full text-center text-black text-sm tracking-widest">
       <span className="italic"> #TOUCH THE FUTURE TODAY</span>
      </div>
    </section>
  );
}
