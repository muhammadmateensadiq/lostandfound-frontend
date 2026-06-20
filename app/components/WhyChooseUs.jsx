export default function WhyChooseUs() {
  const features = [
    {
      title: "Intelligent Matching",
      desc: "Our system automatically analyzes lost and found reports to instantly suggest potential matches with high accuracy.",
      icon: (
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      ),
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Unified network",
      desc: "FindIt connects local neighborhoods, universities, and transit hubs into a single network, massively increasing the chances of your item being spotted.",
      icon: (
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      color: "from-blue-700 to-purple-500",
    },
    {
      title: "Instant Notifications",
      desc: "Get real-time alerts when a matching item is found so you can act quickly and safely.",
      icon: (
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-linear-to-b from-blue-50 via-white to-white overflow-hidden">

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.99] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* soft glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200/30 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              FindIt
            </span>
            ?
          </h2>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            A smarter, faster, and safer way to reconnect people with their lost belongings using AI-powered matching.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-3"
            >
              {/* Gradient Border */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-100 transition duration-500`}
              />

              {/* Card */}
              <div className="relative h-full rounded-[23px] bg-white/90 backdrop-blur-xl border border-white shadow-lg hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] p-8">

                {/* Decorative Glow */}
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 bg-linear-to-br ${item.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition`}
                />

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 flex items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-white shadow-lg mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
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