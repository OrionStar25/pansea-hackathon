export const languages = {
  en: { name: "English", flag: "🇺🇸" },
  ms: { name: "Bahasa Melayu", flag: "🇲🇾" },
  zh: { name: "中文", flag: "🇨🇳" },
  ta: { name: "தமிழ்", flag: "🇮🇳" },
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.upload": "Upload",
    "nav.review": "Review",
    "nav.gallery": "Gallery",
    "nav.signIn": "Sign In",
    "nav.getStarted": "Get Started",

    // Homepage
    "home.hero.badge": "AI-Powered Heritage Preservation",
    "home.hero.title": "Archival AI",
    "home.hero.subtitle":
      "Combine the power of AI with expert knowledge to create rich, multilingual annotations for historical images and cultural artifacts.",
    "home.hero.uploadBtn": "Upload Images",
    "home.hero.exploreBtn": "Explore Gallery",

    "home.features.title": "How It Works",
    "home.features.subtitle":
      "Our platform combines AI automation with human expertise to create comprehensive heritage annotations that preserve cultural knowledge.",
    "home.features.ai.title": "AI Draft Annotation",
    "home.features.ai.desc":
      "SEA-LION v4 multimodal AI generates initial descriptions and metadata for uploaded images",
    "home.features.expert.title": "Expert Enhancement",
    "home.features.expert.desc":
      "Archivists and historians review, correct, and enrich AI outputs with cultural context",
    "home.features.multilingual.title": "Multilingual Support",
    "home.features.multilingual.desc":
      "Annotations available in English, Malay, Chinese, and Tamil for broader accessibility",

    // Dashboard
    "dashboard.title": "AI Annotation Dashboard",
    "dashboard.subtitle": "Monitor and manage AI-generated annotations",
    "dashboard.stats.total": "Total Images",
    "dashboard.stats.processing": "Processing",
    "dashboard.stats.aiComplete": "AI Complete",
    "dashboard.stats.expertReview": "Expert Review",
    "dashboard.stats.completed": "Completed",
    "dashboard.stats.avgConfidence": "Avg Confidence",

    // Upload
    "upload.title": "Upload Images",
    "upload.subtitle": "Add heritage images for AI annotation",
    "upload.dragDrop": "Drag & drop images here, or click to select",
    "upload.maxSize": "Maximum file size: 10MB per image",
    "upload.guidelines.title": "Upload Guidelines",

    // Review
    "review.title": "Expert Review",
    "review.subtitle": "Review and enhance AI annotations",
    "review.aiAnnotation": "AI Annotation",
    "review.expertEnhancement": "Expert Enhancement",
    "review.approve": "Approve & Continue",
    "review.reject": "Reject",

    // Gallery
    "gallery.title": "Heritage Gallery",
    "gallery.subtitle": "Explore Singapore's annotated heritage collection",
    "gallery.search": "Search heritage collection...",
    "gallery.noResults": "No items found",
    "gallery.clearFilters": "Clear Filters",
    "gallery.viewDetails": "View Details",
    "gallery.grid": "Grid",
    "gallery.list": "List",

    // Gallery Item
    "galleryItem.backToGallery": "Back to Gallery",
    "galleryItem.share": "Share",
    "galleryItem.export": "Export",
    "galleryItem.imageDetails": "Image Details",
    "galleryItem.date": "Date",
    "galleryItem.location": "Location",
    "galleryItem.views": "Views",
    "galleryItem.source": "Source",
    "galleryItem.expertAnnotation": "Expert Annotation",
    "galleryItem.aiAnnotation": "AI Annotation",
    "galleryItem.availableLanguages": "Available Languages",

    // Footer
    "footer.about": "Preserving heritage through AI-assisted annotation and expert collaboration.",
    "footer.platform.title": "Platform",
    "footer.platform.analytics": "Analytics",
    "footer.resources.title": "Resources",
    "footer.resources.docs": "Documentation",
    "footer.resources.api": "API Reference",
    "footer.resources.support": "Support",
    "footer.resources.community": "Community",
    "footer.legal.title": "Legal",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.terms": "Terms of Service",
    "footer.legal.cookies": "Cookie Policy",
    "footer.copyright": "© 2025 Archival AI. Built for Singapore's heritage preservation.",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",

    // CTA
    "home.cta.title": "Ready to Preserve Heritage?",
    "home.cta.subtitle":
      "Join archivists, historians, and cultural enthusiasts in creating comprehensive annotations for Singapore's rich heritage collection.",
    "home.cta.startBtn": "Start Annotating",
    "home.cta.learnBtn": "Learn More",
  },
  ms: {
    // Navigation
    "nav.home": "Laman Utama",
    "nav.dashboard": "Papan Pemuka",
    "nav.upload": "Muat Naik",
    "nav.review": "Semakan",
    "nav.gallery": "Galeri",
    "nav.signIn": "Log Masuk",
    "nav.getStarted": "Mulakan",

    // Homepage
    "home.hero.badge": "Pemeliharaan Warisan Berkuasa AI",
    "home.hero.title": "Archival AI",
    "home.hero.subtitle":
      "Gabungkan kuasa AI dengan pengetahuan pakar untuk mencipta anotasi berbilang bahasa yang kaya untuk imej bersejarah dan artifak budaya.",
    "home.hero.uploadBtn": "Muat Naik Imej",
    "home.hero.exploreBtn": "Terokai Galeri",

    "home.features.title": "Cara Ia Berfungsi",
    "home.features.subtitle":
      "Platform kami menggabungkan automasi AI dengan kepakaran manusia untuk mencipta anotasi warisan komprehensif yang memelihara pengetahuan budaya.",
    "home.features.ai.title": "Draf Anotasi AI",
    "home.features.ai.desc":
      "AI multimodal SEA-LION v4 menghasilkan penerangan awal dan metadata untuk imej yang dimuat naik",
    "home.features.expert.title": "Peningkatan Pakar",
    "home.features.expert.desc":
      "Arkivis dan sejarawan menyemak, membetulkan, dan memperkaya output AI dengan konteks budaya",
    "home.features.multilingual.title": "Sokongan Berbilang Bahasa",
    "home.features.multilingual.desc":
      "Anotasi tersedia dalam Bahasa Inggeris, Melayu, Cina, dan Tamil untuk aksesibiliti yang lebih luas",

    // Dashboard
    "dashboard.title": "Papan Pemuka Anotasi AI",
    "dashboard.subtitle": "Pantau dan urus anotasi yang dijana AI",
    "dashboard.stats.total": "Jumlah Imej",
    "dashboard.stats.processing": "Memproses",
    "dashboard.stats.aiComplete": "AI Selesai",
    "dashboard.stats.expertReview": "Semakan Pakar",
    "dashboard.stats.completed": "Selesai",
    "dashboard.stats.avgConfidence": "Purata Keyakinan",

    // Upload
    "upload.title": "Muat Naik Imej",
    "upload.subtitle": "Tambah imej warisan untuk anotasi AI",
    "upload.dragDrop": "Seret & lepas imej di sini, atau klik untuk pilih",
    "upload.maxSize": "Saiz fail maksimum: 10MB setiap imej",
    "upload.guidelines.title": "Garis Panduan Muat Naik",

    // Review
    "review.title": "Semakan Pakar",
    "review.subtitle": "Semak dan tingkatkan anotasi AI",
    "review.aiAnnotation": "Anotasi AI",
    "review.expertEnhancement": "Peningkatan Pakar",
    "review.approve": "Luluskan & Teruskan",
    "review.reject": "Tolak",

    // Gallery
    "gallery.title": "Galeri Warisan",
    "gallery.subtitle": "Terokai koleksi warisan Singapura yang beranotasi",
    "gallery.search": "Cari koleksi warisan...",
    "gallery.noResults": "Tiada item ditemui",
    "gallery.clearFilters": "Kosongkan Penapis",
    "gallery.viewDetails": "Lihat Butiran",
    "gallery.grid": "Grid",
    "gallery.list": "Senarai",

    // Gallery Item
    "galleryItem.backToGallery": "Kembali ke Galeri",
    "galleryItem.share": "Kongsi",
    "galleryItem.export": "Eksport",
    "galleryItem.imageDetails": "Butiran Imej",
    "galleryItem.date": "Tarikh",
    "galleryItem.location": "Lokasi",
    "galleryItem.views": "Tontonan",
    "galleryItem.source": "Sumber",
    "galleryItem.expertAnnotation": "Anotasi Pakar",
    "galleryItem.aiAnnotation": "Anotasi AI",
    "galleryItem.availableLanguages": "Bahasa Tersedia",

    // Footer
    "footer.about": "Memelihara warisan melalui anotasi berbantu AI dan kerjasama pakar.",
    "footer.platform.title": "Platform",
    "footer.platform.analytics": "Analitik",
    "footer.resources.title": "Sumber",
    "footer.resources.docs": "Dokumentasi",
    "footer.resources.api": "Rujukan API",
    "footer.resources.support": "Sokongan",
    "footer.resources.community": "Komuniti",
    "footer.legal.title": "Undang-undang",
    "footer.legal.privacy": "Dasar Privasi",
    "footer.legal.terms": "Terma Perkhidmatan",
    "footer.legal.cookies": "Dasar Kuki",
    "footer.copyright": "© 2025 Archival AI. Dibina untuk pemeliharaan warisan Singapura.",

    // Common
    "common.loading": "Memuatkan...",
    "common.save": "Simpan",
    "common.cancel": "Batal",
    "common.edit": "Edit",
    "common.delete": "Padam",
    "common.back": "Kembali",
    "common.next": "Seterusnya",
    "common.previous": "Sebelumnya",

    // CTA
    "home.cta.title": "Bersedia untuk Memelihara Warisan?",
    "home.cta.subtitle":
      "Sertai arkivis, sejarawan, dan peminat budaya dalam mencipta anotasi komprehensif untuk koleksi warisan Singapura yang kaya.",
    "home.cta.startBtn": "Mula Anotasi",
    "home.cta.learnBtn": "Ketahui Lebih Lanjut",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.dashboard": "仪表板",
    "nav.upload": "上传",
    "nav.review": "审核",
    "nav.gallery": "画廊",
    "nav.signIn": "登录",
    "nav.getStarted": "开始使用",

    // Homepage
    "home.hero.badge": "AI驱动的遗产保护",
    "home.hero.title": "Archival AI",
    "home.hero.subtitle": "结合AI的力量与专家知识，为历史图像和文化文物创建丰富的多语言注释。",
    "home.hero.uploadBtn": "上传图片",
    "home.hero.exploreBtn": "探索画廊",

    "home.features.title": "工作原理",
    "home.features.subtitle": "我们的平台将AI自动化与人类专业知识相结合，创建保护文化知识的综合遗产注释。",
    "home.features.ai.title": "AI草稿注释",
    "home.features.ai.desc": "SEA-LION v4多模态AI为上传的图像生成初始描述和元数据",
    "home.features.expert.title": "专家增强",
    "home.features.expert.desc": "档案管理员和历史学家审查、纠正并用文化背景丰富AI输出",
    "home.features.multilingual.title": "多语言支持",
    "home.features.multilingual.desc": "注释提供英语、马来语、中文和泰米尔语版本，提高可访问性",

    // Dashboard
    "dashboard.title": "AI注释仪表板",
    "dashboard.subtitle": "监控和管理AI生成的注释",
    "dashboard.stats.total": "总图片数",
    "dashboard.stats.processing": "处理中",
    "dashboard.stats.aiComplete": "AI完成",
    "dashboard.stats.expertReview": "专家审核",
    "dashboard.stats.completed": "已完成",
    "dashboard.stats.avgConfidence": "平均置信度",

    // Upload
    "upload.title": "上传图片",
    "upload.subtitle": "添加遗产图像进行AI注释",
    "upload.dragDrop": "将图片拖放到此处，或点击选择",
    "upload.maxSize": "最大文件大小：每张图片10MB",
    "upload.guidelines.title": "上传指南",

    // Review
    "review.title": "专家审核",
    "review.subtitle": "审核和增强AI注释",
    "review.aiAnnotation": "AI注释",
    "review.expertEnhancement": "专家增强",
    "review.approve": "批准并继续",
    "review.reject": "拒绝",

    // Gallery
    "gallery.title": "遗产画廊",
    "gallery.subtitle": "探索新加坡的注释遗产收藏",
    "gallery.search": "搜索遗产收藏...",
    "gallery.noResults": "未找到项目",
    "gallery.clearFilters": "清除筛选",
    "gallery.viewDetails": "查看详情",
    "gallery.grid": "网格",
    "gallery.list": "列表",

    // Gallery Item
    "galleryItem.backToGallery": "返回画廊",
    "galleryItem.share": "分享",
    "galleryItem.export": "导出",
    "galleryItem.imageDetails": "图片详情",
    "galleryItem.date": "日期",
    "galleryItem.location": "位置",
    "galleryItem.views": "浏览量",
    "galleryItem.source": "来源",
    "galleryItem.expertAnnotation": "专家注释",
    "galleryItem.aiAnnotation": "AI注释",
    "galleryItem.availableLanguages": "可用语言",

    // Footer
    "footer.about": "通过AI辅助注释和专家合作保护遗产。",
    "footer.platform.title": "平台",
    "footer.platform.analytics": "分析",
    "footer.resources.title": "资源",
    "footer.resources.docs": "文档",
    "footer.resources.api": "API参考",
    "footer.resources.support": "支持",
    "footer.resources.community": "社区",
    "footer.legal.title": "法律",
    "footer.legal.privacy": "隐私政策",
    "footer.legal.terms": "服务条款",
    "footer.legal.cookies": "Cookie政策",
    "footer.copyright": "© 2025 Archival AI. 为新加坡遗产保护而建。",

    // Common
    "common.loading": "加载中...",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.edit": "编辑",
    "common.delete": "删除",
    "common.back": "返回",
    "common.next": "下一个",
    "common.previous": "上一个",

    // CTA
    "home.cta.title": "准备好保护遗产了吗？",
    "home.cta.subtitle": "加入档案管理员、历史学家和文化爱好者，为新加坡丰富的遗产收藏创建全面的注释。",
    "home.cta.startBtn": "开始注释",
    "home.cta.learnBtn": "了解更多",
  },
  ta: {
    // Navigation
    "nav.home": "முகப்பு",
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.upload": "பதிவேற்று",
    "nav.review": "மதிப்பாய்வு",
    "nav.gallery": "கேலரி",
    "nav.signIn": "உள்நுழை",
    "nav.getStarted": "தொடங்கு",

    // Homepage
    "home.hero.badge": "AI-இயங்கும் பாரம்பரிய பாதுகாப்பு",
    "home.hero.title": "Archival AI",
    "home.hero.subtitle":
      "வரலாற்று படங்கள் மற்றும் கலாச்சார கலைப்பொருட்களுக்கு வளமான, பல்மொழி குறிப்பீடுகளை உருவாக்க AI இன் சக்தியை நிபுணர் அறிவுடன் இணைக்கவும்.",
    "home.hero.uploadBtn": "படங்களைப் பதிவேற்றவும்",
    "home.hero.exploreBtn": "கேலரியை ஆராயுங்கள்",

    "home.features.title": "இது எவ்வாறு செயல்படுகிறது",
    "home.features.subtitle":
      "எங்கள் தளம் AI தன்னியக்கத்தை மனித நிபுணத்துவத்துடன் இணைத்து கலாச்சார அறிவைப் பாதுகாக்கும் விரிவான பாரம்பரிய குறிப்பீடுகளை உருவாக்குகிறது.",
    "home.features.ai.title": "AI வரைவு குறிப்பீடு",
    "home.features.ai.desc": "SEA-LION v4 பல்முறை AI பதிவேற்றப்பட்ட படங்களுக்கு ஆரம்ப விளக்கங்கள் மற்றும் மெட்டாடேட்டாவை உருவாக்குகிறது",
    "home.features.expert.title": "நிபுணர் மேம்பாடு",
    "home.features.expert.desc":
      "காப்பகவாதிகள் மற்றும் வரலாற்றாசிரியர்கள் AI வெளியீடுகளை கலாச்சார சூழலுடன் மதிப்பாய்வு செய்து, திருத்தி, வளப்படுத்துகின்றனர்",
    "home.features.multilingual.title": "பல்மொழி ஆதரவு",
    "home.features.multilingual.desc": "ஆங்கிலம், மலாய், சீன மற்றும் தமிழ் மொழிகளில் குறிப்பீடுகள் கிடைக்கின்றன, பரந்த அணுகலுக்காக",

    // Dashboard
    "dashboard.title": "AI குறிப்பீடு டாஷ்போர்டு",
    "dashboard.subtitle": "AI-உருவாக்கிய குறிப்பீடுகளைக் கண்காணித்து நிர்வகிக்கவும்",
    "dashboard.stats.total": "மொத்த படங்கள்",
    "dashboard.stats.processing": "செயலாக்கம்",
    "dashboard.stats.aiComplete": "AI முடிந்தது",
    "dashboard.stats.expertReview": "நிபுணர் மதிப்பாய்வு",
    "dashboard.stats.completed": "முடிந்தது",
    "dashboard.stats.avgConfidence": "சராசரி நம்பிக்கை",

    // Upload
    "upload.title": "படங்களைப் பதிவேற்றவும்",
    "upload.subtitle": "AI குறிப்பீட்டுக்காக பாரம்பரிய படங்களைச் சேர்க்கவும்",
    "upload.dragDrop": "படங்களை இங்கே இழுத்து விடவும், அல்லது தேர்ந்தெடுக்க கிளிக் செய்யவும்",
    "upload.maxSize": "அதிகபட்ச கோப்பு அளவு: ஒரு படத்திற்கு 10MB",
    "upload.guidelines.title": "பதிவேற்ற வழிகாட்டுதல்கள்",

    // Review
    "review.title": "நிபுணர் மதிப்பாய்வு",
    "review.subtitle": "AI குறிப்பீடுகளை மதிப்பாய்வு செய்து மேம்படுத்தவும்",
    "review.aiAnnotation": "AI குறிப்பீடு",
    "review.expertEnhancement": "நிபுணர் மேம்பாடு",
    "review.approve": "அங்கீகரித்து தொடரவும்",
    "review.reject": "நிராகரி",

    // Gallery
    "gallery.title": "பாரம்பரிய கேலரி",
    "gallery.subtitle": "சிங்கப்பூரின் குறிப்பிடப்பட்ட பாரம்பரிய சேகரிப்புக்கு ஆராயுங்கள்",
    "gallery.search": "பாரம்பரிய சேகரிப்பைத் தேடுங்கள்...",
    "gallery.noResults": "எந்த பொருட்களும் கிடைக்கவில்லை",
    "gallery.clearFilters": "வடிப்பான்களை அழிக்கவும்",
    "gallery.viewDetails": "விவரங்களைப் பார்க்கவும்",
    "gallery.grid": "கட்டம்",
    "gallery.list": "பட்டியல்",

    // Gallery Item
    "galleryItem.backToGallery": "கேலரிக்குத் திரும்பு",
    "galleryItem.share": "பகிர்",
    "galleryItem.export": "ஏற்றுமதி",
    "galleryItem.imageDetails": "படத்தின் விவரங்கள்",
    "galleryItem.date": "தேதி",
    "galleryItem.location": "இடம்",
    "galleryItem.views": "பார்வைகள்",
    "galleryItem.source": "மூலம்",
    "galleryItem.expertAnnotation": "நிபுணர் குறிப்பீடு",
    "galleryItem.aiAnnotation": "AI குறிப்பீடு",
    "galleryItem.availableLanguages": "கிடைக்கும் மொழிகள்",

    // Footer
    "footer.about": "AI-உதவி குறிப்பீடு மற்றும் நிபுணர் ஒத்துழைப்பு மூலம் பாரம்பரியத்தைப் பாதுகாத்தல்.",
    "footer.platform.title": "தளம்",
    "footer.platform.analytics": "பகுப்பாய்வு",
    "footer.resources.title": "வளங்கள்",
    "footer.resources.docs": "ஆவணங்கள்",
    "footer.resources.api": "API குறிப்பு",
    "footer.resources.support": "ஆதரவு",
    "footer.resources.community": "சமூகம்",
    "footer.legal.title": "சட்ட",
    "footer.legal.privacy": "தனியுரிமைக் கொள்கை",
    "footer.legal.terms": "சேவை விதிமுறைகள்",
    "footer.legal.cookies": "குக்கீ கொள்கை",
    "footer.copyright": "© 2025 Archival AI. சிங்கப்பூரின் பாரம்பரிய பாதுகாப்புக்காக கட்டப்பட்டது.",

    // Common
    "common.loading": "ஏற்றுகிறது...",
    "common.save": "சேமி",
    "common.cancel": "ரத்து",
    "common.edit": "திருத்து",
    "common.delete": "நீக்கு",
    "common.back": "பின்",
    "common.next": "அடுத்து",
    "common.previous": "முந்தைய",

    // CTA
    "home.cta.title": "பாரம்பரியத்தைப் பாதுகாக்க தயாரா?",
    "home.cta.subtitle":
      "சிங்கப்பூரின் வளமான பாரம்பரிய சேகரிப்புக்கு விரிவான குறிப்பீடுகளை உருவாக்குவதில் காப்பகவாதிகள், வரலாற்றாசிரியர்கள் மற்றும் கலாச்சார ஆர்வலர்களுடன் சேருங்கள்.",
    "home.cta.startBtn": "குறிப்பீட்டைத் தொடங்கவும்",
    "home.cta.learnBtn": "மேலும் அறிக",
  },
} as const

export function getTranslation(key: string, lang: Language = "en"): string {
  const translation = translations[lang]?.[key as keyof (typeof translations)[typeof lang]]
  return translation || key
}

export function t(key: string, lang: Language = "en"): string {
  return getTranslation(key, lang)
}
