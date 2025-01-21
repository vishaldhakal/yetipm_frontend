import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImportantReminders() {
  return (
    <div className="relative">
      {/* Floating Apply Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          className="bg-[#B36B39] hover:bg-[#8B4E24] text-white font-semibold px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Apply Now
        </Button>
      </div>

      {/* Reminders Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447]">Important Reminders</h2>
              <div className="space-y-6">
                {[
                  "Submit one application per applicant. You may have a couple properties you are interested in but you only need to submit one application.",
                  "When applying as a group, the First/Primary applicant must invite the additional applicants to link the applications. Additional applicant(s) will be sent an email link to start their application process.",
                  "All adults over the age of 18 who will be living in the property will need to apply separately.",
                  "Incomplete applications are not processed, so please don't leave any spaces blank or your application will get automatically rejected.",
                  "Be prepared to upload your photo ID, previous 60 days proof of income, pet vaccination records/county animal licensing(if applicable).",
                ].map((reminder, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B36B39] flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{reminder}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%2008.26.31-T1EtcF6wbmrUv1P2ZfGJnC3JKcvu3f.png"
                alt="Family in living room"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

