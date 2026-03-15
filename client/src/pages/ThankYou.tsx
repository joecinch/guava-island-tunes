import { Music, CheckCircle, Mail } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2">
            <Music className="w-6 h-6" style={{ color: "#E8614A" }} />
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Guava Island Tunes
            </h1>
          </a>
        </div>
      </nav>

      {/* Thank You Content */}
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle className="w-24 h-24" style={{ color: "#E8614A" }} />
          </div>

          <div className="space-y-4">
            <h1
              className="text-5xl md:text-6xl font-bold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your order has been received. We're so excited to create something truly special for you.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-4 text-left">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              What happens next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E8614A" }}>1</div>
                <div>
                  <p className="font-medium text-foreground">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email from Stripe with your receipt.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E8614A" }}>2</div>
                <div>
                  <p className="font-medium text-foreground">We'll Reach Out</p>
                  <p className="text-sm text-muted-foreground">Joey Kim will personally contact you within 24 hours to gather any additional details needed for your song.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E8614A" }}>3</div>
                <div>
                  <p className="font-medium text-foreground">Your Song is Created</p>
                  <p className="text-sm text-muted-foreground">We'll craft your custom song with love and deliver it to you — a memory that lasts forever.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-5 h-5" />
            <p className="text-sm">Questions? Email us at <a href="mailto:Fivestarhomerepair745@gmail.com" className="text-primary hover:underline">Fivestarhomerepair745@gmail.com</a></p>
          </div>

          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#E8614A" }}
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center text-muted-foreground text-sm">
          <p>© 2024 Guava Island Tunes. All rights reserved.</p>
          <p className="mt-2">Crafted with care for your special moments.</p>
        </div>
      </footer>
    </div>
  );
}
