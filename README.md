# PocketSmart AI — Your Smart Budget & Recommendation Assistant

**PocketSmart AI** is a GenAI-powered full-stack web application designed to help individuals, families, and organizers plan their spending with mathematical budget precision and receive hyper-personalized recommendations powered by **Google Gemini 3.8 Flash**.

---

## 🌟 Key Modules

### 1. Home Interior Budget Planner
* **Input Parameters:** Total Budget, Room Type (Living Room, Bedroom, Kitchen, etc.), Aesthetic Style (Modern, Scandinavian, Minimalist, Traditional, etc.), Dynamic Item Checklist (Sofa, Lights, Table, Curtains, etc. with quantities and target costs), and custom requirements.
* **AI Engine:** Gemini generates proportional budget allocations across Furniture & Seating, Lighting & Ambiance, Decor & Accents, and Reserve Funds.
* **Guarantee:** Total estimated cost never exceeds the user's budget. Lower-cost modular alternatives are automatically suggested.

### 2. Party & Event Budget Planner
* **Input Parameters:** Total Budget, Guest Count, Event Type (Birthday, Wedding, Engagement, Corporate, etc.), Venue Type, Food Preference (Veg/Non-Veg/Mixed), Decor Style, and Entertainment services checklist.
* **AI Engine:** Calculates per-guest catering costs, venue reservations, decorative stages, and event photography.
* **Vendor Benchmarks:** Structured with service interfaces modeled after Swiggy, Zomato, and OYO event spaces.

### 3. Jewelry Recommendation Planner (Multimodal Vision AI)
* **Input Parameters:** Total Budget, Occasion, Jewelry Type (Complete set, necklace, earrings, bangles), Style, Metal Preference (Gold, Silver, Diamond, Pearl, Artificial), Outfit Description, and **Multimodal Outfit Photo Upload**.
* **AI Vision Engine:** Analyzes visible fabric colors, neckline cuts, sleeve patterns, and embroidery motifs to curate matching necklaces, earrings, and wristwear.

---

## 🛡️ Budget Enforcement & Optimization Engine

* **Strict Constraint Rule:** Total spending across all recommendations $\le$ User Specified Budget.
* **Auto-Recalculation:** If an initial suggestion exceeds the budget cap, PocketSmart detects the discrepancy, recalculates allocations down, flags the plan as *“Optimized to stay within your budget”*, and maintains high aesthetic quality.
* **Zero Silent Overruns:** Users always see Total Budget, Estimated Spending, Contingency Reserve, and Utilization percentage with visual multi-segment progress bars.

---

## 🏗️ External Platform Integration Architecture

In accordance with transparent data rules, PocketSmart distinguishes between AI-generated estimates and live inventory:
* Interfaces for `AmazonService`, `FlipkartService`, `IKEAService`, `SwiggyService`, `ZomatoService`, and `OYOService`.
* Unconnected services return estimated benchmark items clearly tagged as **“AI Recommendation (Estimated)”**.
* Ready to drop in merchant partner credentials when production APIs are provisioned.

---

## 💻 Tech Stack

* **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas/Motion animations
* **Backend:** Express, Node.js (`server.ts`)
* **AI Model:** Google Gemini 3.8 Flash via `@google/genai` TypeScript SDK
* **Offline Resilience:** Deterministic rule-based fallback generator activates automatically if the Gemini API key is unavailable or rate limited.

---

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Start development full-stack server (Port 3000)
npm run dev

# Build for production
npm run build
```

---

## 📄 License
Apache-2.0
