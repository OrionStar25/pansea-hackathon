"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Globe,
  Eye,
  Heart,
  Share2,
  Download,
  Brain,
  Users,
} from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"

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
    photographer?: string
    source?: string
  }
  translations: {
    [key: string]: {
      title: string
      description: string
    }
  }
  views: number
  likes: number
  confidence?: number
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
      photographer: "Unknown",
      source: "National Museum of Singapore",
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
    confidence: 95,
  },
  {
    id: "1",
    image: "/singapore-colonial-building.jpg",
    title: "Raffles Hotel - Colonial Architecture",
    description:
      "The iconic Raffles Hotel, built in 1887, represents the pinnacle of colonial architecture in Singapore. This grand establishment has hosted numerous dignitaries and remains a symbol of Singapore's colonial heritage.",
    aiAnnotation:
      "A grand colonial-style building with white facade and distinctive architecture, likely from the British colonial period in Singapore. The building features classical columns, ornate details, and appears to be a significant institutional or commercial structure.",
    expertAnnotation:
      "The iconic Raffles Hotel, built in 1887, represents the pinnacle of colonial architecture in Singapore. Designed by Regent Alfred John Bidwell of Swan and Maclaren, this grand establishment has hosted numerous dignitaries including Somerset Maugham, Rudyard Kipling, and Charlie Chaplin. The hotel's distinctive white facade, classical columns, and tropical colonial design elements make it one of the most recognizable landmarks in Singapore's heritage landscape.",
    metadata: {
      date: "1920-03-15",
      location: "Beach Road, Singapore",
      collection: "Singapore Heritage",
      tags: ["colonial", "architecture", "hotel", "heritage", "1920s", "landmark"],
      photographer: "Unknown",
      source: "National Archives of Singapore",
    },
    translations: {
      ms: {
        title: "Hotel Raffles - Seni Bina Kolonial",
        description:
          "Hotel Raffles yang ikonik, dibina pada tahun 1887, mewakili kemuncak seni bina kolonial di Singapura. Hotel mewah ini telah menjadi tuan rumah kepada ramai tokoh penting dan kekal sebagai simbol warisan kolonial Singapura.",
      },
      zh: {
        title: "莱佛士酒店 - 殖民地建筑",
        description:
          "标志性的莱佛士酒店建于1887年，代表了新加坡殖民地建筑的巅峰。这家豪华酒店接待过众多政要，至今仍是新加坡殖民遗产的象征。",
      },
      ta: {
        title: "ராஃபிள்ஸ் ஹோட்டல் - காலனித்துவ கட்டிடக்கலை",
        description:
          "1887 இல் கட்டப்பட்ட சின்னமான ராஃபிள்ஸ் ஹோட்டல், சிங்கப்பூரின் காலனித்துவ கட்டிடக்கலையின் உச்சத்தை பிரதிநிதித்துவப்படுத்துகிறது.",
      },
    },
    views: 1250,
    likes: 89,
    confidence: 95,
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
      photographer: "Unknown",
      source: "National Archives of Singapore",
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
    confidence: 88,
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
      photographer: "Unknown",
      source: "National Archives of Singapore",
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
    confidence: 92,
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
      photographer: "Unknown",
      source: "National Archives of Singapore",
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
    confidence: 94,
  },
]

export default function GalleryItemPage() {
  const params = useParams()
  const { language, changeLanguage } = useLanguage()

  const currentItem = mockGalleryItems.find((item) => item.id === params.id) || mockGalleryItems[0]

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(currentItem.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const getLocalizedContent = () => {
    if (language === "en") {
      return { title: currentItem.title, description: currentItem.description }
    }
    return currentItem.translations[language] || { title: currentItem.title, description: currentItem.description }
  }

  const localizedContent = getLocalizedContent()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/gallery" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Gallery
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Heritage Item</h1>
                  <p className="text-sm text-muted-foreground">Detailed view with annotations</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  {likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={currentItem.image || "/placeholder.svg"}
                  alt={localizedContent.title}
                  className="w-full aspect-square object-cover"
                />
              </CardContent>
            </Card>

            {/* Image Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Image Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Date:</span>
                  <span>{currentItem.metadata.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{currentItem.metadata.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Views:</span>
                  <span>{currentItem.views}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Source:</span>
                  <span>{currentItem.metadata.source}</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  {currentItem.metadata.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Title and Description */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{localizedContent.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{currentItem.metadata.collection}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {Object.keys(currentItem.translations).length + 1} Languages
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{localizedContent.description}</p>
              </CardContent>
            </Card>

            {/* Annotations */}
            <Tabs defaultValue="expert" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expert" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Expert Annotation
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Annotation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="expert" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Expert-Enhanced Annotation
                    </CardTitle>
                    <CardDescription>
                      Reviewed and enriched by heritage experts with cultural context and historical accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{currentItem.expertAnnotation}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Expert Verified
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Cultural Context Added
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Historical Accuracy Confirmed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-secondary" />
                      AI-Generated Annotation
                      <Badge variant="outline" className="ml-auto">
                        {currentItem.confidence}% confidence
                      </Badge>
                    </CardTitle>
                    <CardDescription>Initial description generated by SEA-LION v4 multimodal AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{currentItem.aiAnnotation}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        AI Generated
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        High Confidence
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Expert Reviewed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Language Versions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  Available Languages
                </CardTitle>
                <CardDescription>
                  This heritage item is available in multiple languages for broader accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("en")}
                    className="justify-start"
                  >
                    🇺🇸 English
                  </Button>
                  <Button
                    variant={language === "ms" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("ms")}
                    className="justify-start"
                  >
                    🇲🇾 Bahasa Melayu
                  </Button>
                  <Button
                    variant={language === "zh" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("zh")}
                    className="justify-start"
                  >
                    🇨🇳 中文
                  </Button>
                  <Button
                    variant={language === "ta" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("ta")}
                    className="justify-start"
                  >
                    🇮🇳 தமிழ்
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
