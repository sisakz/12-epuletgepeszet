import type { ReactNode } from "react"
import { Calendar, GraduationCap, MapPin, Users } from "lucide-react"
import {
  AudienceCard,
  BulletList,
  DataTable,
  DecisionCard,
  FlowDiagram,
  HighlightBox,
  MetaRow,
  ServiceAreasMap,
  ThoughtBlock,
  ToolCard,
} from "@/components/presentation-ui"

export type Slide = {
  id: string
  section?: string
  title: string
  navLabel?: string
  variant?: "default" | "hero"
  content: ReactNode
}

export const slides: Slide[] = [
  {
    id: "title",
    variant: "hero",
    navLabel: "Nyitó",
    title: "Tevékenységi térkép és stratégiai irányok",
    content: (
      <div className="space-y-12">
        <p className="text-3xl leading-snug text-muted-foreground">
          Kuratóriumi tervező workshop —{" "}
          <span className="font-medium text-primary">második kör</span>
        </p>

        <div className="space-y-6">
          <MetaRow
            label="Időpont"
            value="2026. szeptember 2., szerda 17:00–18:30"
          />
          <MetaRow label="Helyszín" value="HTTP iroda + Teams" />
          <MetaRow label="Előkészítők" value="Marcsi, Zoli" />
        </div>

        <div className="flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-lg text-muted-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            Irányválasztás
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-lg text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            Tevékenységi térkép
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-lg text-muted-foreground">
            <Users className="h-5 w-5 text-primary" />
            Kuratórium
          </span>
        </div>

        <p className="max-w-xl text-xl leading-snug text-muted-foreground/80">
          Közös kiindulópont a Kuratórium irányválasztásához — nem a programok
          újraismertetése, hanem stratégiai döntések előkészítése.
        </p>
      </div>
    ),
  },
  {
    id: "mission",
    section: "2 · Cél és célcsoportok",
    navLabel: "Cél",
    title: "Egy cél — két célcsoport — sok eszköz",
    content: (
      <div className="space-y-6">
        <HighlightBox title="Cél" variant="primary">
          Annak támogatása, hogy az informatikai képzésekben (szakképzés, főiskola, egyetem) tanuló diákok megszerezzék a sikeres IT-karrierhez szükséges piacképes készségeket és tudást
        </HighlightBox>
        <p className="px-1 text-xl leading-snug text-muted-foreground">
          <span className="font-medium text-foreground">Eszközök:</span> minden
          aktivitás ennek a cél eléréséhez használt beavatkozás — nem öncélú
          programok.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <AudienceCard
            accent="student"
            label="Diákok"
            title="Közvetlen elérés"
            desc="Velük dolgozunk: képzés, verseny, gyakorlati feladatok"
            icon={GraduationCap}
          />
          <AudienceCard
            accent="teacher"
            label="Infotanárok"
            title="Multiplikátor hatás"
            desc="Őket erősítjük, hogy a diákokhoz eljuttassák a naprakész tudást"
            icon={Users}
          />
        </div>

      </div>
    ),
  },
  {
    id: "service-areas",
    section: "3 · Szolgáltatási területek",
    navLabel: "Szolg. területek",
    title: "HTTP szolgáltatási területek",
    content: <ServiceAreasMap />,
  },
  {
    id: "students",
    section: "3 · Szolgáltatási területek",
    navLabel: "Diákok",
    title: "Diákok",
    content: (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          accent="student"
          name="Cisco Hálózati Akadémia képzések"
          desc="Hálózati, Python és egyéb piacképes kurzusok az iskolarendszerben"
          stats="~150 akadémia · ~20 000 diák/év"
        />
        <ToolCard
          accent="student"
          name="Digitalent Ágazati Képzőközpont"
          desc="Duális, gyakorlatorientált képzés (szoftverfejlesztő, rendszerüzemeltető)"
          stats="2025 · 15+ tanuló · külön Nonprofit Kft."
        />
        <ToolCard
          accent="student"
          name="Tehetséggondozás, versenyszervezés"
          subItems={[
            "WorldSkills és EuroSkills versenyek és felkészítések",
            "Junior Skills versenyek",
          ]}
          stats="18 világverseny · 39 versenyző · EuroSkills: 3 arany"
        />
      </div>
    ),
  },
  {
    id: "teachers",
    section: "3 · Szolgáltatási területek",
    navLabel: "Tanárok",
    title: "Infotanárok",
    content: (
      <div className="grid gap-5 sm:grid-cols-2">
        <ToolCard
          accent="teacher"
          name="ITMP Klub képzések"
          stats="3 101 klubtag · 132 képzés · 21 124 részvétel"
        />
        <ToolCard
          accent="teacher"
          name="ITMP mentorálási rendszer"
          desc="Céges mentorálás, szakmai hálózat"
        />
        <ToolCard
          accent="teacher"
          name="iNFOTANÁRIUM havi webinárok"
          stats="2017 óta"
        />
        <ToolCard
          accent="teacher"
          name="Oktatói Továbbképzési Rendszer (OTR)"
          desc="Akkreditált, kredites szakképzési oktatói képzések"
          stats="Pl. CCNA3: 60 óra / 60 kredit"
        />
        <ToolCard
          accent="teacher"
          name="Pedagógus-továbbképzést Támogató Rendszer (PTTR)"
          desc="Akkreditált pedagógus-továbbképzések"
        />
        <ToolCard
          accent="teacher"
          name="Cisco Hálózati Akadémia oktatóképzések"
          desc="ASC / ITC, akadémiai támogatás — Premier+ partner"
        />
        <ToolCard
          accent="teacher"
          name="IOK"
          desc="Éves rendszerességű informatikai konferencia"
          stats="XIV. IOK, 2026: ÓE, ~250 fő"
        />
      </div>
    ),
  },
  {
    id: "both",
    section: "3 · Szolgáltatási területek",
    navLabel: "Mindkettő",
    title: "Tanárok és diákok",
    content: (
      <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
        <ToolCard
          accent="both"
          name="MITS projektfeladattár"
          desc="Valós munkahelyi kihívásokat szimuláló projektfeladatok a szakképzésben"
          stats="Erasmus+ lezárult · pilot: 185 diák, 15 csoport"
        />
        <ToolCard
          accent="both"
          name="MITS tutoriálok"
          desc="Módszertani támogatás tanároknak, gyakorlati feladatok diákoknak"
        />
      </div>
    ),
  },
  {
    id: "overview",
    section: "3 · Összkép",
    navLabel: "Összkép",
    title: "Szolgáltatási területek összképe",
    content: <FlowDiagram />,
  },
  {
    id: "strategy-direction",
    section: "4 · Stratégiai kérdések",
    navLabel: "Irány",
    title: "Irány és ambíció",
    content: (
      <div className="space-y-5">
        <p className="text-xl text-muted-foreground">
          Az első workshopon felmerült kérdések — a második körben{" "}
          <span className="font-medium text-primary">választást</span> érdemes
          kérni.
        </p>
        <BulletList
          items={[
            "Mi legyen az Alapítvány hosszabb távú iránya és ambíciója?",
            "Kiket szeretnénk elérni és oktatni?",
            "Maradjon-e elsősorban az informatika a fókuszban, vagy érdemes más célcsoportok, területek felé bővíteni?",
          ]}
        />
      </div>
    ),
  },
  {
    id: "strategy-impact",
    section: "4 · Stratégiai kérdések",
    navLabel: "Hatás",
    title: "Hatás, növekedés, portfólió",
    content: (
      <BulletList
        items={[
          "Hogyan érhetnénk el a jelenleginél nagyobb hatást?",
          "Mit jelenthet számunkra a növekedés? (több tanár/akadémia · több versenyérem · másolható duális modell · digitális termék — pl. MITS)",
          "Mely tevékenységekre érdemes nagyobb hangsúlyt helyezni?",
          "Mit tartsunk meg mindenképpen abból, amit ma csinálunk?",
          "Hol látunk lehetőséget új irányok, együttműködések vagy programok elindítására?",
        ]}
      />
    ),
  },
  {
    id: "keepers",
    section: "4 · Döntési pontok",
    navLabel: "Döntések",
    title: "Megtartók és explicit döntések",
    content: (
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-student">
              Erős eszközök — diákok
            </p>
            <BulletList
              items={[
                "Cisco Hálózati Akadémia képzések",
                "Tehetséggondozás, versenyszervezés",
                "Digitalent (ha tovább építjük)",
              ]}
            />
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-teacher">
              Erős eszközök — infotanárok
            </p>
            <BulletList
              items={[
                "ITMP Klub + mentorálás, iNFOTANÁRIUM",
                "OTR / PTTR továbbképzések",
                "Cisco oktatóképzések, IOK",
              ]}
            />
          </div>
        </div>
        <DecisionCard
          items={[
            "ITMP megújulása (2026-os napirend)",
            "DigiTalent: pilot marad, vagy második működési rendszer?",
            "MITS utóélete a projekt lezárása után",
          ]}
        />
      </div>
    ),
  },
  {
    id: "process",
    section: "5 · Stratégiai folyamat",
    navLabel: "Folyamat",
    title: "Nem nagy dokumentum — használható anyag",
    content: (
      <div className="grid gap-8 lg:grid-cols-2">
        <HighlightBox title="Amit keresünk" variant="muted">
          <BulletList
            items={[
              "Összegyűjti a szervezeten belül és a Kuratóriumban meglévő tudást és elképzeléseket",
              "Konkrét javaslatot tesz a következő néhány év fő irányaira",
            ]}
          />
        </HighlightBox>
        <HighlightBox title="Lehetséges forma" variant="muted">
          <div className="space-y-6">
            <BulletList
              items={[
                "Rövid, 3 éves jegyzet: célcsoport · 4–5 tevékenységi tét · mit hagyunk abba · partnerek",
                "Külső szakértő: interjúk → strukturálás, stratégiai javaslat",
              ]}
            />
            <p className="text-xl text-muted-foreground">
              A második kör után eldönthető, milyen külső segítségre van szükség.
            </p>
          </div>
        </HighlightBox>
      </div>
    ),
  },
  {
    id: "finance",
    section: "6 · Anyagi vonatkozások",
    navLabel: "Pénzügy",
    title: "Tevékenységi körök mellett: pénzügyi kép",
    content: (
      <div className="max-w-2xl space-y-8">
        <p className="text-xl leading-snug text-muted-foreground">
          A workshopon tisztázandó belső bontás — részletes számok a belső
          közhasznúsági beszámolóból és programonkénti P&L-ből.
        </p>
        <BulletList
          items={[
            "Bevételtípus programonként (Cisco/OTR, pályázat, szponzoráció, 1% stb.)",
            "Fedezet / költség struktúra",
            "Munkaidő-allokáció a fő területekre",
          ]}
        />
        <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-7 py-6">
          <p className="text-xl italic text-muted-foreground">
            Belső adatok beemelendők a workshop anyagába — helykitöltő a
            beszélgetés indításához.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "discussion",
    section: "7 · Beszélgetéshez",
    navLabel: "Gondolatok",
    title: "Előzetes gondolatok",
    content: (
      <div className="space-y-5">
        <ThoughtBlock
          index={0}
          title="A cél és az eszközök viszonya"
          text="Minden programot azzal mérlegeljünk: mennyit járul hozzá a piacképes IT-skillekhez — közvetlenül, vagy tanári multiplikátoron keresztül?"
        />
        <ThoughtBlock
          index={1}
          title="Maradjon-e az informatika a fókuszban?"
          text="Mindkét célcsoport ma is informatika-orientált. Más tantárgy ugyanazért a kapacitásért versenyezne."
        />
        <ThoughtBlock
          index={2}
          title="Mit jelentsen a növekedés?"
          text="Több diák közvetlen elérése vs. erősebb multiplikátor. Érdemes 3 évre egy domináns növekedési logikát választani."
        />
      </div>
    ),
  },
  {
    id: "next-steps",
    section: "8 · Következő lépések",
    navLabel: "Lépések",
    title: "Mit csinálunk a workshop után?",
    content: (
      <DataTable
        headers={["Lépés", "Felelős", "Határidő"]}
        rows={[
          [
            "Második kör megtartása",
            "Kuratórium + Marcsi, Zoli",
            "2026. szept. 2.",
          ],
          ["Kuratóriumi irányok rögzítése", "Workshop", "Az alkalom végén"],
          [
            "Külső szakértő igény pontosítása",
            "Kuratórium",
            "A második kör után",
          ],
          [
            "Stratégiai jegyzet / interjúfolyamat",
            "TBD",
            "A második kör döntései alapján",
          ],
          [
            "További ötletek, szakemberek jelzése",
            "Kuratórium tagjai",
            "Folyamatosan",
          ],
        ]}
      />
    ),
  },
]
