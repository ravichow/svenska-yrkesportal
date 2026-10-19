// Svenska Yrkesportal v2 - Yrkesinriktade Lektionsmoduler & Scenarier
// Utvecklad för Jobbtorget Scala Pilot | Helsingborgs stad
// Följer CEFR-kriterier och praktisk arbetsplatskommunikation

const VOCATIONAL_LESSONS = [
  {
    id: 'lesson_instructions',
    moduleTitle: 'Arbetsinstruktioner',
    category: 'work',
    roleTag: 'Lager & Logistik',
    description: 'Träna på att förstå muntliga arbetsuppgifter, placering och säkerhetsregler.',
    totalSteps: 3,
    steps: [
      {
        stepId: 'inst_1',
        stepNumber: 1,
        title: 'Flytta de blå lådorna',
        scenarioContext: 'Du arbetar på ett lager i Helsingborg. Din arbetsledare Johan kommer fram med morgonens arbetsorder.',
        image: 'assets/warehouse_scenario.jpg',
        imageAlt: 'Arbetsledare i blå arbetskläder instruerar lagerarbetare framför stålhyllor med blå förvaringslådor.',
        speaker: 'Arbetsledare Johan',
        dialogue: 'Hej! Kan du flytta de blå lådorna från golvet till hylla tre innan lunch?',
        audioText: 'Hej! Kan du flytta de blå lådorna från golvet till hylla tre innan lunch?',
        audioDurationText: '0:08',
        translations: {
          en: 'Hello! Can you move the blue boxes from the floor to shelf three before lunch?',
          ar: 'مرحبًا! هل يمكنك نقل الصناديق الزرقاء من الأرض إلى الرف رقم ثلاثة قبل الغداء؟',
          so: 'Haye! Miyaad sanduuqyada buluugga ah dhulka uga wareejin kartaa khaanadda saddexaad qadada ka hor?',
          ti: 'ሰላም! ነተን ሰማያዊ ሳጹናት ቅድሚ ምሳሕ ካብ ምድሪ ቤት ናብ መደርደሪ ሰለስተ ከተግዕዘን ትኽእልዶ?',
          uk: 'Привіт! Чи можеш перенести сині коробки з підлоги на третю полицю до обіду?'
        },
        keyVocabulary: [
          { word: 'flytta', pronunciation: 'flyt-ta', meaning: 'att byta plats på något (move)', example: 'Vi måste flytta godset.' },
          { word: 'de blå lådorna', pronunciation: 'de bloo low-dor-na', meaning: 'bestämda lådor med blå färg (the blue boxes)', example: 'Lådorna står vid dörren.' },
          { word: 'hylla tre', pronunciation: 'hyl-la tree', meaning: 'den tredje hyllan från golvet (shelf three)', example: 'Placera dem på hylla tre.' },
          { word: 'innan lunch', pronunciation: 'in-nan lunch', meaning: 'före lunchrasten klockan 12 (before lunch)', example: 'Arbetet ska vara klart innan lunch.' }
        ],
        comprehensionQuestion: 'Vad ska du göra enligt instruktionen?',
        options: [
          {
            id: 'opt_1',
            text: 'Flytta de blå lådorna till hylla tre.',
            isCorrect: true,
            feedback: 'Helt rätt! Arbetsledaren sa: "flytta de blå lådorna... till hylla tre". Bra lyssnat!'
          },
          {
            id: 'opt_2',
            text: 'Ställa tillbaka alla lådor i förrådet.',
            isCorrect: false,
            feedback: 'Inte riktigt. Lyssna igen efter handlingen ("flytta") och destinationen ("hylla tre").'
          },
          {
            id: 'opt_3',
            text: 'Rengöra hyllan innan lunch.',
            isCorrect: false,
            feedback: 'Fel. Arbetsledaren bad dig flytta lådor, inte städa.'
          }
        ],
        practicalCommunication: {
          prompt: 'Hur svarar du om du är osäker på exakt vilken hylla han menar?',
          options: [
            {
              id: 'resp_1',
              text: 'Ursäkta, kan du visa mig vilken hylla du menar?',
              isCorrect: true,
              feedback: 'Utmärkt yrkessvenska! Att be om ett förtydligande förhindrar felplockning och visar yrkesansvar.'
            },
            {
              id: 'resp_2',
              text: 'Jag förstår ingenting.',
              isCorrect: false,
              feedback: 'Tips: Tips: Det är mer konstruktivt att fråga: "Kan du visa mig vilken hylla du menar?"'
            },
            {
              id: 'resp_3',
              text: 'Okej, jag gissar.',
              isCorrect: false,
              feedback: 'Obs: På ett lager är säkerhet viktigt. Fråga alltid om du är osäker.'
            }
          ]
        }
      },
      {
        stepId: 'inst_2',
        stepNumber: 2,
        title: 'Mottagning vid port fyra',
        scenarioContext: 'En lastbil anländer med leverans till Helsingborgs distributionslager.',
        image: 'assets/warehouse_scenario.jpg',
        imageAlt: 'Lagerlokal med truckgång och pallar.',
        speaker: 'Arbetsledare Johan',
        dialogue: 'Ställ de nya träpallarna borta vid port fyra och kontrollera fraktsedeln.',
        audioText: 'Ställ de nya träpallarna borta vid port fyra och kontrollera fraktsedeln.',
        audioDurationText: '0:07',
        translations: {
          en: 'Place the new wooden pallets over by gate four and check the consignment note.',
          ar: 'ضع المنصات الخشبية الجديدة بجانب البوابة رقم أربعة وافحص بوليصة الشحن.',
          so: 'Dhig sariiraha alwaaxda cusub albaabka afaraad oo hubi warqadda rarka.',
          ti: 'ነተን ሓደሽቲ ዕንጨይቲ ፓሌታት ኣብ ኣፍደገ ኣርባዕተ ኣንብረን ነቲ ናይ ጽዕነት ሰነድ ድማ ተቘጻጸሮ።',
          uk: 'Поставте нові дерев’яні піддони біля воріт чотири та перевірте накладну.'
        },
        keyVocabulary: [
          { word: 'ställa', pronunciation: 'stel-la', meaning: 'placera stående eller på plats (put/place)', example: 'Ställ pallen här.' },
          { word: 'port fyra', pronunciation: 'port fy-ra', meaning: 'lastport nummer 4 (gate 4)', example: 'Lastbilen backar till port fyra.' },
          { word: 'fraktsedel', pronunciation: 'frakt-se-del', meaning: 'dokument med varulista och mottagare (waybill/shipping note)', example: 'Skriv under fraktsedeln.' }
        ],
        comprehensionQuestion: 'Var ska pallarna placeras?',
        options: [
          {
            id: 'opt_1',
            text: 'Vid port fyra.',
            isCorrect: true,
            feedback: 'Rätt svar! "Borta vid port fyra". Mycket bra!'
          },
          {
            id: 'opt_2',
            text: 'Inne i personalrummet.',
            isCorrect: false,
            feedback: 'Fel. Pallar placeras i lastzonen vid port fyra.'
          },
          {
            id: 'opt_3',
            text: 'Kvar på lastbilsflaket.',
            isCorrect: false,
            feedback: 'Inte rätt. Uppgiften är att ställa dem vid port fyra.'
          }
        ],
        practicalCommunication: {
          prompt: 'Hur meddelar du när uppgiften är klar?',
          options: [
            {
              id: 'resp_1',
              text: 'Nu är pallarna på plats vid port fyra och fraktsedeln är påskriven.',
              isCorrect: true,
              feedback: 'Professionellt och tydligt! Arbetsledaren vet direkt att arbetet är slutfört.'
            },
            {
              id: 'resp_2',
              text: 'Färdig.',
              isCorrect: false,
              feedback: 'Tips: Ett lite fylligare svar ger tryggare samarbete på jobbet.'
            }
          ]
        }
      },
      {
        stepId: 'inst_3',
        stepNumber: 3,
        title: 'Skyddsutrustning & Säkerhet',
        scenarioContext: 'Det är dags att flytta tungt gods med vassa kanter.',
        image: 'assets/warehouse_scenario.jpg',
        imageAlt: 'Säkerhetsskyltar och skyddshandskar på en lagerarbetsplats.',
        speaker: 'Skyddsombudet Sara',
        dialogue: 'Kom ihåg att alltid ta på dig skyddshandskar och skyddsskor innan du börjar lyfta.',
        audioText: 'Kom ihåg att alltid ta på dig skyddshandskar och skyddsskor innan du börjar lyfta.',
        audioDurationText: '0:07',
        translations: {
          en: 'Remember to always put on protective gloves and safety shoes before you start lifting.',
          ar: 'تذكر أن ترتدي دائمًا قفازات الحماية وأحذية السلامة قبل أن تبدأ في الرفع.',
          so: 'Xusuusnow inaad mar walba gashato galoofyada ilaalinta iyo kabaha badbaadada ka hor intaadan bilaabin qaadista.',
          ti: 'ቅድሚ ምልዓል ምጅማርካ ኩሉ ግዜ መከላኸሊ ኣእዳውን ናይ ድሕንነት ጫማን ምግባር ኣይትረስዕ።',
          uk: 'Не забудьте завжди одягати захисні рукавиці та спецвзуття перед тим, як підіймати вантаж.'
        },
        keyVocabulary: [
          { word: 'skyddshandskar', pronunciation: 'skydds-hand-skar', meaning: 'kraftiga handskar som skyddar mot skärsår (protective gloves)', example: 'Handskarna skyddar händerna.' },
          { word: 'skyddsskor', pronunciation: 'skydds-skoor', meaning: 'skor med stålhätta mot fallande föremål (safety shoes)', example: 'Skyddsskor är obligatoriska.' },
          { word: 'innan du lyfter', pronunciation: 'in-nan du lyf-ter', meaning: 'före du påbörjar tunga lyft (before lifting)', example: 'Böj på benen när du lyfter.' }
        ],
        comprehensionQuestion: 'Vilken utrustning krävs innan du lyfter godset?',
        options: [
          {
            id: 'opt_1',
            text: 'Skyddshandskar och skyddsskor.',
            isCorrect: true,
            feedback: 'Rätt svar! Skyddsutrustning förhindrar arbetsskador på fötter och händer.'
          },
          {
            id: 'opt_2',
            text: 'Endast solglasögon.',
            isCorrect: false,
            feedback: 'Inte rätt. Sara nämnde skyddshandskar och skyddsskor.'
          },
          {
            id: 'opt_3',
            text: 'Hörlurar med musik.',
            isCorrect: false,
            feedback: 'Farligt på ett lager. Du måste höra truckar och larm.'
          }
        ],
        practicalCommunication: {
          prompt: 'Om dina skyddshandskar är trasiga, vad säger du?',
          options: [
            {
              id: 'resp_1',
              text: 'Mina handskar har gått sönder, var kan jag hämta ett nytt par?',
              isCorrect: true,
              feedback: 'Mycket bra! Du agerar säkert och ber om ny utrustning direkt.'
            },
            {
              id: 'resp_2',
              text: 'Jag jobbar utan handskar idag.',
              isCorrect: false,
              feedback: 'Obs: Arbeta aldrig utan föreskriven skyddsutrustning. Risk för skada.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'lesson_help',
    moduleTitle: 'Be om hjälp & Förtydligande',
    category: 'speak',
    roleTag: 'Lokalvård & Service',
    description: 'Träna på att ställa frågor när du inte förstår eller behöver stöd av kollegor.',
    totalSteps: 2,
    steps: [
      {
        stepId: 'help_1',
        stepNumber: 1,
        title: 'Blanda allrengöringsmedel',
        scenarioContext: 'Du är ny i städteamet på en skola i Helsingborg och ska dosera rengöringsmedel i mopphinken.',
        image: 'assets/learner_hero.jpg',
        imageAlt: 'Lokalvårdare i blå arbetskläder med städvagn i en ljus korridor.',
        speaker: 'Kollegan Fatima',
        dialogue: 'Dosera två kapsyler allrengöringsmedel i hinken med varmt vatten.',
        audioText: 'Dosera två kapsyler allrengöringsmedel i hinken med varmt vatten.',
        audioDurationText: '0:06',
        translations: {
          en: 'Dose two caps of all-purpose cleaner into the bucket with warm water.',
          ar: 'ضع مقدار غطائين من المنظف العام في الدلو بالماء الدافئ.',
          so: 'Ku dar laba koob oo saabuunta guud baaldiga biyo diirran leh.',
          ti: 'ኣብቲ ውዑይ ማይ ዘለዎ ባልዲ ክልተ ክዳን ናይ ሓፈሻዊ መጽረዪ መድሃኒት ዓቅን።',
          uk: 'Додайте два ковпачки універсального засобу для чищення у відро з теплою водою.'
        },
        keyVocabulary: [
          { word: 'dosera', pronunciation: 'do-se-ra', meaning: 'mäta upp rätt mängd kemikalie (dose)', example: 'Dosera noggrant.' },
          { word: 'två kapsyler', pronunciation: 'tvoo kap-sy-ler', meaning: 'måttet på två korkar (two caps)', example: 'Två kapsyler räcker.' },
          { word: 'allrengöringsmedel', pronunciation: 'all-ren-gö-rings-me-del', meaning: 'miljövänligt rengöringsmedel för golv och ytor (all-purpose cleaner)', example: 'Spraya inte outspätt medel.' }
        ],
        comprehensionQuestion: 'Hur mycket medel ska hällas i hinken?',
        options: [
          {
            id: 'opt_1',
            text: 'Två kapsyler.',
            isCorrect: true,
            feedback: 'Rätt svar! "Två kapsyler i hinken med varmt vatten".'
          },
          {
            id: 'opt_2',
            text: 'Hela flaskan.',
            isCorrect: false,
            feedback: 'För mycket kemikalier gör golvet halt och klibbigt.'
          },
          {
            id: 'opt_3',
            text: 'Inget medel alls.',
            isCorrect: false,
            feedback: 'Fatima sa två kapsyler.'
          }
        ],
        practicalCommunication: {
          prompt: 'Om du inte hörde instruktionen tydligt, vad säger du på ett artigt sätt?',
          options: [
            {
              id: 'resp_1',
              text: 'Ursäkta, kan du säga det en gång till lite långsammare?',
              isCorrect: true,
              feedback: 'Perfekt formulering! Naturlig och vänlig svenska som kollegor uppskattar.'
            },
            {
              id: 'resp_2',
              text: 'Va?!',
              isCorrect: false,
              feedback: 'Tips: "Va?" kan låta lite hårt. Säg hellre: "Ursäkta, kan du säga det en gång till?"'
            }
          ]
        }
      },
      {
        stepId: 'help_2',
        stepNumber: 2,
        title: 'Portkod till städförrådet',
        scenarioContext: 'Du ska hämta rena mikrofiberdukar i förrådet men dörren är låst.',
        image: 'assets/learner_hero.jpg',
        imageAlt: 'Lokalvårdare framför ett låst materialförråd.',
        speaker: 'Vaktmästaren Erik',
        dialogue: 'Koden till förrådet är 4280. Kom ihåg att dra igen dörren ordentligt efter dig.',
        audioText: 'Koden till förrådet är 4280. Kom ihåg att dra igen dörren ordentligt efter dig.',
        audioDurationText: '0:07',
        translations: {
          en: 'The code to the storage room is 4280. Remember to pull the door shut properly behind you.',
          ar: 'رمز غرفة التخزين هو 4280. تذكر أن تغلق الباب جيدًا خلفك.',
          so: 'Koodhka qolka kaydka waa 4280. Xusuusnow inaad albaabka si fiican u xirto marka aad ka baxdo.',
          ti: 'ኮድ ናይቲ መኽዘን 4280 እዩ። ድሕሬኻ ነቲ ማዕጾ ጽቡቕ ገይርካ ምዕጻዉ ኣይትረስዕ።',
          uk: 'Код до комори — 4280. Не забудьте щільно зачинити двері за собою.'
        },
        keyVocabulary: [
          { word: 'koden till förrådet', pronunciation: 'koo-den till för-row-det', meaning: 'sifferkombination för att öppna dörren (storage code)', example: 'Tryck in koden.' },
          { word: 'dra igen dörren', pronunciation: 'draa i-gen dör-ren', meaning: 'stänga dörren helt så den går i lås (pull door shut)', example: 'Dörren måste vara låst.' }
        ],
        comprehensionQuestion: 'Vilken kod gav vaktmästaren?',
        options: [
          {
            id: 'opt_1',
            text: '4280',
            isCorrect: true,
            feedback: 'Rätt! Koden är 4280.'
          },
          {
            id: 'opt_2',
            text: '0000',
            isCorrect: false,
            feedback: 'Lyssna på siffrorna igen: 4, 2, 8, 0.'
          },
          {
            id: 'opt_3',
            text: '9911',
            isCorrect: false,
            feedback: 'Fel siffror. Rätt kod var 4280.'
          }
        ],
        practicalCommunication: {
          prompt: 'Hur bekräftar du koden så du vet att du uppfattade siffrorna rätt?',
          options: [
            {
              id: 'resp_1',
              text: 'Fyra-två-åtta-noll, stämmer det?',
              isCorrect: true,
              feedback: 'Utmärkt! Att upprepa siffror är bästa sättet att dubbelkolla koder och telefonnummer.'
            },
            {
              id: 'resp_2',
              text: 'Tack.',
              isCorrect: false,
              feedback: 'Tips: Bra att tacka, men dubbelkolla gärna siffrorna också om du är osäker.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'lesson_reporting',
    moduleTitle: 'Rapportera problem & Frånvaro',
    category: 'workplace',
    roleTag: 'Kök & Måltidsservice',
    description: 'Träna på att anmäla sjukfrånvaro och rapportera trasiga maskiner på arbetsplatsen.',
    totalSteps: 2,
    steps: [
      {
        stepId: 'rep_1',
        stepNumber: 1,
        title: 'Anmäla sjukfrånvaro',
        scenarioContext: 'Klockan är 06:15 på morgonen. Du har vaknat med feber och ont i halsen och kan inte arbeta.',
        image: 'assets/kitchen_scenario.jpg',
        imageAlt: 'Kock och köksbiträde i skolkök som samtalar om arbetsdagen.',
        speaker: 'Kökschefen Linnea',
        dialogue: 'Tack för att du hör av dig tidigt. Krya på dig, och ring igen imorgon innan klockan två så vi vet hur du mår.',
        audioText: 'Tack för att du hör av dig tidigt. Krya på dig, och ring igen imorgon innan klockan två så vi vet hur du mår.',
        audioDurationText: '0:08',
        translations: {
          en: 'Thank you for contacting us early. Get well soon, and call again tomorrow before two o’clock so we know how you are doing.',
          ar: 'شكرًا لتواصلك مبكرًا. نتمنى لك الشفاء العاجل، واتصل بنا غدًا قبل الساعة الثانية لنعرف حالتك.',
          so: 'Waad ku mahadsan tahay inaad goor hore nala soo xiriirtay. Caafimaad wanaagsan, berina soo wac labada ka hor.',
          ti: 'ቀዲምካ ብምድዋልካ ነመስግን። ምሕረት ይውረድካ፡ ጽባሕ ድማ ቅድሚ ሰዓት ክልተ ደዊልካ ከመይ ከምዘለኻ ሓብረና።',
          uk: 'Дякую, що попередили заздалегідь. Одужуйте та зателефонуйте завтра до двох годин, щоб ми знали ваш стан.'
        },
        keyVocabulary: [
          { word: 'anmäla frånvaro', pronunciation: 'an-mäh-la fron-va-roo', meaning: 'meddela att du inte kan komma till jobbet (report absence)', example: 'Ring alltid i god tid.' },
          { word: 'krya på dig', pronunciation: 'kry-a pow dey', meaning: 'svensk hälsning till någon som är sjuk (get well soon)', example: 'Krya på dig och vila.' },
          { word: 'innan klockan två', pronunciation: 'in-nan klok-kan tvoo', meaning: 'före klockan 14:00 (before 2 pm)', example: 'Hör av dig innan klockan två.' }
        ],
        comprehensionQuestion: 'När vill chefen att du hör av dig igen?',
        options: [
          {
            id: 'opt_1',
            text: 'Imorgon innan klockan två.',
            isCorrect: true,
            feedback: 'Rätt svar! "Ring igen imorgon innan klockan två".'
          },
          {
            id: 'opt_2',
            text: 'Om en månad.',
            isCorrect: false,
            feedback: 'Chefen behöver veta bemanningen inför nästa dag.'
          },
          {
            id: 'opt_3',
            text: 'Aldrig mer.',
            isCorrect: false,
            feedback: 'Helt fel.'
          }
        ],
        practicalCommunication: {
          prompt: 'Vad säger du när du ringer och anmäler att du är sjuk?',
          options: [
            {
              id: 'resp_1',
              text: 'Hej, det är Ahmed. Jag har feber idag och kan tyvärr inte komma till jobbet.',
              isCorrect: true,
              feedback: 'Perfekt meddelande! Du säger ditt namn, anledningen och att du inte kan jobba.'
            },
            {
              id: 'resp_2',
              text: 'Jag kommer inte.',
              isCorrect: false,
              feedback: 'Tips: Berätta alltid vem som ringer och säg att du är sjuk så chefen kan kalla in en vikarie.'
            }
          ]
        }
      },
      {
        stepId: 'rep_2',
        stepNumber: 2,
        title: 'Diskmaskinen läcker vatten',
        scenarioContext: 'I diskrummet märker du att det rinner ut vatten under den stora grovdiskmaskinen.',
        image: 'assets/kitchen_scenario.jpg',
        imageAlt: 'Restaurangkök med rostfria bänkar och diskmaskin.',
        speaker: 'Förste kock Marcus',
        dialogue: 'Stäng av maskinen på den röda nödstoppsknappen och torka upp vattnet så ingen halkar.',
        audioText: 'Stäng av maskinen på den röda nödstoppsknappen och torka upp vattnet så ingen halkar.',
        audioDurationText: '0:07',
        translations: {
          en: 'Turn off the machine with the red emergency stop button and wipe up the water so no one slips.',
          ar: 'أوقف تشغيل الغسالة باستخدام زر التوقف في حالات الطوارئ الأحمر وامسح الماء حتى لا ينزلق أحد.',
          so: 'Mashiinka ka dami batoonka cas ee degdegga ah biyaha tirtir si aysan cidna ugu siiban.',
          ti: 'ነቲ ማሽን በቲ ቀይሕ ናይ ህጹጽ ደው መበሊ ቁልፊ ኣጥፍኣዮ፡ ሰብ ከይዕንቀፍ ድማ ነቲ ማይ ወልውሎ።',
          uk: 'Вимкніть машину червоною аварійною кнопкою та витріть воду, щоб ніхто не послизнувся.'
        },
        keyVocabulary: [
          { word: 'nödstoppsknapp', pronunciation: 'nöd-stopps-knapp', meaning: 'röd säkerhetsknapp som stänger av maskinen direkt (emergency stop button)', example: 'Tryck på nödstoppet!' },
          { word: 'läcker vatten', pronunciation: 'lek-ker vat-ten', meaning: 'vatten rinner ut oönskat (leaking water)', example: 'Slangen läcker vatten.' },
          { word: 'halka', pronunciation: 'hal-ka', meaning: 'glida och falla på vått golv (slip)', example: 'Varning för halkrisk.' }
        ],
        comprehensionQuestion: 'Vilken säkerhetsåtgärd ska göras först?',
        options: [
          {
            id: 'opt_1',
            text: 'Stänga av maskinen på den röda nödstoppsknappen.',
            isCorrect: true,
            feedback: 'Rätt! Stäng av maskinen först, torka sedan upp vattnet.'
          },
          {
            id: 'opt_2',
            text: 'Fortsätta diska tallrikarna.',
            isCorrect: false,
            feedback: 'Farligt! El och vatten tillsammans innebär olycksrisk.'
          },
          {
            id: 'opt_3',
            text: 'Gå hem för dagen.',
            isCorrect: false,
            feedback: 'Du måste varna kollegor och stänga av maskinen först.'
          }
        ],
        practicalCommunication: {
          prompt: 'Hur varnar du en kollega som är på väg in i diskrummet?',
          options: [
            {
              id: 'resp_1',
              text: 'Se upp! Golvet är blött och halt, maskinen läcker vatten.',
              isCorrect: true,
              feedback: 'Bra rådighet! Du förhindrar att en kollega halkar och slår sig.'
            },
            {
              id: 'resp_2',
              text: 'Akta dig.',
              isCorrect: false,
              feedback: 'Tips: Bra, men förklara gärna varför: "Golvet är blött och halt".'
            }
          ]
        }
      }
    ]
  }
];

if (typeof window !== "undefined") window.VOCATIONAL_LESSONS = VOCATIONAL_LESSONS;
if (typeof module !== "undefined") module.exports = VOCATIONAL_LESSONS;
