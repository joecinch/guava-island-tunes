import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Music, Video, Users, Upload, X, ImageIcon } from "lucide-react";
import { useState, useRef, useCallback } from "react";

/**
 * Custom Songs Page
 * Three pricing tiers for custom song creation
 */

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  features: string[];
  deliverables: string[];
  formFields: string[];
  color: string;
}

const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  basic: "https://buy.stripe.com/test_cNicN60yC1x3fCA96c4c800",
  video: "https://buy.stripe.com/test_fZu6oIa9ca3z1LK8284c801",
  premium: "https://buy.stripe.com/test_6oUdRabdg0sZ3TSaag4c802",
};

const MUSIC_GENRES = [
  "Pop",
  "R&B / Soul",
  "Country",
  "Hip-Hop / Rap",
  "Rock",
  "Jazz",
  "Gospel / Christian",
  "Classical / Orchestral",
  "Folk / Acoustic",
  "Latin",
  "Reggae",
  "Blues",
  "Electronic / EDM",
  "Hawaiian / Island",
  "Other (describe below)",
];

const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Custom Song",
    price: 100,
    description: "Perfect for personal celebrations",
    icon: <Music className="w-8 h-8" />,
    features: [
      "2 versions of your custom song",
      "Personalized lyrics",
      "Professional production",
      "MP3 format delivery",
    ],
    deliverables: ["2 song versions", "MP3 files"],
    formFields: ["names", "specialPlaces", "firstMeeting", "nicknames"],
    color: "#E8614A",
  },
  {
    id: "video",
    name: "Custom Song + Slideshow",
    price: 450,
    description: "Bring your story to life",
    icon: <Video className="w-8 h-8" />,
    features: [
      "2 versions of your custom song",
      "Custom photo slideshow",
      "Personalized lyrics",
      "Picture integration",
      "MP3 + MP4 delivery",
    ],
    deliverables: ["2 song versions", "1 photo slideshow", "MP3 + MP4 files"],
    formFields: ["names", "specialPlaces", "firstMeeting", "nicknames", "pictures"],
    color: "#F0C040",
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 1000,
    description: "Full creative partnership",
    icon: <Users className="w-8 h-8" />,
    features: [
      "One-on-one consultation",
      "2 versions of your custom song",
      "Custom photo slideshow",
      "Professional music video",
      "Unlimited revisions",
      "Picture integration",
      "Priority delivery",
      "MP3 + MP4 delivery",
    ],
    deliverables: ["2 song versions", "1 photo slideshow", "1 music video", "Consultation calls", "MP3 + MP4 files"],
    formFields: ["names", "specialPlaces", "firstMeeting", "nicknames", "pictures", "additionalDetails"],
    color: "#D4A0A0",
  },
];

interface UploadedPhoto {
  file: File;
  preview: string;
  id: string;
}

function PhotoUploader({
  photos,
  onAdd,
  onRemove,
  accentColor,
}: {
  photos: UploadedPhoto[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  accentColor: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      onAdd(imageFiles);
    },
    [onAdd]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        Upload Your Photos
        <span className="ml-2 text-xs font-normal text-muted-foreground">(3–20 photos recommended)</span>
      </label>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200"
        style={{
          borderColor: dragging ? accentColor : "#d1d5db",
          backgroundColor: dragging ? `${accentColor}10` : "transparent",
        }}
      >
        <Upload className="w-8 h-8" style={{ color: accentColor }} />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drag & drop photos here, or <span style={{ color: accentColor }}>click to browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG, HEIC supported · Max 10 MB per photo</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">{photos.length} photo{photos.length !== 1 ? "s" : ""} selected</p>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img
                  src={photo.preview}
                  alt={photo.file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRemove(photo.id); }}
                    className="bg-white rounded-full p-1 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[9px] truncate">{photo.file.name}</p>
                </div>
              </div>
            ))}
            {/* Add More Button */}
            <div
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors gap-1"
            >
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Add more</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_zi8b6zn";
const EMAILJS_OWNER_TEMPLATE_ID = "template_834adtm";  // Owner notification
const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_a0cb6ur";  // Customer confirmation
const EMAILJS_PUBLIC_KEY = "OCO6D634BTa6VIwfY";

// Send email via EmailJS REST API
async function sendEmail(templateId: string, templateParams: Record<string, string>) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error("EmailJS error:", response.status, text);
  }
  return response.ok;
}

// Send order notification email to owner (Joey Kim)
async function sendOrderEmail(
  tierName: string,
  price: number,
  formData: Record<string, string>,
  photoCount: number
) {
  const orderDate = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" });

  const ownerParams = {
    customer_name: formData.customerName || "Not provided",
    customer_email: formData.customerEmail || "Not provided",
    customer_phone: formData.customerPhone || "Not provided",
    package_name: tierName,
    package_price: `$${price}`,
    music_genre: formData.musicGenre || "Not specified",
    occasion: formData.occasion || "Not specified",
    names: formData.names || "Not provided",
    special_places: formData.specialPlaces || "Not provided",
    first_meeting: formData.firstMeeting || "Not provided",
    nicknames: formData.nicknames || "Not provided",
    additional_details: formData.additionalDetails || "None",
    photo_count: photoCount > 0 ? `${photoCount} photos uploaded` : "No photos",
    order_date: orderDate,
  };

  const customerParams = {
    customer_name: formData.customerName || "Valued Customer",
    customer_email: formData.customerEmail || "",
    package_name: tierName,
    package_price: `$${price}`,
    music_genre: formData.musicGenre || "Not specified",
    order_date: orderDate,
  };

  // Send both emails in parallel
  const [ownerResult, customerResult] = await Promise.allSettled([
    sendEmail(EMAILJS_OWNER_TEMPLATE_ID, ownerParams),
    formData.customerEmail ? sendEmail(EMAILJS_CUSTOMER_TEMPLATE_ID, customerParams) : Promise.resolve(false),
  ]);

  console.log("Owner email:", ownerResult);
  console.log("Customer email:", customerResult);

  return ownerResult.status === "fulfilled" && ownerResult.value;
}

export default function CustomSongs() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const currentTier = pricingTiers.find((t) => t.id === selectedTier);

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    setShowForm(true);
    setFormData({});
    setUploadedPhotos([]);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPhotos = (files: File[]) => {
    const newPhotos: UploadedPhoto[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random()}`,
    }));
    setUploadedPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (id: string) => {
    setUploadedPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (!currentTier) return;

    // Validate required contact fields
    if (!formData.customerName?.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!formData.customerEmail?.trim() || !formData.customerEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!formData.customerPhone?.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    if (!formData.musicGenre?.trim()) {
      alert("Please select a music genre/style.");
      return;
    }

    const needsPhotos = currentTier.formFields.includes("pictures");
    if (needsPhotos && uploadedPhotos.length === 0) {
      alert("Please upload at least one photo for your slideshow.");
      return;
    }

    setSubmitting(true);

    // Send order notification email to Joey Kim
    await sendOrderEmail(
      currentTier.name,
      currentTier.price,
      formData,
      uploadedPhotos.length
    );

    // Redirect to Stripe Checkout
    const paymentLink = STRIPE_PAYMENT_LINKS[currentTier.id];
    if (paymentLink) {
      // Pass customer email to Stripe for receipt
      const url = new URL(paymentLink);
      if (formData.customerEmail) {
        url.searchParams.set("prefilled_email", formData.customerEmail);
      }
      window.location.href = url.toString();
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2">
            <Music className="w-6 h-6" style={{ color: "#E8614A" }} />
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Guava Island Tunes
            </h1>
          </a>
          <a href="/" className="text-primary hover:text-primary/80 transition-colors">
            Back to Store
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container text-center space-y-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Create Your Perfect Song
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us your story, and we'll craft a beautiful custom song just for you. Choose the perfect package for your needs.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className="overflow-hidden border-0 hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div
                  className="p-6 text-white"
                  style={{ backgroundColor: tier.color }}
                >
                  <div className="flex items-center gap-3 mb-4">{tier.icon}</div>
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {tier.name}
                  </h2>
                  <p className="text-white/80 text-sm">{tier.description}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      ${tier.price}
                    </div>
                    <p className="text-sm text-muted-foreground">one-time payment</p>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full text-white"
                    style={{ backgroundColor: tier.color }}
                    onClick={() => handleSelectTier(tier.id)}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showForm && currentTier && (
        <div className="fixed inset-0 z-50 overflow-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl border-0 shadow-2xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-3xl font-bold text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {currentTier.name}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* ── CONTACT INFORMATION ── */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Your Contact Information
                  </h3>
                  <div className="space-y-4">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Sarah Johnson"
                        value={formData.customerName || ""}
                        onChange={(e) => handleFormChange("customerName", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Customer Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g., sarah@email.com"
                        value={formData.customerEmail || ""}
                        onChange={(e) => handleFormChange("customerEmail", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Your receipt and song delivery will be sent here.</p>
                    </div>

                    {/* Customer Phone */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g., (808) 555-1234"
                        value={formData.customerPhone || ""}
                        onChange={(e) => handleFormChange("customerPhone", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* ── MUSIC PREFERENCES ── */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Music Style
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Genre / Music Style <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.musicGenre || ""}
                      onChange={(e) => handleFormChange("musicGenre", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a genre...</option>
                      {MUSIC_GENRES.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">Choose the style that best fits your vision. You can add more detail below.</p>
                  </div>
                </div>

                {/* ── YOUR STORY ── */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Your Story
                  </h3>
                  <div className="space-y-6">
                    {/* Names */}
                    {currentTier.formFields.includes("names") && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Names (Who is this song for?)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Sarah & Michael"
                          value={formData.names || ""}
                          onChange={(e) => handleFormChange("names", e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    )}

                    {/* Special Places */}
                    {currentTier.formFields.includes("specialPlaces") && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Special Places
                        </label>
                        <textarea
                          placeholder="e.g., Our favorite beach in Hawaii, the park where we first met..."
                          value={formData.specialPlaces || ""}
                          onChange={(e) => handleFormChange("specialPlaces", e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24"
                        />
                      </div>
                    )}

                    {/* First Meeting */}
                    {currentTier.formFields.includes("firstMeeting") && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          How did you first meet / What is this occasion?
                        </label>
                        <textarea
                          placeholder="Tell us the story..."
                          value={formData.firstMeeting || ""}
                          onChange={(e) => handleFormChange("firstMeeting", e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24"
                        />
                      </div>
                    )}

                    {/* Nicknames */}
                    {currentTier.formFields.includes("nicknames") && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nicknames, Inside Jokes & Special Memories
                        </label>
                        <textarea
                          placeholder="Any special names, funny stories, or memorable moments..."
                          value={formData.nicknames || ""}
                          onChange={(e) => handleFormChange("nicknames", e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24"
                        />
                      </div>
                    )}

                    {/* Photo Upload */}
                    {currentTier.formFields.includes("pictures") && (
                      <div className="rounded-xl border-2 p-4" style={{ borderColor: currentTier.color, backgroundColor: `${currentTier.color}10` }}>
                        <div className="flex items-center gap-2 mb-3">
                          <ImageIcon className="w-5 h-5" style={{ color: currentTier.color }} />
                          <h4 className="font-semibold text-base" style={{ color: currentTier.color }}>Upload Your Photos</h4>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: currentTier.color }}>REQUIRED</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Upload 3–20 photos to be used in your custom slideshow. These will be set to your song.</p>
                        <PhotoUploader
                          photos={uploadedPhotos}
                          onAdd={handleAddPhotos}
                          onRemove={handleRemovePhoto}
                          accentColor={currentTier.color}
                        />
                      </div>
                    )}

                    {/* Additional Details */}
                    {currentTier.formFields.includes("additionalDetails") && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Additional Details & Preferences
                        </label>
                        <textarea
                          placeholder="Music style preferences, song mood, tempo, any specific requests..."
                          value={formData.additionalDetails || ""}
                          onChange={(e) => handleFormChange("additionalDetails", e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 text-white"
                    style={{ backgroundColor: currentTier.color }}
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : `Proceed to Checkout — $${currentTier.price}`}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Your order details will be sent to us before checkout so we can start crafting your song.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

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
