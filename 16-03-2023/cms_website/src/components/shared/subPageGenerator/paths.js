export const ltrPaths = {
  media: {
    main: "Media Center",
    mainPath: "/media/news",
    routes: [
      {
        id: 0,
        category: "news",
        path: "/media/news",
        secondary: "News",

        subRoute: {
          path: ":id",
          detailsPage: "News details",
        },
      },
      {
        id: 1,
        category: "photos-gallery",
        path: "/media/photos-gallery",
        secondary: "Photo Gallery",

        subRoute: {
          path: ":id",
          detailsPage: "Photo gallery details",
        },
      },
      {
        id: 2,
        category: "videos-gallery",
        path: "/media/videos-gallery",
        secondary: "Videos Gallery",

        subRoute: {
          path: ":id",
          detailsPage: "Videos Album details",
        },
      },
      {
        id: 3,
        category: "publications",
        path: "/media/publications",
        secondary: "Publications",

        subRoute: {
          path: ":id",
          detailsPage: "Publication details",
        },
      },
      {
        id: 4,
        category: "events",
        path: "/media/events",
        secondary: "Events",

        subRoute: {
          path: ":id",
          detailsPage: "Event details",
        },
      },
      {
        id: 5,
        category: "live-broadcasts",
        path: "/media/live-broadcasts",
        secondary: "Live Broadcasts",

        subRoute: {
          path: ":id",
          detailsPage: "Prodcust details",
        },
      },
    ],
  },

  generalPage: {
    main: "Page",
    mainPath: "/section",
    routes: [
      {
        id: 0,
        category: "page",
        path: "/section",
        subRoute: {
          path: ":alias",
          detailsPage: "General Page",
          secondary: "General Page",
        },
      },
    ],
  },
  open: {
    main: "Open Data",
    mainPath: "/open-data/open-data-policy",
    routes: [
      {
        id: 0,
        category: "page",
        path: "/open-data/page",
        secondary: "Open Data Page",

        subRoute: {
          path: ":id",
          detailsPage: "Open Data Page details",
        },
      },
      {
        id: 1,
        category: "policy",
        path: "/open-data/open-data-policy",
        secondary: "Open Data Policy",

        subRoute: {
          path: ":id",
          detailsPage: "Open Data Policy details",
        },
      },
    ],
  },

  participation: {
    main: "E-Participation",
    mainPath: "/participation/polls",
    routes: [
      {
        id: 0,
        category: "polls",
        path: "/participation/polls",
        secondary: "Polls",
      },
      {
        id: 2,
        category: "thanks",
        path: "/participation/thanks",
        secondary: "Thanks and Appreciation",
      },
      {
        id: 3,
        category: "ideas",
        path: "/participation/ideas",
        secondary: "Ideas",
      },
      {
        id: 1,
        category: "opinion",
        path: "/participation/opinion",
        secondary: "Opinions",

        subRoute: {
          path: "",
          detailsPage: "Opinion details",
        },
      },
      {
        id: 4,
        category: "survey",
        path: "/participation/survey",
        secondary: "Survey",

        subRoute: {
          path: "",
          detailsPage: "Survey details",
        },
      },
      {
        id: 5,
        category: "faq",
        path: "/participation/faq",
        secondary: "FAQ",
      },
      {
        id: 5,
        category: "policy",
        path: "/participation/e-policy",
        secondary: "policy",
      },
    ],
  },

  aboutus: {
    main: "About us",
    mainPath: "/aboutus/about-chamber",
    routes: [
      {
        id: 0,
        category: "about-chamber",
        path: "/aboutus/about-chamber",
        secondary: "About RAK Chamber",
      },
      {
        id: 1,
        category: "boardOfDirectors",
        path: "/aboutus/directors",
        secondary: "Board of Directors",
      },
      {
        id: 2,
        category: "committees",
        path: "/aboutus/committees",
        secondary: "Board Committees",
      },
      {
        id: 3,
        category: "strategic-plan",
        path: "/aboutus/strategic-plan",
        secondary: "Strategic Plan",
      },
      {
        id: 4,
        category: "law",
        path: "/aboutus/law",
        secondary: "Law",
      },
      {
        id: 5,
        category: "achievements",
        path: "/aboutus/achievements",
        secondary: "Our Achievements",
      },
      {
        id: 6,
        category: "sponsors",
        path: "/aboutus/sponsors",
        secondary: "Sponsors",
      },
      {
        id: 7,
        category: "partners-suppliers",
        path: "/aboutus/partners-suppliers",
        secondary: "Partners & Suppliers",
      },
      {
        id: 8,
        category: "customers-satisfaction",
        path: "/aboutus/customers-satisfaction",
        secondary: "Customers’ Satisfaction",
      },
      {
        id: 9,
        category: "chamber-polices",
        path: "/aboutus/chamber-polices",
        secondary: "Chamber’s Polices",
      },
      {
        id: 10,
        category: "chamber-polices",
        path: "/aboutus/chamber-polices",
        secondary: "Chamber’s Polices",
      },

      {
        id: 11,
        category: "organizational",
        path: "/aboutus/organizational",
        secondary: "Organizational Chart  ",
      },
      {
        id: 12,
        category: "awards",
        path: "/aboutus/awards",
        secondary: "rak chamber awards ",
      },
      {
        id: 13,
        category: "law",
        path: "/aboutus/law",
        secondary: "Chamber Law ",
      },
      {
        id: 14,
        category: "initiatives",
        path: "/aboutus/initiatives",
        secondary: "initiatives",

        subRoute: {
          path: ":id",
          detailsPage: "initiative details",
        },
      },
      {
        id: 15,
        category: "partners",
        path: "/aboutus/partners",
        secondary: "partners",
      },
    ],
  },

  careers: {
    main: "Careers",
    mainPath: "/careers/vacances",
    routes: [
      {
        id: 0,
        category: "vacances",
        path: "/careers/vacances",
        secondary: "Vacances",

        subRoute: {
          path: ":id",
          detailsPage: "Vacancy details",

          subSubRoute: {
            name: "Submit your CV",
          },
        },
      },
      {
        id: 1,
        category: "cv",
        path: "/careers/cv",
        secondary: "Submit your C.V",

        subRoute: {
          path: ":id",
          detailsPage: "Vacancy details",
        },
      },
    ],
  },

  contactus: {
    main: "Contact us",
    mainPath: "/contactus/contactus",
    routes: [
      {
        id: 0,
        category: "contactus",
        path: "/contactus/contactus",
        secondary: "Contact Us",
      },
    ],
  },
  privacyPolicy: {
    main: "privacy policy",
    mainPath: "/privacy-policy",
    routes: [
      {
        id: 0,
        category: "privacy-policy",
        path: "/privacy-policy",
        secondary: "privacy policy",
      },
    ],
  },

  investmentOpportunity: {
    main: "investment Opportunity",
    mainPath: "/aboutus/InvestmentOpportunity",
    routes: [
      {
        id: 0,
        category: "investment",
        path: "/aboutus/InvestmentOpportunity",
        // secondary: "investment Opportunity",
        subRoute: {
          path: ":alias",
          detailsPage: "investment details",
        },
      },
    ],
  },

  termsOfConditions: {
    main: "Trems Of Conditions",
    mainPath: "/terms-conditions",
    routes: [
      {
        id: 0,
        category: "terms-conditions",
        path: "terms-conditions",
        secondary: "trems of conditions",
      },
    ],
  },

  services: {
    main: "Rak chamber services",
    mainPath: "/services/rak-chamber",
    routes: [
      {
        id: 0,
        category: "rak-chamber",
        path: "/services/rak-chamber",
        secondary: "RAK Chamber",
        subRoute: {
          path: "/services-details/:id",
          detailsPage: "Service Details",
        },
      },
      {
        id: 1,
        category: "rak-exhibition",
        path: "/services/rak-exhibition",
        secondary: "RAK Exhibition Center",
      },
      {
        id: 2,
        category: "rak-sme",
        path: "/services/rak-sme",
        secondary: "RAK SME",
      },
      {
        id: 3,
        category: "rak-arbitration",
        path: "/services/rak-arbitration",
        secondary: "RAK Arbitration Center",
      },
    ],
  },

  sitemap: {
    main: "sitemap",
    mainPath: "/sitemap",
    routes: [
      {
        id: 0,
        category: "sitemap",
        path: "/sitemap",
        secondary: "sitemap",
      },
    ],
  },

  customerCharter: {
    main: "customer charter",
    mainPath: "/customer-charter",
    routes: [
      {
        id: 0,
        category: "customerCharter",
        path: "/customer-charter",
        secondary: "customer charter",
      },
    ],
  },

  search: {
    main: "search results",
    mainPath: "/search",
    routes: [
      {
        id: 0,
        category: "search",
        path: "/search",
        secondary: "search",
      },
    ],
  },
};

export const rtlPaths = {
  media: {
    main: "المركز الإعلامي",
    mainPath: "/media/news",
    routes: [
      {
        id: 0,
        category: "news",
        path: "/media/news",
        secondary: "الأخبار",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 1,
        category: "photos-gallery",
        path: "/media/photos-gallery",
        secondary: "معرض الصور",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 2,
        category: "videos-gallery",
        path: "/media/videos-gallery",
        secondary: "معرض الفيديو",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 3,
        category: "publications",
        path: "/media/publications",
        secondary: "المنشورات",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 4,
        category: "events",
        path: "/media/events",
        secondary: "الفعاليات",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 5,
        category: "live-broadcasts",
        path: "/media/live-broadcasts",
        secondary: "البث المباشر",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
    ],
  },
  generalPage: {
    main: "الصفحة العامة",
    mainPath: "/section",
    routes: [
      {
        id: 0,
        category: "page",
        path: "/page",
        subRoute: {
          path: ":alias",
          detailsPage: "الصفحة العامة",
          secondary: "الصفحة العامة",
        },
      },
    ],
  },
  open: {
    main: "البيانات المفتوحة",
    mainPath: "/open-data/open-data-policy",
    routes: [
      {
        id: 0,
        category: "page",
        path: "/open-data/page",
        secondary: "صفحة البيانات المفتوحة",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 1,
        category: "policy",
        path: "/open-data/open-data-policy",
        secondary: "سياسة البيانات المفتوحة",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
    ],
  },

  participation: {
    main: "المشاركة الرقمية",
    mainPath: "/participation/polls",
    routes: [
      {
        id: 0,
        category: "polls",
        path: "/participation/polls",
        secondary: "إستطلاعات الرأي",
      },
      {
        id: 1,
        category: "thanks",
        path: "/participation/thanks",
        secondary: "شكر وتقدير",
      },
      {
        id: 2,
        category: "feedback",
        path: "/participation/feedback",
        secondary: "إبداء الرأي",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 3,
        category: "ideas",
        path: "/participation/ideas",
        secondary: "أفكار",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
      {
        id: 4,
        category: "opinion",
        path: "/participation/opinion",
        secondary: "الآراء",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },

      {
        id: 5,
        category: "survey",
        path: "/participation/survey",
        secondary: "إستبيان",
      },
      {
        id: 6,
        category: "faq",
        path: "/participation/faq",
        secondary: "الأسئلة الأكثر شيوعا",
      },
      {
        id: 5,
        category: "policy",
        path: "/participation/e-policy",
        secondary: "سياسة المشاركة الرقمية",
      },
    ],
  },

  aboutus: {
    main: "عن الغرفة",
    mainPath: "/aboutus/about-chamber",
    routes: [
      {
        id: 0,
        category: "about-chamber",
        path: "/aboutus/about-chamber",
        secondary: "عن غرفة رأس الخيمة",
      },

      {
        id: 1,
        category: "boardOfDirectors",
        path: "/aboutus/directors",
        secondary: "مجلس الإدارة",
      },
      {
        id: 2,
        category: "committees",
        path: "/aboutus/committees",
        secondary: "لجان مجلس الإدارة",
      },
      {
        id: 3,
        category: "strategic-plan",
        path: "/aboutus/strategic-plan",
        secondary: "الخطط الاستراتيجية",
      },
      {
        id: 4,
        category: "law",
        path: "/aboutus/law",
        secondary: "قانون الغرفة",
      },
      {
        id: 5,
        category: "achievements",
        path: "/aboutus/achievements",
        secondary: "إنجازاتنا",
      },
      {
        id: 6,
        category: "sponsors",
        path: "/aboutus/sponsors",
        secondary: "الرعاة",
      },
      {
        id: 7,
        category: "partners-suppliers",
        path: "/aboutus/partners-suppliers",
        secondary: "الشركاء والموردين",
      },
      {
        id: 8,
        category: "customers-satisfaction",
        path: "/aboutus/customers-satisfaction",
        secondary: "رضى العملاء",
      },
      {
        id: 9,
        category: "chamber-polices",
        path: "/aboutus/chamber-polices",
        secondary: "سياسات الغرفة",
      },

      {
        id: 10,
        category: "initiatives",
        path: "/aboutus/initiatives",
        secondary: "المبادرات",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل المبادرة",
        },
      },
      {
        id: 11,
        category: "organizational",
        path: "/aboutus/organizational",
        secondary: "الهيكل التنظيمي",
      },
      {
        id: 12,
        category: "awards",
        path: "/aboutus/awards",
        secondary: "جوائز رأس الخيمة",
      },
      {
        id: 15,
        category: "partners",
        path: "/aboutus/partners",
        secondary: "الشركاء",
      },
    ],
  },

  careers: {
    main: "الأعمال",
    mainPath: "/careers/vacances",
    routes: [
      {
        id: 0,
        category: "vacances",
        path: "/careers/vacances",
        secondary: "فرص العمل",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",

          subSubRoute: {
            name: "أرسل سيرتك الذاتية",
          },
        },
      },
      {
        id: 1,
        category: "cv",
        path: "/careers/cv",
        secondary: "أرسل سيرتك الذاتية",

        subRoute: {
          path: ":id",
          detailsPage: "تفاصيل",
        },
      },
    ],
  },

  contactus: {
    main: "إتصل بنا",
    mainPath: "/contactus/contactus",
    routes: [
      {
        id: 0,
        category: "contactus",
        path: "/contactus/contactus",
        secondary: "إتصل بنا",
      },
    ],
  },

  privacyPolicy: {
    main: "سياسة الخصوصية",
    mainPath: "/privacy-policy",
    routes: [
      {
        id: 0,
        category: "privacy-policy",
        path: "/privacy-policy",
        secondary: "سياسة الخصوصية",
      },
    ],
  },

  termsOfConditions: {
    main: "الشروط و الأحكام",
    mainPath: "/TermsOfConditions/TermsOfConditions",
    routes: [
      {
        id: 0,
        category: "terms-conditions",
        path: "terms-conditions/terms-conditions",
        secondary: "الشروط و الأحكام",
      },
    ],
  },

  sitemap: {
    main: "خريطة الموقع",
    mainPath: "/sitemap",
    routes: [
      {
        id: 0,
        category: "sitemap",
        path: "/sitemap",
        secondary: "خريطة الموقع",
      },
    ],
  },

  customerCharter: {
    main: "ميثاق العميل",
    mainPath: "/customer-charter",
    routes: [
      {
        id: 0,
        category: "customerCharter",
        path: "/customer-charter",
        secondary: "ميثاق العميل",
      },
    ],
  },

  investmentOpportunity: {
    main: "الفرصة استثمارية",
    mainPath: "/aboutus/InvestmentOpportunity",
    routes: [
      {
        id: 0,
        category: "investment",
        path: "/aboutus/InvestmentOpportunity",
        // secondary: "الفرصة استثمارية",
        subRoute: {
          path: ":alias",
          detailsPage: "التفاصيل",
        },
      },
    ],
  },

  services: {
    main: "خدمات غرفة رأس الخيمة",
    mainPath: "/services/rak-chamber",
    routes: [
      {
        id: 0,
        category: "rak-chamber",
        path: "/services/rak-chamber",
        secondary: "غرفة رأس الخيمة",
      },
      {
        id: 1,
        category: "rak-exhibition",
        path: "/services/rak-exhibition",
        secondary: "مركز رأس الخيمة للمعارض",
      },
      {
        id: 2,
        category: "rak-sme",
        path: "/services/rak-sme",
        secondary: "غرفة التجارة لتنمية مشاريع الشباب",
      },
      {
        id: 3,
        category: "rak-arbitration",
        path: "/services/rak-arbitration",
        secondary: "مركز رأس الخيمة للتحكيم",
      },
    ],
  },

  search: {
    main: "نتائج البحث",
    mainPath: "/search",
    routes: [
      {
        id: 0,
        category: "search",
        path: "/search",
        secondary: "البحث",
      },
    ],
  },
};
