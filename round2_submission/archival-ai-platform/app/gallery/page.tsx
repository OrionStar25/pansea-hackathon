"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Search, Calendar, MapPin, Tag, Globe, Eye, ArrowLeft, Users, Brain } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/i18n"

interface GalleryItem {
  id: string
  image: string
  title: string
  description: string
  aiAnnotation: string
  expertAnnotation: string
  metadata: {
    date: string
    location: string
    collection: string
    tags: string[]
  }
  translations: {
    [key: string]: {
      title: string
      description: string
    }
  }
  views: number
  likes: number
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: "ellenborough-market",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-09-19%20at%2012.15.40%E2%80%AFAM-VKlUfX5P63lgxtoVV6Y58iOtrfWX9X.png",
    title: "Ellenborough Market - Coleman Bridge and New Bridge Road",
    description:
      "This photograph captures the Ellenborough Market district circa 1970, showing the Singapore River with Coleman Bridge, traditional shophouses, and the emerging HDB housing complex. The image documents a pivotal moment in Singapore's urban transformation from maritime entrepôt to modern city-state.",
    aiAnnotation: `Below is a detailed annotation of the historical photograph you uploaded, written from the perspective of a cultural and art historian specializing in urban development and visual culture. The focus is on what is visibly present in the image—without extrapolating beyond the photograph.

Historical Image Annotation – Urban Development and Visual Culture of Singapore

Level 1: Object Recognition
• Buildings (Shophouses and High-Rise): 
In the foreground and midground, we see tightly packed two- to three-storey shophouses with pitched roofs, typical of mid-20th-century Singapore. Their facades feature narrow frontages and repetitive fenestration, reflecting a modular form suited for both commercial and residential use. The roofs are likely tiled, with some signs of weathering and disrepair.
In stark contrast, the background is dominated by a modernist high-rise apartment building, suggestive of Singapore's post-war public housing projects initiated by the Housing and Development Board (HDB). This juxtaposition between low-rise colonial shophouses and modernist high-rises marks a pivotal moment of transition in Singapore's urban planning history, when kampong and pre-war structures were being systematically cleared and replaced by vertical housing to address housing shortages and sanitation concerns.

• Waterway and Boats: 
The canal or river running through the image (possibly the Singapore River or Rochor Canal) is heavily populated with traditional wooden boats (bumboats or tongkangs), many with curved hulls and covered canopies for goods. This indicates a thriving river-based economy and supports the interpretation of this district as a hub for maritime trade, loading, and warehousing prior to the relocation of port activities.

• Bridge and Vehicles: 
The arched stone or concrete bridge in the foreground—possibly Elgin Bridge or Coleman Bridge—carries vehicular traffic, including mid-century sedans and compact cars. The bridge is flanked by ornamental balustrades and classical street lamps, typical of colonial-era infrastructure. The number of vehicles and the clear road markings indicate growing urban mobility and a shift toward a car-based transportation system.

Architectural Level
• Shophouses: 
The visual profile of the shophouses—colonnaded walkways (five-foot ways), timber shutters, and narrow vertical windows—points to architectural typologies common from the late 19th to early 20th century. These structures likely served as combined commercial-residential spaces, often associated with Chinese and Indian merchant families. Their preservation or erasure played a significant role in debates about heritage during the urban renewal campaigns of the 1960s–80s.

• High-Rise Block: 
The prominent tall building is a uniform, rectilinear slab block with repetitive window bays and open-air corridors—a hallmark of early HDB housing. These blocks were intended to symbolize modernity, hygiene, and state-led progress. The absence of balconies and aesthetic ornamentation underscores their utilitarian function.

Landscape Features
• Canal Geometry and Urban Density: 
The photograph shows how the built environment is tightly interwoven with the river's edge, forming irregular but dense urban clusters. This organic urban form contrasts with the later grid-based planning principles that were introduced under British and post-independence administrations.

• Urban Compression: 
The scene captures the compression of space typical of rapidly modernizing colonial port cities. Horizontal layers of older commercial life at ground level are visually and symbolically overshadowed by new vertical regimes of housing and authority.

Decorative and Cultural Details
• Signage: 
While the image lacks legible signage, the shophouse facades may contain business signs or hand-painted advertisements. These would be crucial markers of ethnic and linguistic plurality, often written in Chinese, Tamil, or Malay, reflecting the plural society of the period.

• Boats as Cultural Indicators: 
The presence and shape of boats reveal not only commercial activities but also link to the laboring classes (coolies, boatmen) who formed the backbone of port economies. The photographic capture of their vessels—still actively in use—stands as a material record of a vanishing mode of urban labor.

Activities and Temporal Markers
• Street Width: 
The streets visible between the buildings are narrow—perhaps no more than 5–7 meters—supporting a theory that this area predates motorized urban planning. It further suggests that this photo captures a transitional zone between pre-modern town life and the state's effort to rationalize and expand road infrastructure.

• Urban Redevelopment Context: 
This photograph likely dates from the 1950s to early 1970s, capturing a moment when Singapore's urban fabric was undergoing drastic change. The mixture of boat-based trade, low-rise heritage buildings, and rising HDB flats indexes a profound transformation in housing, sanitation, and state control over the landscape.

Photographic Perspective and Photographer's Location
• The photo appears to have been taken from an elevated vantage point, possibly from the upper floor or rooftop of a tall building across the river. This elevated viewpoint allows for a panoramic sweep and might reflect the conventions of colonial and postcolonial administrative photography, which often employed a high vantage point to express surveillance, control, or oversight of urban space.

Concluding Note
This photograph serves as a rich palimpsest of Singapore's urban development—an artifact capturing the visual tensions between colonial mercantile legacies, riverine economies, and the rise of state-led modernization. Through its layered composition, the image invites viewers to reflect on processes of architectural erasure, infrastructural ambition, and the historical visualization of progress.`,
    expertAnnotation: `Below is the revised and enriched annotation of the photograph, fully integrating the historical and cultural details you provided. This version prioritizes accuracy, specificity, and scholarly tone, tailored for your NHB benchmark annotation framework.

Historical Image Annotation – Kampong Malacca / Ellenborough Market Area, ca. 1970

Level 1: Object Recognition
• Buildings (Ellenborough Buildings and Modern HDB): 
The foreground and midground are dominated by a dense block of two- to three-storey shophouses forming a triangular footprint. These are the Ellenborough Buildings, constructed from the mid-1840s and designed by J.T. Thomson, then Government Surveyor. Their architectural layout was uniform yet ornamentally ambitious for their time, reflecting early colonial attempts to impose formal order on commercial vernacular architecture. To the rear rises a stark contrast: a multi-storey Housing and Development Board (HDB) flat, likely built in the late 1960s as part of the post-independence urban renewal programme. Its verticality and utilitarian style represent the state's infrastructural push to modernize living conditions and clear older riverfront structures.

• Waterway and Boats: 
The canal or river that curves through the image is the Singapore River, running between Coleman Bridge (foreground) and Read Bridge (midground). The waterway is densely populated with tongkangs and bumboats—traditional wooden cargo vessels with covered decks—moored along the quay. These boats, used primarily to transport goods from larger ships to the market, attest to the river's role as the commercial artery of colonial and early postcolonial Singapore. Steps descending to the riverbank from the market zone are visible, providing access points for the vessels to offload goods directly into Ellenborough Market.

• Bridge and Vehicles: 
The Coleman Bridge anchors the bottom edge of the photograph. It is a colonial-style concrete or stone structure with arched spans and balustrades, featuring decorative lamp posts. The bridge carries steady automobile traffic—mid-century sedans are clearly visible—indicating the area's vehicular accessibility by the 1970s and the state's infrastructural adaptation to automobile-based mobility.

Architectural Level
• Ellenborough Buildings: 
This triangular block was demarcated by Boat Quay, New Bridge Road, and Ellenborough Street. The shophouses' stylistic refinement, with possibly pilastered facades and shuttered windows, reflects mid-19th century Anglo-Chinese hybrid architecture. Unlike the later utilitarian shophouse typologies, these buildings bore a prestige layout, indicative of a major investment in commercial real estate at the river's mouth. Their planned coherence contrasts with the more organic accretion of urban space elsewhere.

• Modern HDB Complex: 
The high-rise slab in the background occupies the former site of the Ellenborough Market after it was gutted by fire in the 1970s. Its plain, repetitive fenestration, open-air corridors, and absence of decorative elements underscore the utilitarian ethos of early public housing. The building's presence marks the transition from a riverside mercantile economy to one of planned residential zoning and post-industrial restructuring.

Landscape Features
• Triangular Urban Block: 
The shape of the block reveals careful urban design imposed upon reclaimed swamp land—formerly Kampong Malacca, a Malay settlement zone set aside by Raffles but later sold off in 1845. Its development into a commercial node marks a colonial spatial logic that displaced indigenous communities in favor of mercantile infrastructure.

• Riverbank Activity: 
The visual density of boats and quayside infrastructure such as mooring posts and stairs reaffirms the area's function as a trade hub. This was further reinforced by the construction of Ellenborough Market, an open-sided riverside structure with low-slung roofs completed in 1845, and expanded in 1899 using a dismantled pavilion from the Edinburgh Exhibition, shipped from the UK and reconstructed onsite—a fascinating case of imperial exhibitionary transfer.

Decorative and Cultural Details
• Ethnic and Commercial Identity: 
The market and its surrounding quarter were known colloquially as the "Teochew market", reflecting the ethnic composition of its merchants and patrons. While the image does not show signage, the Chinese nickname for Ellenborough Street—"Mouth of the New Market"—preserves linguistic traces of this identity.

• Teochew Culinary Culture: 
Although invisible in the image, this site is deeply associated with culinary heritage, including dishes such as muay (Teochew porridge), ah bob ling (glutinous rice dumplings), and yew cha kuay (fried dough sticks). These sensory and material continuities extend the visual field beyond the frame into embodied memory and cultural continuity, offering a counterpoint to the erasures brought by urban redevelopment.

Activities and Temporal Markers
• Reclamation and Urban Planning: 
The photograph captures a site of intense spatial transformation: from reclaimed swampland allocated to Malays (early 19th century), to a Teochew-dominated market hub (mid-19th to early 20th century), to public housing and infrastructural expansion (post-1970). This sedimented urban history is partially legible in the photograph's built environment.

• Fire and Redevelopment: 
The timing of the photograph (ca. 1970) is critical—it was taken just before the Ellenborough Market was gutted by fire. In the aftermath, families displaced from squatter huts and demolished pre-war structures were resettled into the new HDB flats visible in the image. The triangular shophouse block, partly demolished in 1986 to make way for the new Coleman Bridge approach, survives here in its pre-erasure form.

Photographic Perspective and Visual Strategy
• The photograph was likely taken from an elevated position in a building on the opposite side of the river, possibly a municipal or commercial structure, which aligns with the photographic conventions of colonial and postcolonial urban documentation—surveying space from above as a mode of control, mapping, or foresight. The composition prioritizes infrastructural flows (river, road, bridge) and the contrast between old and new, documenting a pivotal moment in Singapore's transformation from maritime entrepôt to high-modernist city-state.

Concluding Note
This 1970 image of the Ellenborough Market district is not simply a view of the Singapore River, but a condensed visual archive of shifting ethnic geographies, colonial and postcolonial architectural regimes, and urban policy transformations. The presence of bumboats alongside a rising HDB flat captures the temporal friction of coexisting worlds—mercantile, vernacular, and modernist—on the verge of irrevocable change. Annotating this image reveals a richly layered historical consciousness embedded in the visual surface of the city.`,
    metadata: {
      date: "1970-01-01",
      location: "Coleman Bridge and New Bridge Road, Singapore",
      collection: "National Museum of Singapore",
      tags: [
        "ellenborough market",
        "coleman bridge",
        "singapore river",
        "shophouses",
        "hdb",
        "1970s",
        "urban development",
        "teochew market",
        "kampong malacca",
      ],
    },
    translations: {
      ms: {
        title: "Pasar Ellenborough - Jambatan Coleman dan Jalan New Bridge",
        description:
          "Gambar ini menangkap daerah Pasar Ellenborough sekitar tahun 1970, menunjukkan Sungai Singapura dengan Jambatan Coleman, rumah kedai tradisional, dan kompleks perumahan HDB yang sedang berkembang.",
      },
      zh: {
        title: "爱伦堡市场 - 哥里门桥和新桥路",
        description:
          "这张照片拍摄于1970年左右的爱伦堡市场区域，展现了新加坡河与哥里门桥、传统店屋以及新兴的组屋建筑群。",
      },
      ta: {
        title: "எலன்பரோ சந்தை - கோல்மன் பாலம் மற்றும் நியூ பிரிட்ஜ் சாலை",
        description:
          "இந்த புகைப்படம் 1970 ஆம் ஆண்டு எலன்பரோ சந்தை மாவட்டத்தை படம்பிடித்துள்ளது, கோல்மன் பாலம், பாரம்பரிய கடை வீடுகள் மற்றும் வளர்ந்து வரும் HDB வீட்டுவசதி வளாகத்துடன் சிங்கப்பூர் ஆற்றைக் காட்டுகிறது.",
      },
    },
    views: 2850,
    likes: 234,
  },
  {
    id: "1",
    image: "/singapore-colonial-building.jpg",
    title: "Raffles Hotel - Colonial Architecture",
    description:
      "The iconic Raffles Hotel, built in 1887, represents the pinnacle of colonial architecture in Singapore. This grand establishment has hosted numerous dignitaries and remains a symbol of Singapore's colonial heritage.",
    aiAnnotation:
      "A grand colonial-style building with white facade and distinctive architecture, likely from the British colonial period in Singapore.",
    expertAnnotation:
      "The iconic Raffles Hotel, built in 1887, represents the pinnacle of colonial architecture in Singapore.",
    metadata: {
      date: "1920-03-15",
      location: "Beach Road, Singapore",
      collection: "Singapore Heritage",
      tags: ["colonial", "architecture", "hotel", "heritage", "1920s"],
    },
    translations: {
      ms: {
        title: "Hotel Raffles - Seni Bina Kolonial",
        description:
          "Hotel Raffles yang ikonik, dibina pada tahun 1887, mewakili kemuncak seni bina kolonial di Singapura.",
      },
      zh: {
        title: "莱佛士酒店 - 殖民地建筑",
        description: "标志性的莱佛士酒店建于1887年，代表了新加坡殖民地建筑的巅峰。",
      },
      ta: {
        title: "ராஃபிள்ஸ் ஹோட்டல் - காலனித்துவ கட்டிடக்கலை",
        description:
          "1887 இல் கட்டப்பட்ட சின்னமான ராஃபிள்ஸ் ஹோட்டல், சிங்கப்பூரின் காலனித்துவ கட்டிடக்கலையின் உச்சத்தை பிரதிநிதித்துவப்படுத்துகிறது.",
      },
    },
    views: 1250,
    likes: 89,
  },
  {
    id: "2",
    image: "/singapore-street-market-1960s.jpg",
    title: "Traditional Street Market in Chinatown",
    description:
      "A bustling street market in Chinatown during the 1960s, showcasing the vibrant commercial life of Singapore's Chinese community. Vendors sell fresh produce, traditional goods, and local delicacies.",
    aiAnnotation:
      "A bustling street market scene with vendors selling various goods, appears to be from mid-20th century Singapore.",
    expertAnnotation:
      "A traditional street market in Chinatown during the 1960s, showcasing the vibrant commercial life of Singapore's Chinese community.",
    metadata: {
      date: "1965-08-20",
      location: "Chinatown, Singapore",
      collection: "Colonial Era",
      tags: ["market", "chinatown", "1960s", "commerce", "community"],
    },
    translations: {
      ms: {
        title: "Pasar Jalanan Tradisional di Chinatown",
        description:
          "Pasar jalanan yang sibuk di Chinatown pada tahun 1960-an, menunjukkan kehidupan komersial yang meriah dalam komuniti Cina Singapura.",
      },
      zh: {
        title: "牛车水传统街市",
        description: "1960年代牛车水繁忙的街市，展现了新加坡华人社区充满活力的商业生活。",
      },
      ta: {
        title: "சைனாடவுனில் பாரம்பரிய தெரு சந்தை",
        description:
          "1960களில் சைனாடவுனில் இருந்த பரபரப்பான தெரு சந்தை, சிங்கப்பூரின் சீன சமூகத்தின் துடிப்பான வணிக வாழ்க்கையை காட்டுகிறது.",
      },
    },
    views: 890,
    likes: 67,
  },
  {
    id: "3",
    image: "/singapore-cultural-festival.jpg",
    title: "Chinese New Year Celebration",
    description:
      "A vibrant Chinese New Year celebration in Singapore, featuring traditional lion dances, red decorations, and community gatherings. This festival represents the rich cultural heritage of Singapore's Chinese community.",
    aiAnnotation:
      "A cultural celebration with people in traditional dress, possibly a Chinese New Year or similar festival.",
    expertAnnotation:
      "A vibrant Chinese New Year celebration in Singapore, featuring traditional lion dances and community gatherings.",
    metadata: {
      date: "1958-02-18",
      location: "Singapore",
      collection: "Cultural Festivals",
      tags: ["chinese new year", "festival", "celebration", "culture", "tradition"],
    },
    translations: {
      ms: {
        title: "Sambutan Tahun Baru Cina",
        description:
          "Sambutan Tahun Baru Cina yang meriah di Singapura, menampilkan tarian singa tradisional dan perhimpunan komuniti.",
      },
      zh: {
        title: "农历新年庆祝活动",
        description: "新加坡热闹的农历新年庆祝活动，展现传统舞狮表演和社区聚会。",
      },
      ta: {
        title: "சீன புத்தாண்டு கொண்டாட்டம்",
        description: "சிங்கப்பூரில் சீன புத்தாண்டு கொண்டாட்டம், பாரம்பரிய சிங்க நடனம் மற்றும் சமூக கூட்டங்களை காட்டுகிறது.",
      },
    },
    views: 1450,
    likes: 112,
  },
  {
    id: "4",
    image: "/singapore-independence-ceremony.jpg",
    title: "Independence Day Ceremony 1965",
    description:
      "The historic Independence Day ceremony of Singapore on August 9, 1965. This momentous occasion marked Singapore's separation from Malaysia and the beginning of its journey as an independent nation.",
    aiAnnotation: "A formal ceremony with officials and crowds, appears to be a significant national event.",
    expertAnnotation:
      "The historic Independence Day ceremony of Singapore on August 9, 1965, marking the nation's independence.",
    metadata: {
      date: "1965-08-09",
      location: "Singapore",
      collection: "Independence Period",
      tags: ["independence", "1965", "ceremony", "history", "national"],
    },
    translations: {
      ms: {
        title: "Upacara Hari Kemerdekaan 1965",
        description:
          "Upacara Hari Kemerdekaan bersejarah Singapura pada 9 Ogos 1965, menandakan permulaan perjalanan sebagai negara merdeka.",
      },
      zh: {
        title: "1965年独立日仪式",
        description: "1965年8月9日新加坡历史性的独立日仪式，标志着新加坡作为独立国家的开始。",
      },
      ta: {
        title: "1965 சுதந்திர தின விழா",
        description: "1965 ஆகஸ்ட் 9 அன்று சிங்கப்பூரின் வரலாற்று சுதந்திர தின விழா, ஒரு சுதந்திர நாடாக பயணத்தின் தொடக்கத்தை குறித்தது.",
      },
    },
    views: 2100,
    likes: 156,
  },
]

export default function GalleryPage() {
  const { language, changeLanguage } = useLanguage()
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(mockGalleryItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [selectedDecade, setSelectedDecade] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.metadata.tags.some((tag) => (tag || "").toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCollection = selectedCollection === "all" || item.metadata.collection === selectedCollection

    const matchesDecade =
      selectedDecade === "all" ||
      (selectedDecade === "1920s" && item.metadata.date.startsWith("192")) ||
      (selectedDecade === "1950s" && item.metadata.date.startsWith("195")) ||
      (selectedDecade === "1960s" && item.metadata.date.startsWith("196")) ||
      (selectedDecade === "1970s" && item.metadata.date.startsWith("197"))

    return matchesSearch && matchesCollection && matchesDecade
  })

  const getLocalizedContent = (item: GalleryItem) => {
    if (language === "en") {
      return { title: item.title, description: item.description }
    }
    return item.translations[language] || { title: item.title, description: item.description }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                {t("common.back", language)}
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{t("nav.gallery", language)}</h1>
                  <p className="text-sm text-muted-foreground">Explore Singapore's annotated heritage collection</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
              <Badge variant="outline">{filteredItems.length} items</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search heritage collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Collections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Collections</SelectItem>
                  <SelectItem value="Singapore Heritage">Singapore Heritage</SelectItem>
                  <SelectItem value="Colonial Era">Colonial Era</SelectItem>
                  <SelectItem value="Independence Period">Independence Period</SelectItem>
                  <SelectItem value="Cultural Festivals">Cultural Festivals</SelectItem>
                  <SelectItem value="National Museum of Singapore">National Museum of Singapore</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDecade} onValueChange={setSelectedDecade}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Decades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decades</SelectItem>
                  <SelectItem value="1920s">1920s</SelectItem>
                  <SelectItem value="1950s">1950s</SelectItem>
                  <SelectItem value="1960s">1960s</SelectItem>
                  <SelectItem value="1970s">1970s</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const localizedContent = getLocalizedContent(item)
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={localizedContent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{localizedContent.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{localizedContent.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>{item.metadata.date}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <MapPin className="w-3 h-3" />
                      <span>{item.metadata.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.metadata.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.metadata.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.metadata.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{item.metadata.collection}</Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/gallery/${item.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const localizedContent = getLocalizedContent(item)
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-80 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={localizedContent.title}
                          className="w-full h-48 lg:h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{localizedContent.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {item.metadata.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {item.metadata.location}
                              </span>
                              <Badge variant="outline">{item.metadata.collection}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {item.views}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-3">{localizedContent.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="w-4 h-4 text-secondary" />
                          <span className="text-sm font-medium">AI + Expert Annotation</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.metadata.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Expert Reviewed
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-4 h-4" />
                              {Object.keys(item.translations).length + 1} Languages
                            </span>
                          </div>
                          <Button variant="outline" asChild>
                            <Link href={`/gallery/${item.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search query or filters to find heritage items.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCollection("all")
                  setSelectedDecade("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
