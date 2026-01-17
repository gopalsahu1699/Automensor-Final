import {
  Diamond,
  Timer,
  Hand,
  Wifi,
  Headphones,
} from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description:
      "10-year warranty on products ensuring durability and reliability.",
    icon: Diamond,
    color: "bg-violet-500",
  },
  {
    title: "Fast Installation",
    description:
      "Free installation consultation with quick execution.",
    icon: Timer,
    color: "bg-blue-500",
  },
  {
    title: "Easy Control",
    description:
      "Wi-Fi based automation with no special wiring required.",
    icon: Hand,
    color: "bg-emerald-500",
  },
  {
    title: "Smart Connectivity",
    description:
      "Control your home using mobile and smart devices.",
    icon: Wifi,
    color: "bg-indigo-500",
  },
  {
    title: "Local Support",
    description:
      "Reliable local service and on-site technical support.",
    icon: Headphones,
    color: "bg-gray-700",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            Why Choose Our Smart Solutions
          </h2>
          <p className="mt-4 text-gray-600">
            Designed for comfort, reliability, and modern living
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ================= Feature Card ================= */
function FeatureCard({ title, description, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      
      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full ${color}`}
      >
        <Icon size={26} className="text-white" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mt-1">
          {description}
        </p>
      </div>

    </div>
  );
}
