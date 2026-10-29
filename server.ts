import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data Types
export interface Product {
  id: string;
  title: string;
  edition: string;
  totalEdition: number;
  stock: number;
  price: number;
  category: 'men' | 'women' | 'runway';
  categoryLabel: string;
  description: string;
  image: string;
  specs: Record<string, string>;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  certificateNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  trackingNumber: string;
  trackingTimeline: Array<{ step: string; timestamp: string; done: boolean }>;
  clientEmail?: string;
  clientHandle?: string;
}

export interface SalonInvite {
  email: string;
  key: string;
  tier: string;
  invitedAt: string;
}

export interface CollectiveMember {
  handleOrEmail: string;
  memberId: string;
  issue: string;
  joinedAt: string;
}

// Initial Archival Catalog
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'look-07',
    title: 'JACQUARD BROCADE OVERCOAT',
    edition: 'LOOK 07 // EDITION OF 20',
    totalEdition: 20,
    stock: 7,
    price: 850,
    category: 'men',
    categoryLabel: '01 ARCHITECTURAL MEN',
    description: 'Raw vermilion silk brocade & structural drop collar.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjeE3oNDs5wmPbxFUpMPzy6mWoy_nNlRq0G9oM_kRvA8fiQm6sBUEKPS7n9T38eQKGh2V5Avxe08tui493fVORo0OEY_RXWhvqmPHflp7B8L8_U1NoB2Jx1uk3PYpIj_PJyjS47bWhSsUqcZQSZGXQUKz1yxPlPR6x21qwP189PeIql61t3pO6tVkiq2VmaDRjrQylNgUcyGyahOAWST_KS3vJ_l5H-ZuRSIu6hVdgeLsn5wlKAGV8',
    specs: {
      'Weight': '420 GSM',
      'Composition': '68% Silk, 32% Metallic',
      'Drop': '+12cm Oversized',
      'Fastening': 'Concealed Magnet'
    }
  },
  {
    id: 'look-09',
    title: 'FLUID RELAXED TROUSER',
    edition: 'LOOK 09 // EDITION OF 40',
    totalEdition: 40,
    stock: 14,
    price: 680,
    category: 'women',
    categoryLabel: '02 DRAPING & WEAVE WOMEN',
    description: 'High-twist cupro, floral apron wrap & bronze cuff.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZKCABjJp_RHqisATkxQ8hW5rvA1M4Ekr0ZIYOvH9kbd5G_QHlaSt-I1BLWERbu37wc3vD03F7ghn0KY2MKpgebMFB44pMRCfvZZfEM8Ju9k0hJamixU1AZQ9fnSGOrMLoG00RQG634XQ-6nEhVPaEuBRB3yH9JHxnjAaCl4nTFU-y2KS8pLq5ZIAYovVFZaz1y4Zyj16XH76wRCshZvXawQ4e2HoK2XrcLLwt9oG-YdYb2wRsxdMK',
    specs: {
      'Weight': '280 GSM',
      'Composition': '100% High-Twist Cupro',
      'Hardware': 'Cold-Hammered C260 Brass Cuff',
      'Fastening': 'Wrap Apron Knot'
    }
  },
  {
    id: 'look-06',
    title: 'METALLIC CRINKLE TUNIC DRESS',
    edition: 'LOOK 06 // EDITION OF 35',
    totalEdition: 35,
    stock: 9,
    price: 740,
    category: 'women',
    categoryLabel: '02 DRAPING & WEAVE WOMEN',
    description: 'Crinkle sheen tunic layered over structured corset stays.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKg-Bu8EBLHfZfP052zunaQCi1xjrYxs6kkqMskm-FhuiBdyLA_IYtHxa2cx7-U0zK7ZolAGN6huhtPPMANXIMk5vvtnjLMDQCrJkZ5cP2iYV7YtCLdSSLLzCsq-Rlemog-KgrXPxp9u9UfU9t066Rus8eDuT8qarNVPWgT8Am8D11_9vFfq5sjNLYluQGUGzcnHuJMwUN8n1I8DswzZOTJXJfAoEQ6Kyq7oHkeyJ8C-CvPirjRF09',
    specs: {
      'Weight': '310 GSM',
      'Composition': '75% Crinkle Lurex, 25% Silk',
      'Structure': 'Internal Boned Stays',
      'Finish': 'Iridescent Sheen'
    }
  },
  {
    id: 'look-04',
    title: 'SHEER ARCHITECTURAL JACKET',
    edition: 'LOOK 04 // EDITION OF 25',
    totalEdition: 25,
    stock: 5,
    price: 620,
    category: 'runway',
    categoryLabel: '03 UGRFR 25 RUNWAY',
    description: 'Sheer technical organza jacket with utilitarian patch pockets and boxing shorts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY-jWkDVnB0cocRmROhljqIHcSgi-VDuuNInz-GkV3zO7IbUJbLX2ouzlR-dmPRyrFrbgMYcEM9fC2IWDKBl-iNSBhJyXMm1GYn8p97NLLckuahD-p4TsSEWxkuQxAkiIg5JR0mqv-HKCn4bqr81hLeLyskq2eqkPgVtvzm0Lq_dJjvvu0ElPcXt424lbTBNaf-u6HEsnTkukuwch4AvpvFX9U4OXUJBnx8ih09yWZQIWH30el3fL3',
    specs: {
      'Weight': '160 GSM',
      'Composition': '100% Technical Silk Organza',
      'Pockets': 'Dual Utilitarian Bellows',
      'Silhouette': 'Sharp Brutalist Cut'
    }
  }
];

// In-Memory Database with optional JSON backup
class ArchiveDatabase {
  products: Product[] = [...INITIAL_PRODUCTS];
  carts: Map<string, CartItem[]> = new Map();
  orders: Order[] = [];
  salonInvites: SalonInvite[] = [];
  collectiveMembers: CollectiveMember[] = [];
  wishlists: Map<string, Set<string>> = new Map();

  private storageFile = path.resolve(__dirname, 'archive-data.json');

  constructor() {
    this.loadFromFile();
    if (this.orders.length === 0) {
      // Seed a recent sample order for tracking demonstration
      this.orders.push({
        id: 'EP-2026-0814',
        certificateNumber: 'NDA-CERT-8140-ND',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        items: [
          {
            id: 'item-demo-1',
            productId: 'look-07',
            title: 'JACQUARD BROCADE OVERCOAT',
            price: 850,
            quantity: 1,
            addedAt: new Date(Date.now() - 3600000 * 19).toISOString()
          }
        ],
        subtotal: 850,
        shipping: 0,
        total: 850,
        status: 'ATELIER INSPECTION PASSED // IN VAULT DISPATCH',
        trackingNumber: 'DHL-ARCHIVE-IN-77492',
        trackingTimeline: [
          { step: 'Order Placed & Archival NDA Logged', timestamp: 'Yesterday 14:20 IST', done: true },
          { step: 'Hauz Khas Atelier Handloom Inspection', timestamp: 'Today 09:15 IST', done: true },
          { step: 'Numbered Certificate Stamp & Sealed Packaging', timestamp: 'Today 11:30 IST', done: true },
          { step: 'Global Express Air-Courier Dispatch', timestamp: 'Expected Today 17:00 IST', done: false }
        ]
      });
    }
  }

  private loadFromFile() {
    try {
      if (fs.existsSync(this.storageFile)) {
        const raw = fs.readFileSync(this.storageFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.products) this.products = parsed.products;
        if (parsed.orders) this.orders = parsed.orders;
        if (parsed.salonInvites) this.salonInvites = parsed.salonInvites;
        if (parsed.collectiveMembers) this.collectiveMembers = parsed.collectiveMembers;
      }
    } catch {
      // ignore
    }
  }

  saveToFile() {
    try {
      const data = {
        products: this.products,
        orders: this.orders,
        salonInvites: this.salonInvites,
        collectiveMembers: this.collectiveMembers
      };
      fs.writeFileSync(this.storageFile, JSON.stringify(data, null, 2));
    } catch {
      // ignore
    }
  }

  getCart(sessionId: string): CartItem[] {
    if (!this.carts.has(sessionId)) {
      this.carts.set(sessionId, []);
    }
    return this.carts.get(sessionId)!;
  }

  getWishlist(sessionId: string): string[] {
    if (!this.wishlists.has(sessionId)) {
      this.wishlists.set(sessionId, new Set());
    }
    return Array.from(this.wishlists.get(sessionId)!);
  }
}

const db = new ArchiveDatabase();

async function createServer() {
  const app = express();
  app.use(express.json());

  // Helper to extract session id
  const getSessionId = (req: Request): string => {
    return (req.headers['x-session-id'] as string) || (req.query.sessionId as string) || 'default-session';
  };

  // --- API ROUTES ---

  // 1. Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'operational',
      archive: 'EPISODE ATELIER NEW DELHI',
      season: 'UGRFR 25',
      time: new Date().toISOString()
    });
  });

  // 2. Garment & Capsule Catalog
  app.get('/api/products', (req: Request, res: Response) => {
    const category = req.query.category as string;
    let list = db.products;
    if (category) {
      list = list.filter((p) => p.category === category.toLowerCase());
    }
    res.json({ products: list, total: list.length });
  });

  app.get('/api/products/:id', (req: Request, res: Response) => {
    const product = db.products.find(
      (p) => p.id === req.params.id || p.title.toLowerCase() === req.params.id.toLowerCase()
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found in archive index' });
    }
    res.json(product);
  });

  // 3. Cart Management
  app.get('/api/cart', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const items = db.getCart(sessionId);
    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    const total = subtotal + shipping;
    res.json({
      sessionId,
      items,
      count: items.reduce((acc, it) => acc + it.quantity, 0),
      subtotal,
      shipping,
      total,
      freeShippingEligible: subtotal >= 500
    });
  });

  app.post('/api/cart/add', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const { title, price, productId } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ error: 'Missing title or price' });
    }

    // Match product to check stock
    const matched = db.products.find(
      (p) => p.title.toUpperCase() === String(title).toUpperCase() || p.id === productId
    );

    const cart = db.getCart(sessionId);
    const existingIndex = cart.findIndex((it) => it.title.toUpperCase() === String(title).toUpperCase());

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productId: matched ? matched.id : 'custom-piece',
        title: String(title).toUpperCase(),
        price: Number(price),
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }

    const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    const total = subtotal + shipping;

    res.json({
      success: true,
      message: `${title} reserved in archive bag.`,
      cart,
      count: cart.reduce((acc, it) => acc + it.quantity, 0),
      subtotal,
      shipping,
      total,
      stockRemaining: matched ? matched.stock : null
    });
  });

  app.delete('/api/cart/item', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const itemId = req.body.itemId || (req.query.itemId as string);
    const index = req.body.index !== undefined ? Number(req.body.index) : undefined;

    const cart = db.getCart(sessionId);

    if (index !== undefined && index >= 0 && index < cart.length) {
      cart.splice(index, 1);
    } else if (itemId) {
      const idx = cart.findIndex((it) => it.id === itemId);
      if (idx > -1) cart.splice(idx, 1);
    }

    const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    const total = subtotal + shipping;

    res.json({
      success: true,
      cart,
      count: cart.reduce((acc, it) => acc + it.quantity, 0),
      subtotal,
      shipping,
      total
    });
  });

  app.delete('/api/cart', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    db.carts.set(sessionId, []);
    res.json({ success: true, count: 0, subtotal: 0, total: 0, items: [] });
  });

  // 4. Archive Checkout & Order Processing
  app.post('/api/checkout', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const cart = db.getCart(sessionId);

    if (cart.length === 0) {
      return res.status(400).json({ error: 'Archive bag is empty.' });
    }

    const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const shipping = subtotal >= 500 ? 0 : 50;
    const total = subtotal + shipping;

    const orderNumber = `EP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const certNumber = `NDA-CERT-${Math.floor(1000 + Math.random() * 9000)}-ND`;
    const trackingNum = `DHL-ARCHIVE-IN-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderNumber,
      certificateNumber: certNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      shipping,
      total,
      status: 'ATELIER RESERVED // DISPATCH INITIATED',
      trackingNumber: trackingNum,
      trackingTimeline: [
        { step: 'Order Placed & Provenance Certificate Assigned', timestamp: 'Just now', done: true },
        { step: 'Hauz Khas Heritage Inspection & Stamping', timestamp: 'Pending Atelier Window', done: false },
        { step: 'Numbered Security Packaging', timestamp: 'Pending', done: false },
        { step: 'Complimentary Express Air Courier', timestamp: 'Scheduled', done: false }
      ],
      clientEmail: req.body.email || 'confidential.client@ugrfr.com',
      clientHandle: req.body.handle || undefined
    };

    // Deduct stock
    for (const item of cart) {
      const prod = db.products.find((p) => p.id === item.productId || p.title === item.title);
      if (prod && prod.stock > 0) {
        prod.stock -= item.quantity;
      }
    }

    db.orders.unshift(newOrder);
    db.saveToFile();

    // Clear cart
    db.carts.set(sessionId, []);

    res.json({
      success: true,
      message: 'Archive order recorded under NDA confirmation.',
      order: newOrder
    });
  });

  // 5. Track Order
  app.get('/api/orders/:orderId', (req: Request, res: Response) => {
    const query = req.params.orderId.trim().toUpperCase();
    const order = db.orders.find(
      (o) =>
        o.id.toUpperCase() === query ||
        o.trackingNumber.toUpperCase() === query ||
        o.certificateNumber.toUpperCase() === query
    );

    if (!order) {
      return res.status(404).json({
        error: `Order ${query} not found in archive registry.`,
        latestSampleId: db.orders[0]?.id || 'EP-2026-0814'
      });
    }

    res.json({ order });
  });

  app.get('/api/orders', (_req: Request, res: Response) => {
    res.json({ orders: db.orders });
  });

  // 6. Private Salon Key Dispatch (Newsletter)
  app.post('/api/salon/invite', (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !String(email).includes('@')) {
      return res.status(400).json({ error: 'Valid client email address required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const existing = db.salonInvites.find((inv) => inv.email === cleanEmail);

    if (existing) {
      return res.json({
        success: true,
        alreadyRegistered: true,
        key: existing.key,
        tier: existing.tier,
        message: `Existing key re-issued: ${existing.key}`
      });
    }

    const key = `KEY-UGRFR-${Math.floor(1000 + Math.random() * 9000)}`;
    const invite: SalonInvite = {
      email: cleanEmail,
      key,
      tier: 'TIER 01 / COUTURE ACCESS',
      invitedAt: new Date().toISOString()
    };

    db.salonInvites.push(invite);
    db.saveToFile();

    res.json({
      success: true,
      key,
      tier: invite.tier,
      message: `Private Salon key ${key} dispatched to ${cleanEmail}`
    });
  });

  // 7. The Community // The Collective Initiation
  app.post('/api/community/join', (req: Request, res: Response) => {
    const { handleOrEmail } = req.body;
    if (!handleOrEmail || String(handleOrEmail).trim().length < 2) {
      return res.status(400).json({ error: 'Valid handle or email required.' });
    }

    const handle = String(handleOrEmail).trim();
    const memberId = `COLL-UGRFR-${Math.floor(100 + Math.random() * 900)}`;

    const member: CollectiveMember = {
      handleOrEmail: handle,
      memberId,
      issue: 'ISSUE 01 // UNRELEASED RAIDS',
      joinedAt: new Date().toISOString()
    };

    db.collectiveMembers.push(member);
    db.saveToFile();

    res.json({
      success: true,
      memberId,
      handle,
      message: `Access protocol ${memberId} dispatched to ${handle}`
    });
  });

  // 8. Wishlist
  app.get('/api/wishlist', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const items = db.getWishlist(sessionId);
    res.json({ items, count: items.length });
  });

  app.post('/api/wishlist/toggle', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Item title required.' });
    }

    if (!db.wishlists.has(sessionId)) {
      db.wishlists.set(sessionId, new Set());
    }

    const set = db.wishlists.get(sessionId)!;
    const itemTitle = String(title).toUpperCase();
    let saved = false;

    if (set.has(itemTitle)) {
      set.delete(itemTitle);
      saved = false;
    } else {
      set.add(itemTitle);
      saved = true;
    }

    res.json({
      saved,
      item: itemTitle,
      count: set.size,
      items: Array.from(set)
    });
  });

  // 9. Global Database Search
  app.get('/api/search', (req: Request, res: Response) => {
    const q = (req.query.q as string || '').toLowerCase().trim();
    if (!q) {
      return res.json({ query: q, results: db.products });
    }

    const matches = db.products.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inCat = p.category.toLowerCase().includes(q);
      const inSpecs = Object.values(p.specs).some((v) => v.toLowerCase().includes(q));
      return inTitle || inDesc || inCat || inSpecs;
    });

    res.json({
      query: q,
      total: matches.length,
      results: matches
    });
  });

  // 10. Member Salon Login / Verification
  app.post('/api/member/login', (req: Request, res: Response) => {
    const { keyOrEmail } = req.body;
    if (!keyOrEmail) {
      return res.status(400).json({ error: 'Please provide client key or email.' });
    }

    const q = String(keyOrEmail).trim().toLowerCase();
    const foundInvite = db.salonInvites.find(
      (inv) => inv.email.toLowerCase() === q || inv.key.toLowerCase() === q
    );

    if (foundInvite) {
      return res.json({
        authenticated: true,
        member: {
          email: foundInvite.email,
          key: foundInvite.key,
          tier: foundInvite.tier,
          vipPerks: ['Priority Runway Seating', 'Zero-Duty Global Freight', 'Atelier Tailoring Access']
        }
      });
    }

    // Default guest credential issue
    const newKey = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    return res.json({
      authenticated: true,
      isNew: true,
      member: {
        email: q.includes('@') ? q : `${q}@archive.ugrfr.com`,
        key: newKey,
        tier: 'GUEST COUTURE ACCESS',
        vipPerks: ['Archive Catalog Browsing', 'Complimentary Air Freight']
      }
    });
  });

  // 11. Technical Specifications
  app.get('/api/specs', (_req: Request, res: Response) => {
    res.json({
      labReport: 'DOC. 25-UGR',
      mill: 'Historic New Delhi Shuttle Looms, Hauz Khas',
      standards: [
        {
          code: '01 // TEXTILE',
          name: 'HERITAGE RAW SILK JACQUARD',
          gsm: 420,
          composition: '68% Silk, 32% Metallic',
          description: 'High-tensile crimson silk warp combined with metallic gold thread weft woven on historic shuttle looms.'
        },
        {
          code: '02 // SILHOUETTE',
          name: 'DROPPED KIMONO COLLAR',
          drop: '+12cm Oversized',
          fastening: 'Concealed Magnet',
          description: 'Subversive East-Asian wrap draping integrated with brutalist structural tailoring and internal stays.'
        },
        {
          code: '03 // HARDWARE',
          name: 'COLD-HAMMERED BRASS',
          alloy: 'C260 Brass',
          finish: 'Cold Repoussé',
          description: 'Artisanal repoussé brass cuffs and waist accents hand-forged in small craft workshops in New Delhi.'
        }
      ]
    });
  });

  // --- VITE MIDDLEWARE & STATIC SERVING ---
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`[EPISODE Server] Running on http://0.0.0.0:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
