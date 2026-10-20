/* ------------------------------------------------------------------
   All copy, links and images for the site live in this file.
   Edit here, run `npm run build`, redeploy. Nothing else needs touching.
   ------------------------------------------------------------------ */

export type Img = { src: string; w: number; h: number; alt: string };
export type Shot = Img & { title?: string; caption?: string };

const im = (src: string, w: number, h: number, alt: string): Img => ({
  src: `/img/${src}.webp`,
  w,
  h,
  alt,
});
const shot = (img: Img, title: string, caption: string): Shot => ({ ...img, title, caption });

/* ---------------- person ---------------- */

export const person = {
  name: "Gudita Jain",
  role: "Graphic designer & AI video editor",
  city: "Noida, India",
  email: "guditajain04@gmail.com",
  phone: "+91 80005 89734",
  phoneHref: "tel:+918000589734",
  behance: "https://www.behance.net/guditajain04",
  linkedin: "https://www.linkedin.com/in/guditajain",
  cv: "/cv/Gudita-Jain-CV.pdf",
  // Portrait (4:5) for the About section. Set to null to fall back to the monogram.
  portrait: "/img/gudita.webp" as string | null,
  portraitSize: { w: 1091, h: 1364 },
  status: "Open to briefs",
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/* ---------------- images ---------------- */

export const I = {
  amrut: {
    searchLess: im("amrut/people-search-less", 1280, 1600, "Amrut.AI post: People search less. They ask more. A brass magnifying glass and a ceramic speech bubble on lavender."),
    c1: im("amrut/carousel-1", 1254, 1254, "Carousel slide: Search is changing, traditional search versus AI search."),
    c2: im("amrut/carousel-2", 1254, 1254, "Carousel slide: Your competitor could be in the answer."),
    c3: im("amrut/carousel-3", 1254, 1254, "Carousel slide: So what does AI actually say about your brand, with the dashboard on a laptop."),
    c5: im("amrut/carousel-5", 1254, 1254, "Carousel slide: Measure it. Understand it. Improve it."),
    c6: im("amrut/carousel-6", 1254, 1254, "Carousel slide: AI visibility is the next battleground."),
    scanRec: im("amrut/scan-recommendable", 1080, 1080, "Ad: Your brand is searchable. But is it recommendable?"),
    scanComp: im("amrut/scan-competitors", 1080, 1080, "Ad: AI is recommending your competitors. Not you."),
    scanCrawl: im("amrut/scan-crawlers", 1080, 1080, "Ad: Can AI actually read your website? Showing blocked AI crawlers."),
    sov: im("amrut/annotated-share-of-voice", 1080, 1080, "Annotated product post: Track your AI share of voice."),
    howSee: im("amrut/annotated-how-ai-sees", 1080, 1080, "Annotated product post: How does AI see your brand?"),
    pagesAnswers: im("amrut/photo-pages-answers", 1280, 1600, "Photo post: Search used to find pages. Now it finds answers. An old index book beside a phone."),
    questions: im("amrut/photo-questions-longer", 1280, 1600, "Photo post: Questions got longer. A woman asking her phone a question out loud."),
    shortlist: im("amrut/photo-shortlist", 1280, 1600, "Photo post: The shortlist is made before they visit your site."),
    tenTabs: im("amrut/shift-ten-tabs", 1080, 1080, "Typographic post: One answer replaces 10 tabs, with an old-way and new-way checklist."),
    shiftLess: im("amrut/shift-search-less", 1080, 1080, "Typographic post: People search less. They ask more. A hand holding a phone."),
    keywords: im("amrut/shift-keywords", 1080, 1080, "Typographic post: From keywords to conversations."),
    poll: im("amrut/engage-poll", 1122, 1402, "Engagement post: Great brand. But does AI mention you? A comment poll."),
    favourite: im("amrut/engage-favourite", 1280, 1600, "Neo-brutalist post: ChatGPT already picked a favourite in your category. Is it you?"),
  },
  catfe: {
    logoClay: im("catfe/logo-oat-on-caramel", 970, 1125, "Catfé logotype in oat on caramel."),
    logoOat: im("catfe/logo-caramel-on-oat", 970, 1125, "Catfé logotype in caramel on oat."),
    moodboard: im("catfe/moodboard", 900, 675, "Catfé moodboard: milk swirls, worn wood, pendant lights."),
    palette: im("catfe/palette", 423, 484, "Catfé palette: caramel #A6734A and oat #E7DBCF."),
    window: im("catfe/window", 584, 689, "Catfé window vinyl on a café front at dusk."),
    signs: im("catfe/hanging-signs", 2000, 1206, "Catfé hanging sign in brass housing, shown in oat and in caramel."),
    posterDecal: im("catfe/poster-and-decal", 2000, 1008, "Catfé framed wall poster in a café interior, and the logo as a window decal."),
    cards: im("catfe/cards-hd", 964, 1156, "Catfé business cards, front and back, with an arched panel and paw-print pattern."),
    letterhead: im("catfe/letterhead-hd", 962, 1358, "Catfé letterhead with a soft paw-print pattern."),
    menu: im("catfe/menu", 340, 480, "Catfé menu with hot beverages, cold beverages and pastries."),
    menuTable: im("catfe/menu-table", 558, 392, "Catfé menu staged on a café table with coffee and bread."),
    system: im("catfe/packaging-set", 1296, 1296, "Catfé packaging set: cards, coaster, cup, notepad, carry bag and menu."),
    stickers: im("catfe/stickers", 542, 544, "Catfé sticker set, four shapes and lockups."),
    bag: im("catfe/bean-pouch", 998, 1268, "Catfé kraft coffee-bean pouch on a stone plinth."),
    ceramic: im("catfe/tumbler", 968, 1254, "Catfé white tumbler on a marble table by a window."),
    pFirst: im("catfe/poster-first-visit", 368, 520, "Catfé poster: 50% discount on your first dish."),
    pHours: im("catfe/poster-cappuccino", 966, 1256, "Catfé poster: cappuccino, opening hours and price."),
    pCookies: im("catfe/poster-cookies-hd", 1034, 1460, "Catfé poster: Bite into happiness with our homemade cookies."),
    pBogo: im("catfe/poster-bogo-hd", 1056, 1454, "Catfé poster: Buy one, get one, with an iced coffee splash."),
    shelter: im("catfe/bus-shelter", 1480, 1454, "Catfé buy-one-get-one poster on a bus shelter at night."),
    inRoom: im("catfe/in-room", 535, 803, "Catfé cookie poster on a café wall with people reading."),
  },
  skin: {
    logoCard: im("skinvibes/logo-card", 568, 326, "SkinVibes logotype on a card with a drawn sprig."),
    cardBack: im("skinvibes/card-back", 568, 326, "SkinVibes card reverse with contact details."),
    care: im("skinvibes/poster-care", 530, 662, "SkinVibes poster: Care for your skin, cleanser tube on a cream smear."),
    clear: im("skinvibes/poster-clear-skin", 530, 662, "SkinVibes poster: Clear skin, confident you, 20% off."),
    cleanser: im("skinvibes/poster-cleanser", 378, 473, "SkinVibes cleanser feature poster with hand-drawn arrows."),
    sunscreen: im("skinvibes/poster-sunscreen", 389, 486, "SkinVibes poster: Why sunscreen."),
    launch: im("skinvibes/poster-launch", 378, 473, "SkinVibes poster: New arrival, sunscreen, citrus palette."),
    letterhead: im("skinvibes/letterhead", 454, 567, "SkinVibes letterhead on textured stock."),
    emailProduct: im("skinvibes/email-product", 424, 600, "SkinVibes product email."),
    emailOffer: im("skinvibes/email-offer", 424, 600, "SkinVibes offer email."),
  },
  arihant: {
    learning: im("arihant/learning-by-doing", 528, 660, "Arihant Public School: Admission open, learning by doing, excelling by exploring."),
    facilities: im("arihant/facilities", 440, 550, "Arihant Public School admission poster listing facilities."),
    step: im("arihant/step-today", 440, 550, "Admission open for 2026: Step today, leap tomorrow."),
    earlyBird: im("arihant/early-bird", 550, 389, "School admission early-bird banner with 30% discount."),
    proof: im("arihant/proof", 440, 370, "Admission is open, built around a Taekwondo gold medallist."),
    science: im("arihant/science", 528, 660, "Science exhibition poster in deep space blue."),
    robotics: im("arihant/robotics", 440, 550, "Now robotic labs, facility launch poster."),
    summer: im("arihant/summer-camp", 440, 550, "Kids summer camp poster: unplug, explore, grow."),
    sports: im("arihant/sports-fiesta", 467, 660, "Sports fiesta Taekwondo admission poster."),
    earlyYears: im("arihant/early-years", 528, 660, "Play is the beginning of all learning, early years poster."),
    diwali: im("arihant/diwali", 352, 440, "Happy Diwali festive post."),
    baisakhi: im("arihant/baisakhi", 352, 440, "Happy Baisakhi festive post."),
    shivratri: im("arihant/shivratri", 352, 440, "Maha Shivratri festive post."),
    republic: im("arihant/republic-day", 352, 440, "Republic Day festive post."),
  },
  reels: {
    profilePoster: im("reels/company-profile-poster", 1600, 900, "Amrut.AI company profiles launch film: Every company. One complete profile."),
    profileThumbs: Array.from({ length: 16 }, (_, i) => im(`reels/company-profile-t${String(i).padStart(2, "0")}`, 240, 135, "")),
    walkPoster: im("reels/walkthrough-poster", 1600, 900, "Amrut.AI homepage: The AI Visibility Platform That Tells You Exactly What To Do Next."),
    walkThumbs: Array.from({ length: 12 }, (_, i) => im(`reels/walkthrough-t${String(i).padStart(2, "0")}`, 240, 135, "")),
  },
  marks: {
    ggPositive: im("marks/glowgrow-positive", 1400, 1400, "Glow Grow lettermark: two serif Gs, the larger one's spine turning into an upward arrow, black on white."),
    ggNegative: im("marks/glowgrow-negative", 1400, 1400, "Glow Grow lettermark in white on black."),
    ggSizes: im("marks/glowgrow-sizes", 2135, 500, "Glow Grow lettermark at 160, 96, 48 and 24 pixels."),
    fbSketch: im("marks/flixbus-sketch", 451, 246, "Pencil sketch of the FlixBus wordmark with the arrow in the f and the bus in the b."),
    fbMono: im("marks/flixbus-mono", 1600, 900, "FlixBus concept wordmark in one colour."),
    fbColour: im("marks/flixbus-colour", 1600, 900, "FlixBus concept wordmark in two greens with the tagline Travel That Cares and a leaf."),
    fbApplied: im("marks/flixbus-applied", 901, 492, "FlixBus concept wordmark pressed into textured white stock."),
    kpMonogram: im("marks/keithshon-monogram", 1200, 900, "Keithshon & Partner horizontal lockup: a KP monogram in navy and gold."),
    kpArrow: im("marks/keithshon-arrow", 1200, 900, "Keithshon & Partner monogram with an upward arrow on the K."),
    kpRibbon: im("marks/keithshon-ribbon", 1200, 900, "Keithshon & Partner monogram with a ribbon-built P."),
    kpCross: im("marks/keithshon-cross", 1200, 900, "Keithshon & Partner care symbol: a medical cross holding a handshake."),
    kpShield: im("marks/keithshon-shield", 1200, 900, "Keithshon & Partner shield with a handshake and a capsule."),
    kfpl: im("marks/kfpl", 1600, 1000, "KFPL Shraddha illustrated logo: sunrise over fields, wheat and a farmer around a hand-lettered script."),
  },
  nuage: {
    a: im("nuage/design-a", 834, 469, "Design A, as supplied with the brief: three speakers on pink, yellow and teal pill shapes beside the headline."),
    b: im("nuage/design-b", 833, 453, "Design B, as supplied with the brief: a multicoloured headline over three speaker photos and a register button."),
    c: im("nuage/design-c", 832, 466, "Design C, as supplied with the brief: a calm blue layout with three speakers in a rectangle, a circle and a triangle."),
    redesign: im("nuage/redesign-social", 1536, 1024, "Redesign: 7,000 set at display size, the question What did they reveal? beneath it, three matching speaker portraits and a Save your spot button."),
    v1Portrait: im("nuage/a4-portrait-v1", 794, 1123, "A4 portrait, version 1: deep indigo with 7,000 at the top and a segmented band of marks."),
    v1Landscape: im("nuage/a4-landscape-v1", 1123, 794, "A4 landscape, version 1: deep indigo with speakers in a row and a teal register button."),
    v2Portrait: im("nuage/a4-portrait-v2", 794, 1123, "A4 portrait, version 2: off-white with 7,000 in burgundy serif and a burgundy footer."),
    v2Landscape: im("nuage/a4-landscape-v2", 1123, 794, "A4 landscape, version 2: off-white, burgundy, muted gold and deep green."),
  },
  sbux: {
    survey: im("starbucks/survey", 1734, 1583, "User survey stats: four donut charts on ordering habits, age, app tenure and preferred apps."),
    journey: im("starbucks/journey", 1024, 768, "Starbucks customer journey map from awareness to loyalty, with pain points and solutions."),
    flow: im("starbucks/userflow", 1920, 733, "User flow from opening the app to order confirmation."),
    lofi: im("starbucks/lofi", 1310, 840, "Thirteen low-fidelity wireframes in Figma."),
    hifi: im("starbucks/hifi", 1310, 860, "Thirteen high-fidelity screens: splash, menu, flavours, cup size, queue and payment."),
    prototype: im("starbucks/prototype", 1170, 762, "The Figma prototype with every screen wired together."),
    splash: im("starbucks/splash", 588, 1103, "Splash screen: the Starbucks logo over Brew your own cup on mint."),
    onboarding: im("starbucks/onboarding", 556, 1104, "Onboarding screen: two friends sharing coffee and a Start brewing button."),
  },
  freelance: {
    urbanBuy: im("freelance/urbanbuy-banner", 1445, 360, "Urban Buy superstore Republic Day banner: 2 din, 2 guna fayda, with free gifts and buy-one-get-one offers."),
    udupi: im("freelance/udupi-republic-day", 796, 1024, "Udupi restaurant Republic Day poster: dosa and chutneys on a banana leaf under a temple arch."),
    dolphin: im("freelance/dolphin-canada-2026", 1080, 1080, "Dolphin Education Consultancy post: Admission open for 2026, Canada, with a graduate holding a Canadian flag."),
  },
  clario: {
    poster: im("clario/poster", 1600, 1200, "Clario landing page: Budgeting reimagined for today's world."),
    thumbs: Array.from({ length: 12 }, (_, i) => im(`clario/t${String(i).padStart(2, "0")}`, 240, 180, "")),
  },
};

/* ---------------- case studies ---------------- */

export type Block =
  | { type: "gallery"; cols: "1" | "2" | "3" | "4" | "7-5" | "5-7"; items: Shot[]; pad?: boolean }
  | { type: "annotated"; img: Img; notes: { x: number; y: number; title: string; text: string }[] }
  | { type: "swipe"; items: Shot[] }
  | { type: "browser"; img: Img; url: string }
  | { type: "video"; ids: string[] }
  | { type: "rules"; items: { title: string; text: string }[] }
  | { type: "compare"; before: Shot; after: Shot }
  | { type: "quote"; text: string; by: string }
  | { type: "statement"; big: string; line: string; accent: string };

export type Chapter = { n: string; title: string; id?: string; kicker?: string; intro?: string; blocks: Block[] };

export type Project = {
  slug: string;
  /** Featured projects stack on the home page; the rest sit under "More work". */
  featured: boolean;
  /** Set for light case colours, so the nav and lines switch to dark ink. */
  light?: boolean;
  name: string;
  short: string;
  year: string;
  color: string;
  text: string;
  card: string;
  tags: string[];
  cardMedia: [Img, Img, Img];
  summary: string;
  meta: { k: string; v: string }[];
  story: { label: string; lead: string[]; body?: string };
  chapters: Chapter[];
  outcome: { n: string; t: string }[];
};

export const projects: Project[] = [
  {
    slug: "amrut-ai",
    featured: true,
    name: "Amrut.AI",
    short: "Amrut.AI",
    year: "2026 – now",
    color: "#1A1840",
    text: "#F3EFE8",
    card: "Social and motion for an AI-visibility platform. 40+ creatives in under two weeks, six series, one brand.",
    tags: ["Social campaigns", "Carousels", "Ad series", "Motion"],
    cardMedia: [I.amrut.searchLess, I.amrut.c3, I.amrut.favourite],
    summary:
      "Amrut.AI shows brands how ChatGPT, Gemini, Perplexity and Google AI Mode talk about them. Most people have never thought about that problem, so every piece had one job: make it obvious in one look, and move people to a free scan.",
    meta: [
      { k: "Role", v: "Graphic designer & video editor" },
      { k: "Scope", v: "Carousels, ad series, product posts, launch film, product walkthrough" },
      { k: "When", v: "Aug 2026 – present, hybrid with the Vancouver team" },
      { k: "Tools", v: "Photoshop, Illustrator, Figma, Premiere Pro, After Effects, Firefly" },
    ],
    story: {
      label: "The brief",
      lead: [
        "Nobody searches for “AI visibility”. So the work couldn’t lead with the product. It had to lead with the shift: people search less, and ask more.",
      ],
      body:
        "I produced more than 40 pieces in 13 days, grouped into series. Each series has its own visual system, from photo-real product scenes to neo-brutalist hooks. The logo gradient, the purple ink and plain-language headlines keep it one brand.",
    },
    chapters: [
      {
        n: "00",
        title: "People search less. They ask more.",
        kicker: "Featured · 4:5 single post",
        intro:
          "The search shift explained without a single screenshot. A brass magnifying glass and a ceramic speech bubble on a lavender set: one object for the old way of finding things, one for the new. Hover or tap the numbers.",
        blocks: [
          {
            type: "annotated",
            img: I.amrut.searchLess,
            notes: [
              { x: 5, y: 15.7, title: "Eyebrow pill", text: "A small dark pill sets the topic before the headline, so the post reads as part of a series." },
              { x: 40, y: 36, title: "Two-colour headline", text: "Navy for the old behaviour, violet for the new one. The colour change is the story." },
              { x: 43.5, y: 51.9, title: "The metaphor", text: "Real objects instead of UI. Searching becomes a magnifying glass, asking becomes a speech bubble." },
              { x: 74.5, y: 77.4, title: "Object labels", text: "Two tiny pills name the objects, so nobody has to guess the metaphor." },
              { x: 91.6, y: 56.4, title: "One palette", text: "Background, type and logo stay in one lavender family. Only the white bubble breaks it, pulling the eye to asking." },
            ],
          },
        ],
      },
      {
        n: "01",
        title: "The AI visibility carousel",
        kicker: "Carousel · 1:1 · Instagram & LinkedIn",
        intro:
          "A story told slide by slide: search is changing, your competitor is already in the answer, here is what AI says about you, and here is how to fix it. Dashboards sit inside real desk scenes so the software feels tangible. Swipe it.",
        blocks: [
          {
            type: "swipe",
            items: [
              shot(I.amrut.c1, "Search is changing", "Traditional search and AI search side by side. The hook is the comparison."),
              shot(I.amrut.c2, "Your competitor could be in the answer", "A real-looking ChatGPT answer, with “your brand” missing from it."),
              shot(I.amrut.c3, "What does AI say about your brand?", "The product appears for the first time, on a laptop in a real room."),
              shot(I.amrut.c5, "Measure it. Understand it. Improve it.", "Three verbs, three weights, one feature list."),
              shot(I.amrut.c6, "AI visibility is the next battleground", "The close. One button, one place to go."),
            ],
          },
        ],
      },
      {
        n: "02",
        title: "Free-scan ad series",
        kicker: "Single posts · 1:1 · one template",
        intro:
          "One template, many angles: a direct headline, an example UI card that proves the point, a handwritten nudge and a gradient CTA to the free scan. Each post targets one pain point.",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.amrut.scanRec, "Searchable vs recommendable", "A search result that finds the brand, beside an AI answer that leaves it out. The gap is shown, not told."),
              shot(I.amrut.scanComp, "Share of voice", "A ranked bar chart with the viewer’s own brand in last place. The handwritten note does the selling."),
              shot(I.amrut.scanCrawl, "Blocked crawlers", "A robots.txt card shows the one line that can hide a site from AI. A dry technical point, made in one look."),
            ],
          },
        ],
      },
      {
        n: "03",
        title: "Annotated product posts",
        kicker: "Single posts · annotated UI",
        intro:
          "Posts that put the real product on screen. Handwritten callouts walk the viewer through the dashboard, so a feature like AI share of voice reads in seconds instead of needing a demo.",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.amrut.sov, "Track your AI share of voice", "Four callouts, four things to notice, in the order the eye should find them."),
              shot(I.amrut.howSee, "How does AI see your brand?", "Step one and the result on the same canvas: enter a domain, get a score."),
            ],
          },
        ],
      },
      {
        n: "04",
        title: "Photo-led stories",
        kicker: "Single posts · 4:5 · lifestyle & still life",
        intro:
          "The search shift told through objects and people. Real scenes make an abstract idea feel familiar, and the UI elements stay small enough to feel like part of the photograph.",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.amrut.pagesAnswers, "Then and now", "A worn index book and a phone with an answer on it. Two pills, THEN and NOW, do the rest."),
              shot(I.amrut.questions, "Asked out loud", "Questions got longer and more personal. The quote card is exactly the kind of prompt people now speak."),
              shot(I.amrut.shortlist, "The shortlist", "AI picks three before anyone visits a site. The post asks the only question that matters: is your brand on it?"),
            ],
          },
        ],
      },
      {
        n: "05",
        title: "The search shift",
        kicker: "Single posts · 1:1 · typographic",
        intro:
          "A calm, typographic series about one behaviour change: people stopped typing keywords and started asking full questions. Paper, checklists and a then-and-now search bar do the explaining.",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.amrut.tenTabs, "One answer replaces ten tabs", "The old way and the new way as a checklist on paper. The ticks do the comparing."),
              shot(I.amrut.shiftLess, "People search less", "The series line, set beside a phone held mid-question."),
              shot(I.amrut.keywords, "From keywords to conversations", "A four-word query against a full sentence with budget and context built in."),
            ],
          },
        ],
      },
      {
        n: "06",
        title: "Engagement posts",
        kicker: "Single posts · 4:5 · comment & stop-scroll",
        intro:
          "Two ways to start a conversation. A calm poll that asks people to comment A, B or C, and a loud neo-brutalist hook with a struck-through brand name that makes the problem impossible to miss.",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.amrut.poll, "The recommendation test", "A comment prompt dressed as a quiz. Low effort to answer, so people do."),
              shot(I.amrut.favourite, "Is it you?", "Hard shadows, a highlighter tag and the viewer’s brand crossed out of the answer."),
            ],
          },
        ],
      },
      {
        n: "07",
        id: "motion-frames",
        title: "Motion",
        kicker: "Product films · 16:9 · with sound",
        intro: "A 93-second launch film for company profiles, and a 16-second walkthrough from the homepage to a finished LLMS.txt file. Both cut from the real product, both play here with sound.",
        blocks: [{ type: "video", ids: ["amrut-company-profile", "amrut-walkthrough"] }],
      },
    ],
    outcome: [
      { n: "40+", t: "creatives designed in 13 days" },
      { n: "6", t: "social series, each with its own visual system" },
      { n: "2", t: "product films: a 93-second launch and a 16-second walkthrough" },
    ],
  },
  {
    slug: "catfe",
    featured: true,
    name: "Catfé",
    short: "Catfé",
    year: "2025",
    color: "#8F5E3B",
    text: "#F6EFE6",
    card: "A cat café drawn as one warm, minimal system, from the logotype to the hanging sign, the cup and the bus shelter.",
    tags: ["Brand identity", "Packaging", "Signage", "Poster campaign"],
    cardMedia: [I.catfe.pBogo, I.catfe.window, I.catfe.bag],
    summary:
      "“Where comfort meets its place.” A café for people who love peaceful spaces, comforting drinks and friendly cats. I took it all the way through, from logotype to signage, packaging and outdoor advertising.",
    meta: [
      { k: "Role", v: "Identity design, art direction, production" },
      { k: "Scope", v: "Logotype, palette, stationery, menu, packaging, signage, posters" },
      { k: "Year", v: "2025" },
      { k: "Palette", v: "Caramel #A6734A, oat #E7DBCF, coffee #6B3A22" },
    ],
    story: {
      label: "The idea",
      lead: [
        "The C of Catfé doubles as a cat’s head and tail, with a small heart for a nose. One mark that reads as a letter and an animal, so it never needs a separate symbol.",
      ],
      body:
        "Caramel and oat carry almost everything, with a deep coffee brown to ground the stationery. That restraint lets the photography carry the warmth, and it is why the system holds from a coffee pouch to a bus shelter.",
    },
    chapters: [
      {
        n: "01",
        title: "Logotype",
        kicker: "Primary & reversed",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.catfe.logoClay, "Oat on caramel", "A high-contrast serif with the C redrawn as a seated cat, and a heart where the nose sits."),
              shot(I.catfe.logoOat, "Caramel on oat", "Tested both ways round before anything else was built, so the mark holds on cups, glass and night signage."),
            ],
          },
        ],
      },
      {
        n: "02",
        title: "Direction & palette",
        kicker: "Before a single mark was drawn",
        blocks: [
          {
            type: "gallery",
            cols: "7-5",
            items: [
              shot(I.catfe.moodboard, "Direction", "Milk swirls, worn wood, low pendant light. The reference set that fixed the palette first."),
              shot(I.catfe.palette, "Caramel and oat", "Two colours do almost all the work. Restraint is what lets the photography carry the warmth."),
            ],
          },
        ],
      },
      {
        n: "03",
        title: "On the street",
        kicker: "Signage & environment",
        blocks: [
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.catfe.signs, "Hanging sign", "Brass housing, two fills: caramel on oat for daylight, oat on caramel when it’s lit.")],
          },
          {
            type: "gallery",
            cols: "7-5",
            items: [
              shot(I.catfe.posterDecal, "Wall poster and window decal", "Gold on black inside, oat on glass outside. The same mark, scaled from a frame to a shopfront."),
              shot(I.catfe.window, "Window vinyl", "Set oversized so the cat reads from across the street, with the counter visible straight through it."),
            ],
          },
        ],
      },
      {
        n: "04",
        title: "Stationery & menu",
        kicker: "Print collateral",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.catfe.cards, "Business cards", "An arch borrowed from the doorway holds the mark. Paw prints sit at low opacity so they texture rather than decorate."),
              shot(I.catfe.letterhead, "Letterhead", "The arch at the top, a ghosted mark in the middle, the contact bar at the foot. A full page of brand with room left to write."),
            ],
          },
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.catfe.menu, "Menu", "Three sections, hairline rules, prices flush right. Built to be scanned in the queue, not read at the table."),
              shot(I.catfe.menuTable, "Menu, in place", "Staged on the table it belongs to, to check the cream stock against real light and real coffee."),
            ],
          },
        ],
      },
      {
        n: "05",
        title: "Packaging & the system",
        kicker: "One mark, a whole counter",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.catfe.system, "The system together", "Cards, coaster, cup, notepad, carry bag and menu. The test of whether one mark can hold a whole counter."),
              shot(I.catfe.stickers, "Sticker set", "Four shapes, four lockups, including an illustrated pair for takeaway seals and loyalty cards."),
            ],
          },
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.catfe.bag, "Bean pouch", "Kraft pouch, one label, the logo calm and centred. The shelf piece that works without the café around it."),
              shot(I.catfe.ceramic, "Tumbler", "The mark at its smallest usable size, printed on a curve where the cat outline could easily have collapsed."),
            ],
          },
        ],
      },
      {
        n: "06",
        title: "Poster campaign",
        kicker: "Four offers, one voice",
        intro: "The posters push the brand harder than anything else in the system: bold type and food photography, with the logo held back to a signature.",
        blocks: [
          {
            type: "gallery",
            cols: "4",
            items: [
              shot(I.catfe.pBogo, "Buy one, get one", "The split field does the work: the offer is legible before a single word is read."),
              shot(I.catfe.pHours, "Cappuccino", "A centre panel drops out of the blurred interior so the drink, hours and price stack in one read."),
              shot(I.catfe.pCookies, "Cookies", "All type, one product. Cookies crop into the corners so the frame feels bitten into."),
              shot(I.catfe.pFirst, "First-visit offer", "Cool slate above, warm photography below. A deliberate break from the palette to make the offer register."),
            ],
          },
        ],
      },
      {
        n: "07",
        title: "In the wild",
        kicker: "Checked at distance",
        blocks: [
          {
            type: "gallery",
            cols: "7-5",
            items: [
              shot(I.catfe.shelter, "Bus shelter", "Checked at night and at distance, where only the split and the splash survive."),
              shot(I.catfe.inRoom, "In the room", "Against busy wallpaper the poster still holds, which is the only proof that mattered."),
            ],
          },
        ],
      },
    ],
    outcome: [
      { n: "15+", t: "pieces carried by one mark" },
      { n: "3", t: "colours: caramel, oat and a coffee brown" },
      { n: "1", t: "mark that reads as a letter and a cat" },
    ],
  },
  {
    slug: "nuage-webinar",
    featured: true,
    name: "Nuage webinar",
    short: "Nuage",
    year: "2026",
    color: "#6E1F3A",
    text: "#F6EFE6",
    card: "Three designers made an ad for the same webinar. I ranked them, wrote the feedback, found the idea, then rebuilt the weakest one.",
    tags: ["Design critique", "Art direction", "Campaign system", "Redesign"],
    cardMedia: [I.nuage.v2Portrait, I.nuage.redesign, I.nuage.v1Portrait],
    summary:
      "A design-review brief for Nuage, a NetSuite consultancy. Three ads had been made for one webinar: The Post-Implementation Problem, what 7,000 NetSuite requests revealed. I ranked them on how clearly they communicate, wrote the feedback I would give each designer, set a campaign direction, and rebuilt the weakest one myself.",
    meta: [
      { k: "Role", v: "Reviewer, art director and designer" },
      { k: "Scope", v: "Critique of three designs, campaign direction, redesign, A4 print formats" },
      { k: "When", v: "September 2026, design-lead assessment" },
      { k: "Audience", v: "NetSuite users, ERP decision-makers and implementation teams" },
    ],
    story: {
      label: "The approach",
      lead: [
        "I judged each design on one question: does the message come across? Not on whether I liked the look of it.",
      ],
      body:
        "Each part fed the next. The review found the idea, the idea set the direction, and the redesign is my own critique applied, so the reasoning and the result line up.",
    },
    chapters: [
      {
        n: "01",
        title: "Three designs, one webinar",
        kicker: "The brief · ranked strongest to weakest",
        intro: "These three ads were supplied with the brief; none of them is my work. Same event, same speakers, three very different answers.",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.nuage.a, "Design A · ranked first", "Clear zones and a speaker system that could repeat across a campaign. But the faces register before the topic, “Net-Suite” breaks across two lines, and 7,000 is the same size as the words around it."),
              shot(I.nuage.b, "Design B · ranked second", "Real energy, and the hierarchy still holds. But the headline alone uses four colours, so colour stops ranking anything, and every element sits at full contrast."),
              shot(I.nuage.c, "Design C · ranked third", "The calmest layout and the weakest communication: 7,000 is buried in the sentence, three speakers sit in three different shapes, and there is no call to action."),
            ],
          },
          {
            type: "quote",
            text: "The breathing room here is a real strength and I would keep it. My concern is that the space on its own is not doing the communicating. I would pick one speaker treatment, repeat it, and let the number lead.",
            by: "My feedback to the designer of Design C",
          },
        ],
      },
      {
        n: "02",
        title: "The idea is the number",
        kicker: "Creative direction",
        intro: "7,000 was the first thing that caught my eye in all three designs, and all three treated it as supporting detail. A number on its own is a fact; a question next to it gives people a reason to stop. The webinar is where they get the answer.",
        blocks: [
          { type: "statement", big: "7,000", line: "NetSuite requests.", accent: "What did they reveal?" },
          {
            type: "rules",
            items: [
              { title: "The number comes first", text: "Every piece opens on a figure at display size." },
              { title: "The question follows it", text: "Set underneath, in the same two-part rhythm." },
              { title: "One speaker treatment", text: "Same container, same size relationship, same order." },
              { title: "A band of marks", text: "Small repeated marks suggest the volume of requests, more honest than inventing a chart." },
              { title: "A fixed footer", text: "Date and time on the left, the call to action on the right." },
            ],
          },
        ],
      },
      {
        n: "03",
        title: "Design C, rebuilt",
        kicker: "Before & after",
        intro: "I ranked Design C last but chose it to rebuild. Every problem I found in it could be fixed, and it already had the calm composition to build on.",
        blocks: [
          {
            type: "compare",
            before: shot(I.nuage.c, "Before: Design C as submitted", "Even spacing, 7,000 inside the sentence, three speaker shapes, no call to action."),
            after: shot(I.nuage.redesign, "After: my redesign", "Hook, question, context, speakers, date, call to action. The speaker photos and event details in this version are stand-ins."),
          },
          {
            type: "rules",
            items: [
              { title: "7,000, much larger", text: "The strongest hook in the design is now the first thing you see." },
              { title: "A question, not a statement", text: "“What did they reveal?” gives people a reason to be curious." },
              { title: "One reading order", text: "Hook, question, context, speakers, date, then the action, so nothing competes." },
              { title: "One speaker system", text: "One container repeated three times; the real headshots drop into the same shape." },
              { title: "Spacing that groups", text: "Space used to group related information instead of spreading it evenly." },
            ],
          },
        ],
      },
      {
        n: "04",
        title: "Same system, other formats",
        kicker: "A4 print · two directions",
        intro: "The hierarchy and speaker system stay fixed; only format and colour change. Version 1 takes Design A’s colours and turns them into the band of marks. Version 2 is a warmer editorial direction for print: off-white, burgundy, muted gold and deep green.",
        blocks: [
          {
            type: "gallery",
            cols: "5-7",
            items: [
              shot(I.nuage.v1Portrait, "A4 portrait · version 1", "Deep indigo, with the colour from Design A doing a job: each segment of the band is a slice of the requests."),
              shot(I.nuage.v1Landscape, "A4 landscape · version 1", "The same reading order turned on its side, speakers in a row above the footer."),
            ],
          },
          {
            type: "gallery",
            cols: "5-7",
            items: [
              shot(I.nuage.v2Portrait, "A4 portrait · version 2", "A serif 7,000 in burgundy and a footer band that holds the call to action."),
              shot(I.nuage.v2Landscape, "A4 landscape · version 2", "Initials stand in for headshots, so the speaker system works before photography arrives."),
            ],
          },
        ],
      },
      {
        n: "05",
        title: "Running the work",
        kicker: "Three studio scenarios from the brief",
        intro: "The brief also asked how I would handle three real situations on a small team.",
        blocks: [
          {
            type: "rules",
            items: [
              { title: "Quality vs deadline", text: "Four hours in, still off-brief, two hours left. Step in now, name the direction as the problem, keep what is usable, give one simple direction and check in halfway. If it can’t be done well, tell the client early." },
              { title: "Competing priorities", text: "A 90-minute client revision, tomorrow’s big project, a delayed internal task. The fixed client deadline goes to the experienced designer; the junior starts tomorrow’s project with an early checkpoint; the internal task gets a new date, said out loud." },
              { title: "Repeated feedback", text: "Same mistake again. Find out why first: an unclear expectation, a skill gap, or no way to self-check. Show “correct” side by side, move the check earlier, and follow up over the next few pieces." },
            ],
          },
        ],
      },
    ],
    outcome: [
      { n: "3", t: "designs reviewed, with written feedback for each designer" },
      { n: "5", t: "rules that keep every asset one campaign" },
      { n: "3", t: "formats from one system, in two colour directions" },
    ],
  },
  {
    slug: "logos",
    featured: true,
    name: "Logos & marks",
    short: "Logos",
    year: "2025–26",
    color: "#1C1B19",
    text: "#F3EFE8",
    card: "A lettermark, a rebrand concept and logo routes. One idea per mark: an arrow growing out of a G, a bus inside a b.",
    tags: ["Lettermark", "Rebrand concept", "Logo routes", "Mono & small-size tests"],
    cardMedia: [I.marks.ggPositive, I.marks.fbColour, I.marks.kpMonogram],
    summary:
      "Every project starts with the same question: what is the one thing this brand should stand for? That idea becomes the mark. Then each mark is checked in one colour, at small sizes and on a real application.",
    meta: [
      { k: "Role", v: "Logo design" },
      { k: "Scope", v: "Lettermark, rebrand concept, logo routes, illustrated mark" },
      { k: "Years", v: "2025–26" },
      { k: "Method", v: "Sketch, one colour, small sizes, applied" },
    ],
    story: {
      label: "The rule",
      lead: ["One idea per mark: a cat hidden in a C, a bus inside a b, an arrow growing out of a G."],
      body: "Catfé has its own case study. This page collects the rest: a lettermark built for small sizes, a self-initiated rebrand, two routes for a healthcare partner, and an illustrated mark for an agriculture brand.",
    },
    chapters: [
      {
        n: "01",
        title: "Glow Grow",
        kicker: "Lettermark",
        intro: "Two serif Gs, one for each word. The larger G’s spine turns into an upward arrow for growth, and it holds the smaller G inside, so the two words read as one mark.",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.marks.ggPositive, "Positive", "Black on white. The arrow is cut from the G’s own spine, so the growth idea costs no extra shape."),
              shot(I.marks.ggNegative, "Negative", "White on black, checked separately because the counters change weight when reversed."),
            ],
          },
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.marks.ggSizes, "Small sizes", "160, 96, 48 and 24 pixels. Checked down to icon size so the inner G stays readable.")],
          },
        ],
      },
      {
        n: "02",
        title: "FlixBus",
        kicker: "Rebrand concept · self-initiated, not affiliated with or commissioned by FlixBus",
        intro: "A rebrand built around the line “Travel That Cares”. The arrow in the f points forward, the b turns into a bus, and a small leaf on the tagline brings in the sustainability story.",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.marks.fbSketch, "01 · Sketch", "Letterforms drawn by hand first, to find the arrow and the bus before any vector work."),
              shot(I.marks.fbMono, "02 · One colour", "Checked without colour, so the idea holds before any green goes in."),
            ],
          },
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.marks.fbColour, "03 · Colour", "Two greens split “flix” and “bus” and tie the brand to the leaf."),
              shot(I.marks.fbApplied, "04 · Applied", "Pressed into textured stock to see how the counters and the bus window hold in print."),
            ],
          },
        ],
      },
      {
        n: "03",
        title: "Keithshon & Partner",
        kicker: "Logo routes · healthcare",
        intro: "Directions for a health partner with the line “Your Partner In Good Health”. Route A is a KP monogram in navy and gold that feels established. Route B is a care symbol: a cross or shield that holds a handshake, so “partner” and “health” read in one shape.",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.marks.kpMonogram, "Route A · horizontal lockup", "K and P interlock inside a circle; navy for trust, gold for a premium feel."),
              shot(I.marks.kpArrow, "Route A · upward arrow", "The K’s arm extends into an arrow for progress."),
              shot(I.marks.kpRibbon, "Route A · ribbon P", "The P built from folded bands, a softer take on the same pairing."),
            ],
          },
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.marks.kpCross, "Route B · cross and handshake", "Partner and health in one symbol, readable at a glance on a clinic sign."),
              shot(I.marks.kpShield, "Route B · shield", "The same handshake inside a shield, for a more protective tone."),
            ],
          },
        ],
      },
      {
        n: "04",
        title: "KFPL Shraddha",
        kicker: "Illustrated logo · agriculture",
        intro: "A warm, illustrative mark: a sunrise over ploughed fields, wheat ears and a smiling farmer carrying a harvest, around a hand-lettered script in field green and wheat gold.",
        blocks: [
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.marks.kfpl, "Lettering and illustration", "A flowing script for Shraddha on a gold ribbon. The farmer gives the brand a friendly, human face.")],
          },
        ],
      },
    ],
    outcome: [
      { n: "4", t: "brands across travel, health, agriculture and a lettermark" },
      { n: "24px", t: "smallest size the Glow Grow mark was checked at" },
      { n: "Mono", t: "first: each mark is checked in one colour before colour goes in" },
    ],
  },
  {
    slug: "arihant",
    featured: true,
    name: "Arihant Public School",
    short: "Arihant",
    year: "2026",
    color: "#16306E",
    text: "#F3EFE8",
    card: "Six months in-house for a school in a four-campus group: admissions, events and a festival every few weeks, on a weekly deadline.",
    tags: ["Admissions campaigns", "Event branding", "Festive social", "Print"],
    cardMedia: [I.arihant.science, I.arihant.step, I.arihant.diwali],
    summary:
      "Arihant Educational Group runs four campuses across Kota. I designed for one of them: admissions drives, a science exhibition, new robotics labs, a summer camp, a sports fiesta, and a festival every few weeks that parents expected on the feed the same morning.",
    meta: [
      { k: "Role", v: "In-house graphic & social media designer" },
      { k: "Scope", v: "Admissions campaigns, event branding, festive posts, print collateral" },
      { k: "When", v: "Jan – Jul 2026, Kota" },
      { k: "Constraint", v: "Fixed navy and gold, four campus names on every piece, weekly turnaround" },
    ],
    story: {
      label: "The job",
      lead: [
        "One designer, one school calendar, no slow weeks. Every piece had to work twice: as a phone-screen post in a parent’s feed, and as a printed piece on a noticeboard or a hoarding.",
      ],
      body:
        "I did the concept, layout, photo compositing and final artwork on every piece, from brief to export. More than 50 posters, banners, brochures, standees and social creatives in six months, all of them recognisably the same school.",
    },
    chapters: [
      {
        n: "00",
        title: "What every piece had to carry",
        kicker: "The rules",
        blocks: [
          {
            type: "rules",
            items: [
              { title: "Fixed palette", text: "School navy and gold, with room for one departure per campaign when the subject earned it." },
              { title: "Crest, top corner", text: "The crest sits in the same position on every layout, so the set reads as one school at a glance." },
              { title: "Four campuses", text: "Festive and campaign pieces end with all four campuses and their numbers, legible at thumbnail size." },
              { title: "One next step", text: "Enrol, register, call. One action per piece, in a block that never competes with the headline." },
            ],
          },
        ],
      },
      {
        n: "01",
        title: "Campus identity",
        kicker: "Hoardings, noticeboards, top of funnel",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.arihant.learning, "Learning by doing, excelling by exploring", "The flagship layout: campus facade as the base, a hexagon strip of student life, and the school’s promise set in two weights so it reads first."),
              shot(I.arihant.facilities, "Facilities overview", "A two-column build for parents comparing schools: facilities on the left, three circular call-outs on the right, enrolment at the base."),
            ],
          },
        ],
      },
      {
        n: "02",
        title: "Admissions",
        kicker: "Three angles on one ask",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.arihant.step, "Step today, leap tomorrow", "Open sky, a cut-out photograph and a single line of promise. The cleanest of the run, built to be reused all season."),
              shot(I.arihant.earlyBird, "Early-bird drive", "A deadline piece. Checklist columns carry the sports facilities; the discount and date sit in a panel that survives a square crop."),
              shot(I.arihant.proof, "Proof, not promises", "Built around a real student, a Taekwondo gold medallist, so the claim is carried by a photograph instead of an adjective."),
            ],
          },
        ],
      },
      {
        n: "03",
        title: "Programmes & events",
        kicker: "Where the brand got to stretch",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.arihant.science, "Science exhibition", "The one brief that earned its own palette: deep space blue, orbit lines and an icon for each track, still recognisably the school."),
              shot(I.arihant.robotics, "Robotics labs", "A facility launch treated like a product launch: one headline, a circular inset of the lab, four reasons and a phone number."),
            ],
          },
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.arihant.summer, "Summer camp", "Layered display lettering for a decision made on feel, with three activity pills doing the detail."),
              shot(I.arihant.sports, "Sports fiesta", "Energy on purpose: a red field well outside the usual palette, and a cut-out kick breaking the frame."),
              shot(I.arihant.earlyYears, "Early years", "A softer register for the youngest intake: warm neutrals, a stepped headline, the photograph left almost alone."),
            ],
          },
        ],
      },
      {
        n: "04",
        title: "Festive calendar",
        kicker: "Due the morning it lands",
        blocks: [
          {
            type: "gallery",
            cols: "4",
            items: [
              shot(I.arihant.diwali, "Diwali", "Mandala corners, a lit diya and gold script. Festive without leaving the school’s navy behind."),
              shot(I.arihant.baisakhi, "Baisakhi", "Illustration-led and warm: bunting, wheat and a bonfire, the message held in a soft arch."),
              shot(I.arihant.shivratri, "Maha Shivratri", "The quietest of the set: moonlight, a single trident and a lot of empty sky."),
              shot(I.arihant.republic, "Republic Day", "The date itself built as the artwork, with monuments drawn along the base in flat tricolour."),
            ],
          },
        ],
      },
    ],
    outcome: [
      { n: "50+", t: "posters, banners, standees and social creatives" },
      { n: "4", t: "campuses named on every festive piece" },
      { n: "Weekly", t: "turnaround, plus campaign bursts" },
    ],
  },
  {
    slug: "skinvibes",
    featured: false,
    name: "SkinVibes",
    short: "SkinVibes",
    year: "2025",
    color: "#2F4C3A",
    text: "#F3EFE8",
    card: "A natural skincare label with a quiet botanical identity, and a campaign built to sell one product at a time.",
    tags: ["Brand identity", "Product campaign", "Email", "Stationery"],
    cardMedia: [I.skin.care, I.skin.clear, I.skin.logoCard],
    summary:
      "A natural skincare label with an elegant, botanical identity, and a campaign built to sell one product at a time.",
    meta: [
      { k: "Role", v: "Identity, campaign and email design" },
      { k: "Scope", v: "Logotype, stationery, product posters, promotional emails" },
      { k: "Year", v: "2025" },
      { k: "Idea", v: "Keep the identity quiet. Let leaf shadow, light and the product carry the colour." },
    ],
    story: {
      label: "The idea",
      lead: [
        "Skincare shelves are loud. SkinVibes stays quiet: a thin high-contrast serif, a single drawn sprig, and a lot of air. Leaf shadow, light and the product itself bring the colour.",
      ],
      body:
        "The campaign sells one product per piece. When the sun range launched, the palette shifted to citrus while the type system stayed exactly where it was.",
    },
    chapters: [
      {
        n: "01",
        title: "Identity",
        kicker: "Logotype & card",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.skin.logoCard, "Logotype", "A high-contrast display serif, an established line and a single drawn sprig. Enough elegance to sit next to premium skincare."),
              shot(I.skin.cardBack, "Card, reverse", "Details split by a rule, ghosted logotype behind. Contact information treated as composition, not as a footer."),
            ],
          },
        ],
      },
      {
        n: "02",
        title: "Product campaign",
        kicker: "One product per piece",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.skin.care, "Care for your skin", "The quietest piece in the set: a smear of cream as the whole background, a circular seal, and the tube dropped in at an angle."),
              shot(I.skin.clear, "Clear skin, confident you", "Benefits ride an arc around the pack, so the discount can sit large on the left without crowding."),
            ],
          },
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.skin.cleanser, "Cleanser feature", "Four claims, four hand-drawn arrows, one product on a plinth. An explainer that still looks like an advert."),
              shot(I.skin.sunscreen, "Why sunscreen", "Education first: four outlined reasons stacked as a column, with the pack held to the right."),
              shot(I.skin.launch, "Launch", "The palette shifts to citrus for the sun range while the type system stays exactly where it was."),
            ],
          },
        ],
      },
      {
        n: "03",
        title: "Letterhead & email",
        kicker: "Print & inbox",
        blocks: [
          {
            type: "gallery",
            cols: "3",
            items: [
              shot(I.skin.letterhead, "Letterhead", "Textured stock, watermark held light, the sprig climbing the lower left corner."),
              shot(I.skin.emailProduct, "Product email", "Hero image, three reasons, one button. Laid out for a phone screen and a two-second decision."),
              shot(I.skin.emailOffer, "Offer email", "Display type carries the header where an image usually would, keeping the file light enough to load fast."),
            ],
          },
        ],
      },
    ],
    outcome: [
      { n: "5", t: "campaign posters on one type system" },
      { n: "2", t: "email creatives built for a phone screen" },
      { n: "1", t: "drawn sprig, used everywhere" },
    ],
  },
  {
    slug: "starbucks-app",
    featured: false,
    light: true,
    name: "Starbucks app",
    short: "Starbucks",
    year: "2025",
    color: "#D4E9E2",
    text: "#1E3932",
    card: "A UX study of the Starbucks ordering flow: survey, journey map, user flow, wireframes and a tested Figma prototype.",
    tags: ["UX research", "User flow", "Wireframes", "Figma prototype"],
    cardMedia: [I.sbux.splash, I.sbux.hifi, I.sbux.survey],
    summary:
      "A B.Des. project: make ordering coffee in the Starbucks app faster without losing the brand. I ran the research, mapped the journey, then designed and prototyped a queue-based ordering flow in Figma. Student project, not affiliated with Starbucks.",
    meta: [
      { k: "Role", v: "UX research, UI design, prototyping" },
      { k: "Scope", v: "Heuristic review, survey, journey map, user flow, wireframes, prototype" },
      { k: "Year", v: "2025, B.Des. Animation & Gaming" },
      { k: "Tools", v: "Figma, surveys, whiteboarding" },
    ],
    story: {
      label: "The problem",
      lead: [
        "Survey answers and app reviews pointed the same way: people struggled to find tasks, and the visual hierarchy didn’t tell them where to look.",
      ],
      body:
        "So the redesign is built around one idea, a queue. Pick a drink, choose a flavour and a cup size, add it to the queue and check out once, with the queue always visible at the bottom of the screen.",
    },
    chapters: [
      {
        n: "01",
        title: "Research",
        kicker: "Heuristic review, survey, reviews",
        intro: "An expert review against Nielsen’s ten usability heuristics, a survey of target users, and a pass through app reviews and social feedback. The finding: task discoverability and visual hierarchy.",
        blocks: [
          {
            type: "gallery",
            cols: "7-5",
            items: [
              shot(I.sbux.survey, "User survey", "Who orders out, how long they have used the app, and which apps they prefer for ordering. Swiggy and Zomato set the bar."),
              shot(I.sbux.journey, "Customer journey map", "Awareness to loyalty. The low point is service: long queues and crowded stores, which mobile ordering can fix."),
            ],
          },
        ],
      },
      {
        n: "02",
        title: "Flow & wireframes",
        kicker: "Structure before style",
        blocks: [
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.sbux.flow, "User flow", "From opening the app to order confirmation, with every branch for sign-in, customisation, cart and checkout.")],
          },
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.sbux.lofi, "Low fidelity", "Thirteen wireframes, including the bottom sheet that became the queue.")],
          },
        ],
      },
      {
        n: "03",
        title: "High fidelity & prototype",
        kicker: "Figma",
        blocks: [
          {
            type: "gallery",
            cols: "2",
            items: [
              shot(I.sbux.splash, "Splash", "“Brew your own cup”, in the app’s mint and house green."),
              shot(I.sbux.onboarding, "Onboarding", "One illustration, one line, one button to start."),
            ],
          },
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.sbux.hifi, "High fidelity", "Menu, flavours, cup size, the queue, swipe to remove, and payment.")],
          },
          {
            type: "gallery",
            cols: "1",
            items: [shot(I.sbux.prototype, "Prototype", "Every screen wired in Figma and tested with users. The final tweaks came from watching how people moved through it.")],
          },
        ],
      },
    ],
    outcome: [
      { n: "13", t: "screens in the final ordering flow" },
      { n: "5", t: "journey stages mapped, awareness to loyalty" },
      { n: "10", t: "usability heuristics behind the expert review" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ---------------- featured AI ad ---------------- */

/* Three cuts of the same ad, frame-for-frame in sync: the final ad and two
   behind-the-scenes cuts showing the build in Lovart. */
export const aiAd = {
  title: "Lovart: a 52-second ad where nothing was filmed",
  client: "Lovart",
  year: "2026",
  dur: 52.28,
  fps: 25,
  lead: "Every face, room and city in this ad was generated. The hook, pacing, captions, sound and the cut were made by hand.",
  note: "An Instagram ad for Lovart, an AI design agent, posted in a dark and a light version. Each final ad splits the screen: the Lovart workspace on top showing every step, the AI presenter below. In the middle is the presenter cut they were built from, one AI character carried through twelve scenes without his face, outfit or pose drifting.",
  cuts: [
    { id: "dark", final: true, tab: "Final · dark", label: "Final ad", sub: "Dark · as posted", audio: true, src: { hd: "/video/lovart-process-01.mp4", sd: "/video/lovart-process-01.mp4" }, poster: im("lovart/poster-process-01", 720, 1280, "Final ad, dark version: the Lovart workspace above the presenter.") },
    { id: "raw", final: false, tab: "The build", label: "How it was built", sub: "The AI presenter cut", audio: false, src: { hd: "/video/lovart-ad.mp4", sd: "/video/lovart-ad-540.mp4" }, poster: im("lovart/poster-ad", 720, 1280, "The AI-generated presenter cut the ads were built from.") },
    { id: "light", final: true, tab: "Final · light", label: "Final ad", sub: "Light · as posted", audio: false, src: { hd: "/video/lovart-process-02.mp4", sd: "/video/lovart-process-02.mp4" }, poster: im("lovart/poster-process-02", 720, 1280, "Final ad, light version: the Lovart workspace above the presenter.") },
  ],
  beats: [
    { t: 0, label: "Hook", text: "Three seconds, straight to camera, before anyone can scroll past." },
    { t: 4, label: "Reveal", text: "“All AI.” The twist lands before the product is named." },
    { t: 6, label: "Prompt to sketch", text: "A text prompt becomes a pencil sketch, then a rendered shot." },
    { t: 16, label: "New scene", text: "The background swaps; the character stays exactly the same." },
    { t: 20, label: "Consistency check", text: "Face, outfit, pose and lighting checked against the original." },
    { t: 28, label: "Image to video", text: "Stills turned into moving shots, then the best takes picked." },
    { t: 36, label: "References", text: "A reference board keeps every new scene on-model." },
    { t: 40, label: "Sound", text: "Voice, music and effects laid in and balanced by hand." },
    { t: 44, label: "The edit", text: "Cut to the voice, word-by-word captions, every beat timed." },
    { t: 48, label: "CTA", text: "One action: comment “LOVART” for the link." },
  ],
  steps: [
    { t: "Hook first", d: "The first three seconds decide the ad, so the claim, “all AI”, comes before the product." },
    { t: "Generate", d: "Character, scenes and shots generated in Lovart from prompts, sketches and references." },
    { t: "Keep it on-model", d: "One face across twelve scenes. Every shot checked for drift before it made the cut." },
    { t: "Finish by hand", d: "Pacing, kinetic captions, sound design and the CTA, edited frame by frame." },
  ],
  tools: ["Lovart", "Text to image", "Image to video", "Premiere Pro", "Kinetic captions", "Sound design", "9:16"],
};

/* ---------------- spec ad: rhythm edit ---------------- */

export const specAd = {
  title: "Coca-Cola: Open the chill",
  tag: "Spec ad · self-initiated, not affiliated with The Coca-Cola Company",
  year: "2026",
  dur: 30,
  src: "/video/coke-open-the-chill.mp4",
  poster: im("coke/poster", 480, 848, "End card: Open the chill, a Coca-Cola bottle and a glass of ice on red."),
  lead: "A 30-second spot cut to one rule: a new shot every three seconds, and a two-word line on each.",
  note: "Macro pours and ice on a red set alternate with a sunny afternoon in the park, so product and mood trade places beat for beat. Six short supers build the script, and the seventh lands it.",
  supers: [
    { t: 0, line: "Turn it up." },
    { t: 1.5, line: "Open the moment." },
    { t: 4.5, line: "Ice cold." },
    { t: 8.5, line: "Sun out." },
    { t: 11.5, line: "Good company." },
    { t: 16.5, line: "Take it easy." },
    { t: 25, line: "Open the chill." },
  ],
  /** shot boundaries in seconds, measured from the cut */
  cuts: [0, 1.5, 4.5, 8.5, 11.5, 14.5, 16.5, 19.5, 23, 25, 30],
  tools: ["9:16", "Rhythm edit", "Kinetic supers", "Product macro", "Sound to picture"],
};

/* ---------------- motion reel ---------------- */

/* Each video in the Motion section. To add one: compress it into /public/video
   (a full-size and a 720p copy), export a poster and 12 timeline thumbnails, then add an entry. */
export type Reel = {
  id: string;
  title: string;
  client: string;
  year: string;
  /** width and height ratio, e.g. [16, 9] */
  ratio: [number, number];
  fps: number;
  dur: number;
  audio: boolean;
  /** loudness per slice of the soundtrack, base-36 (0 silent, z loudest), for the timeline */
  wave?: string;
  src: { hd: string; sd: string };
  poster: Img;
  thumbs: Img[];
  headline: string;
  note: string;
  tags: string[];
};

export const reels: Reel[] = [
  {
    id: "clario",
    title: "Clario hero animation",
    client: "Clario",
    year: "2026",
    ratio: [4, 3],
    fps: 30,
    dur: 6,
    audio: false,
    src: { hd: "/video/clario-hero.mp4", sd: "/video/clario-hero-720.mp4" },
    poster: I.clario.poster,
    thumbs: I.clario.thumbs,
    headline: "A six-second hero animation for Clario, a budgeting app: one camera move through its landing page.",
    note: "The camera pushes in on the phone, the balance counts up, coins drift past and the expense cards settle into place. Then it pulls back to the full page, so the last frame meets the first and the loop never shows a seam.",
    tags: ["After Effects", "Camera moves", "Count-up numbers", "Seamless loop"],
  },
  {
    id: "amrut-company-profile",
    title: "Amrut.AI company profiles launch",
    client: "Amrut.AI",
    year: "2026",
    ratio: [16, 9],
    fps: 30,
    dur: 93.5,
    audio: true,
    wave: "076364598888kwonifqkimecsklkennjnfexvquuquyuqywrtwupzwrwysouuqqyuqywrtwupxxswyvruuqqturywqvwupxwpwyurztqrttozwqwytpxwqvyvrzwrstsouxqwxsr99999899998xwqutpwyssyvqvwupzvrxysousosyssywqvxuqxwryyttutotustyvpxwupxwpyyutzuridba88jhba99998a8ea64210",
    src: { hd: "/video/amrut-company-profile.mp4", sd: "/video/amrut-company-profile-540.mp4" },
    poster: I.reels.profilePoster,
    thumbs: I.reels.profileThumbs,
    headline: "A 93-second launch film for Amrut.AI company profiles: one line, then the whole product in a single take.",
    note: "It opens on the promise, “Every company. One complete profile.”, then flies through a real profile for google.com: traffic, keyword positions, history, competitors, leadership, tech stack and reviews. Callouts pop on the panel being shown, and it closes on one call to action, “Get Company Profile Instantly”, and the logo.",
    tags: ["Premiere Pro", "After Effects", "Product film", "UI motion", "4K master"],
  },
  {
    id: "amrut-walkthrough",
    title: "Amrut.AI product walkthrough",
    client: "Amrut.AI",
    year: "2026",
    ratio: [16, 9],
    fps: 30,
    dur: 16.2,
    audio: true,
    wave: "gg566ck4769m3667luzxtukfdblc688jf578ej488am5888m3888n5678l9688je588fi488am4789m4787n5666m8666je566gh476bl588al4787n4687m7688kc688hg988dk478al3778n4888m6889lb689",
    src: { hd: "/video/amrut-walkthrough.mp4", sd: "/video/amrut-walkthrough-540.mp4" },
    poster: I.reels.walkPoster,
    thumbs: I.reels.walkThumbs,
    headline: "A sixteen-second product walkthrough: from the Amrut.AI homepage to a finished LLMS.txt file.",
    note: "The camera zooms through the real interface: the homepage headline, the Free Tools menu, the LLMS.txt generator, a domain typed in, the Generate button pressed, and the finished file. Each push-in lands on the one thing to read, so the steps are clear without a voice-over.",
    tags: ["Premiere Pro", "Screen capture", "Zoom & pan", "Cursor animation"],
  },
];

/* ---------------- home page ---------------- */

/* The hero deck rotates through these; the first five are on screen at load. */
export const heroCards: { img: Img; tag: string; href: string; video?: string }[] = [
  { img: I.amrut.searchLess, tag: "Amrut.AI · 2026", href: "/work/amrut-ai/" },
  { img: I.catfe.window, tag: "Catfé · 2025", href: "/work/catfe/" },
  { img: im("hero-lovart", 480, 600, "Lovart AI ad: an AI-generated presenter walking out of a phone screen."), tag: "Lovart AI ad · 2026", href: "/#motion", video: "/video/hero/lovart.mp4" },
  { img: I.arihant.science, tag: "Arihant · 2026", href: "/work/arihant/" },
  { img: I.nuage.v2Portrait, tag: "Nuage · 2026", href: "/work/nuage-webinar/" },
  { img: I.catfe.pBogo, tag: "Catfé · 2025", href: "/work/catfe/" },
  { img: I.skin.care, tag: "SkinVibes · 2025", href: "/work/skinvibes/" },
  { img: im("hero-coke", 480, 600, "Spec ad: cola splashing into a glass of ice."), tag: "Spec ad · 2026", href: "/#motion", video: "/video/hero/coke.mp4" },
  { img: I.amrut.favourite, tag: "Amrut.AI · 2026", href: "/work/amrut-ai/" },
  { img: I.marks.ggPositive, tag: "Glow Grow · logo", href: "/work/logos/" },
  { img: im("hero-clario", 480, 600, "Clario hero animation: budgeting app landing page."), tag: "Clario motion · 2026", href: "/#motion", video: "/video/hero/clario.mp4" },
  { img: I.arihant.summer, tag: "Arihant · 2026", href: "/work/arihant/" },
  { img: I.catfe.pCookies, tag: "Catfé · 2025", href: "/work/catfe/" },
  { img: im("hero-amrut", 480, 600, "Amrut.AI company profile film: the Google profile page."), tag: "Amrut.AI film · 2026", href: "/#motion", video: "/video/hero/amrut.mp4" },
  { img: I.amrut.questions, tag: "Amrut.AI · 2026", href: "/work/amrut-ai/" },
  { img: I.sbux.splash, tag: "Starbucks app · UX", href: "/work/starbucks-app/" },
];

export const reel: { img: Img; tag: string }[] = [
  { img: I.amrut.questions, tag: "Amrut.AI" },
  { img: I.catfe.pCookies, tag: "Catfé" },
  { img: I.marks.fbApplied, tag: "FlixBus concept" },
  { img: I.arihant.summer, tag: "Arihant" },
  { img: I.nuage.v2Landscape, tag: "Nuage" },
  { img: I.skin.cleanser, tag: "SkinVibes" },
  { img: I.amrut.c1, tag: "Amrut.AI" },
  { img: I.freelance.udupi, tag: "Udupi restaurant" },
  { img: I.catfe.signs, tag: "Catfé" },
  { img: I.arihant.diwali, tag: "Arihant" },
  { img: I.marks.ggPositive, tag: "Glow Grow" },
  { img: I.amrut.tenTabs, tag: "Amrut.AI" },
  { img: I.freelance.dolphin, tag: "Dolphin Education" },
  { img: I.skin.launch, tag: "SkinVibes" },
  { img: I.catfe.pHours, tag: "Catfé" },
  { img: I.sbux.splash, tag: "Starbucks app" },
  { img: I.arihant.robotics, tag: "Arihant" },
  { img: I.amrut.scanCrawl, tag: "Amrut.AI" },
];

export const facts = [
  { n: 40, suffix: "+", t: "social creatives designed in 13 days for Amrut.AI" },
  { n: 50, suffix: "+", t: "posters, banners and standees for a school in a four-campus group" },
  { n: 6, suffix: "", t: "logos and identities, from sketch to signage" },
  { n: 52, suffix: "s", t: "AI-generated ad for Lovart: every shot generated, every cut made by hand" },
];

export const CATEGORIES = ["Social", "Print & outdoor", "Identity", "Web & UI"] as const;
export type Category = (typeof CATEGORIES)[number];
export type Piece = Img & { title: string; client: string; cat: Category; wide?: boolean };

const p = (img: Img, title: string, client: string, cat: Category, wide?: boolean): Piece => ({ ...img, title, client, cat, wide });

export const archive: Piece[] = [
  p(I.amrut.searchLess, "People search less", "Amrut.AI", "Social"),
  p(I.catfe.window, "Window vinyl", "Catfé", "Print & outdoor"),
  p(I.marks.ggPositive, "Glow Grow lettermark", "Glow Grow", "Identity"),
  p(I.arihant.science, "Science exhibition", "Arihant", "Print & outdoor"),
  p(I.nuage.redesign, "7,000: webinar redesign", "Nuage", "Social"),
  p(I.skin.care, "Care for your skin", "SkinVibes", "Social"),
  p(I.catfe.pBogo, "Buy one, get one", "Catfé", "Print & outdoor"),
  p(I.amrut.questions, "Questions got longer", "Amrut.AI", "Social"),
  p(I.freelance.udupi, "Republic Day", "Udupi restaurant", "Social"),
  p(I.arihant.step, "Step today, leap tomorrow", "Arihant", "Print & outdoor"),
  p(I.marks.fbColour, "Travel That Cares", "FlixBus concept", "Identity"),
  p(I.skin.clear, "Clear skin, confident you", "SkinVibes", "Social"),
  p(I.catfe.stickers, "Sticker set", "Catfé", "Identity"),
  p(I.amrut.favourite, "Is it you?", "Amrut.AI", "Social"),
  p(I.nuage.v2Portrait, "A4 poster, editorial", "Nuage", "Print & outdoor"),
  p(I.arihant.summer, "Kids summer camp", "Arihant", "Print & outdoor"),
  p(I.catfe.signs, "Hanging sign", "Catfé", "Print & outdoor"),
  p(I.sbux.hifi, "Ordering flow", "Starbucks app", "Web & UI"),
  p(I.amrut.sov, "Track your AI share of voice", "Amrut.AI", "Social"),
  p(I.skin.cleanser, "Cleanser feature", "SkinVibes", "Social"),
  p(I.freelance.dolphin, "Admission open, 2026", "Dolphin Education", "Social"),
  p(I.arihant.diwali, "Diwali", "Arihant", "Social"),
  p(I.amrut.c3, "What does AI say about you?", "Amrut.AI", "Social"),
  p(I.catfe.pCookies, "Cookies", "Catfé", "Print & outdoor"),
  p(I.marks.kpMonogram, "KP monogram", "Keithshon & Partner", "Identity"),
  p(I.arihant.robotics, "Robotics labs", "Arihant", "Print & outdoor"),
  p(I.skin.emailProduct, "Product email", "SkinVibes", "Web & UI"),
  p(I.amrut.pagesAnswers, "Then and now", "Amrut.AI", "Social"),
  p(I.catfe.bag, "Bean pouch", "Catfé", "Identity"),
  p(I.nuage.v1Landscape, "A4 poster, indigo", "Nuage", "Print & outdoor"),
  p(I.arihant.sports, "Sports fiesta", "Arihant", "Print & outdoor"),
  p(I.amrut.tenTabs, "One answer replaces ten tabs", "Amrut.AI", "Social"),
  p(I.skin.launch, "Sunscreen launch", "SkinVibes", "Social"),
  p(I.catfe.shelter, "Bus shelter", "Catfé", "Print & outdoor"),
  p(I.sbux.splash, "Splash screen", "Starbucks app", "Web & UI"),
  p(I.arihant.shivratri, "Maha Shivratri", "Arihant", "Social"),
  p(I.catfe.system, "The system together", "Catfé", "Identity"),
  p(I.arihant.earlyYears, "Early years", "Arihant", "Print & outdoor"),
  p(I.skin.sunscreen, "Why sunscreen", "SkinVibes", "Social"),
  p(I.amrut.scanCrawl, "Blocked crawlers", "Amrut.AI", "Social"),
  p(I.catfe.ceramic, "Tumbler", "Catfé", "Identity"),
  p(I.arihant.republic, "Republic Day", "Arihant", "Social"),
  p(I.amrut.shortlist, "The shortlist", "Amrut.AI", "Social"),
  p(I.arihant.baisakhi, "Baisakhi", "Arihant", "Social"),
  p(I.amrut.poll, "The recommendation test", "Amrut.AI", "Social"),
  p(I.freelance.urbanBuy, "2 din, 2 guna fayda: Republic Day sale", "Urban Buy superstore", "Print & outdoor", true),
];

export const capabilities = [
  { t: "Brand identity", d: "Logotype, palette, stationery and the rules that keep it consistent across every surface.", x: "Catfé · Glow Grow", img: I.catfe.logoClay },
  { t: "Social & campaigns", d: "Carousels, ad series, admissions drives and a festive calendar that never misses a morning.", x: "Amrut.AI · Arihant", img: I.amrut.questions },
  { t: "Print & packaging", d: "Posters, menus, pouches, letterheads, standees and bus shelters, checked at real size.", x: "Catfé · Arihant", img: I.catfe.bag },
  { t: "AI video & motion", d: "AI-generated ads directed and finished by hand, motion graphics, product films, kinetic captions and short-form edits.", x: "Lovart · Premiere Pro · After Effects", img: im("lovart/poster-ad", 720, 1280, "") },
  { t: "Web, UI & email", d: "Landing pages, app flows and email creatives laid out for a phone screen and a two-second decision.", x: "Starbucks app · SkinVibes", img: I.sbux.splash },
  { t: "Critique & direction", d: "Reviewing work against the brief, writing feedback a designer can act on, and setting one direction a campaign can hold.", x: "Nuage webinar", img: I.nuage.redesign },
];

export const steps = [
  { t: "Read the brief", d: "I write the piece’s one job in a single line before opening any app. If I can’t, the brief isn’t finished yet." },
  { t: "Find the idea", d: "References, moodboards and competitor feeds. The idea is fixed first, the palette second, pixels last." },
  { t: "Build the system", d: "Type, grid, colour and a template that can carry the next twenty pieces, not only this one." },
  { t: "Test it in the wild", d: "Business card, hoarding, phone screen, thumbnail. If it breaks at any size, it goes back." },
];

export const experience = [
  { role: "Graphic Designer & Video Editor", org: "Amrut.AI", where: "Vancouver, Canada · Hybrid", when: "Aug 2026 – Now", now: true },
  { role: "Graphic & Social Media Designer", org: "Arihant Educational Group", where: "Arihant Public School, Kota · Hybrid", when: "Jan – Jul 2026" },
  { role: "Freelance Graphic Designer", org: "Independent practice", where: "Identities, logo systems, social", when: "Feb 2025 – Jan 2026" },
];

export const education = [
  { role: "B.Des. Animation & Gaming", org: "Graphic Era Hill University", where: "Dehradun", when: "2022 – 2026" },
  { role: "Advanced Professional Multimedia", org: "Arena Animation", where: "Dehradun · Online", when: "Oct 2025 – Now", now: true },
];

export const toolset = [
  { h: "Design", items: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva"] },
  { h: "Motion & video", items: ["Adobe Premiere Pro", "Adobe After Effects", "Motion graphics", "AI-generated ads & video", "Kinetic type & captions", "Short-form edits & reels"] },
  { h: "AI tools", items: ["Lovart", "Higgsfield", "Midjourney", "Adobe Firefly", "ChatGPT, Gemini, Claude"] },
];

export const certifications = [
  "NPTEL (SWAYAM): Design Thinking & Innovation",
  "NPTEL: Graphics & Animation Development",
  "NPTEL: Animation · Secondary Painting",
  "Udemy: Graphic Design Masterclass (ongoing)",
];
