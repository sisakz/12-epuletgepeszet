import type { ReactNode } from "react"
import {
  AirVent,
  BatteryCharging,
  Droplets,
  Fan,
  Lightbulb,
  Snowflake,
  ThermometerSun,
  Waves,
  Wrench,
} from "lucide-react"
import {
  BigPrompt,
  FactorOrbit,
  HighlightBox,
  ImageWithCaptions,
  LevelStack,
  NumberedItems,
  Reveal,
  SeasonCurves,
  SlideImage,
  TimerHero,
  VerdictCard,
  WorksheetSheet,
} from "@/components/presentation-ui"
import imgNyito from "@/assets/images/01_nyitokep_megujulo_epulet.png"
import imgKimaradas from "@/assets/images/02_energiaellatas_mukodes_es_kimaradas.png"
import imgMetszet from "@/assets/images/03_epulet_energiafogyasztok_metszet.png"
import imgTechnologiak from "@/assets/images/04_megujulo_technologiak.png"
import imgEsetek from "@/assets/images/05_epuletesetek.png"
import imgForrasAtalakitas from "@/assets/images/06_energiaforras_atalakitas_felhasznalas.png"

export type Slide = {
  id: string
  section?: string
  title: string
  titleDisplay?: ReactNode
  navLabel?: string
  variant?: "default" | "hero"
  steps?: number
  notes?: string
  content: ReactNode
}

export const slides: Slide[] = [
  {
    id: "title",
    variant: "hero",
    navLabel: "Nyitó",
    section: "1. óra · Ráhangolódás",
    title: "Épületek energiaigénye és megújuló energia",
    titleDisplay: (
      <span className="flex flex-col">
        <span>Épületek energiaigénye</span>
        <span className="text-muted-foreground">és megújuló energia</span>
      </span>
    ),
    notes:
      "Az épület nem egyszerűen energiát fogyaszt: fűt, meleg vizet készít, világít, szellőztet. Ma az igényt és az illesztés sorrendjét gyakoroljuk, nem részletes rendszertervezést.",
    content: (
      <div className="relative h-full min-h-0 overflow-hidden rounded-xl">
        <SlideImage
          src={imgNyito}
          alt="Megújuló energiás épület nyitóképe"
          className="absolute inset-0 h-full rounded-none border-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end gap-5 p-6 sm:p-8">
          <p className="text-3xl leading-snug text-white/90">
            Mit használ az épület, és mi illeszthető hozzá?
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-lg text-white/85 backdrop-blur-sm">
              13.D
            </span>
            <span className="rounded-full border border-primary/40 bg-primary/20 px-4 py-2 text-lg text-primary backdrop-blur-sm">
              3–4. tanóra
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "outage",
    section: "1. óra · Ráhangolódás",
    navLabel: "Következmények",
    title: "Mit érzékelünk azonnal, és mit csak később?",
    notes:
      "Képzeljétek el, hogy megszűnik az épület energiaellátása. 30 másodperc egyéni gondolkodás, majd két oszlop: azonnal érzékelhető és később érzékelhető. A válaszok ne legyenek a dián.",
    content: (
      <div className="relative h-full min-h-0">
        <SlideImage
          src={imgKimaradas}
          alt="Épület működés közben és energiaellátási kimaradáskor"
          className="h-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 gap-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 pt-16">
          <div className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 backdrop-blur-sm">
            <p className="text-lg font-semibold text-white">
              Azonnal érzékelhető
            </p>
            <p className="mt-1 text-base text-white/75">
              Mit veszünk észre rögtön?
            </p>
          </div>
          <div className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 backdrop-blur-sm">
            <p className="text-lg font-semibold text-white">
              Később érzékelhető
            </p>
            <p className="mt-1 text-base text-white/75">
              Mi válik csak később érezhetővé?
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "warmup-claims",
    section: "1. óra · Ismétlés",
    navLabel: "Állítások",
    title: "Négy állítás — igaz vagy hamis?",
    notes:
      "Kézjel vagy kártya. Minden állítás után 20 másodperc páros indoklás. Megoldás a következő dián.",
    content: (
      <NumberedItems
        columns={2}
        items={[
          "A villamos energia elsődleges energiaforrás.",
          "A biomassza minden esetben fenntartható.",
          "A hidrogén energiahordozó.",
          "A környezeti levegő hője hasznosítható.",
        ]}
      />
    ),
  },
  {
    id: "warmup-keys",
    section: "1. óra · Ismétlés",
    navLabel: "Indoklás",
    title: "Az indoklás teszi szakmaivá a választ",
    notes:
      "Csak azt a pontot bontsd ki, ahol sok hibás válasz született. Utána az épület szolgáltatásaira lépünk.",
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <VerdictCard
          verdict="hamis"
          claim="A villamos energia elsődleges energiaforrás."
          reason="A villamos energia energiahordozó."
        />
        <VerdictCard
          verdict="hamis"
          claim="A biomassza minden esetben fenntartható."
          reason="A használat módja dönti el, hogy fenntartható-e."
        />
        <VerdictCard
          verdict="igaz"
          claim="A hidrogén energiahordozó."
          reason="A hidrogént elő kell állítani."
        />
        <VerdictCard
          verdict="igaz"
          claim="A környezeti levegő hője hasznosítható."
          reason="A környezeti hőt hőszivattyú hasznosíthatja."
        />
      </div>
    ),
  },
  {
    id: "service-vs-device",
    section: "1. óra · Fogalmak",
    navLabel: "Szolgáltatás",
    title: "Az épület használói szolgáltatásokat igényelnek",
    steps: 1,
    notes:
      "A tanulók minden szolgáltatáshoz berendezéspéldát mondanak. A párosítás a válaszok után jelenjen meg.",
    content: (
      <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-2">
          {[
            "Komfortos belső hőmérséklet",
            "Meleg víz",
            "Megfelelő levegőminőség",
            "Látási feltételek",
            "Technológiai működés",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-lg"
            >
              {item}
            </div>
          ))}
          <Reveal at={1} className="space-y-2 pt-2">
            {(
              [
                { label: "Kazán vagy hőszivattyú", icon: ThermometerSun },
                { label: "HMV-tároló és hőtermelő", icon: Droplets },
                { label: "Ventilátor és légkezelő", icon: AirVent },
                { label: "Lámpatest", icon: Lightbulb },
                { label: "Gépek, kompresszor, elszívás", icon: Wrench },
              ] as const
            ).map(({ label, icon: ItemIcon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2 text-base"
              >
                <ItemIcon className="h-4 w-4 shrink-0 text-primary" />
                {label}
              </div>
            ))}
          </Reveal>
        </div>
        <SlideImage
          src={imgMetszet}
          alt="Épület energiafogyasztóinak metszete"
          className="h-full min-h-[14rem]"
        />
      </div>
    ),
  },
  {
    id: "four-levels",
    section: "1. óra · Fogalmak",
    navLabel: "Négy szint",
    title: "Egy energiaigény négy szinten írható le",
    steps: 3,
    notes:
      "A szintek külön kattintásra jelennek meg. Utána a tanulók ugyanilyen láncot alkotnak HMV-re vagy világításra.",
    content: (
      <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[1fr_1.05fr]">
        <LevelStack
          levels={[
            {
              label: "Szolgáltatás",
              value: "komfortos belső hőmérséklet",
            },
            { label: "Energiaigény", value: "fűtési hőigény" },
            { label: "Berendezés", value: "kazán vagy hőszivattyú" },
            {
              label: "Felhasznált energia",
              value: "gáz, villamos energia és környezeti hő",
            },
          ]}
        />
        <SlideImage
          src={imgMetszet}
          alt="Épület energiafogyasztóinak metszete"
          className="h-full min-h-[14rem]"
        />
      </div>
    ),
  },
  {
    id: "kw-kwh",
    section: "1. óra · Mértékegység",
    navLabel: "kW / kWh",
    title: "A kW a teljesítményt, a kWh az energia mennyiségét fejezi ki",
    notes:
      "Két gyors számolás: 2 kW-os hősugárzó 3 órán át; 8 kW-os hőtermelő fél órán át. Várt válasz: 6 kWh és 4 kWh.",
    content: (
      <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <HighlightBox variant="electric" title="kW">
              pillanatnyi teljesítmény
            </HighlightBox>
            <HighlightBox variant="heat" title="kWh">
              az elfogyasztott vagy átadott energia mennyisége
            </HighlightBox>
            <HighlightBox variant="primary" title="Példa">
              10 kW egy órán át: közel 10 kWh
            </HighlightBox>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold tabular-nums">P × t ≈ E</p>
            <p className="mt-2 text-lg text-muted-foreground">kW × óra → kWh</p>
          </div>
        </div>
        <SlideImage
          src={imgMetszet}
          alt="Épület energiafogyasztóinak metszete"
          className="h-full min-h-[14rem]"
        />
      </div>
    ),
  },
  {
    id: "demand-groups",
    section: "1. óra · Rendszerek",
    navLabel: "Igénycsoportok",
    title: "Az épület energiaigényei öt fő területhez kapcsolódnak",
    notes:
      "Minden kategóriához legalább egy valós berendezéspélda. Tanműhelynél a gépek, kompresszor és elszívás fontosabb, mint egy lakásban.",
    content: (
      <div className="relative h-full min-h-0">
        <SlideImage
          src={imgMetszet}
          alt="Épület energiaigény-csoportjai metszeten"
          className="h-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-3 pt-12 sm:grid-cols-5">
          {[
            "Fűtés és HMV",
            "Hűtés",
            "Szellőzés",
            "Világítás",
            "Háztartási és technológiai fogyasztók",
          ].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-white/20 bg-black/50 px-2 py-2 text-center text-sm font-semibold leading-snug text-white backdrop-blur-sm"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "dual-energy",
    section: "1. óra · Segédenergia",
    navLabel: "Kettős kapcsolat",
    title: "Egy rendszer hőt szolgáltathat, miközben villamos energiát fogyaszt",
    steps: 1,
    notes:
      "Gyors osztályozás: mit használ, és milyen szolgáltatást biztosít? A kapcsolatok a válasz után jelenjenek meg.",
    content: (
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(
            [
              { label: "Hőszivattyú", icon: ThermometerSun },
              { label: "Keringtető szivattyú", icon: Waves },
              { label: "Ventilátor", icon: Fan },
              { label: "Villanybojler", icon: Droplets },
              { label: "Klímaberendezés", icon: Snowflake },
            ] as const
          ).map(({ label, icon: ItemIcon }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-4 text-center"
            >
              <ItemIcon className="mx-auto mb-2 h-7 w-7 text-primary" />
              <p className="text-lg font-semibold leading-snug">{label}</p>
            </div>
          ))}
        </div>
        <Reveal at={1} keepSpace>
          <div className="grid gap-3 sm:grid-cols-2">
            <HighlightBox variant="heat" title="Hő">
              fűtés, HMV, hőelvonás, hőszállítás
            </HighlightBox>
            <HighlightBox variant="electric" title="Villamos energia">
              A felsorolt berendezések mind villamos energiát fogyasztanak.
            </HighlightBox>
          </div>
        </Reveal>
      </div>
    ),
  },
  {
    id: "map-brief",
    section: "1. óra · Csoportmunka",
    navLabel: "Térkép feladat",
    title: "Készítsetek energiaigény-térképet egy jól ismert épületről!",
    notes:
      "Kiosztod a munkalapot. Szerepek: jegyző, szóvivő, időfelelős, szakmai ellenőr. Kilenc perc.",
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <NumberedItems
          items={[
            "Iskola, lakás vagy családi ház",
            "Legalább 8 fogyasztó vagy berendezés",
            "Szolgáltatás és energiaforma",
            "Az igény időbeli jellege",
            "Egy vitatható besorolás",
          ]}
        />
        <WorksheetSheet
          title="Energiaigény-térkép"
          lines={[
            "Berendezés / fogyasztó",
            "Milyen szolgáltatást biztosít?",
            "Hő vagy villamos energia?",
            "Mikor jelentkezik az igény?",
          ]}
        />
      </div>
    ),
  },
  {
    id: "map-timer",
    section: "1. óra · Csoportmunka",
    navLabel: "9 perc",
    title: "A csoportmunka sikerkritériumai",
    steps: 2,
    notes:
      "Három kézzel léptethető állapot: 9, 5 és 2 perc. Ne töltsd ki helyettük a táblázatot. Az utolsó két percben a szakmai ellenőr ellenőriz.",
    content: (
      <TimerHero
        times={[9, 5, 2]}
        questions={[
          "Legalább 8, az épületben valóban előforduló fogyasztó",
          "Hő és villamos energia helyes besorolása",
          "Az igény jelentkezési idejének megadása",
          "Egy vitás példa szakmai indoklással",
        ]}
      />
    ),
  },
  {
    id: "disputed",
    section: "1. óra · Csoportmunka",
    navLabel: "Vitás példák",
    title: "A vitás példák pontosítják a fogalmakat",
    notes:
      "Két csoport egy-egy 30 másodperces példát mond. A többiek egyetértést vagy ellenvéleményt jeleznek.",
    content: (
      <BigPrompt
        lines={[
          "Melyik berendezés besorolásán vitatkoztatok?",
          "Mit fogyaszt?",
          "Milyen szolgáltatást biztosít?",
        ]}
      />
    ),
  },
  {
    id: "hour1-close",
    section: "1. óra · Zárás",
    navLabel: "Mondatkezdés",
    title: "Egy épület energiaigényének vizsgálatát azzal kezdem, hogy…",
    notes:
      "Egyéni mondatbefejezés. Jelenjen meg: mire, milyen energiaformában és mikor van szükség. Szünet után a 14. dia.",
    content: (
      <p className="max-w-3xl text-2xl leading-relaxed text-muted-foreground">
        Fejezzétek be egyetlen szakmai állítással. A második órán ehhez illesztünk
        megújuló lehetőségeket.
      </p>
    ),
  },
  {
    id: "recap",
    section: "2. óra · Visszakapcsolás",
    navLabel: "Három kérdés",
    title: "Ismétlés három kérdéssel",
    notes:
      "Párokban 30 másodperc. Megoldás ne legyen a dián. Az időbeliség azért fontos, mert a termelés és az igény nem mindig egyszerre jelentkezik.",
    content: (
      <NumberedItems
        items={[
          "Mi a különbség a kW és a kWh között?",
          "Minden fűtési rendszerelem hőfogyasztó?",
          "Miért számít, hogy mikor jelentkezik az igény?",
        ]}
      />
    ),
  },
  {
    id: "decision-order",
    section: "2. óra · Döntési sorrend",
    navLabel: "Sorrend",
    title: "A megfelelő rendszer kiválasztása az épület igényeinek felmérésével kezdődik",
    steps: 4,
    notes:
      "Minden lépéshez egy rövid példa. Várt igénycsökkentés: hőszigetelés, légzárás, beszabályozás, időprogram, LED, készenlét csökkentése.",
    content: (
      <LevelStack
        levels={[
          { label: "1", value: "Az igények és az épülethasználat felmérése" },
          { label: "2", value: "A felesleges energiaigény csökkentése" },
          { label: "3", value: "Hatékony gépészeti rendszer kialakítása" },
          { label: "4", value: "Megújuló technológia kiválasztása" },
          { label: "5", value: "Szabályozás és energiatárolás" },
        ]}
      />
    ),
  },
  {
    id: "pv-only",
    section: "2. óra · Döntési sorrend",
    navLabel: "Napelem",
    title: "A napelem villamos energiát termel – de ez önmagában még nem rendszermegoldás",
    notes:
      "Vitaindító: Miért nem elég azt mondani, hogy tegyünk fel napelemet? A PV nem rossz, de a rendszert és az időbeli illeszkedést kell vizsgálni.",
    content: (
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <NumberedItems
          items={[
            "A PV villamos energiát termel.",
            "A fűtési igény télen a legnagyobb.",
            "A termelés és a fogyasztás időben eltérhet.",
            "Más berendezés, szabályozás vagy tárolás is szükséges lehet.",
          ]}
        />
        <SeasonCurves />
      </div>
    ),
  },
  {
    id: "source-converter",
    section: "2. óra · Modell",
    navLabel: "Forrás–átalakító",
    title: "Különítsük el az energiaforrást, az átalakító berendezést és a hasznos energiaformát!",
    notes:
      "A tanulók minden sornál kimondják a forrás, a berendezés és a kimenet nevét. A hőszivattyúnál a villamos betáplálás is jelenjen meg.",
    content: (
      <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.34fr_1fr]">
        <div className="flex flex-col justify-around gap-2">
          {[
            {
              title: "PV",
              text: "Napenergia → PV-modul → villamos energia",
            },
            {
              title: "Napkollektor",
              text: "Napenergia → napkollektor → hő",
            },
            {
              title: "Hőszivattyú",
              text: "Környezeti hő + villamos energia → hőszivattyú → fűtési hő vagy elvont hő",
            },
            {
              title: "Biomassza",
              text: "Biomassza → kazán → hő",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {item.title}
              </p>
              <p className="mt-1 text-base leading-snug text-foreground/90">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <SlideImage
          src={imgForrasAtalakitas}
          alt="Energiaforrás, átalakítás és felhasználás folyamatai"
          fit="contain"
          className="h-full bg-white"
        />
      </div>
    ),
  },
  {
    id: "many-fits",
    section: "2. óra · Modell",
    navLabel: "Több megoldás",
    title: "Ugyanazt az energiaigényt többféle rendszer is kielégítheti",
    steps: 1,
    notes:
      "Gyors szóbeli párosítás. Minden válaszhoz egy feltételt is kell mondani. Nem egyetlen helyes választ keresünk.",
    content: (
      <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          {[
            "Egész éves HMV-igény",
            "Téli fűtési igény",
            "Nyári hűtési igény",
            "Nappali villamosenergia-igény",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xl"
            >
              {item}
            </div>
          ))}
          <Reveal at={1}>
            <p className="text-lg text-muted-foreground">
              Minden javaslathoz tegyétek hozzá: milyen feltétellel?
            </p>
          </Reveal>
        </div>
        <div className="relative h-full min-h-0">
          <SlideImage
            src={imgTechnologiak}
            alt="Megújuló technológiák: PV, napkollektor, hőszivattyú, biomassza-kazán"
            className="h-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-4 gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-10">
            {["PV", "Napkollektor", "Hőszivattyú", "Biomassza"].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-white/20 bg-black/50 px-2 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "case-brief",
    section: "2. óra · Esetfeladat",
    navLabel: "Feladat",
    title: "Az esetfeladatban indokolt rendszerjavaslatot kell készítenetek",
    notes:
      "Kiosztod a döntési lapokat. Több jó megoldás is lehet, de csak az a válasz védhető, amely az eset adataira hivatkozik.",
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <NumberedItems
          items={[
            "Legalább 4 energiaigény",
            "1 elsődleges és 1 kiegészítő megoldás",
            "2 előny és 2 korlát",
            "1 hiányzó adat",
            "60 másodperces ajánlás",
          ]}
        />
        <WorksheetSheet
          title="Döntési lap"
          lines={[
            "Fő energiaigények",
            "Elsődleges / kiegészítő irány",
            "Előnyök és korlátok",
            "Hiányzó adat",
          ]}
        />
      </div>
    ),
  },
  {
    id: "three-cases",
    section: "2. óra · Esetfeladat",
    navLabel: "Három eset",
    title: "A három épület energiaigényei és adottságai eltérnek",
    notes:
      "Kiosztod vagy sorsolod az eseteket. A teljes adatok a nyomtatott kártyákon vannak.",
    content: (
      <ImageWithCaptions
        src={imgEsetek}
        alt="Három épületeset: családi ház, tanműhely, vidéki ház"
        className="h-full"
        captions={[
          {
            label: "A: családi ház, régi gázkazán, jó déli tető",
            accent: "primary",
          },
          {
            label: "B: tanműhely, nagy nappali villamos terhelés, lapostető",
            accent: "electric",
          },
          {
            label:
              "C: vidéki ház, nincs gáz, helyi biomassza, korlátozott hálózat",
            accent: "heat",
          },
        ]}
      />
    ),
  },
  {
    id: "case-timer",
    section: "2. óra · Esetfeladat",
    navLabel: "11 perc",
    title: "A döntés az eset adataira épül",
    steps: 2,
    notes:
      "Léptethető 11, 6 és 2 perces állapot. Először ne technológiát válasszanak. Az utolsó két percben készüljön el a 60 másodperces ajánlás.",
    content: (
      <TimerHero
        times={[11, 6, 2]}
        questions={[
          "Melyik igény a legfontosabb?",
          "Mikor jelentkezik?",
          "Milyen helyi forrás adott?",
          "Mi korlátozza a választást?",
          "Melyik adat hiányzik?",
        ]}
      />
    ),
  },
  {
    id: "pitch-template",
    section: "2. óra · Bemutatás",
    navLabel: "Sablon",
    title: "A szakmai ajánlás öt mondatban összefoglalható",
    notes:
      "A szóvivők 30 másodpercben elpróbálják a bemutatást. Cél a döntés indoklása, nem a technológia reklámozása.",
    content: (
      <NumberedItems
        items={[
          "Fő energiaigény",
          "Választott megoldás",
          "A választást alátámasztó két konkrét esetadat",
          "Egy korlát",
          "Egy hiányzó adat",
        ]}
      />
    ),
  },
  {
    id: "presentations",
    section: "2. óra · Bemutatás",
    navLabel: "60 másodperc",
    title: "A bemutatásokban az indoklás a döntő",
    notes:
      "Csoportonként 60 másodperc, utána egy másik csoport legfeljebb 20 másodperces kérdése. Egy mondatos tanári visszajelzés: melyik indok volt erős.",
    content: (
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-center rounded-xl border border-primary/25 bg-primary/[0.07] px-6 py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Csoportonként
          </p>
          <p className="mt-2 text-[5.5rem] font-semibold leading-none tabular-nums">
            60
          </p>
          <p className="mt-2 text-2xl text-muted-foreground">másodperc</p>
        </div>
        <NumberedItems
          items={[
            "Fő igény és választás",
            "Két konkrét indok",
            "Korlát és hiányzó adat",
            "Másik csoport kérdése: Miért ez illeszkedik jobban?",
          ]}
        />
      </div>
    ),
  },
  {
    id: "good-decision",
    section: "2. óra · Összegzés",
    navLabel: "Feltételek",
    title: "A jó döntés egyszerre több szempontot vesz figyelembe",
    notes:
      "A tanulók egy új szemponttal kiegészítik a döntési lapjukat egy másik csoport bemutatásából.",
    content: (
      <FactorOrbit
        items={[
          "Energiaigény és szükséges energiaforma",
          "Az igény és a termelés időbeli alakulása",
          "Helyben elérhető megújuló energiaforrás",
          "Az épület és a gépészeti rendszer adottságai",
          "Korlátok, segédenergia, szabályozás és tárolás",
        ]}
      />
    ),
  },
  {
    id: "exit-card",
    section: "2. óra · Kilépés",
    navLabel: "Kilépőkártya",
    title: "A kilépőkártya a következő projekt kiindulópontja",
    notes:
      "Egyéni, névvel kitöltött válasz, leadás távozás előtt. A dia a beadásig maradjon kivetítve.",
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <NumberedItems
          items={[
            "Két épület-energiaigény",
            "Egy megújuló megoldás rövid indoklással",
            "Egy adat, amely nélkül nem születhet végleges döntés",
          ]}
        />
        <div className="space-y-4">
          <WorksheetSheet
            title="Kilépőkártya"
            lines={["Név", "Két igény", "Megoldás + indok", "Hiányzó adat"]}
          />
          <p className="flex items-center gap-2 text-base text-muted-foreground">
            <BatteryCharging className="h-4 w-4 text-primary" />
            A válaszaitok alapján kezdjük a következő Energia-detektívek
            projektet.
          </p>
        </div>
      </div>
    ),
  },
]
