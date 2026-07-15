import { db } from "./firebase";
import { 
  collection, getDocs, getDoc, doc, setDoc, deleteDoc, query, orderBy, limit 
} from "firebase/firestore";

export interface IndustryData {
  slug: string;
  name: string;
  desc: string;
  notionUrl: string;
  iconKey: string;
}

export interface ProductData {
  id: string;
  name: string;
  tagline: string;
  iconKey: string;
  subPrice: string;
  buyPrice: string;
  demoUrl?: string;
  buyUrl?: string;
  features: string[];
}

export interface LeadRequest {
  id: string;
  businessName?: string;
  contactName: string;
  email: string;
  phone: string;
  bottleneck: string;
  createdAt: string;
}

// ----------------------------------------------------
// DEFAULT STATIC TEMPLATES
// ----------------------------------------------------

const defaultIndustries: IndustryData[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    desc: "Consolidate property databases and automate broker zip-code assignments with instant WhatsApp alerts.",
    notionUrl: "https://notion.so/heygrow/real-estate-blueprint",
    iconKey: "Building",
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    desc: "Connect digital stock RFID tags to a live inventory dashboard and automate VIP customer birthday alert triggers.",
    notionUrl: "https://notion.so/heygrow/jewellery-blueprint",
    iconKey: "Gem",
  },
  {
    slug: "logistics",
    name: "Logistics",
    desc: "Auto-match driver schedules with vehicle capacity limits, generating live digital package manifests on check-in.",
    notionUrl: "https://notion.so/heygrow/logistics-blueprint",
    iconKey: "Truck",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    desc: "Build self-service booking calendars for clinics, syncing doctor slots with automated queue alerts.",
    notionUrl: "https://notion.so/heygrow/healthcare-blueprint",
    iconKey: "HeartPulse",
  },
  {
    slug: "schools",
    name: "Schools",
    desc: "Automate tuition ledger invoices, check-in rosters, and instant text broadcasts for parent security gates.",
    notionUrl: "https://notion.so/heygrow/schools-blueprint",
    iconKey: "GraduationCap",
  },
  {
    slug: "travel",
    name: "Travel",
    desc: "Auto-compile custom travel briefs and flight alerts directly to clients' WhatsApp dashboards.",
    notionUrl: "https://notion.so/heygrow/travel-blueprint",
    iconKey: "Plane",
  },
  {
    slug: "construction",
    name: "Construction",
    desc: "Digitize subcontractor timesheets and material inventories directly from mobile supervisor field logs.",
    notionUrl: "https://notion.so/heygrow/construction-blueprint",
    iconKey: "HardHat",
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    desc: "Deploy direct table-booking widgets and seating engines to bypass third-party delivery margins.",
    notionUrl: "https://notion.so/heygrow/restaurants-blueprint",
    iconKey: "Utensils",
  },
  {
    slug: "events",
    name: "Events",
    desc: "Coordinate collaborator schedules, milestone tracking checklists, and guest ticket check-in verification portals.",
    notionUrl: "https://notion.so/heygrow/events-blueprint",
    iconKey: "Calendar",
  },
];

const defaultProducts: ProductData[] = [
  {
    id: "crm",
    name: "CRM Engine",
    tagline: "Unify lead pipelines and customer records.",
    iconKey: "Database",
    subPrice: "49",
    buyPrice: "999",
    features: [
      "Instant web forms integration",
      "Automated WhatsApp/SMS follow-ups",
      "Sales stages tracking funnel",
      "Lead scoring & AI assignment",
    ],
  },
  {
    id: "inventory",
    name: "Inventory Suite",
    tagline: "Track and forecast stock levels in real time.",
    iconKey: "ShoppingBag",
    subPrice: "79",
    buyPrice: "1,499",
    features: [
      "Multi-location ledger sync",
      "Low-stock alert automations",
      "Supplier portal orders",
      "Batch & barcode tracking system",
    ],
  },
  {
    id: "billing",
    name: "Billing Flow",
    tagline: "Automate invoices and recurring collections.",
    iconKey: "DollarSign",
    subPrice: "39",
    buyPrice: "799",
    features: [
      "Global tax calculations sync",
      "Direct credit card checkout integration",
      "Auto-generated PDF ledger emails",
      "Dunning recovery auto-reminders",
    ],
  },
  {
    id: "booking",
    name: "Booking Engine",
    tagline: "Self-booking calendar interface for clients.",
    iconKey: "Calendar",
    subPrice: "29",
    buyPrice: "599",
    features: [
      "Interactive booking widgets",
      "Staff calendar capacity allocation",
      "Pre-payment checkouts system",
      "Confirmation alerts & feedback logs",
    ],
  },
  {
    id: "attendance",
    name: "Attendance HR",
    tagline: "Manage staff check-ins and operational hours.",
    iconKey: "Clock",
    subPrice: "19",
    buyPrice: "399",
    features: [
      "Mobile dashboard checking",
      "RFID and tablet integrations",
      "Salary sheets automatic exports",
      "Overtime operations analytics logs",
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard BI",
    tagline: "Real-time analytics across all operations.",
    iconKey: "BarChart3",
    subPrice: "59",
    buyPrice: "1,199",
    features: [
      "Unified system API data feeds",
      "Custom SVG charts & reports generator",
      "Growth vector trend charts",
      "Daily automated operations brief",
    ],
  },
];

// ----------------------------------------------------
// INDUSTRIES CRUD IMPLEMENTATION
// ----------------------------------------------------

export async function getIndustries(): Promise<IndustryData[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, "heygrow_industries"));
      if (!snap.empty) {
        const list: IndustryData[] = [];
        snap.forEach((d) => list.push(d.data() as IndustryData));
        return list;
      }
      
      // Seed Firestore with defaults if empty
      console.log("Seeding Firestore with default industries...");
      for (const ind of defaultIndustries) {
        await setDoc(doc(db, "heygrow_industries", ind.slug), ind);
      }
      return defaultIndustries;
    } catch (e) {
      console.error("Firestore read industries failed, falling back:", e);
    }
  }

  // Local Storage Sync
  try {
    const local = localStorage.getItem("hey_grow_db_industries");
    if (local) {
      return JSON.parse(local);
    }
    localStorage.setItem("hey_grow_db_industries", JSON.stringify(defaultIndustries));
    return defaultIndustries;
  } catch (err) {
    return defaultIndustries;
  }
}

export async function saveIndustry(ind: IndustryData): Promise<boolean> {
  if (db) {
    try {
      await setDoc(doc(db, "heygrow_industries", ind.slug), ind);
      return true;
    } catch (e) {
      console.error("Firestore write industry failed:", e);
    }
  }

  // Local Storage Sync
  try {
    const list = await getIndustries();
    const idx = list.findIndex((i) => i.slug === ind.slug);
    if (idx >= 0) {
      list[idx] = ind;
    } else {
      list.push(ind);
    }
    localStorage.setItem("hey_grow_db_industries", JSON.stringify(list));
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteIndustry(slug: string): Promise<boolean> {
  if (db) {
    try {
      await deleteDoc(doc(db, "heygrow_industries", slug));
      return true;
    } catch (e) {
      console.error("Firestore delete industry failed:", e);
    }
  }

  // Local Storage Sync
  try {
    const list = await getIndustries();
    const filtered = list.filter((i) => i.slug !== slug);
    localStorage.setItem("hey_grow_db_industries", JSON.stringify(filtered));
    return true;
  } catch (err) {
    return false;
  }
}

// ----------------------------------------------------
// PRODUCTS CRUD IMPLEMENTATION
// ----------------------------------------------------

export async function getProducts(): Promise<ProductData[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, "heygrow_products"));
      if (!snap.empty) {
        const list: ProductData[] = [];
        snap.forEach((d) => list.push(d.data() as ProductData));
        return list;
      }

      // Seed Firestore with defaults if empty
      console.log("Seeding Firestore with default products...");
      for (const prod of defaultProducts) {
        await setDoc(doc(db, "heygrow_products", prod.id), prod);
      }
      return defaultProducts;
    } catch (e) {
      console.error("Firestore read products failed, falling back:", e);
    }
  }

  // Local Storage Sync
  try {
    const local = localStorage.getItem("hey_grow_db_products");
    if (local) {
      return JSON.parse(local);
    }
    localStorage.setItem("hey_grow_db_products", JSON.stringify(defaultProducts));
    return defaultProducts;
  } catch (err) {
    return defaultProducts;
  }
}

export async function saveProduct(prod: ProductData): Promise<boolean> {
  if (db) {
    try {
      await setDoc(doc(db, "heygrow_products", prod.id), prod);
      return true;
    } catch (e) {
      console.error("Firestore write product failed:", e);
    }
  }

  // Local Storage Sync
  try {
    const list = await getProducts();
    const idx = list.findIndex((p) => p.id === prod.id);
    if (idx >= 0) {
      list[idx] = prod;
    } else {
      list.push(prod);
    }
    localStorage.setItem("hey_grow_db_products", JSON.stringify(list));
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (db) {
    try {
      await deleteDoc(doc(db, "heygrow_products", id));
      return true;
    } catch (e) {
      console.error("Firestore delete product failed:", e);
    }
  }

  // Local Storage Sync
  try {
    const list = await getProducts();
    const filtered = list.filter((p) => p.id !== id);
    localStorage.setItem("hey_grow_db_products", JSON.stringify(filtered));
    return true;
  } catch (err) {
    return false;
  }
}

// ----------------------------------------------------
// LEADS LIST INTAKE
// ----------------------------------------------------

export async function getBlueprintRequests(): Promise<LeadRequest[]> {
  if (db) {
    try {
      const q = query(collection(db, "blueprint_requests"), orderBy("createdAt", "desc"), limit(100));
      const snap = await getDocs(q);
      const list: LeadRequest[] = [];
      snap.forEach((d) => {
        const item = d.data();
        list.push({
          id: d.id,
          businessName: item.businessName || "Direct Intake",
          contactName: item.contactName || "No Name",
          email: item.email || "",
          phone: item.phone || "",
          bottleneck: item.bottleneck || "",
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : new Date().toISOString(),
        });
      });
      return list;
    } catch (e) {
      console.error("Firestore read leads failed, falling back:", e);
    }
  }

  // Local Storage Sync
  try {
    const local = localStorage.getItem("hey_grow_blueprints");
    if (local) {
      const list = JSON.parse(local);
      return list.map((item: any) => ({
        id: item.id || `local_${Date.now()}`,
        businessName: item.businessName || "Direct Intake",
        contactName: item.contactName || "No Name",
        email: item.email || "",
        phone: item.phone || "",
        bottleneck: item.bottleneck || "",
        createdAt: item.createdAt || new Date().toISOString(),
      }));
    }
    return [];
  } catch (err) {
    return [];
  }
}

// ----------------------------------------------------
// FOOTER SETTINGS
// ----------------------------------------------------

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  narrativeText: string;
  copyrightText: string;
  columns: FooterColumn[];
}

export const defaultFooterData: FooterData = {
  narrativeText: "We study businesses, identify bottlenecks, design intelligent systems, and build connected products that help businesses grow.",
  copyrightText: "© 2026 HeyGrow (heygrow.in). All rights reserved.",
  columns: [
    {
      title: "Pillars",
      links: [
        { name: "Growth Foundation", href: "/#pillars" },
        { name: "Custom Systems", href: "/#pillars" },
        { name: "HeyGrow Products", href: "/#products" },
      ],
    },
    {
      title: "Industries",
      links: [
        { name: "Logistics", href: "/industries" },
        { name: "Jewellery", href: "/industries" },
        { name: "Real Estate", href: "/industries" },
        { name: "Healthcare", href: "/industries" },
        { name: "Schools", href: "/industries" },
        { name: "More Industries", href: "/industries" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "CRM Engine", href: "/products" },
        { name: "Billing System", href: "/products" },
        { name: "Inventory Suite", href: "/products" },
        { name: "Booking System", href: "/products" },
        { name: "Dashboard BI", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "System Blueprint", href: "/#cta" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ]
};

export async function getFooterSettings(): Promise<FooterData> {
  if (db) {
    try {
      const snap = await getDoc(doc(db, "heygrow_settings", "footer"));
      if (snap.exists()) {
        return snap.data() as FooterData;
      }
    } catch (e) {
      console.error("Firestore read footer failed, falling back:", e);
    }
  }

  // Local Storage Sync
  try {
    const local = localStorage.getItem("hey_grow_footer");
    if (local) {
      return JSON.parse(local) as FooterData;
    }
  } catch (err) {}
  
  return defaultFooterData;
}

export async function saveFooterSettings(data: FooterData): Promise<boolean> {
  if (db) {
    try {
      await setDoc(doc(db, "heygrow_settings", "footer"), data);
      localStorage.setItem("hey_grow_footer", JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Firestore write footer failed:", e);
    }
  }

  try {
    localStorage.setItem("hey_grow_footer", JSON.stringify(data));
    return true;
  } catch (err) {
    return false;
  }
}
