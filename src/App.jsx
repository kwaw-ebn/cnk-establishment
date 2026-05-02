import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────────── */
const BLACK = "#0B0B0B";
const GOLD  = "#F5B400";
const WHITE = "#FFFFFF";

/* ─────────────────────────────────────────────
   SEO HELPER – updates <title> & meta
───────────────────────────────────────────── */
function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, [title, description]);
}

/* ─────────────────────────────────────────────
   JSON-LD LOCAL BUSINESS SCHEMA
───────────────────────────────────────────── */
function JsonLD() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CNK Establishment",
    description: "Borehole drilling equipment, mining tools, and water well drilling services in Accra, Ghana.",
    url: "https://cnkestablishment.com",
    telephone: ["+233599635186", "+447944256654"],
    address: { "@type": "PostalAddress", streetAddress: "New Achimota, Mile 7", addressLocality: "Accra", addressCountry: "GH" },
    geo: { "@type": "GeoCoordinates", latitude: 5.6037, longitude: -0.187 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    sameAs: ["https://wa.me/233599635186"]
  };
  useEffect(() => {
    let el = document.getElementById("jsonld-schema");
    if (!el) { el = document.createElement("script"); el.id = "jsonld-schema"; el.type = "application/ld+json"; document.head.appendChild(el); }
    el.textContent = JSON.stringify(schema);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1, name: "Rotary Drilling Rig", tag: "Heavy Duty", icon: "🔩", desc: "High-performance rotary drilling rigs engineered for borehole and water well drilling across Ghana's varied geology. Built for depth, durability, and consistent performance in harsh field conditions.", keywords: "drilling rig Ghana, borehole rig Accra" },
  { id: 2, name: "Tricone Drill Bits", tag: "Precision Cut", icon: "⚙️", desc: "Premium tricone and PDC drill bits designed for rock formation penetration. Available in multiple diameters for borehole, mining, and geotechnical applications across West Africa.", keywords: "drill bits Ghana, tricone bits Accra" },
  { id: 3, name: "Drilling Rods", tag: "High Strength", icon: "📏", desc: "Precision-engineered drilling rods and drill pipes in API-compliant steel alloy. Withstand extreme torque and compressive loads during deep borehole drilling operations.", keywords: "drilling rods Ghana, drill pipes Africa" },
  { id: 4, name: "DTH Hammer Drill", tag: "Best Seller", icon: "🔨", desc: "Down-the-hole (DTH) hammer drills delivering high-impact percussion for hard rock drilling. Exceptional penetration rates in granite and laterite formations common in Ghana.", keywords: "DTH hammer drill Ghana, hammer drill Accra" },
  { id: 5, name: "Chasing Shoe / Casing Shoe", tag: "Well Integrity", icon: "🛡️", desc: "Hardened steel casing shoes for guiding casing strings into the borehole. Essential for maintaining well integrity during casing installation in unconsolidated formations.", keywords: "casing shoe borehole Ghana, chasing shoe" },
  { id: 6, name: "Mining Well Ring", tag: "Industrial", icon: "⭕", desc: "Heavy-duty well rings engineered for lining shallow wells and mining excavations. Cast from high-grade concrete and steel composite for maximum durability and water tightness.", keywords: "mining well ring Ghana, well lining Accra" },
  { id: 7, name: "Hammer Barrel", tag: "DTH Component", icon: "🔧", desc: "Replacement hammer barrels for DTH drilling systems. Manufactured to OEM standards ensuring seamless fit, extended service life, and maximum energy transfer per stroke.", keywords: "hammer barrel DTH, drilling parts Ghana" },
  { id: 8, name: "Piston Assembly", tag: "Precision Part", icon: "⚡", desc: "High-precision piston assemblies for DTH hammers. Engineered for optimal air flow dynamics, ensuring maximum impact frequency and energy efficiency in every drilling cycle.", keywords: "piston DTH hammer, drilling piston Ghana" },
  { id: 9, name: "Drilling Accessories", tag: "Full Range", icon: "🗜️", desc: "Complete range of drilling accessories: stabilizers, crossovers, bit subs, swivel joints, mud pumps, and safety equipment. Everything you need for a full drilling operation.", keywords: "drilling accessories Ghana, borehole equipment Accra" },
];

const SERVICES = [
  { icon: "🌊", title: "Borehole Drilling", desc: "End-to-end borehole drilling for domestic, commercial, and industrial water supply. We handle site assessment, drilling, casing, development, and pump installation." },
  { icon: "📦", title: "Equipment Supply", desc: "Direct supply of new and used drilling equipment, tools, and consumables. We source from leading manufacturers and deliver across Ghana and West Africa." },
  { icon: "🔧", title: "Maintenance & Repair", desc: "On-site and workshop maintenance for all makes of drilling rigs and equipment. Fast turnaround times to minimize costly downtime on your project." },
  { icon: "📋", title: "Technical Consultation", desc: "Expert advice on borehole siting, drilling methodology, equipment selection, and water resource management. Free initial consultation for new clients." },
  { icon: "🏗️", title: "Mining Support", desc: "Specialized drilling support for mining exploration and development projects. We supply diamond core bits, core barrels, and rods for mineral exploration." },
  { icon: "🎓", title: "Operator Training", desc: "Hands-on training programs for drilling rig operators and maintenance technicians. BOSIET-aligned safety training included." },
];

const TESTIMONIALS = [
  { name: "Kwame Asante", role: "Estate Developer, Kumasi", stars: 5, text: "CNK Establishment delivered our borehole equipment ahead of schedule and within budget. The DTH hammer drill they supplied hit our target depth of 85m without a single breakdown. Exceptional quality." },
  { name: "Abena Mensah", role: "NGO Water Project Manager", stars: 5, text: "We've supplied 12 communities in the Upper West Region using equipment from CNK. Their technical support team is always available and the after-sales service is second to none in Ghana." },
  { name: "Ibrahim Yakubu", role: "Mining Exploration Director", stars: 5, text: "The diamond core bits from CNK last significantly longer than what we sourced before. Our cost per meter drilled has dropped by 30%. Highly recommend for serious mining operations." },
  { name: "Dr. Emmanuel Frimpong", role: "Hydrogeologist, Accra", stars: 5, text: "As a hydrogeologist I'm particular about equipment specs. CNK consistently delivers API-compliant drilling rods and accessories that meet our project requirements. A trusted partner." },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "How Much Does Borehole Drilling Cost in Ghana? (2024 Complete Guide)",
    excerpt: "Understanding the true cost of borehole drilling in Ghana is critical before committing to a water project. Prices vary widely based on depth, geology, and equipment.",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Cost & Planning",
    content: `Borehole drilling in Ghana represents one of the most significant investments a home owner, community, or business can make for reliable water access. With municipal water supply remaining inconsistent in many areas — including parts of Accra, Kumasi, and the regional capitals — private boreholes have become a critical infrastructure asset.

**What Determines Borehole Drilling Cost in Ghana?**

The cost of drilling a borehole in Ghana is not fixed. It is driven by several interrelated factors:

**1. Depth of Drilling**
This is the single largest cost driver. Drilling in southern Ghana (Accra, Cape Coast) often reaches water at 40–70 metres. In the Volta Region and the north, you may need to drill 80–120 metres or more. Current market rates for rotary drilling typically range from GH₵ 180 to GH₵ 350 per metre, depending on the contractor and region.

**2. Geological Conditions**
Soft sedimentary rock drills faster and cheaper than hard granitic basement rock. In Accra's New Achimota and Achimota areas, crystalline basement rock is common, which demands premium DTH hammer equipment and harder drill bits — adding cost but ensuring long-term success.

**3. Casing and Lining Materials**
PVC casing is standard for domestic boreholes. Steel casing is used in high-yield commercial and mining applications. Casing typically accounts for 20–30% of total project cost.

**4. Pump and Motor**
A submersible pump, rising main, and control panel add GH₵ 3,000 to GH₵ 15,000+ depending on yield requirements and pump brand (Grundfos, Pedrollo, etc.).

**5. Water Quality Testing**
A complete physico-chemical and bacteriological water analysis is essential. Budget GH₵ 500 – GH₵ 1,500 for certified laboratory testing.

**Typical Total Project Costs (2024 Estimates)**

| Project Type | Depth | Estimated Total Cost |
|---|---|---|
| Domestic Borehole | 40–60m | GH₵ 18,000 – GH₵ 35,000 |
| Commercial Borehole | 60–100m | GH₵ 35,000 – GH₵ 75,000 |
| Industrial / Mining | 100m+ | GH₵ 80,000 – GH₵ 200,000+ |

**Hidden Costs to Budget For**
- Geophysical survey (VES/ERT): GH₵ 2,000 – GH₵ 5,000
- Environmental permit (EPA Ghana): GH₵ 500 – GH₵ 1,500
- Site access and civil works: Variable
- Generator / power supply: GH₵ 1,000 – GH₵ 3,000

**How to Reduce Your Borehole Drilling Costs**
The most effective way to reduce cost is to invest in a proper geophysical survey before drilling. This dramatically increases the probability of hitting water at the optimal depth and prevents expensive dry holes. At CNK Establishment, we always recommend a VES (Vertical Electrical Sounding) survey for any borehole project.

Additionally, buying your drilling equipment directly from a reputable supplier like CNK eliminates middleman costs if you are a drilling contractor. Our equipment pricing is transparent and our team provides full technical support.

**The Bottom Line**
Budget realistically. A well-drilled borehole is a 20–30 year infrastructure asset. Cutting corners on equipment or choosing the cheapest contractor is a false economy. Contact CNK Establishment for a detailed, no-obligation quote specific to your project location and requirements.`
  },
  {
    id: 2,
    title: "Best Drilling Equipment for Water Well Construction in West Africa",
    excerpt: "Choosing the right drilling equipment for water well construction in West Africa's challenging geology requires understanding formation types, depth requirements, and budget.",
    date: "February 28, 2024",
    readTime: "10 min read",
    category: "Equipment Guide",
    content: `West Africa presents some of the most geologically varied drilling conditions on the African continent. From the sedimentary basins of coastal Ghana and Nigeria to the Precambrian basement complex that underlies much of the interior, drilling contractors must select equipment carefully to achieve consistent results.

**Understanding West African Geology**

Before selecting drilling equipment, understanding the subsurface geology of your project area is essential:

- **Coastal Sedimentary Zone**: Relatively soft formations (alluvium, sandstone, clay). Rotary mud drilling rigs with tri-cone bits perform well here at lower cost.
- **Basement Complex Zone**: Hard crystalline rocks (granite, quartzite, gneiss). Requires DTH (Down-The-Hole) hammer drilling with robust bits and high-pressure compressors.
- **Transitional Zone**: Mixed formations. A versatile combined rotary/DTH rig offers the best flexibility.

**Top Equipment Categories for West Africa Water Wells**

**1. DTH Hammer Rigs (Most Recommended for Ghana)**
For Ghana's basement complex geology, the DTH hammer drilling method is king. A high-pressure DTH hammer delivers direct percussion to the drill bit at the bottom of the hole — eliminating energy loss through the drill string that plagues surface percussion methods.

Key specifications to look for:
- Compressor output: Minimum 250 CFM / 250 PSI for depths to 100m
- Hammer diameter: 4.5" – 8" depending on casing requirements
- Bit type: Spherical button bits for granite formations

At CNK Establishment, we supply the complete DTH system: hammers, bits, rods, and compatible high-pressure compressors.

**2. Rotary Mud Rigs**
Effective in softer formations. The mud circulation cools the bit, removes cuttings, and stabilizes the borehole wall simultaneously. Requires:
- Mud pump with adequate pressure and flow rate
- Settling pit or mud tank for re-circulation
- Appropriate drilling fluid additives (bentonite)

**3. Cable Tool (Percussion) Rigs**
Largely superseded but still used for very shallow wells (<30m) in rural areas. Low capital cost but very slow penetration rates.

**Critical Accessories That Are Often Overlooked**

- **Stabilizers**: Prevent deviation in hard rock — essential for keeping the borehole plumb.
- **Crossover subs**: Allow connection of different thread types when mixing rod strings.
- **Air/water swivel**: Routes drilling fluid to the rotating string without leaking.
- **Down-the-hole camera**: Pre and post-drilling inspection to assess formation and ensure casing integrity.

**Equipment Lifespan and Maintenance**

Quality drilling equipment, properly maintained, should give 5–10 years of hard service. Key maintenance priorities:
1. DTH hammer: Lubrication after every shift; bit inspection every 50 hours
2. Air compressor: Oil change every 500 hours; filter service every 250 hours
3. Drill rods: Visual inspection for cracks and thread wear after every job
4. Drill bit: Replace when button wear exceeds 1/3 of original height

**CNK's Recommendation**

For new drilling contractors entering the Ghanaian market, we recommend starting with a mid-weight DTH rig (100–200kN pullback) with a 250 CFM compressor. This combination handles 85% of water well drilling jobs in Ghana's basement complex. As your business grows, add a larger rig for deeper commercial projects.

Contact our technical team to discuss your specific project requirements — we'll help you select the right equipment without overselling you on capacity you don't need.`
  },
  {
    id: 3,
    title: "How Borehole Drilling Works: A Step-by-Step Technical Guide",
    excerpt: "From site selection to pump installation, this comprehensive guide walks you through every stage of a professional borehole drilling project in Ghana.",
    date: "February 10, 2024",
    readTime: "12 min read",
    category: "Technical Guide",
    content: `Understanding how borehole drilling works helps you make informed decisions whether you're commissioning a borehole for your home, community, or business. Here is a complete, professional breakdown of the entire process — from initial site assessment to pump installation and water testing.

**Stage 1: Hydrogeological Survey**

Every professional borehole project begins with a hydrogeological survey. This involves:

- **Desk study**: Review of existing geological maps, satellite imagery, and records of nearby boreholes. Ghana's Water Research Institute (CSIR-WRI) maintains regional hydrogeological data.
- **Geophysical survey**: Vertical Electrical Sounding (VES) or Electrical Resistivity Tomography (ERT) surveys use electrical current to map subsurface rock and groundwater structures non-invasively.
- **Site selection**: Based on survey results, 2–3 potential drill sites are identified, ranked by probability of success.

Skipping this stage is the #1 reason for expensive dry holes. CNK Establishment always recommends a proper survey before drilling begins.

**Stage 2: Site Preparation and Rig Mobilization**

- Site clearing: A minimum 10m x 10m area is required for rig setup, rod rack, and support equipment.
- Access road assessment: The rig truck (typically 15–25 tonnes) requires stable ground access.
- Water supply: Fresh water is needed for DTH drilling (air-flush method requires less) and for the drill crew.
- Pit excavation: A small sump pit (1m x 1m x 1m) captures drill cuttings and return fluid.

**Stage 3: Drilling Operations**

For DTH hammer drilling (most common in Ghana):

1. **Collar installation**: A large-diameter (typically 20") conductor casing is driven 3–5m to prevent surface collapse and guide the drill string.
2. **Drill string assembly**: Drill rods are connected in sequence as the bit advances. Standard rod length is 3m or 6m.
3. **Compressed air supply**: A high-pressure compressor (250–600 PSI) drives the DTH hammer. Air travels down the drill string, powers the hammer, and returns up the annulus carrying rock cuttings.
4. **Penetration monitoring**: The driller monitors rate of penetration (ROP), drill cuttings, air pressure, and water strikes. This data guides casing decisions.
5. **Formation logging**: Cuttings are collected at regular intervals (typically every 3m) and logged to build a geological profile of the borehole.

**Stage 4: Casing Installation**

Once target depth is reached:
- **PVC casing**: Installed in the upper unconsolidated zone to prevent collapse and contamination. Solid casing in clay/soil layers; slotted/screened casing opposite aquifer zones.
- **Annular grouting**: The space between the PVC casing and borehole wall is grouted with cement in the upper section to prevent surface water ingress.
- **Development**: The borehole is developed by surging and pumping at high flow rates to remove fine particles and increase yield.

**Stage 5: Pump Testing**

- **Step test**: Pumping at increasing rates to determine the maximum sustainable yield.
- **Constant rate test**: Extended pumping (6–24 hours) at a constant rate to measure aquifer characteristics (transmissivity, storativity).
- **Recovery test**: After pumping stops, water level recovery is monitored. This data is used to design the permanent pump system.

**Stage 6: Pump Installation**

- Submersible pump is selected based on yield test results and required flow rate.
- Rising main (HDPE or galvanized steel pipe) is installed with the pump.
- Control panel, pressure tank, and electrical connections complete the system.
- A concrete pump apron and lockable cap protect the wellhead.

**Stage 7: Water Quality Testing**

Before the borehole is approved for use:
- Water samples are taken and submitted to a certified laboratory.
- Tests cover physical parameters (colour, turbidity, pH), chemical parameters (iron, manganese, nitrates, fluoride), and bacteriological parameters (E. coli, total coliforms).
- Results are compared to Ghana EPA and WHO drinking water standards.

**Understanding Your Borehole Completion Report**

A professional driller provides a borehole completion report containing: geological log, casing diagram, pump test data, water quality results, and GPS coordinates. This document is essential for EPA registration and future maintenance.

CNK Establishment provides technical support at every stage of your borehole project. Contact us to discuss your specific requirements.`
  },
  {
    id: 4,
    title: "Drilling Equipment Maintenance: 10 Essential Tips to Maximize Your Investment",
    excerpt: "Proper maintenance of drilling equipment extends lifespan, prevents costly breakdowns, and ensures safety on site. Follow these 10 expert maintenance tips.",
    date: "January 20, 2024",
    readTime: "7 min read",
    category: "Maintenance",
    content: `Drilling equipment represents a significant capital investment. Whether you operate a single rig or a fleet, a disciplined maintenance program is the most effective way to protect that investment, maximize uptime, and ensure operator safety. Based on years of experience supplying and supporting drilling equipment in Ghana, here are our 10 essential maintenance tips.

**Tip 1: Implement a Rigorous Pre-Shift Inspection**

Before every shift, operators must complete a pre-shift inspection checklist covering: hydraulic fluid levels, engine oil, coolant, fuel, tire pressure (for mobile rigs), all safety guards, emergency stop function, and hook load indicator calibration. This 15-minute investment prevents 80% of field breakdowns.

**Tip 2: DTH Hammer Lubrication is Non-Negotiable**

The DTH hammer is the highest-wear component in your drill string. It must be lubricated with purpose-formulated rock drill oil after every shift without exception. Insufficient lubrication is the leading cause of premature hammer failure. Use the manufacturer's specified oil grade — do not substitute with general-purpose engine oil.

**Tip 3: Inspect and Dress Drill Bit Buttons Regularly**

Worn or flat-topped carbide buttons dramatically reduce penetration rate and increase fuel consumption. Inspect bits after every 50 operating hours. Buttons can be re-dressed (ground back to gauge) 2–3 times before the bit requires replacement. Carry a button gauge on-site.

**Tip 4: Torque All Drill Rod Connections to Specification**

Under-torqued connections back off (unscrew) during drilling and can be lost downhole — one of the most costly and time-consuming problems in drilling. Over-torqued connections damage threads. Always use a calibrated torque wrench and apply proper thread compound (never dry or with incorrect lubricant).

**Tip 5: Service the Air Compressor on Schedule**

The compressor is the heart of your DTH drilling system. Neglecting compressor maintenance causes pressure drop, reduced hammer performance, and ultimately, compressor failure.
- Change compressor oil every 500 hours
- Replace air/oil separator every 1,000 hours or annually
- Clean air intake filter every 250 hours (or more frequently in dusty conditions)
- Check belt tension and V-belt condition monthly

**Tip 6: Keep Hydraulic Systems Clean**

Contaminated hydraulic fluid causes premature cylinder and valve failure. Never open hydraulic lines without proper cleanliness precautions. Change hydraulic fluid and filter as per manufacturer's schedule. If fluid appears milky (water contamination) or dark (overheating), change immediately and investigate the cause.

**Tip 7: Inspect Wire Rope and Cables Daily**

Main hoist wire rope must be inspected for broken wires, kinking, corrosion, and core damage before every shift. A single broken wire strand in the critical zone (near end terminations) requires immediate replacement. Lubricate with wire rope lubricant monthly.

**Tip 8: Protect Drill Rods During Storage and Transport**

Drill rods are precision components. Store on proper rod racks — never pile rods on the ground. Cap all thread connections to prevent damage and contamination. During transport, secure rods to prevent rolling and impact. Thread damage discovered after poor storage is not covered by warranty.

**Tip 9: Train Your Operators Continuously**

The most expensive maintenance is the maintenance caused by improper operation. Invest in ongoing operator training. Experienced operators listen to their equipment — they notice the early warning sounds of a failing bearing or irregular hammer stroke long before a breakdown occurs. CNK Establishment offers operator training programs in Accra.

**Tip 10: Keep Detailed Maintenance Records**

Maintain a maintenance logbook for every major piece of equipment. Record all services, inspections, component replacements, and downtime events with dates and hours. This data:
- Identifies recurring problems and their root causes
- Supports warranty claims
- Increases equipment resale value
- Guides predictive maintenance scheduling

**CNK's Maintenance Support**

CNK Establishment's technical team provides maintenance advice, spare parts supply, and on-site service support throughout Ghana. Contact us at 0599635186 for a preventive maintenance consultation for your drill fleet.`
  },
  {
    id: 5,
    title: "How to Choose the Right Drill Bit for Your Formation",
    excerpt: "Selecting the correct drill bit for your geological formation is critical for performance, penetration rate, and cost per metre drilled. This guide covers everything you need to know.",
    date: "January 5, 2024",
    readTime: "9 min read",
    category: "Technical Guide",
    content: `The drill bit is the only component that makes direct contact with the formation — it is the cutting edge of your entire drilling operation. Selecting the wrong bit for your formation results in slow penetration rates, rapid wear, increased fuel consumption, and higher cost per metre drilled. Here is the definitive guide to drill bit selection for West African drilling conditions.

**The Two Primary Bit Types for Borehole Drilling**

**1. DTH (Down-The-Hole) Hammer Bits**

Used with compressed air-driven DTH hammers. The bit is struck directly by the hammer piston, delivering high-impact percussion at the bottom of the hole. Available in button bit configurations:

- **Spherical (domed) buttons**: Best for medium-hard to very hard rock (granite, quartzite, gneiss). Provides high impact resistance and durability. The standard choice for Ghana's basement complex.
- **Ballistic (ogival) buttons**: Better cutting geometry for medium-soft formations. Faster initial penetration but wears faster in very hard rock.
- **Flat-fronted bits**: Rarely used in borehole drilling. Suited to very soft formations.

**2. Tri-Cone (Roller Cone) Bits**

Used with rotary drilling rigs and mud circulation. Three rotating cones, each studded with steel teeth or tungsten carbide inserts (TCI), crush and chip the formation.

- **Milled tooth (steel tooth) bits**: For soft to medium-soft formations (clay, sand, soft limestone). Very fast in soft ground. Wears rapidly in hard rock.
- **Tungsten carbide insert (TCI) bits**: For medium to hard formations. Higher initial cost but significantly better durability in harder rock.
- **Journal bearing bits**: Standard sealed bearing design. Most common.
- **Air bearing bits**: For air/mist drilling where bearing lubrication from drilling fluid is not possible.

**IADC Classification System**

The International Association of Drilling Contractors (IADC) classifies drill bits on a 4-character code. The first character (1–8) indicates formation hardness (1 = very soft, 8 = very hard). For Ghana's basement complex, you'll typically work with IADC 5–8 range bits.

**Matching Bit to Formation: Ghana Reference Guide**

| Formation | Location | Recommended Bit |
|---|---|---|
| Laterite / Clay | All regions (surface) | DTH spherical bit or TCI milled tooth |
| Phyllite / Schist | Birim Valley | DTH spherical bit (medium) |
| Granite | Accra, Kumasi, Eastern Region | DTH spherical button (hard grade) |
| Quartzite | Volta Region | DTH spherical button (very hard grade) |
| Sandstone | Coastal basin | TCI sealed bearing or DTH ballistic |
| Fractured basement | Northern Ghana | DTH heavy-duty gauge protection bit |

**Critical Bit Sizing Considerations**

Your bit diameter must be selected to produce a borehole that accommodates your casing with adequate annular clearance for grouting. A common configuration:
- 8" DTH bit → 6" PVC casing (2" annular clearance for grouting)
- 6" DTH bit → 4" PVC casing (standard domestic borehole)
- 10" DTH bit → 8" steel casing (high-yield commercial)

Always design your casing program before selecting your bit diameter.

**Gauge Wear and Bit Life**

Monitor gauge wear closely. A bit that is significantly under-gauge produces a borehole too small to accept the casing. Check gauge diameter every 50 operating hours with a ring gauge. Bits can be repaired (gauge buttons replaced) by specialist workshops.

**True Cost Per Metre Analysis**

The cheapest bit is rarely the lowest-cost bit. Calculate cost per metre:

Cost/metre = (Bit price) ÷ (Total metres drilled before replacement)

A premium bit costing GH₵ 3,500 that lasts 200 metres = GH₵ 17.50/metre
A budget bit costing GH₵ 1,500 that lasts 40 metres = GH₵ 37.50/metre

The premium bit is 53% cheaper on a cost-per-metre basis.

**CNK Establishment's Bit Range**

We stock the full range of DTH hammer bits (4" to 12") and tri-cone bits for standard formations encountered across Ghana. Our technical team will help you select the optimal bit specification for your specific project. Contact us for current pricing and availability.`
  },
  {
    id: 6,
    title: "Water Well Drilling in Northern Ghana: Challenges and Best Practices",
    excerpt: "Drilling for water in Ghana's Northern, Savannah, and Upper regions presents unique geological and logistical challenges. Here is how experienced drillers approach these projects.",
    date: "December 12, 2023",
    readTime: "11 min read",
    category: "Regional Guide",
    content: `Ghana's northern regions — Northern, North East, Savannah, Upper East, and Upper West — face some of the most severe water access challenges in the country. Seasonal rainfall, deep groundwater tables, and complex geology make water well drilling both critically important and technically demanding in these areas.

**The Water Crisis Context**

According to the UNICEF/WHO Joint Monitoring Programme, rural water access in Ghana's northern regions significantly lags behind the south. Rural communities frequently walk 3–5 kilometres to collect water from unsafe surface sources during the dry season (November–April). Every successful borehole drilled in the north represents a transformative impact for a community.

**Geological Challenges of Northern Ghana**

**1. Deep Water Tables**
Unlike coastal Ghana where groundwater is often found at 40–60m, northern Ghana frequently requires drilling to 80–120m or deeper. In some granite-dominated areas of the Upper East Region, successful water strikes have been recorded at 150–180m. This demands robust, high-pressure drilling equipment.

**2. Low-Yield Aquifers**
The basement aquifers of the north are often fractured and discontinuous. Yields of 0.5–2.0 litres/second are common — adequate for community hand pumps but insufficient for mechanized schemes without aquifer enhancement.

**3. High Fluoride Zones**
Parts of the Upper East and Upper West Regions have elevated natural fluoride levels in groundwater (>1.5 mg/L WHO limit). Water quality testing and defluoridation treatment is essential before human consumption.

**4. Laterite Profile Complexity**
A thick laterite weathering profile (10–30m) overlies the basement complex. This zone is highly variable, prone to collapse, and requires proper casing to prevent contamination.

**5. Seasonal Access Constraints**
The wet season (May–October) brings heavy rainfall that renders many rural tracks impassable for heavy drilling rigs. Project scheduling must account for access windows.

**Best Practices for Northern Ghana Drilling**

**Pre-Drilling Geophysics is Mandatory**
Given the discontinuous nature of basement aquifers, geophysical surveys are even more critical in the north than elsewhere. A proper VES survey increases success probability from roughly 40% (random siting) to over 80% (geophysically-sited).

**Equipment Selection**
- Use a minimum 350 CFM / 350 PSI compressor for depths exceeding 80m. At depth, pressure loss through the drill string is significant — undersized compressors lose hammer performance dramatically.
- Larger diameter drill bits (6" minimum) allow for proper casing and development in the complex laterite zones.
- Carry spare wear parts: in northern Ghana, the nearest drilling supplier is often CNK in Accra. Logistics delays can cost weeks.

**Borehole Development**
This step is often rushed or skipped by inexperienced contractors. Proper development — extended airlifting and surging — is especially important in northern Ghana's fractured basement aquifers, where fine particles can significantly reduce yield if not removed.

**Community Engagement**
Unlike urban projects, rural community boreholes require engagement with community leadership (chief and elders), women's groups, and the District Assembly WASH team. Community-managed maintenance committees must be established before the project is commissioned.

**The Role of Organizations in Northern Ghana**

Major NGOs (World Vision, IRC, Rural Water Ghana) and the Ghana Water and Sanitation Agency (GWSA) implement large-scale WASH programs in the north. CNK Establishment has supplied drilling equipment to several NGO drilling programs and understands the procurement requirements, reporting standards, and technical specifications these organizations require.

**Cost Implications**

Drilling in the north costs more than in the south:
- Greater depths = more drill rods, more compressed air, more time
- Mobilization costs from Accra are significant
- Logistics and accommodation for crews in remote areas add overhead

Realistic budgeting for a northern Ghana community borehole: GH₵ 45,000 – GH₵ 95,000 depending on depth and specifications.

**Contact CNK for Northern Region Projects**

CNK Establishment supplies drilling equipment throughout Ghana, including delivery to northern regional capitals. We work with NGOs, government agencies, and private drilling contractors on northern region projects. Our team understands the unique challenges and can help you specify the right equipment. Call us at 0599635186 or WhatsApp for project enquiries.`
  },
  {
    id: 7,
    title: "Borehole vs. Municipal Water Supply: Which is Right for Your Property?",
    excerpt: "For Ghanaian homeowners and businesses, choosing between a private borehole and municipal water connection is a significant decision. Here is a detailed cost-benefit analysis.",
    date: "November 25, 2023",
    readTime: "8 min read",
    category: "Decision Guide",
    content: `For property owners in Ghana — whether in Accra, Kumasi, Takoradi, or smaller cities — the choice between relying on Ghana Water Company Limited (GWCL) supply and investing in a private borehole is one of the most consequential infrastructure decisions you will make. Let us examine both options objectively.

**The Current Reality of Municipal Water Supply in Ghana**

GWCL serves approximately 5 million Ghanaians across urban and peri-urban areas. However, the reality for many subscribers is:
- Intermittent supply: Many areas receive water only 2–4 days per week
- Pressure issues: Upper floors of buildings often receive inadequate pressure
- Quality concerns: Aging pipe infrastructure in some areas
- Rising tariffs: Ghana's water tariffs have increased significantly since 2020
- Coverage gaps: Many new residential estates are simply not yet connected

This reality has driven a significant increase in private borehole development across Ghana's urban and peri-urban zones over the past decade.

**Option 1: Municipal Water Supply**

Advantages:
- Treated water meeting Ghana EPA standards (when supply is consistent)
- No capital investment (connection fee only: typically GH₵ 500 – GH₵ 2,000)
- No maintenance responsibility for the consumer
- No electricity running costs for pumping

Disadvantages:
- Intermittent and unreliable supply in most areas
- Storage tank investment still required (500L – 5,000L)
- Monthly water bills that increase with consumption
- No control over quality variations
- Complete dependence on GWCL infrastructure

**Option 2: Private Borehole**

Advantages:
- 24/7 independent water supply from your own source
- Capital investment (not ongoing expense) after initial drilling cost
- 20–30 year asset life with proper maintenance
- Water quality from a well-developed aquifer is typically excellent
- No monthly water bills (only electricity for the pump: typically GH₵ 80 – GH₵ 200/month)
- Significant asset value addition to your property

Disadvantages:
- High upfront capital cost (GH₵ 18,000 – GH₵ 80,000 depending on depth and specification)
- Ongoing maintenance responsibility (pump servicing, annual water quality testing)
- Small risk of borehole failure (dry hole or declining yield) — mitigated by professional siting
- Requires EPA registration and compliance

**10-Year Cost Comparison: Typical Accra Household**

Municipal Water (3-bedroom household, 5 persons):
- Storage tank (one-time): GH₵ 2,500
- Monthly GWCL bills: GH₵ 150/month
- Sachet/bottled water (due to supply gaps): GH₵ 80/month
- Emergency water tanker deliveries: GH₵ 50/month average
- Total 10-year cost: ~GH₵ 35,500

Private Borehole:
- Drilling and pump installation: GH₵ 45,000 (60m depth, Accra)
- Annual pump service: GH₵ 800/year
- Annual water quality test: GH₵ 1,000/year
- Electricity for pumping: GH₵ 150/month
- Total 10-year cost: ~GH₵ 79,600

**Important caveat**: The borehole becomes an asset (adds property value), the municipal bills are a pure expense. Beyond year 10, the borehole's ongoing cost (GH₵ 3,800/year) is dramatically lower than continued GWCL bills. The payback period for most Accra properties is 12–15 years.

**When a Borehole is Clearly the Right Choice**
- New residential estate not yet connected to GWCL
- Commercial/industrial property with high water demand
- Agricultural operation requiring reliable irrigation water
- Areas with notoriously poor GWCL supply
- Property with plans to expand (borehole scales easily)

**When to Stick with Municipal Supply**
- Short-term rental property (can't recover capital)
- Areas with genuinely reliable GWCL supply
- If capital is limited and can't be tied up in infrastructure

**The Hybrid Approach (Most Popular)**

Many Accra homeowners use both: GWCL connection for primary supply supplemented by a borehole for backup and garden/car washing use. The borehole reduces GWCL bills by 50–70% while ensuring supply continuity.

Contact CNK Establishment for a free assessment of whether a borehole is right for your specific property. We will tell you honestly if it makes financial sense for your situation.`
  },
  {
    id: 8,
    title: "Environmental Compliance for Borehole Drilling in Ghana: EPA Requirements",
    excerpt: "Drilling a borehole in Ghana requires compliance with Environmental Protection Agency regulations. This guide explains what you need to know before starting any drilling project.",
    date: "November 8, 2023",
    readTime: "9 min read",
    category: "Compliance & Legal",
    content: `Borehole drilling in Ghana is regulated by the Environmental Protection Agency (EPA Ghana) under the Environmental Assessment Regulations (LI 1652) and the Water Resources Commission Act (Act 522). Understanding your legal obligations before drilling is essential to avoid project delays, fines, and legal liability.

**Who Regulates Borehole Drilling in Ghana?**

Three agencies have overlapping jurisdiction over borehole drilling:

1. **Environmental Protection Agency (EPA Ghana)**: Environmental permits, environmental impact assessment (EIA) requirements, and ongoing compliance monitoring.
2. **Water Resources Commission (WRC)**: Groundwater abstraction licences. Any borehole abstracting water for commercial purposes requires a WRC licence.
3. **Ghana Water and Sanitation Agency (GWSA)**: Technical standards for rural water supply projects.

**Environmental Permit Requirements**

**Category A (Exempt)**: Single domestic boreholes on private residential land, abstracting for domestic use only (typically <5m³/day). No EPA permit required, but proper construction standards must still be followed.

**Category B (Screening Required)**: Small commercial and community boreholes (5–50m³/day). An EPA environmental screening form must be completed. If screening identifies significant impacts, a Preliminary Environmental Assessment (PEA) is required.

**Category C (Full EIA Required)**: Large-scale groundwater abstraction for industrial purposes (>50m³/day), mining operations with drilling components, and borehole fields for commercial water schemes. A full Environmental Impact Assessment is mandatory before drilling commences.

**Water Resources Commission Licence**

Any borehole used for commercial purposes (hotels, factories, farms, water vending) requires a WRC water abstraction licence. Application requirements:
- Completed WRC application form
- Borehole siting survey report
- Proposed abstraction rates and usage purpose
- Land ownership or lease documents
- Application fee (varies by abstraction volume)

Processing time: 4–12 weeks. Start this process early — it runs concurrently with your EPA screening.

**Construction Standards Required by EPA**

EPA Ghana's environmental guidelines for borehole construction specify:

**Siting standards**:
- Minimum 15m from any septic tank, soakpit, or latrine
- Minimum 30m from any open drain, river, or surface water body
- Minimum 50m from solid waste disposal sites
- Avoid areas prone to flooding

**Construction standards**:
- Concrete pump apron (minimum 1m radius) sloping away from wellhead
- Annular seal (cement grout) from surface to minimum 6m depth
- Lockable wellhead cover
- Borehole plate (GPS coordinates, depth, driller name, date)

**Post-drilling requirements**:
- Water quality test from EPA-accredited laboratory
- Borehole completion report submitted to relevant agency
- Annual water quality testing for commercial users

**Penalties for Non-Compliance**

Drilling without required permits or failing to meet construction standards exposes you to:
- Closure of the borehole by EPA enforcement officers
- Fines under LI 1652 (up to GH₵ 25,000 for serious violations)
- Criminal prosecution in extreme cases (contamination causing public health impact)
- Denial of future permit applications

**Groundwater Protection Zones**

Ghana's WRC has designated Groundwater Protection Zones (GPZs) around major aquifer recharge areas. Drilling within a GPZ requires additional approvals and more stringent construction standards. Your consultant or CNK's technical team can advise whether your project site falls within a GPZ.

**The Borehole Completion Report**

This document, prepared by the drilling contractor upon project completion, must contain:
- Borehole location (GPS), depth, and casing diagram
- Geological log (formation description by depth)
- Pump test data and sustainable yield
- Static and pumping water levels
- Water quality test results
- Driller certification

**How CNK Can Help**

CNK Establishment's technical team is familiar with Ghana EPA and WRC requirements. We help our clients:
- Understand which category of approval their project requires
- Connect with qualified environmental consultants for PEA/EIA preparation
- Ensure drilling operations meet all technical standards
- Prepare borehole completion reports to the required standard

Regulatory compliance is not an obstacle — it is a professional standard that protects your investment and the groundwater resource. Contact us at 0599635186 for guidance on your specific project.`
  },
];

/* ─────────────────────────────────────────────
   FLOATING BUTTONS
───────────────────────────────────────────── */
function FloatingButtons({ scrollY }) {
  const waLink = "https://wa.me/233599635186?text=Hello%20CNK%20Establishment%2C%20I%27d%20like%20a%20quote";
  return (
    <>
      {/* WhatsApp */}
      <a href={waLink} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110"
        style={{ background: "#25D366" }} aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.004c-1.774 0-3.513-.476-5.031-1.378l-.361-.214-3.741.975.998-3.648-.235-.374C2.67 15.38 2.13 13.663 2.13 11.895c.003-5.42 4.435-9.83 9.92-9.83 2.65 0 5.138 1.03 7.01 2.9 1.868 1.866 2.9 4.35 2.898 6.99-.004 5.42-4.436 9.83-9.913 9.83zm5.44-7.36c-.298-.149-1.765-.866-2.038-.965-.273-.099-.472-.149-.671.149-.198.298-.769.965-.942 1.163-.173.198-.347.223-.645.074-.298-.149-1.257-.461-2.393-1.47-.885-.786-1.48-1.756-1.654-2.053-.173-.298-.018-.459.13-.607.133-.133.298-.347.447-.521.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.671-1.612-.919-2.207-.242-.579-.487-.5-.671-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.793.372-.272.298-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>
      {/* Scroll to top */}
      {scrollY > 400 && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-xl transition-all hover:scale-110"
          style={{ background: GOLD, color: BLACK }} aria-label="Back to top">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
          </svg>
        </button>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ page, setPage, scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = ["Home","About","Products","Services","Blog","Contact"];
  const isSticky = scrollY > 60;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isSticky ? "shadow-2xl" : ""}`}
        style={{ background: isSticky ? BLACK : "transparent", borderBottom: isSticky ? `2px solid ${GOLD}` : "none" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => { setPage("Home"); setMenuOpen(false); }} className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm font-black text-sm" style={{ background: GOLD, color: BLACK }}>CNK</div>
            <div className="text-left hidden sm:block">
              <div className="font-black text-white text-sm tracking-widest">CNK ESTABLISHMENT</div>
              <div className="text-xs tracking-wider" style={{ color: GOLD }}>DRILLING EQUIPMENT • ACCRA</div>
            </div>
          </button>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(n => (
              <button key={n} onClick={() => setPage(n)}
                className="px-4 py-2 text-sm font-bold tracking-widest transition-all rounded-sm"
                style={{ color: page === n ? GOLD : WHITE, background: page === n ? "rgba(245,180,0,0.12)" : "transparent", letterSpacing: "0.08em" }}>
                {n.toUpperCase()}
              </button>
            ))}
            <button onClick={() => setPage("Landing")}
              className="ml-4 px-5 py-2 text-sm font-black tracking-widest rounded-sm transition-all hover:scale-105"
              style={{ background: GOLD, color: BLACK }}>
              GET QUOTE ▸
            </button>
          </nav>
          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} className="block h-0.5 w-6 transition-all" style={{ background: GOLD,
                transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"scaleX(0)") : "none" }}/>
            ))}
          </button>
        </div>
      </header>
      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-30 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.9)" }} onClick={() => setMenuOpen(false)}>
        <div className={`absolute top-16 left-0 right-0 transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
          style={{ background: BLACK, borderBottom: `2px solid ${GOLD}` }} onClick={e => e.stopPropagation()}>
          {nav.map(n => (
            <button key={n} onClick={() => { setPage(n); setMenuOpen(false); }}
              className="flex w-full px-6 py-4 text-left font-bold tracking-widest border-b"
              style={{ color: page === n ? GOLD : WHITE, borderColor: "rgba(255,255,255,0.08)" }}>
              {n.toUpperCase()}
            </button>
          ))}
          <button onClick={() => { setPage("Landing"); setMenuOpen(false); }}
            className="flex w-full px-6 py-4 font-black tracking-widest"
            style={{ color: BLACK, background: GOLD }}>
            GET A FREE QUOTE ▸
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#070707", borderTop: `3px solid ${GOLD}` }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-sm font-black" style={{ background: GOLD, color: BLACK }}>CNK</div>
              <div>
                <div className="font-black text-white text-lg tracking-widest">CNK ESTABLISHMENT</div>
                <div className="text-xs tracking-wider" style={{ color: GOLD }}>BOREHOLE DRILLING EQUIPMENT • ACCRA, GHANA</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ maxWidth: 340 }}>
              Ghana's premier supplier of borehole drilling equipment, mining tools, and water well drilling solutions. Serving contractors, NGOs, and businesses across West Africa since our founding in Accra.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/233599635186" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-black tracking-widest rounded-sm transition-all hover:scale-105"
                style={{ background: "#25D366", color: WHITE }}>WHATSAPP</a>
              <a href="tel:+233599635186"
                className="px-4 py-2 text-xs font-black tracking-widest rounded-sm border transition-all hover:scale-105"
                style={{ color: GOLD, borderColor: GOLD }}>CALL NOW</a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs tracking-widest mb-5" style={{ color: GOLD }}>QUICK LINKS</h4>
            {["Home","About","Products","Services","Blog","Contact"].map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="flex text-sm text-gray-400 hover:text-white mb-2 transition-colors">
                ▸ {p}
              </button>
            ))}
          </div>
          <div>
            <h4 className="font-black text-xs tracking-widest mb-5" style={{ color: GOLD }}>CONTACT</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div><span className="text-white font-bold block">Ghana Office</span>New Achimota, Mile 7, Accra</div>
              <div><span className="text-white font-bold block">Phone / WhatsApp</span>
                <a href="tel:+233599635186" className="hover:text-white">0599 635 186</a>
              </div>
              <div><span className="text-white font-bold block">UK Line</span>
                <a href="tel:+447944256654" className="hover:text-white">+44 7944 256654</a>
              </div>
              <div><span className="text-white font-bold block">Hours</span>Mon–Sat 8:00 AM – 6:00 PM</div>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: "rgba(245,180,0,0.2)" }}>
          <p className="text-gray-600 text-xs">© 2026 CNK Establishment. All rights reserved. Accra, Ghana.</p>
          <p className="text-gray-600 text-xs">Borehole Drilling Equipment • Mining Tools • Water Well Solutions • West Africa</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM (reusable)
───────────────────────────────────────────── */
function ContactForm({ compact = false }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); };
  if (sent) return (
    <div className="rounded-sm p-8 text-center" style={{ background: "rgba(245,180,0,0.1)", border: `1px solid ${GOLD}` }}>
      <div className="text-4xl mb-4">✅</div>
      <h3 className="text-white font-black text-xl mb-2">Message Sent!</h3>
      <p className="text-gray-400">We'll contact you within 2 hours during business hours. For urgent inquiries, call 0599 635 186.</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <input required placeholder="Your Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="px-4 py-3 rounded-sm text-sm outline-none transition-all focus:ring-2"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(245,180,0,0.3)`, color: WHITE, focusRingColor: GOLD }} />
        <input required placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
          className="px-4 py-3 rounded-sm text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(245,180,0,0.3)`, color: WHITE }} />
      </div>
      {!compact && <input placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none"
        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(245,180,0,0.3)`, color: WHITE }} />}
      <textarea required placeholder="Tell us about your project — what equipment do you need? Location? Quantity? *"
        rows={compact ? 3 : 5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none"
        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(245,180,0,0.3)`, color: WHITE }} />
      <button type="submit" className="w-full py-4 font-black tracking-widest text-sm rounded-sm transition-all hover:scale-105 hover:shadow-xl"
        style={{ background: GOLD, color: BLACK }}>
        SEND ENQUIRY — WE RESPOND IN 2 HOURS ▸
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   PAGE: HOME
───────────────────────────────────────────── */
function HomePage({ setPage }) {
  useSEO({ title: "CNK Establishment | Borehole Drilling Equipment Ghana | Accra", description: "Ghana's leading supplier of borehole drilling equipment, drilling rigs, DTH hammers, drill bits and mining tools. Based in Accra, serving all of West Africa. Call 0599635186." });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: BLACK }}>
        {/* Geometric grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(rgba(245,180,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,180,0,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: GOLD }} />
        <div className="absolute right-0 top-0 bottom-0 w-1" style={{ background: GOLD }} />

        <div className="relative max-w-7xl mx-auto px-6 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-sm border"
            style={{ borderColor: `rgba(245,180,0,0.5)`, background: "rgba(245,180,0,0.08)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD }}></span>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>Ghana's Premier Drilling Equipment Supplier</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6">
            BOREHOLE<br/>
            <span style={{ color: GOLD, WebkitTextStroke: `2px ${GOLD}`, WebkitTextFillColor: "transparent" }}>DRILLING</span><br/>
            EQUIPMENT
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium drilling rigs, DTH hammers, drill bits, rods & mining tools. Trusted by contractors, NGOs, and industry leaders across West Africa.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button onClick={() => setPage("Landing")}
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105 shadow-xl"
              style={{ background: GOLD, color: BLACK }}>
              GET A FREE QUOTE ▸
            </button>
            <a href="tel:+233599635186"
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm border-2 transition-all hover:scale-105"
              style={{ color: WHITE, borderColor: WHITE }}>
              📞 0599 635 186
            </a>
            <a href="https://wa.me/233599635186" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105"
              style={{ background: "#25D366", color: WHITE }}>
              💬 WHATSAPP
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["500+","Projects Supplied"],["9+","Product Categories"],["15+","Years Experience"],["24/7","Technical Support"]].map(([n,l]) => (
              <div key={l} className="rounded-sm p-4 border" style={{ background: "rgba(245,180,0,0.05)", borderColor: "rgba(245,180,0,0.2)" }}>
                <div className="text-3xl font-black" style={{ color: GOLD }}>{n}</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest" style={{ color: GOLD }}>SCROLL</span>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth="2">
            <path strokeLinecap="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: "#0F0F0F" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>WHY CHOOSE CNK</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Built for the African <br/><span style={{ color: GOLD }}>Drilling Industry</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🏆", title: "Premium Quality", desc: "Every product we supply meets international standards (API, ISO). We partner with proven manufacturers who understand the demands of African drilling conditions." },
              { icon: "⚙️", title: "Engineered for Durability", desc: "Our equipment is specifically selected for Ghana's hard basement rock. From granitic formations in Accra to quartzite in the Volta Region — our bits and hammers perform." },
              { icon: "🤝", title: "Reliable Partnership", desc: "We don't just sell equipment — we support you throughout your project. Technical advice, spare parts, maintenance support, and training are all part of the CNK commitment." },
              { icon: "🚀", title: "Fast Delivery", desc: "In-stock items can be delivered across Accra and dispatched to regional capitals within 24–48 hours. For urgent projects, call our operations team directly." },
              { icon: "💰", title: "Competitive Pricing", desc: "Direct manufacturer relationships allow us to offer genuinely competitive pricing without compromising on quality. Request our price list for current rates." },
              { icon: "📞", title: "Expert Technical Team", desc: "Our team includes qualified drilling engineers and experienced technicians. Call us with your formation challenges — we'll recommend the right solution." },
            ].map(f => (
              <div key={f.title} className="p-6 rounded-sm border group hover:border-yellow-500 transition-all"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-black text-white text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20" style={{ background: BLACK }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>OUR EQUIPMENT RANGE</p>
              <h2 className="text-4xl font-black text-white">Product Catalogue</h2>
            </div>
            <button onClick={() => { setPage("Products"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="mt-4 md:mt-0 px-6 py-3 font-black text-sm tracking-widest rounded-sm border-2 transition-all hover:scale-105"
              style={{ color: GOLD, borderColor: GOLD }}>
              VIEW ALL PRODUCTS ▸
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCTS.slice(0, 6).map(p => (
              <div key={p.id} className="group rounded-sm overflow-hidden border hover:border-yellow-500 transition-all"
                style={{ background: "#111", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="h-40 flex items-center justify-center text-6xl border-b" style={{ background: "rgba(245,180,0,0.05)", borderColor: "rgba(245,180,0,0.1)" }}>
                  {p.icon}
                </div>
                <div className="p-5">
                  <span className="text-xs font-black tracking-widest px-2 py-1 rounded-sm" style={{ background: "rgba(245,180,0,0.15)", color: GOLD }}>{p.tag}</span>
                  <h3 className="font-black text-white text-lg mt-3 mb-2">{p.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                  <a href="https://wa.me/233599635186?text=Hello%2C%20I%27d%20like%20a%20quote%20for%20" target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-2.5 font-black text-sm tracking-widest rounded-sm transition-all hover:scale-105"
                    style={{ background: GOLD, color: BLACK }}>
                    REQUEST QUOTE ▸
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>CLIENT TESTIMONIALS</p>
            <h2 className="text-4xl font-black text-white">Trusted by Ghana's <span style={{ color: GOLD }}>Best Drillers</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="p-7 rounded-sm border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(245,180,0,0.2)" }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <span key={i} style={{ color: GOLD }}>★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: GOLD, color: BLACK }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ background: GOLD }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: BLACK }}>Ready to Start Your Drilling Project?</h2>
          <p className="text-base mb-8 opacity-80" style={{ color: BLACK }}>Get a detailed, no-obligation quote from Ghana's most trusted drilling equipment supplier. We respond within 2 hours during business hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+233599635186" className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105"
              style={{ background: BLACK, color: GOLD }}>
              📞 CALL NOW: 0599 635 186
            </a>
            <a href="https://wa.me/233599635186" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105"
              style={{ background: "#25D366", color: WHITE }}>
              💬 WHATSAPP US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ABOUT
───────────────────────────────────────────── */
function AboutPage() {
  useSEO({ title: "About CNK Establishment | Borehole Drilling Equipment Supplier Ghana", description: "CNK Establishment is Accra's premier drilling equipment supplier. Learn about our history, mission, and commitment to Ghana's water and mining industries." });
  return (
    <div className="pt-20" style={{ background: BLACK, minHeight: "100vh" }}>
      {/* Hero */}
      <section className="py-24" style={{ background: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-black tracking-widest mb-4" style={{ color: GOLD }}>ABOUT CNK ESTABLISHMENT</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Ghana's Trusted<br/><span style={{ color: GOLD }}>Drilling Equipment</span><br/>Partner</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            CNK Establishment was founded with a single purpose: to give Ghana's drilling contractors and water resource professionals access to world-class equipment at fair prices, backed by real technical expertise.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>CNK Establishment was established in Accra, Ghana, growing from a specialist supplier of borehole drilling accessories into a comprehensive one-stop source for the full range of drilling equipment needed by Ghana's water, mining, and geotechnical industries.</p>
              <p>Operating from our base in New Achimota, Mile 7 — strategically located for easy access across Accra — we have built a reputation for product quality, technical honesty, and responsive service that larger competitors often fail to match.</p>
              <p>Our team combines practical drilling field experience with strong international supply chain relationships, ensuring that the equipment we supply is both technically appropriate for Ghana's geology and competitively priced.</p>
              <p>We maintain active links with international drilling equipment manufacturers and distributors in Europe, Asia, and the Americas, allowing us to source specific components and consumables that are not readily available in the West African market.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["🎯","Mission","To be the most trusted and technically capable drilling equipment partner in West Africa."],
              ["👁️","Vision","A West Africa where every community has access to clean groundwater through professionally drilled boreholes."],
              ["💎","Quality","We stock only equipment that meets international manufacturing standards and has been field-tested in African conditions."],
              ["🌍","Reach","From Accra to Tamale, Kumasi to Takoradi — and across the Ghana border into neighbouring countries."]
            ].map(([icon, title, desc]) => (
              <div key={title} className="p-5 rounded-sm border" style={{ background: "#0F0F0F", borderColor: "rgba(245,180,0,0.2)" }}>
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-black text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Location & Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📍", title: "Office Address", info: "New Achimota, Mile 7\nAccra, Greater Accra\nGhana" },
              { icon: "📞", title: "Phone Numbers", info: "Ghana: 0599 635 186\nUK: +44 7944 256654\n(WhatsApp available)" },
              { icon: "🕐", title: "Business Hours", info: "Monday – Friday\n8:00 AM – 6:00 PM\nSaturday: 8:00 AM – 2:00 PM" },
            ].map(c => (
              <div key={c.title} className="p-7 rounded-sm border text-center" style={{ background: "rgba(245,180,0,0.04)", borderColor: "rgba(245,180,0,0.2)" }}>
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-black text-white mb-3">{c.title}</h3>
                <p className="text-gray-400 text-sm whitespace-pre-line leading-relaxed">{c.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: PRODUCTS
───────────────────────────────────────────── */
function ProductsPage() {
  useSEO({ title: "Drilling Equipment & Products | CNK Establishment Ghana", description: "Browse our full range of borehole drilling equipment: drilling rigs, DTH hammers, drill bits, rods, casing shoes, well rings, and accessories. Accra, Ghana." });
  const waBase = "https://wa.me/233599635186?text=Hello%20CNK%2C%20I%27d%20like%20a%20quote%20for%20";
  return (
    <div className="pt-20" style={{ background: BLACK, minHeight: "100vh" }}>
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>FULL PRODUCT CATALOGUE</p>
          <h1 className="text-5xl font-black text-white mb-4">Drilling Equipment<br/><span style={{ color: GOLD }}>& Tools</span></h1>
          <p className="text-gray-400 max-w-xl leading-relaxed">Premium drilling equipment engineered for Ghana's geology and the demands of West Africa's water and mining industries. All products available for purchase, with technical consultation included.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(p => (
            <article key={p.id} className="rounded-sm overflow-hidden border hover:border-yellow-500 transition-all group"
              style={{ background: "#0F0F0F", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="h-48 flex items-center justify-center text-7xl border-b relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(245,180,0,0.05) 0%, rgba(245,180,0,0.02) 100%)", borderColor: "rgba(245,180,0,0.1)" }}>
                <span className="group-hover:scale-110 transition-transform duration-500 inline-block">{p.icon}</span>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-black px-2 py-1 rounded-sm" style={{ background: GOLD, color: BLACK }}>{p.tag}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-black text-white text-xl mb-3">{p.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="text-xs text-gray-600 mb-5 italic">SEO: {p.keywords}</div>
                <div className="flex gap-2">
                  <a href={`${waBase}${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-3 font-black text-xs tracking-widest rounded-sm transition-all hover:scale-105"
                    style={{ background: GOLD, color: BLACK }}>
                    REQUEST QUOTE ▸
                  </a>
                  <a href="tel:+233599635186"
                    className="px-4 py-3 font-black text-xs rounded-sm border transition-all hover:scale-105"
                    style={{ color: GOLD, borderColor: GOLD }}>
                    📞
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: "#0A0A0A" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-4">Can't find what you need?</h2>
          <p className="text-gray-400 mb-8">We source specialist drilling equipment and consumables not commonly available in Ghana. Tell us what you need and we'll find it.</p>
          <a href="https://wa.me/233599635186?text=Hello%20CNK%2C%20I%27m%20looking%20for%20specialist%20equipment%3A%20" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 font-black tracking-widest rounded-sm transition-all hover:scale-105"
            style={{ background: GOLD, color: BLACK }}>
            ENQUIRE ON WHATSAPP ▸
          </a>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: SERVICES
───────────────────────────────────────────── */
function ServicesPage() {
  useSEO({ title: "Drilling Services | CNK Establishment Accra Ghana", description: "CNK Establishment offers borehole drilling, equipment supply, maintenance, technical consultation, and operator training. Serving all of Ghana." });
  return (
    <div className="pt-20" style={{ background: BLACK, minHeight: "100vh" }}>
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>WHAT WE OFFER</p>
          <h1 className="text-5xl font-black text-white mb-4">Our Drilling <span style={{ color: GOLD }}>Services</span></h1>
          <p className="text-gray-400 max-w-xl">From borehole drilling to equipment supply and technical training — CNK Establishment is your complete drilling solution partner in Ghana.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(s => (
            <div key={s.title} className="p-8 rounded-sm border hover:border-yellow-500 transition-all group"
              style={{ background: "#0F0F0F", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="text-4xl mb-5">{s.icon}</div>
              <h2 className="font-black text-white text-2xl mb-4">{s.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{s.desc}</p>
              <a href="https://wa.me/233599635186" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-black text-sm tracking-widest rounded-sm transition-all hover:scale-105"
                style={{ background: GOLD, color: BLACK }}>
                ENQUIRE ▸
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-14">How We Work With You</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[["01","Consultation","You tell us about your project needs, location, and budget."],
              ["02","Recommendation","Our team recommends the right equipment and approach for your formation."],
              ["03","Supply","We source and deliver your equipment quickly, anywhere in Ghana."],
              ["04","Support","Ongoing technical support, spare parts, and maintenance assistance throughout your project."]
            ].map(([n, t, d]) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-sm font-black text-lg mx-auto mb-4"
                  style={{ background: GOLD, color: BLACK }}>{n}</div>
                <h3 className="font-black text-white mb-2">{t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: BLOG
───────────────────────────────────────────── */
function BlogPage() {
  useSEO({ title: "Drilling Blog | Borehole Tips & Guides | CNK Establishment Ghana", description: "Expert articles on borehole drilling in Ghana: costs, equipment guides, maintenance tips, geological advice, and compliance information from CNK Establishment." });
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="pt-20" style={{ background: BLACK, minHeight: "100vh" }}>
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>DRILLING KNOWLEDGE HUB</p>
          <h1 className="text-5xl font-black text-white mb-4">Expert Guides &<br/><span style={{ color: GOLD }}>Industry Insights</span></h1>
          <p className="text-gray-400 max-w-xl">Technical articles, cost guides, and practical advice from Ghana's leading drilling equipment experts.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          {BLOG_POSTS.map(post => (
            <article key={post.id} className="rounded-sm border overflow-hidden" style={{ background: "#0F0F0F", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="p-7">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs font-black px-3 py-1 rounded-sm" style={{ background: "rgba(245,180,0,0.15)", color: GOLD }}>{post.category}</span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <span className="text-xs text-gray-500">• {post.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">{post.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-5">{post.excerpt}</p>

                {expanded === post.id ? (
                  <div>
                    <div className="prose prose-invert max-w-none">
                      {post.content.split('\n\n').map((para, i) => {
                        if (para.startsWith('**') && para.endsWith('**')) {
                          return <h3 key={i} className="text-white font-black text-lg mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
                        }
                        if (para.includes('|')) {
                          const rows = para.split('\n').filter(r => r.trim() && !r.includes('---'));
                          return (
                            <div key={i} className="overflow-x-auto my-5">
                              <table className="w-full text-sm border-collapse">
                                {rows.map((row, ri) => {
                                  const cells = row.split('|').filter(c => c.trim());
                                  return (
                                    <tr key={ri} style={{ background: ri === 0 ? "rgba(245,180,0,0.1)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                      {cells.map((cell, ci) => (
                                        <td key={ci} className={`px-3 py-2 ${ri===0?"font-bold text-white":"text-gray-400"}`}>{cell.trim()}</td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </table>
                            </div>
                          );
                        }
                        // Handle inline bold
                        const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                        return <p key={i} className="text-gray-400 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
                      })}
                    </div>
                    <button onClick={() => setExpanded(null)}
                      className="mt-6 px-6 py-3 font-black text-sm tracking-widest rounded-sm border transition-all"
                      style={{ color: GOLD, borderColor: GOLD }}>
                      ▲ COLLAPSE
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setExpanded(post.id)}
                    className="px-6 py-3 font-black text-sm tracking-widest rounded-sm transition-all hover:scale-105"
                    style={{ background: GOLD, color: BLACK }}>
                    READ FULL ARTICLE ▸
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: CONTACT
───────────────────────────────────────────── */
function ContactPage() {
  useSEO({ title: "Contact CNK Establishment | Borehole Equipment Accra Ghana", description: "Contact CNK Establishment for borehole drilling equipment quotes, technical support, and enquiries. New Achimota, Mile 7, Accra. Call 0599635186." });
  return (
    <div className="pt-20" style={{ background: BLACK, minHeight: "100vh" }}>
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>GET IN TOUCH</p>
          <h1 className="text-5xl font-black text-white mb-4">Contact <span style={{ color: GOLD }}>CNK Establishment</span></h1>
          <p className="text-gray-400 max-w-xl">Ready to discuss your drilling equipment needs? Our technical team responds within 2 hours during business hours. WhatsApp is available 24/7.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Direct Contact</h2>
            <div className="space-y-4 mb-10">
              {[
                { icon: "📞", label: "Ghana Phone / WhatsApp", val: "0599 635 186", href: "tel:+233599635186" },
                { icon: "📞", label: "UK Number", val: "+44 7944 256654", href: "tel:+447944256654" },
                { icon: "💬", label: "WhatsApp Chat", val: "Start WhatsApp Chat →", href: "https://wa.me/233599635186" },
                { icon: "📍", label: "Office Location", val: "New Achimota, Mile 7, Accra, Ghana", href: null },
                { icon: "🕐", label: "Business Hours", val: "Mon–Fri 8:00–18:00 | Sat 8:00–14:00", href: null },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4 p-5 rounded-sm border" style={{ background: "#0F0F0F", borderColor: "rgba(245,180,0,0.15)" }}>
                  <span className="text-2xl mt-0.5">{c.icon}</span>
                  <div>
                    <div className="text-xs font-black tracking-widest mb-1" style={{ color: GOLD }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-white font-bold hover:underline">{c.val}</a>
                    ) : <span className="text-white font-bold">{c.val}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="rounded-sm overflow-hidden border" style={{ borderColor: "rgba(245,180,0,0.2)" }}>
              <iframe
                title="CNK Establishment Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.3940!2d-0.2200!3d5.6400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzgnMjQuMCJOIDDCsDEzJzEyLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                width="100%" height="250" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: LANDING (SEM)
───────────────────────────────────────────── */
function LandingPage() {
  useSEO({ title: "Get a Free Borehole Equipment Quote | CNK Establishment Ghana", description: "Request a free quote for borehole drilling equipment in Ghana. DTH hammers, drill bits, rigs, rods & accessories. Fast delivery. Call 0599635186." });
  return (
    <div style={{ background: BLACK, minHeight: "100vh" }}>
      {/* No nav — distraction free */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        {/* Badge */}
        <div className="flex justify-center mb-8 pt-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-sm border"
            style={{ borderColor: `rgba(245,180,0,0.5)`, background: "rgba(245,180,0,0.08)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD }}></span>
            <span className="text-xs font-black tracking-widest" style={{ color: GOLD }}>⚡ WE RESPOND WITHIN 2 HOURS</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white text-center mb-4 leading-tight">
          Get Premium Borehole<br/>Drilling Equipment<br/><span style={{ color: GOLD }}>Delivered in Ghana</span>
        </h1>
        <p className="text-gray-400 text-center text-lg mb-12 max-w-xl mx-auto">
          Ghana's most trusted drilling equipment supplier. DTH hammers, drill bits, rigs, rods & full accessories. Serving contractors, NGOs and industry across West Africa.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            "✅ API-certified equipment from verified manufacturers",
            "✅ Technical support included with every purchase",
            "✅ Delivery across all Ghana regions within 48 hours",
            "✅ Competitive pricing — no middleman markup",
            "✅ UK and Ghana offices for international clients",
            "✅ 500+ projects successfully supplied",
          ].map(b => (
            <div key={b} className="flex items-center gap-3 p-4 rounded-sm border"
              style={{ background: "rgba(245,180,0,0.04)", borderColor: "rgba(245,180,0,0.15)" }}>
              <span className="text-sm text-white font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[["500+","Projects"],["9+","Product Lines"],["15+","Years Experience"],["24/7","Support"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black" style={{ color: GOLD }}>{n}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-sm p-8 border" style={{ background: "#0F0F0F", borderColor: `rgba(245,180,0,0.3)` }}>
          <h2 className="text-2xl font-black text-white mb-2 text-center">Request Your Free Quote</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Complete the form below. Our team will contact you within 2 hours with pricing and availability.</p>
          <ContactForm compact />
        </div>

        {/* Or call */}
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-5">Prefer to talk directly?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+233599635186"
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105 border-2"
              style={{ color: GOLD, borderColor: GOLD }}>
              📞 CALL: 0599 635 186
            </a>
            <a href="https://wa.me/233599635186" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 font-black tracking-widest text-base rounded-sm transition-all hover:scale-105"
              style={{ background: "#25D366", color: WHITE }}>
              💬 WHATSAPP NOW
            </a>
          </div>
        </div>

        {/* Testimonial strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.slice(0, 2).map(t => (
            <div key={t.name} className="p-5 rounded-sm border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(245,180,0,0.15)" }}>
              <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <span key={i} style={{ color: GOLD }}>★</span>)}</div>
              <p className="text-gray-400 text-sm italic mb-3">"{t.text.slice(0, 150)}..."</p>
              <div className="text-white font-bold text-xs">{t.name} — <span className="text-gray-500">{t.role}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("Home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const isLanding = page === "Landing";

  return (
    <div style={{ fontFamily: "'Barlow', 'Rajdhani', system-ui, sans-serif" }}>
      <JsonLD />
      {!isLanding && <Navbar page={page} setPage={setPage} scrollY={scrollY} />}
      <main>
        {page === "Home"     && <HomePage setPage={setPage} />}
        {page === "About"    && <AboutPage />}
        {page === "Products" && <ProductsPage />}
        {page === "Services" && <ServicesPage />}
        {page === "Blog"     && <BlogPage />}
        {page === "Contact"  && <ContactPage />}
        {page === "Landing"  && <LandingPage />}
      </main>
      {!isLanding && <Footer setPage={setPage} />}
      <FloatingButtons scrollY={scrollY} />
    </div>
  );
}
