import React from "react";
import {
  Palette,
  Shapes,
  Droplet,
  Sparkles,
} from "lucide-react";

const DistinctByTheme = () => {
  const themes = [
    {
      id: 1,
      name: "Black Elegance",
      icons: ["🏠", "👤", "📱", "⚙️", "🎵", "🔧", "🌡️", "🔒"],
      gradient: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
      textColor: "text-white",
      iconColor: "text-white/90",
    },
    {
      id: 2,
      name: "Marble Luxury",
      icons: ["💧", "☁️", "🌊", "📊", "🎯"],
      gradient: "bg-gradient-to-br from-gray-100 via-white to-gray-200",
      textColor: "text-gray-800",
      iconColor: "text-blue-600",
      pattern: "marble",
    },
    {
      id: 3,
      name: "Wood Natural",
      icons: ["🎬", "💡", "✈️", "🍽️", "📺", "🔐"],
      gradient: "bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900",
      textColor: "text-white",
      iconColor: "text-white/90",
      pattern: "wood",
    },
    {
      id: 4,
      name: "Rose Modern",
      icons: ["🎨", "🏰", "🔌", "🎮"],
      gradient: "bg-gradient-to-br from-pink-50 via-white to-pink-100",
      textColor: "text-pink-600",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16 lg:px-32">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
          Distinct by Theme
        </h2>
        <p className="text-2xl md:text-3xl text-gray-600 font-medium">
          Crafting Excellence, One Theme at a Time
        </p>
      </div>

      {/* Themes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Background with pattern overlay */}
            <div className={`absolute inset-0 ${theme.gradient}`}>
              {/* Marble pattern overlay */}
              {theme.pattern === "marble" && (
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23f8f9fa' fill-opacity='0.1'/%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-30 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z' fill='%23000' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                    backgroundSize: "120px 120px",
                  }}
                />
              )}

              {/* Wood texture overlay */}
              {theme.pattern === "wood" && (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                  }}
                />
              )}
            </div>

            {/* Icons Grid */}
            <div className="absolute inset-0 p-6 flex flex-wrap content-start gap-3">
              {theme.icons.map((icon, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 ${
                    theme.pattern === "marble" || theme.pattern === "wood"
                      ? "border-white/30 bg-white/10 backdrop-blur-sm"
                      : "border-white/20 bg-white/5"
                  } text-2xl transition-transform group-hover:scale-110`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Theme Name */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className={`text-2xl font-bold ${theme.textColor}`}>
                {theme.name}
              </h3>
              <p className="text-white/80 text-sm mt-1">OOB</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DistinctByTheme;
