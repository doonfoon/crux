// CRUX question bank.
// Each question lists every accepted answer, sorted into 4 "holds" by how
// well known the answer is:
//   0 = Jug (easy, most people say it)   1 = Edge
//   2 = Crimp (uncommon)                 3 = Mono (very rare)
// An answer can be a string or an array of [Display name, ...other accepted spellings].

const QUESTIONS = [
  { q: "Name a country that borders Brazil.",
    a: [["Argentina", "Colombia", "Peru", "Venezuela"],
        ["Bolivia", "Paraguay", "Uruguay"],
        ["Guyana"],
        ["Suriname", ["French Guiana", "France"]]] },

  { q: "Name a country that borders Germany.",
    a: [["France", "Poland", "Austria", "Switzerland"],
        ["Netherlands", "Belgium", "Denmark"],
        ["Czechia"],
        ["Luxembourg"]] },

  { q: "Name a country that borders China.",
    a: [["Russia", "India", "Mongolia", "North Korea"],
        ["Vietnam", "Pakistan", "Nepal"],
        ["Myanmar", "Laos", "Kazakhstan", "Bhutan", "Afghanistan"],
        ["Kyrgyzstan", "Tajikistan"]] },

  { q: "Name a country in South America.",
    a: [["Brazil", "Argentina", "Chile", "Peru", "Colombia"],
        ["Venezuela", "Ecuador", "Bolivia", "Uruguay"],
        ["Paraguay"],
        ["Guyana", "Suriname"]] },

  { q: "Name a landlocked country in Africa.",
    a: [["Ethiopia", "Uganda", "Zimbabwe"],
        ["Rwanda", "Zambia", "Botswana", "Mali", "Chad", "South Sudan"],
        ["Niger", "Malawi", "Burundi", "Lesotho", "Central African Republic"],
        ["Burkina Faso", "Eswatini"]] },

  { q: "Name a US state that borders Canada.",
    a: [["Washington", "Montana", "Alaska", "New York", "Maine"],
        ["Minnesota", "North Dakota", "Michigan", "Vermont"],
        ["Idaho", "New Hampshire"],
        ["Ohio", "Pennsylvania"]] },

  { q: "Name a US state that borders Mexico.",
    a: [["Texas", "California"],
        ["Arizona"],
        ["New Mexico"],
        []] },

  { q: "Name a country with a coastline on the Mediterranean Sea.",
    a: [["Italy", "Spain", "Greece", "France"],
        ["Turkey", "Egypt", "Croatia", "Israel"],
        ["Morocco", "Tunisia", "Libya", "Lebanon", "Cyprus", "Algeria", "Malta", "Syria"],
        ["Monaco", "Albania", "Montenegro", "Slovenia", "Bosnia and Herzegovina", "Palestine"]] },

  { q: "Name a country the Equator passes through.",
    a: [["Ecuador", "Brazil"],
        ["Colombia", "Kenya", "Indonesia"],
        ["Uganda", "Democratic Republic of the Congo", "Somalia", "Gabon"],
        ["Republic of the Congo", "Sao Tome and Principe", "Kiribati", "Maldives"]] },

  { q: "Name a country the Danube River flows through.",
    a: [["Austria", "Hungary", "Germany"],
        ["Romania", "Serbia", "Slovakia"],
        ["Bulgaria", "Croatia"],
        ["Ukraine", "Moldova"]] },

  { q: "Name a country in the Nile River basin.",
    a: [["Egypt", "Sudan"],
        ["Ethiopia", "Uganda", "South Sudan"],
        ["Kenya", "Tanzania", "Rwanda"],
        ["Burundi", "Eritrea", "Democratic Republic of the Congo"]] },

  { q: "Name a country that shares a land border with Russia.",
    a: [["China", "Ukraine", "Finland", "Mongolia"],
        ["Kazakhstan", "Belarus", "Norway", "North Korea", "Georgia"],
        ["Estonia", "Latvia", "Poland"],
        ["Lithuania", "Azerbaijan"]] },

  { q: "Name a country that borders India.",
    a: [["Pakistan", "China"],
        ["Nepal", "Bangladesh"],
        ["Bhutan", "Myanmar"],
        ["Afghanistan"]] },

  { q: "Name a country in Central America.",
    a: [["Panama", "Costa Rica", "Guatemala"],
        ["Honduras", "Nicaragua"],
        ["El Salvador"],
        ["Belize"]] },

  { q: "Name a Nordic country or territory.",
    a: [["Sweden", "Norway"],
        ["Denmark", "Finland"],
        ["Iceland"],
        ["Greenland", ["Faroe Islands", "Faroes"], ["Aland Islands", "Aland"]]] },

  { q: "Name a country where Spanish is an official language.",
    a: [["Spain", "Mexico", "Argentina", "Colombia"],
        ["Peru", "Chile", "Cuba", "Venezuela"],
        ["Ecuador", "Bolivia", "Guatemala", "Costa Rica", "Dominican Republic", "Uruguay", "Panama"],
        ["Honduras", "Paraguay", "El Salvador", "Nicaragua", "Equatorial Guinea", "Puerto Rico"]] },

  { q: "Name a country where Portuguese is an official language.",
    a: [["Portugal", "Brazil"],
        ["Angola", "Mozambique"],
        ["Cape Verde", "Guinea-Bissau", "East Timor"],
        ["Sao Tome and Principe", "Equatorial Guinea"]] },

  { q: "Name a US state that starts with the letter M.",
    a: [["Michigan", "Massachusetts"],
        ["Maine", "Mississippi", "Missouri"],
        ["Minnesota", "Maryland"],
        ["Montana"]] },

  { q: "Name a US state that starts with the letter N.",
    a: [["New York", "Nevada"],
        ["New Jersey", "North Carolina", "New Mexico"],
        ["Nebraska", "New Hampshire"],
        ["North Dakota"]] },

  { q: "Name one of the Great Lakes.",
    a: [["Michigan", "Superior"],
        ["Erie"],
        ["Ontario"],
        ["Huron"]] },

  { q: "Name an island country in the Caribbean.",
    a: [["Jamaica", "Cuba", "Bahamas"],
        ["Haiti", "Dominican Republic", "Barbados"],
        ["Trinidad and Tobago", "Saint Lucia", "Grenada"],
        ["Dominica", "Antigua and Barbuda", "Saint Kitts and Nevis", "Saint Vincent and the Grenadines"]] },

  { q: "Name a country with a coastline on the Caspian Sea.",
    a: [["Russia", "Iran"],
        ["Kazakhstan"],
        ["Azerbaijan"],
        ["Turkmenistan"]] },

  { q: "Name a country that shares a land border with France (overseas territories count!).",
    a: [["Spain", "Germany", "Italy", "Belgium", "Switzerland"],
        ["Luxembourg", "Monaco"],
        ["Andorra"],
        ["Brazil", "Suriname", "Netherlands"]] },

  { q: "Name a Canadian province or territory.",
    a: [["Ontario", "Quebec", "British Columbia"],
        ["Alberta", "Nova Scotia", "Manitoba"],
        ["Saskatchewan", "Yukon", "Newfoundland and Labrador", "New Brunswick"],
        ["Prince Edward Island", "Northwest Territories", "Nunavut"]] },

  { q: "Name an Australian state or territory.",
    a: [["New South Wales", "Victoria", "Queensland"],
        ["Western Australia", "Tasmania"],
        ["South Australia", "Northern Territory"],
        ["Australian Capital Territory"]] },

  { q: "Name a country the Andes mountains run through.",
    a: [["Peru", "Chile"],
        ["Argentina", "Bolivia"],
        ["Ecuador", "Colombia"],
        ["Venezuela"]] },

  { q: "Name a country the Alps extend into.",
    a: [["Switzerland", "Austria", "Italy"],
        ["France", "Germany"],
        ["Slovenia"],
        ["Liechtenstein", "Monaco"]] },

  { q: "Name a country with a coastline on the Red Sea.",
    a: [["Egypt", "Saudi Arabia"],
        ["Sudan", "Yemen"],
        ["Israel", "Eritrea"],
        ["Jordan", "Djibouti"]] },

  { q: "Name a country that borders Austria.",
    a: [["Germany", "Switzerland", "Italy"],
        ["Hungary", "Czechia"],
        ["Slovenia", "Slovakia"],
        ["Liechtenstein"]] },

  { q: "Name a member country of the European Union.",
    a: [["France", "Germany", "Italy", "Spain"],
        ["Netherlands", "Belgium", "Portugal", "Greece", "Ireland", "Poland", "Sweden", "Austria"],
        ["Denmark", "Finland", "Czechia", "Hungary", "Romania", "Croatia", "Bulgaria"],
        ["Luxembourg", "Malta", "Cyprus", "Slovakia", "Slovenia", "Estonia", "Latvia", "Lithuania"]] },

  { q: "Name a country with more than 100 million people.",
    a: [["China", "India", "United States"],
        ["Brazil", "Indonesia", "Russia", "Japan", "Mexico", "Nigeria", "Pakistan"],
        ["Bangladesh", "Egypt", "Philippines", "Ethiopia"],
        ["Vietnam", "Democratic Republic of the Congo"]] },

  { q: "Name a country whose name ends in \"-stan\".",
    a: [["Afghanistan", "Pakistan"],
        ["Kazakhstan", "Uzbekistan"],
        ["Turkmenistan"],
        ["Kyrgyzstan", "Tajikistan"]] },

  { q: "Name a country that starts with the letter B.",
    a: [["Brazil", "Belgium"],
        ["Bolivia", "Bahamas", "Bangladesh", "Bulgaria"],
        ["Belarus", "Belize", "Botswana", "Bosnia and Herzegovina", "Barbados", "Bahrain", "Bhutan"],
        ["Benin", "Brunei", "Burkina Faso", "Burundi"]] },

  { q: "Name a country that borders Saudi Arabia.",
    a: [["Iraq", "Yemen"],
        ["Jordan", "Kuwait", "United Arab Emirates"],
        ["Oman"],
        ["Qatar"]] },

  { q: "Name a country that borders Turkey.",
    a: [["Greece", "Syria", "Iraq", "Iran"],
        ["Bulgaria", "Armenia"],
        ["Georgia"],
        ["Azerbaijan"]] },

  { q: "Name a country that borders the Democratic Republic of the Congo.",
    a: [["Republic of the Congo", "Rwanda", "Uganda"],
        ["Angola", "Zambia", "Tanzania"],
        ["Central African Republic", "Burundi"],
        ["South Sudan"]] },

  { q: "Name a US state that the Mississippi River touches.",
    a: [["Mississippi", "Louisiana", "Missouri"],
        ["Minnesota", "Illinois", "Tennessee"],
        ["Iowa", "Arkansas"],
        ["Wisconsin", "Kentucky"]] },

  { q: "Name a US state with a Pacific Ocean coastline.",
    a: [["California"],
        ["Oregon", "Washington"],
        ["Hawaii"],
        ["Alaska"]] },

  { q: "Name a US state on the Gulf Coast.",
    a: [["Texas", "Florida"],
        ["Louisiana"],
        ["Mississippi"],
        ["Alabama"]] },

  { q: "Name a country in Southeast Asia.",
    a: [["Thailand", "Vietnam", "Philippines", "Indonesia"],
        ["Malaysia", "Singapore", "Cambodia"],
        ["Myanmar", "Laos"],
        ["Brunei", "East Timor"]] },

  { q: "Name a country that borders Argentina.",
    a: [["Chile", "Brazil"],
        ["Uruguay"],
        ["Bolivia"],
        ["Paraguay"]] },

  { q: "Name a country with a coastline on the Black Sea.",
    a: [["Russia", "Ukraine", "Turkey"],
        ["Romania"],
        ["Bulgaria"],
        ["Georgia"]] },

  { q: "Name a country with a coastline on the Baltic Sea.",
    a: [["Sweden", "Russia", "Germany"],
        ["Finland", "Poland", "Denmark"],
        ["Estonia", "Latvia"],
        ["Lithuania"]] },

  { q: "Name a country that shares a land border with Spain.",
    a: [["France", "Portugal"],
        ["Andorra"],
        ["Morocco"],
        [["United Kingdom", "Gibraltar"]]] },

  { q: "Name a country that borders Mexico.",
    a: [["United States"],
        ["Guatemala"],
        [],
        ["Belize"]] },

  // ---------- Batch 2 ----------
  { q: "Name a country that borders Poland.",
    a: [["Germany", "Ukraine"], ["Czechia", "Belarus"], ["Slovakia", "Lithuania"], ["Russia"]] },

  { q: "Name a country that borders Switzerland.",
    a: [["Germany", "France", "Italy"], ["Austria"], [], ["Liechtenstein"]] },

  { q: "Name a country that borders Italy.",
    a: [["France", "Switzerland"], ["Austria"], ["Slovenia"], ["San Marino", ["Vatican City", "Vatican", "Holy See"]]] },

  { q: "Name a country that borders Iran.",
    a: [["Iraq", "Afghanistan"], ["Pakistan", "Turkey"], ["Turkmenistan"], ["Armenia", "Azerbaijan"]] },

  { q: "Name a country that borders Afghanistan.",
    a: [["Pakistan", "Iran"], ["China"], ["Tajikistan", "Uzbekistan"], ["Turkmenistan"]] },

  { q: "Name a country that borders Kenya.",
    a: [["Tanzania"], ["Uganda", "Ethiopia", "Somalia"], ["South Sudan"], []] },

  { q: "Name a country that borders South Africa.",
    a: [["Namibia", "Botswana", "Zimbabwe"], ["Mozambique"], ["Lesotho"], ["Eswatini"]] },

  { q: "Name a country (or territory) that borders Egypt.",
    a: [["Libya", "Israel"], ["Sudan"], [], [["Palestine", "Gaza", "Gaza Strip"]]] },

  { q: "Name a country that borders Peru.",
    a: [["Chile", "Bolivia"], ["Ecuador", "Brazil"], ["Colombia"], []] },

  { q: "Name a country that borders Colombia.",
    a: [["Venezuela", "Ecuador"], ["Brazil", "Panama"], ["Peru"], []] },

  { q: "Name a country that borders Vietnam.",
    a: [["China"], ["Cambodia"], ["Laos"], []] },

  { q: "Name a country that borders Thailand.",
    a: [["Cambodia"], ["Laos", "Malaysia"], ["Myanmar"], []] },

  { q: "Name a country that borders Ukraine.",
    a: [["Russia", "Poland"], ["Belarus", "Romania"], ["Hungary", "Moldova"], ["Slovakia"]] },

  { q: "Name a country that borders Hungary.",
    a: [["Austria", "Romania"], ["Slovakia", "Serbia"], ["Croatia", "Ukraine"], ["Slovenia"]] },

  { q: "Name a country that borders Serbia.",
    a: [["Croatia", "Hungary", "Bosnia and Herzegovina"], ["Romania", "Bulgaria", "Kosovo"], ["Montenegro"], ["North Macedonia"]] },

  { q: "Name a country that borders Nigeria.",
    a: [["Niger", "Cameroon"], ["Chad"], ["Benin"], []] },

  { q: "Name a country that borders Ethiopia.",
    a: [["Somalia", "Kenya"], ["Eritrea", "Sudan"], ["Djibouti", "South Sudan"], []] },

  { q: "Name a country that borders Libya.",
    a: [["Egypt", "Tunisia"], ["Algeria"], ["Chad", "Sudan"], ["Niger"]] },

  { q: "Name a country (or territory) that borders Algeria.",
    a: [["Morocco", "Tunisia", "Libya"], ["Mali", "Niger"], ["Mauritania"], ["Western Sahara"]] },

  { q: "Name a country that borders Kazakhstan.",
    a: [["Russia", "China"], ["Uzbekistan"], ["Kyrgyzstan"], ["Turkmenistan"]] },

  { q: "Name a country that borders Pakistan.",
    a: [["India", "Afghanistan"], ["Iran"], ["China"], []] },

  { q: "Name a country that shares a land border with Canada. (There's a sneaky one!)",
    a: [["United States"], [], [], [["Denmark", "Greenland"]]] },

  { q: "Name a country that borders Chile.",
    a: [["Argentina"], ["Peru"], ["Bolivia"], []] },

  { q: "Name a country that borders Bolivia.",
    a: [["Peru", "Brazil"], ["Argentina", "Chile"], ["Paraguay"], []] },

  { q: "Name a country that borders Guatemala.",
    a: [["Mexico"], ["Honduras"], ["Belize", "El Salvador"], []] },

  { q: "Name a country that borders North Korea.",
    a: [["South Korea", "China"], [], ["Russia"], []] },

  { q: "Name a country (or territory) that borders Israel.",
    a: [["Egypt", "Jordan"], ["Lebanon", "Syria"], [["Palestine", "West Bank", "Gaza", "Gaza Strip"]], []] },

  { q: "Name a country that borders Iraq.",
    a: [["Iran", "Syria"], ["Turkey", "Saudi Arabia", "Kuwait"], ["Jordan"], []] },

  { q: "Name a US state that borders Texas.",
    a: [["Oklahoma", "New Mexico"], ["Louisiana"], ["Arkansas"], []] },

  { q: "Name a US state that borders California.",
    a: [["Nevada", "Oregon"], ["Arizona"], [], []] },

  { q: "Name a US state that borders Tennessee.",
    a: [["Kentucky", "Georgia", "Alabama"], ["North Carolina", "Mississippi", "Virginia"], ["Arkansas"], ["Missouri"]] },

  { q: "Name a US state that borders Missouri.",
    a: [["Kansas", "Illinois", "Iowa"], ["Arkansas", "Oklahoma", "Nebraska"], ["Tennessee"], ["Kentucky"]] },

  { q: "Name a US state that touches Colorado (corners count!).",
    a: [["Utah", "Wyoming"], ["Kansas", "New Mexico", "Nebraska"], ["Oklahoma"], ["Arizona"]] },

  { q: "Name a US state that starts with the letter I.",
    a: [["Illinois", "Iowa"], ["Indiana"], ["Idaho"], []] },

  { q: "Name a US state that starts with the letter A.",
    a: [["Alabama", "Alaska"], ["Arizona"], ["Arkansas"], []] },

  { q: "Name a US state that starts with the letter C.",
    a: [["California"], ["Colorado"], ["Connecticut"], []] },

  { q: "Name a New England state.",
    a: [["Massachusetts", "Maine"], ["Vermont", "Connecticut"], ["New Hampshire"], ["Rhode Island"]] },

  { q: "Name a US state that was one of the original 13 colonies.",
    a: [["Virginia", "Massachusetts", "New York"],
        ["Pennsylvania", "New Jersey", "Maryland"],
        ["Connecticut", "North Carolina", "South Carolina", "New Hampshire"],
        ["Rhode Island", "Delaware", "Georgia"]] },

  { q: "Name a US state with an Atlantic Ocean coastline.",
    a: [["Florida", "New York", "Maine"],
        ["North Carolina", "Massachusetts", "New Jersey", "South Carolina", "Virginia"],
        ["Georgia", "Maryland", "Connecticut", "Delaware"],
        ["Rhode Island", "New Hampshire"]] },

  { q: "Name one of the Four Corners states.",
    a: [["Arizona", "Colorado"], ["Utah"], ["New Mexico"], []] },

  { q: "Name one of the four countries that make up the United Kingdom.",
    a: [["England", "Scotland"], ["Wales"], [["Northern Ireland", "N Ireland", "Ulster"]], []] },

  { q: "Name a country where German is an official language.",
    a: [["Germany", "Austria"], ["Switzerland"], ["Liechtenstein"], ["Luxembourg", "Belgium"]] },

  { q: "Name a country where Arabic is an official language.",
    a: [["Saudi Arabia", "Egypt", "Iraq", "United Arab Emirates"],
        ["Morocco", "Jordan", "Syria", "Lebanon", "Kuwait", "Qatar", "Yemen", "Oman"],
        ["Algeria", "Tunisia", "Libya", "Sudan", "Bahrain", "Palestine"],
        ["Mauritania", "Somalia", "Djibouti", "Comoros", "Chad"]] },

  { q: "Name a country in Oceania.",
    a: [["Australia", "New Zealand"],
        ["Fiji", "Papua New Guinea"],
        ["Samoa", "Tonga", "Solomon Islands", "Vanuatu"],
        ["Kiribati", "Micronesia", "Marshall Islands", "Palau", "Tuvalu", "Nauru"]] },

  { q: "Name an island country in the Indian Ocean.",
    a: [["Madagascar", "Sri Lanka"], ["Maldives"], ["Mauritius", "Seychelles"], ["Comoros"]] },

  { q: "Name a country (or territory) the Tropic of Cancer passes through.",
    a: [["Mexico", "India", "Egypt"],
        ["Saudi Arabia", "China", "Bahamas"],
        ["Algeria", "Libya", "Oman", "Bangladesh", "Taiwan", "Myanmar"],
        ["Mali", "Niger", "Mauritania", "United Arab Emirates", "Western Sahara"]] },

  { q: "Name a country the Tropic of Capricorn passes through.",
    a: [["Australia", "Brazil"],
        ["Chile", "Argentina", "South Africa", "Madagascar"],
        ["Paraguay", "Namibia", "Mozambique", "Botswana"],
        []] },

  { q: "Name a country the Arctic Circle passes through.",
    a: [["Russia", "Canada", "Norway"], ["Sweden", "Finland", "United States"], [["Denmark", "Greenland"]], ["Iceland"]] },

  { q: "Name a G7 country.",
    a: [["United States", "United Kingdom", "Japan"], ["Germany", "France"], ["Canada"], ["Italy"]] },

  { q: "Name a country that has hosted the Summer Olympics.",
    a: [["United States", "China", "United Kingdom", "Greece"],
        ["Japan", "Australia", "France", "Brazil", "Spain"],
        ["Germany", "Mexico", "Canada", "Italy", "South Korea", ["Russia", "Soviet Union", "USSR"]],
        ["Sweden", "Belgium", "Netherlands", "Finland"]] },

  { q: "Name a capital city in South America.",
    a: [["Buenos Aires", "Lima", "Santiago", "Bogota"],
        ["Brasilia", "Caracas", "Quito"],
        ["Montevideo", "La Paz", "Asuncion"],
        ["Sucre", "Georgetown", "Paramaribo", "Cayenne"]] },

  { q: "Name a Nordic capital city.",
    a: [["Stockholm", "Oslo"], ["Copenhagen"], ["Helsinki"], ["Reykjavik", "Nuuk", "Torshavn", "Mariehamn"]] },

  { q: "Name an Australian state or territory capital.",
    a: [["Sydney", "Melbourne"], ["Brisbane", "Perth"], ["Adelaide", "Canberra"], ["Hobart", "Darwin"]] },

  { q: "Name a Canadian provincial or territorial capital.",
    a: [["Toronto", ["Quebec City", "Quebec"], "Victoria"],
        ["Edmonton", "Winnipeg", "Halifax"],
        ["Regina", "Fredericton", "St. John's"],
        ["Charlottetown", "Whitehorse", "Yellowknife", "Iqaluit"]] },

  { q: "Name a European country that has a monarch.",
    a: [["United Kingdom", "Spain"],
        ["Sweden", "Norway", "Netherlands", "Denmark", "Belgium"],
        ["Monaco"],
        ["Liechtenstein", "Luxembourg", "Andorra", ["Vatican City", "Vatican", "Holy See"]]] },

  { q: "Name a country (or territory) the Amazon rainforest extends into.",
    a: [["Brazil"], ["Peru", "Colombia"], ["Ecuador", "Bolivia", "Venezuela"], ["Guyana", "Suriname", ["French Guiana", "France"]]] },

  { q: "Name a country the Mekong River flows through.",
    a: [["Vietnam", "Cambodia"], ["Laos", "Thailand"], ["China"], ["Myanmar"]] },

  { q: "Name a country the Rhine River flows through or borders.",
    a: [["Germany"], ["Netherlands", "Switzerland"], ["France"], ["Austria", "Liechtenstein"]] },

  { q: "Name a country the Himalayas extend into.",
    a: [["Nepal", "India"], ["China", "Bhutan"], ["Pakistan"], []] },

  { q: "Name a country (or territory) the Sahara Desert extends into.",
    a: [["Egypt", "Morocco", "Algeria", "Libya"], ["Mali", "Niger", "Chad", "Sudan"], ["Mauritania", "Tunisia"], ["Western Sahara"]] },

  { q: "Name one of the seven continents.",
    a: [["Asia", "Africa", "Europe"], ["North America", "South America"], [["Australia", "Oceania"]], ["Antarctica"]] },

  { q: "Name one of the world's five oceans.",
    a: [[["Pacific", "Pacific Ocean"], ["Atlantic", "Atlantic Ocean"]], [["Indian", "Indian Ocean"]], [["Arctic", "Arctic Ocean"]], [["Southern", "Southern Ocean", "Antarctic", "Antarctic Ocean"]]] },

  { q: "Name a country with a coastline on the Persian Gulf.",
    a: [["Iran", "Saudi Arabia"], ["Kuwait", "Qatar", "United Arab Emirates"], ["Iraq", "Bahrain"], ["Oman"]] },

  { q: "Name a country with a coastline on the Adriatic Sea.",
    a: [["Italy", "Croatia"], ["Albania"], ["Montenegro", "Slovenia"], ["Bosnia and Herzegovina"]] },

  { q: "Name a country with a shoreline on Lake Victoria.",
    a: [["Uganda", "Tanzania"], ["Kenya"], [], []] },

  { q: "Name a country with \"Guinea\" in its name.",
    a: [["Papua New Guinea"], ["Guinea", "Equatorial Guinea"], ["Guinea-Bissau"], []] },

  { q: "Name a country whose English name ends in \"-land\".",
    a: [["Poland", "Ireland", "Finland"], ["Switzerland", "Iceland", "New Zealand"], ["Thailand"], []] },

  { q: "Name a country that shares a land border with exactly one other country.",
    a: [["Portugal", "Ireland", "Haiti", "Dominican Republic", "South Korea"],
        ["Monaco", "San Marino", ["Vatican City", "Vatican", "Holy See"], "Lesotho"],
        ["Gambia", "Qatar", "Brunei"],
        ["East Timor", "Papua New Guinea"]] },

  { q: "Name a country the Prime Meridian (0° longitude) passes through.",
    a: [["United Kingdom"], ["France", "Spain"], ["Algeria", "Ghana", "Mali"], ["Burkina Faso", "Togo"]] },
];

// Different spellings that mean the same place. Keys and values are compared
// after normalising (lowercase, no accents, no punctuation).
const ALIASES = {
  "usa": "united states", "us": "united states", "america": "united states",
  "united states of america": "united states",
  "uk": "united kingdom", "great britain": "united kingdom", "britain": "united kingdom",
  "england": "united kingdom",
  "czech republic": "czechia",
  "holland": "netherlands",
  "burma": "myanmar",
  "timor leste": "east timor",
  "swaziland": "eswatini",
  "cabo verde": "cape verde",
  "ivory coast": "cote divoire",
  "drc": "democratic republic of the congo", "dr congo": "democratic republic of the congo",
  "dem rep congo": "democratic republic of the congo", "congo kinshasa": "democratic republic of the congo",
  "zaire": "democratic republic of the congo",
  "congo brazzaville": "republic of the congo", "congo": "republic of the congo",
  "uae": "united arab emirates", "emirates": "united arab emirates",
  "car": "central african republic",
  "bosnia": "bosnia and herzegovina",
  "trinidad": "trinidad and tobago",
  "antigua": "antigua and barbuda",
  "st kitts": "saint kitts and nevis", "st kitts and nevis": "saint kitts and nevis",
  "st lucia": "saint lucia",
  "st vincent": "saint vincent and the grenadines", "st vincent and the grenadines": "saint vincent and the grenadines",
  "sao tome": "sao tome and principe",
  "newfoundland": "newfoundland and labrador",
  "pei": "prince edward island",
  "nwt": "northwest territories",
  "act": "australian capital territory",
  "nsw": "new south wales",
  "lake michigan": "michigan", "lake superior": "superior", "lake erie": "erie",
  "lake ontario": "ontario", "lake huron": "huron",
  "korea north": "north korea", "dprk": "north korea",
  "kirghizia": "kyrgyzstan", "kyrgyz republic": "kyrgyzstan",
  "turkiye": "turkey",
  "macedonia": "north macedonia",
  "vatican": "vatican city", "holy see": "vatican city",
  "st johns": "st. john's", "saint johns": "st. john's",
};

// Real climbing areas around the world — one is "today's crag".
const CRAGS = [
  ["El Capitan", "Yosemite, California, USA"],
  ["Kalymnos", "Dodecanese Islands, Greece"],
  ["Railay Beach", "Krabi, Thailand"],
  ["Fontainebleau", "Île-de-France, France"],
  ["Squamish", "British Columbia, Canada"],
  ["Mount Arapiles", "Victoria, Australia"],
  ["Frankenjura", "Bavaria, Germany"],
  ["Rocklands", "Western Cape, South Africa"],
  ["Siurana", "Catalonia, Spain"],
  ["Red River Gorge", "Kentucky, USA"],
  ["Yangshuo", "Guangxi, China"],
  ["Wadi Rum", "Jordan"],
  ["El Potrero Chico", "Nuevo León, Mexico"],
  ["Hampi", "Karnataka, India"],
  ["Céüse", "Hautes-Alpes, France"],
  ["Smith Rock", "Oregon, USA"],
  ["Joshua Tree", "California, USA"],
  ["The Gunks", "New York, USA"],
  ["Dolomites", "South Tyrol, Italy"],
  ["Torres del Paine", "Patagonia, Chile"],
  ["Lofoten Islands", "Nordland, Norway"],
  ["Ton Sai", "Krabi, Thailand"],
  ["Paklenica", "Dalmatia, Croatia"],
  ["Indian Creek", "Utah, USA"],
];

// Every other country / US state name, so a real-but-wrong place (e.g. "Gambia")
// is never "auto-corrected" into a right answer (e.g. "Zambia").
const KNOWN_PLACES = (
  "Afghanistan,Albania,Algeria,Andorra,Angola,Antigua and Barbuda,Argentina,Armenia,Australia,Austria," +
  "Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bhutan,Bolivia," +
  "Bosnia and Herzegovina,Botswana,Brazil,Brunei,Bulgaria,Burkina Faso,Burundi,Cambodia,Cameroon,Canada," +
  "Cape Verde,Central African Republic,Chad,Chile,China,Colombia,Comoros,Costa Rica,Cote dIvoire,Croatia,Cuba," +
  "Cyprus,Czechia,Denmark,Djibouti,Dominica,Dominican Republic,East Timor,Ecuador,Egypt,El Salvador," +
  "Equatorial Guinea,Eritrea,Estonia,Eswatini,Ethiopia,Fiji,Finland,France,Gabon,Gambia,Georgia,Germany," +
  "Ghana,Greece,Grenada,Guatemala,Guinea,Guinea-Bissau,Guyana,Haiti,Honduras,Hungary,Iceland,India," +
  "Indonesia,Iran,Iraq,Ireland,Israel,Italy,Jamaica,Japan,Jordan,Kazakhstan,Kenya,Kiribati,Kosovo,Kuwait," +
  "Kyrgyzstan,Laos,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Madagascar," +
  "Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Mauritania,Mauritius,Mexico,Micronesia,Moldova," +
  "Monaco,Mongolia,Montenegro,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,New Zealand," +
  "Nicaragua,Niger,Nigeria,North Korea,North Macedonia,Norway,Oman,Pakistan,Palau,Palestine,Panama," +
  "Papua New Guinea,Paraguay,Peru,Philippines,Poland,Portugal,Qatar,Republic of the Congo,Romania,Russia," +
  "Rwanda,Saint Kitts and Nevis,Saint Lucia,Saint Vincent and the Grenadines,Samoa,San Marino," +
  "Sao Tome and Principe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia," +
  "Solomon Islands,Somalia,South Africa,South Korea,South Sudan,Spain,Sri Lanka,Sudan,Suriname,Sweden," +
  "Switzerland,Syria,Taiwan,Tajikistan,Tanzania,Thailand,Togo,Tonga,Trinidad and Tobago,Tunisia,Turkey," +
  "Turkmenistan,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,Uruguay,Uzbekistan," +
  "Vanuatu,Vatican City,Venezuela,Vietnam,Yemen,Zambia,Zimbabwe,Democratic Republic of the Congo," +
  "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho," +
  "Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota," +
  "Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York," +
  "North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota," +
  "Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming"
).split(",");
