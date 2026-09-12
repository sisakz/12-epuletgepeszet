# Megújuló energiák az épületgépészetben

Oktatási segédanyagok épületgépész technikus tanulók számára

Ez a repository a **Megújuló energiák az épületgépészetben** tantárgy teljes tanévi tananyagának fejlesztési és tárolási helye. Az egyes mappák a tanmenet egymásra épülő tanóráihoz tartozó óraterveket, prezentációkat, tanári transzkripteket, tanulói feladatokat és kiegészítő szakmai anyagokat tartalmazzák.

A repository folyamatosan bővül. A jelenlegi anyagok mellett később ide kerülnek a napenergia, a hőszivattyús rendszerek, a geotermikus energia, a biomassza, a hibrid rendszerek és a komplex épületgépészeti projektek órái is.

## A képzés adatai

| Adat | Tartalom |
|---|---|
| Képzés | Épületgépész technikus |
| Évfolyam | 13. évfolyam |
| Tantárgy | Megújuló energiák az épületgépészetben |
| Heti óraszám | 2 óra |
| Tanítási időszak | 2026. szeptember 7. – 2027. április 30. |
| Intézmény | Szily Kálmán Technikum |
| Oktató | Csilla, gépészmérnök, szakoktató és műhelyfőnök |
| Szakmai háttér | WorldSkills Plumbing and Heating szakértő |

## A tantárgy célja

A tantárgy középpontjában nem az egyes technológiák elszigetelt elméleti bemutatása áll. A tanulók azt gyakorolják, hogyan lehet a műszaki ismereteket valós épületgépészeti helyzetekben alkalmazni.

A tanulási folyamat fejlődési íve:

**ismerem → felismerem → értelmezem → alkalmazom → összehasonlítom → döntök → indoklom**

A tanulók a tanév végére képessé válnak:

- a legfontosabb megújuló energiaforrások és épületgépészeti alkalmazásaik felismerésére;
- egyszerű kapcsolási rajzok értelmezésére;
- a berendezések, szerelvények és energiaáramok azonosítására;
- valós berendezések és műszaki dokumentációk összevetésére;
- különböző rendszermegoldások összehasonlítására;
- az épület adottságaihoz illeszkedő megoldás kiválasztására;
- szakmai döntéseik érthető indoklására.

## Repository-szerkezet

Az egyes kétórás tanítási egységek külön **lesson_XX_YY** mappába kerülnek. Az XX és YY az órák tanmenet szerinti sorszáma.

    12-epuletgepeszet/
    ├── README.md
    ├── curriculum/
    │   └── tanmenet.docx
    ├── lesson_01_02/
    │   ├── README.md
    │   ├── lesson-plan/
    │   ├── presentation/
    │   ├── worksheets/
    │   └── assets/
    ├── lesson_03_04/
    │   ├── README.md
    │   ├── lesson-plan/
    │   ├── presentation/
    │   ├── worksheets/
    │   └── assets/
    └── ...

Egy órablokk mappájában csak azok az almappák szükségesek, amelyekhez ténylegesen tartozik fájl. A szerkezet fokozatosan is kialakítható.

### Az almappák szerepe

| Mappa | Tartalom |
|---|---|
| **lesson-plan/** | Részletes óraterv, időbeosztás és tanári előkészítés |
| **presentation/** | Prezentáció, diánkénti leírás és tanári transzkript |
| **worksheets/** | Tanulói munkalapok, esetkártyák, kilépőkártyák és megoldókulcsok |
| **assets/** | Képek, ábrák, kapcsolási rajzok és egyéb felhasznált média |
| **references/** | Gyártói dokumentációk, szakmai források és hivatkozások, ha szükséges |

## Fájlelnevezési javaslat

A fájlnevek legyenek rövidek, ékezet nélküliek és következetesek.

    lesson_03_04/
    ├── lesson-plan/
    │   ├── oraterv_03_04.docx
    │   └── oraterv_03_04.pdf
    ├── presentation/
    │   ├── prezentacio_03_04.pptx
    │   └── prezentacio_03_04_transzkript.md
    ├── worksheets/
    │   ├── energiaigeny_terkep.docx
    │   ├── epuletek_esetkartyak.docx
    │   └── kilepokartya.docx
    └── assets/
        └── images/

Ha egy fájlnak több változata készül, a Git verziókövetését célszerű használni olyan fájlnevek helyett, mint a final, final2 vagy legujabb.

## A tananyag felépítése

| Órák | Mappa | Témakör |
|---:|---|---|
| 1–2. | **lesson_01_02** | A megújuló energia fogalma, energiaforrások és fenntarthatóság |
| 3–4. | **lesson_03_04** | Épületek energiaigénye, energiafogyasztók, hő- és villamos energia |
| 5–6. | **lesson_05_06** | Projekt: Energia-detektívek |
| 7–8. | **lesson_07_08** | A napenergia hasznosítása és épületgépészeti alkalmazása |
| 9–10. | **lesson_09_10** | Napkollektorok típusai és szerkezete |
| 11–12. | **lesson_11_12** | Tájolás, dőlésszög és árnyékolás |
| 13–14. | **lesson_13_14** | Napkollektoros rendszer kapcsolási rajza |
| 15–16. | **lesson_15_16** | Napkollektoros rendszer működése, szivattyúállomás és HMV-tároló |
| 17–18. | **lesson_17_18** | Projekt: a tanműhely napkollektoros rendszere |
| 19–20. | **lesson_19_20** | Fotovoltaikus rendszerek alapjai |
| 21–22. | **lesson_21_22** | Csapadékvíz gyűjtése és hasznosítása |
| 23–24. | **lesson_23_24** | A hőszivattyú működési elve, hőforrás és hőleadó oldal |
| 25–26. | **lesson_25_26** | A hűtőkör fő elemei |
| 27–28. | **lesson_27_28** | COP, SCOP, hatásfok, hőforrás és hőleadó |
| 29–30. | **lesson_29_30** | Hőszivattyús rendszer kapcsolási rajza |
| 31–32. | **lesson_31_32** | Projekt: kapcsolási rajz és valós berendezés |
| 33–34. | **lesson_33_34** | Levegő–levegő és levegő–víz hőszivattyúk |
| 35–36. | **lesson_35_36** | Víz–víz, talaj–víz és egyéb hőszivattyús rendszerek |
| 37–38. | **lesson_37_38** | Padló-, fal-, radiátoros és fan-coil hőleadók |
| 39–40. | **lesson_39_40** | A hőszivattyú és a hidraulikai rendszer kapcsolata |
| 41–42. | **lesson_41_42** | Skills műhely: működő hőszivattyús rendszerek |
| 43–44. | **lesson_43_44** | Projekt: Hőszivattyú-detektív |
| 45–46. | **lesson_45_46** | Geotermikus energia, talajkollektor és talajszonda |
| 47–48. | **lesson_47_48** | Projekt: Izland és Magyarország geotermikus lehetőségei |
| 49–50. | **lesson_49_50** | Biomassza, fa és faalapú tüzelőanyagok |
| 51–52. | **lesson_51_52** | Projekt: biomassza-kazán és kapcsolata a fűtési rendszerrel |
| 53–54. | **lesson_53_54** | Hibrid rendszerek |
| 55–56. | **lesson_55_56** | PV, hőszivattyú, napkollektor, tárolók és energiamenedzsment |
| 57–58. | **lesson_57_58** | Hibás kapcsolási rajzok elemzése |
| 59–60. | **lesson_59_60** | Komplex projekt: Te vagy az épületgépész |
| 61–62. | **lesson_61_62** | A komplex projekt bemutatása és értékelése |

## Az egyes órablokkok ajánlott README-tartalma

Minden **lesson_XX_YY** mappa saját README.md fájlt kaphat, amely legalább az alábbiakat tartalmazza:

1. az órák témája és helye a tanmenetben;
2. a tanulási eredmények;
3. a szükséges előismeretek;
4. az órák rövid menete;
5. a felhasznált és elkészített fájlok;
6. a szükséges eszközök és nyomtatandó anyagok;
7. az oktatói tapasztalatok és későbbi módosítások.

## Didaktikai alapelvek

### Az épület igényéből indulunk

A technológiaválasztás előtt meg kell érteni:

- milyen szolgáltatást kell az épületben biztosítani;
- hőenergiára, villamos energiára vagy mindkettőre van-e szükség;
- mikor és milyen használati rend szerint jelentkezik az energiaigény;
- milyen helyi adottságok és korlátok befolyásolják a döntést.

### A tanulók alkalmazzák az ismereteket

Az órák rendszeresen tartalmaznak:

- valós vagy valósághű épületeseteket;
- kapcsolási rajzok értelmezését;
- valós berendezések megfigyelését;
- csoportos műszaki döntési feladatokat;
- rövid szakmai bemutatást és indoklást;
- formatív értékelést és önreflexiót.

### A megújuló technológia a rendszer része

A tananyag a rendszer egészét vizsgálja. A megújuló energiaforrás mellett figyelembe veszi az energiaigény csökkentését, a hatékony gépészeti rendszert, a segédenergia-igényt, a szabályozást, a tárolást és az épület használati sajátosságait.

## Az anyagok használata

1. Nyisd meg az adott **lesson_XX_YY** mappát.
2. Az órára készüléshez először tekintsd át az óratervet.
3. Ellenőrizd a prezentáció előadói jegyzeteit vagy a külön transzkriptet.
4. Nyomtasd ki a szükséges munkalapokat és esetkártyákat.
5. Ellenőrizd az **assets/** mappában található képeket, ábrákat és kapcsolási rajzokat.
6. Az óra után rögzítsd a tapasztalatokat az adott órablokk README-jében vagy külön reflexiós fájlban.

## Hozzájárulás és módosítás

Az anyagok fejlesztésekor:

- egy módosítás lehetőleg egy jól meghatározott órablokkhoz kapcsolódjon;
- a prezentáció és a transzkript tartalma maradjon összhangban;
- a tanulói feladat módosításakor a tanári megoldási támpontokat is frissíteni kell;
- a képek és külső anyagok forrását a megfelelő órablokkban dokumentálni kell;
- személyes adatot tartalmazó tanulói munkát nem szabad a repositoryba feltölteni.

## Formátumok

| Formátum | Elsődleges cél |
|---|---|
| Markdown | README-k, transzkriptek, leírások és könnyen követhető változáskezelés |
| PowerPoint | Tanórai prezentációk |
| Word | Szerkeszthető óratervek és munkalapok |
| PDF | Nyomtatásra és változtatás nélküli megosztásra szánt változatok |
| PNG vagy JPG | Fotók és raszteres szemléltetőanyagok |
| SVG | Szerkeszthető ábrák és sematikus rajzok |

## Licenc és külső források

A repository nyilvánossá tétele előtt külön LICENSE fájlban kell meghatározni az anyagok felhasználási feltételeit.

Külső képek, gyártói dokumentációk, szabványok vagy más szerzői jogi védelem alatt álló anyagok csak a felhasználási feltételeiknek megfelelően kerülhetnek a repositoryba. Ha egy külső anyag nem tárolható jogszerűen, a repositoryban csak a hivatkozását kell megadni.

---

**A repository állapota:** folyamatosan bővülő oktatási tananyag.
