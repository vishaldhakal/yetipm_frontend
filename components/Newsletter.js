import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Newsletter() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-6xl">
            <span className="text-primary">Stay Updated with New Rentals</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Be the first to know about new rental properties in United States.
            Get notifications about properties that match your preferences and
            exclusive offers.
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-12">
          <form action="#" method="POST" className="space-y-4">
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="block w-full pl-12 pr-6 py-4 text-base text-gray-900 
                         border-2 border-gray-200 rounded-full bg-white/80 
                         backdrop-blur-sm focus:border-primary focus:outline-none
                         transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 text-base font-medium text-white 
                       bg-gradient-to-r from-primary to-secondary 
                       rounded-full hover:opacity-90 transition-opacity 
                       duration-200 focus:outline-none focus:ring-2 
                       focus:ring-primary focus:ring-offset-2"
            >
              Subscribe Now
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-8">
            {[
              { label: "Weekly Updates", icon: "📅" },
              { label: "Exclusive Listings", icon: "🏢" },
              { label: "Market Insights", icon: "📊" },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-2">
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm text-gray-600">{feature.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-center text-gray-500 max-w-sm mx-auto">
            By subscribing, you agree to receive rental updates from YetiPM. You
            can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
