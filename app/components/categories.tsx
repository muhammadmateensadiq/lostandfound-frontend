import { Wallet, Smartphone, Backpack, Key, PawPrint, Glasses, Watch, Headphones } from "lucide-react";

const categories = [
  { name: "Wallets", icon: Wallet, count: 342 },
  { name: "Phones", icon: Smartphone, count: 256 },
  { name: "Bags", icon: Backpack, count: 189 },
  { name: "Keys", icon: Key, count: 421 },
  { name: "Pets", icon: PawPrint, count: 78 },
  { name: "Accessories", icon: Glasses, count: 167 },
  { name: "Watches", icon: Watch, count: 93 },
  { name: "Electronics", icon: Headphones, count: 134 },
];

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold mb-4"
          //  style={{
          //   fontWeight: 900,
          //   color: 'blue'
          // }}
          >Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your lost item faster by browsing through specific categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">{category.name}</div>
                    <div className="text-gray-500">{category.count} items</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
