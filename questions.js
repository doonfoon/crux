// CRUX question bank.
// Each question lists every accepted answer, sorted into 4 "holds" by how
// well known the answer is:
//   0 = Jug (easy, most people say it)   1 = Sloper
//   2 = Crimp (uncommon)                 3 = Foot Chip (very rare)
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

  { q: "Name a landlocked country in Africa (one with no coastline).",
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

  { q: "Name a country the Nile, or a river or lake that feeds it, passes through.",
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

  { q: "Name a Nordic country or territory (northern Europe — think Vikings!).",
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

  { q: "Name a country with a coastline on the Caspian Sea (the giant lake-like sea between Europe and Asia).",
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

  { q: "Name a country in Europe.",
    a: [["France", "Germany", "Italy", "Spain", "United Kingdom"],
        ["Portugal", "Greece", "Netherlands", "Ireland", "Switzerland", "Poland", "Sweden", "Norway", "Russia", "Belgium", "Austria"],
        ["Denmark", "Finland", "Czechia", "Hungary", "Romania", "Ukraine", "Croatia", "Iceland", "Turkey", "Bulgaria", "Serbia", "Luxembourg", "Monaco",
         "England", "Scotland", "Wales", "Northern Ireland"],
        ["Slovakia", "Slovenia", "Estonia", "Latvia", "Lithuania", "Belarus", "Moldova", "Albania", "Bosnia and Herzegovina", "Montenegro", "North Macedonia",
         "Kosovo", "Malta", "Cyprus", "Andorra", "Liechtenstein", "San Marino", ["Vatican City", "Vatican", "Holy See"], "Georgia", "Armenia", "Azerbaijan", "Kazakhstan"]] },

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

  { q: "Name a country in Africa.",
    a: [["Egypt", "South Africa", "Nigeria", "Kenya"],
        ["Morocco", "Ethiopia", "Ghana", "Algeria", "Tunisia", "Libya", "Madagascar", "Tanzania", "Uganda", "Zimbabwe", "Somalia", "Sudan"],
        ["Senegal", "Cameroon", ["Ivory Coast", "Côte d'Ivoire", "Cote dIvoire"], "Angola", "Mozambique", "Zambia", "Rwanda", "Mali", "Niger", "Chad", "Namibia",
         "Botswana", "Democratic Republic of the Congo", "Republic of the Congo", "Liberia", "Sierra Leone", "South Sudan", "Eritrea", "Malawi"],
        ["Burundi", "Benin", "Togo", "Burkina Faso", "Guinea", "Guinea-Bissau", "Gambia", "Mauritania", "Gabon", "Equatorial Guinea", "Central African Republic",
         "Djibouti", "Lesotho", "Eswatini", "Cape Verde", "Sao Tome and Principe", "Comoros", "Mauritius", "Seychelles", "Western Sahara"]] },

  { q: "Name a country that borders Nigeria.",
    a: [["Niger", "Cameroon"], ["Chad"], ["Benin"], []] },

  { q: "Name a country that borders Ethiopia.",
    a: [["Somalia", "Kenya"], ["Eritrea", "Sudan"], ["Djibouti", "South Sudan"], []] },

  { q: "Name a country that borders Libya.",
    a: [["Egypt", "Tunisia"], ["Algeria"], ["Chad", "Sudan"], ["Niger"]] },

  { q: "Name a country in Asia.",
    a: [["China", "Japan", "India"],
        ["South Korea", "Thailand", "Vietnam", "Indonesia", "Philippines", "Pakistan", "Russia", "Saudi Arabia", "Israel", "Iran", "Iraq", "North Korea", "Afghanistan"],
        ["Malaysia", "Singapore", "Nepal", "Bangladesh", "Sri Lanka", "Mongolia", "Turkey", "Taiwan", "Cambodia", "Myanmar", "Laos", "Kazakhstan", "Syria",
         "Jordan", "Lebanon", "United Arab Emirates", "Qatar", "Kuwait", "Yemen", "Oman"],
        ["Bhutan", "Maldives", "Brunei", "East Timor", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Bahrain", "Georgia", "Armenia", "Azerbaijan",
         "Cyprus", "Palestine"]] },

  { q: "Name a US state that starts with the letter W.",
    a: [["Washington"], ["Wisconsin"], ["Wyoming"], ["West Virginia"]] },

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

  { q: "Name one of the Four Corners states (the 4 US states that meet at a single point).",
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

  { q: "Name a country in Oceania (Australia and the Pacific islands).",
    a: [["Australia", "New Zealand"],
        ["Fiji", "Papua New Guinea"],
        ["Samoa", "Tonga", "Solomon Islands", "Vanuatu"],
        ["Kiribati", "Micronesia", "Marshall Islands", "Palau", "Tuvalu", "Nauru"]] },

  { q: "Name an island country in the Indian Ocean.",
    a: [["Madagascar", "Sri Lanka"], ["Maldives"], ["Mauritius", "Seychelles"], ["Comoros"]] },

  { q: "Name a country (or territory) the Tropic of Cancer passes through. (It's the line about 23° north of the Equator, crossing Mexico and the Sahara.)",
    a: [["Mexico", "India", "Egypt"],
        ["Saudi Arabia", "China", "Bahamas"],
        ["Algeria", "Libya", "Oman", "Bangladesh", "Taiwan", "Myanmar"],
        ["Mali", "Niger", "Mauritania", "United Arab Emirates", "Western Sahara"]] },

  { q: "Name a country the Tropic of Capricorn passes through. (It's the line about 23° south of the Equator, crossing Brazil and Australia.)",
    a: [["Australia", "Brazil"],
        ["Chile", "Argentina", "South Africa", "Madagascar"],
        ["Paraguay", "Namibia", "Mozambique", "Botswana"],
        []] },

  { q: "Name a country the Arctic Circle passes through. (It's the line around the top of the globe, near the North Pole.)",
    a: [["Russia", "Canada", "Norway"], ["Sweden", "Finland", "United States"], [["Denmark", "Greenland"]], ["Iceland"]] },

  { q: "Name one of the G7 countries (a club of 7 big, wealthy democracies).",
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

  { q: "Name a European country that has a king, queen or ruling prince.",
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

  { q: "Name a country with a coastline on the Adriatic Sea (the sea on Italy's east side).",
    a: [["Italy", "Croatia"], ["Albania"], ["Montenegro", "Slovenia"], ["Bosnia and Herzegovina"]] },

  { q: "Name a country with a shoreline on Lake Victoria.",
    a: [["Uganda", "Tanzania"], ["Kenya"], [], []] },

  { q: "Name a country with \"Guinea\" in its name.",
    a: [["Papua New Guinea"], ["Guinea", "Equatorial Guinea"], ["Guinea-Bissau"], []] },

  { q: "Name a country whose English name ends in \"-land\".",
    a: [["Poland", "Ireland", "Finland"], ["Switzerland", "Iceland", "New Zealand"], ["Thailand"], []] },

  { q: "Name a country that touches only one other country by land (like Portugal, which only touches Spain).",
    a: [["Portugal", "Ireland", "Haiti", "Dominican Republic", "South Korea"],
        ["Monaco", "San Marino", ["Vatican City", "Vatican", "Holy See"], "Lesotho"],
        ["Gambia", "Qatar", "Brunei"],
        ["East Timor", "Papua New Guinea"]] },

  { q: "Name a country the Prime Meridian passes through (0° longitude — the line that runs through London).",
    a: [["United Kingdom"], ["France", "Spain"], ["Algeria", "Ghana", "Mali"], ["Burkina Faso", "Togo"]] },
];

// ======================================================================
// Batch 3 — flags, nature and cities.
// cat: "flag" | "nature" | "city" (everything else is "other").
// map: "points" = dots from GEO below, "none" = no map, default = countries.
// ======================================================================
const IVORY = ["Ivory Coast", "Côte d'Ivoire", "Cote dIvoire"];
const VATICAN = ["Vatican City", "Vatican", "Holy See"];
QUESTIONS.push(
  // ---------- FLAGS ----------
  { cat: "flag", q: "Name a country whose flag has a sideways cross, like the flags of Scandinavia.",
    a: [["Sweden", "Norway", "Denmark"], ["Finland"], ["Iceland"], [["Faroe Islands", "Faroes"], ["Aland Islands", "Aland"]]] },
  { cat: "flag", q: "Name a country whose flag has the UK's flag (the Union Jack) in it.",
    a: [["Australia", "New Zealand"], ["United Kingdom"], ["Fiji"], ["Tuvalu"]] },
  { cat: "flag", q: "Name a country whose flag is three up-and-down stripes (a picture in the middle is OK).",
    a: [["France", "Italy", "Ireland", "Mexico"],
        ["Belgium", "Canada", "Romania", "Peru", "Nigeria"],
        ["Chad", "Mali", "Guinea", IVORY, "Senegal", "Guatemala"],
        ["Andorra", "Moldova", "Mongolia", "Cameroon", "Saint Vincent and the Grenadines", "Barbados"]] },
  { cat: "flag", q: "Name a country whose flag has a crescent moon.",
    a: [["Turkey", "Pakistan"], ["Algeria", "Tunisia", "Malaysia", "Libya"],
        ["Azerbaijan", "Uzbekistan", "Turkmenistan", "Singapore", "Maldives"], ["Mauritania", "Comoros"]] },
  { cat: "flag", q: "Name a country whose flag has a sun on it (a plain circle counts too).",
    a: [["Japan", "Argentina"], ["Uruguay", "Philippines", "Kazakhstan", "Bangladesh"],
        ["Kyrgyzstan", "Nepal", "North Macedonia", "Rwanda", "Malawi", "Taiwan"],
        ["Namibia", "Antigua and Barbuda", "Kiribati", "Niger"]] },
  { cat: "flag", q: "Name a country whose flag uses only red and white.",
    a: [["Japan", "Canada", "Switzerland", "Poland"], ["Denmark", "Austria", "Indonesia", "Turkey", "Peru"],
        ["Monaco", "Singapore", "Tunisia", "Georgia", "Latvia"], ["Bahrain", "Qatar", "Tonga", "Malta"]] },
  { cat: "flag", q: "Name a country whose flag uses only blue and white.",
    a: [["Greece", "Israel"], ["Finland"], ["Somalia", "Honduras"], ["Micronesia"]] },
  { cat: "flag", q: "Name a country whose flag has orange in it.",
    a: [["India", "Ireland"], [IVORY, "Niger", "Sri Lanka"], ["Armenia", "Bhutan", "Zambia"], ["Cyprus", "Marshall Islands"]] },
  { cat: "flag", q: "Name a country whose flag has stars on a blue background.",
    a: [["United States", "Australia"], ["New Zealand", "Brazil", "Chile"],
        ["Venezuela", "Bosnia and Herzegovina", "Liberia", "Somalia", "Samoa", "Kosovo"],
        ["Micronesia", "Nauru", "Solomon Islands", "Marshall Islands", "Uzbekistan", "Tuvalu", "Cape Verde"]] },
  { cat: "flag", q: "Name a country whose flag has yellow, blue and red side-to-side stripes.",
    a: [["Colombia"], ["Venezuela"], ["Ecuador"], []] },
  { cat: "flag", q: "Name a country whose flag has blue, white, blue stripes.",
    a: [["Argentina"], ["Honduras", "Guatemala"], ["Nicaragua", "El Salvador"], []] },
  { cat: "flag", q: "Name a country whose flag is red with yellow star(s).",
    a: [["China"], ["Vietnam"], [], []] },
  { cat: "flag", q: "Name a country whose flag is red, white, red side-to-side stripes.",
    a: [["Austria"], ["Lebanon"], ["Latvia"], []] },
  { cat: "flag", q: "Name a country whose flag is white, blue, red side-to-side stripes.",
    a: [["Russia"], ["Slovakia"], ["Slovenia"], []] },
  { cat: "flag", q: "Name a country whose flag has red, white and black side-to-side stripes.",
    a: [["Egypt"], ["Iraq", "Syria"], ["Yemen"], ["Sudan"]] },

  // ---------- NATURE ----------
  { cat: "nature", map: "points", q: "Name one of the 14 mountains taller than 8,000 meters (they're all in Asia — think Everest).",
    a: [[["Mount Everest", "Everest", "Sagarmatha", "Chomolungma"], "K2"],
        ["Kangchenjunga", "Annapurna"],
        ["Lhotse", "Makalu", "Nanga Parbat", "Cho Oyu"],
        ["Dhaulagiri", "Manaslu", ["Gasherbrum I", "Hidden Peak"], "Broad Peak", "Gasherbrum II", "Shishapangma"]] },
  { cat: "nature", map: "points", q: "Name one of the Seven Summits (the highest peak on each continent).",
    a: [[["Mount Everest", "Everest"], ["Kilimanjaro", "Mount Kilimanjaro"]],
        [["Denali", "Mount McKinley", "McKinley"], "Mont Blanc"],
        ["Aconcagua", ["Mount Elbrus", "Elbrus"]],
        [["Vinson Massif", "Mount Vinson", "Vinson"], ["Mount Kosciuszko", "Kosciuszko", "Kosciusko"], ["Puncak Jaya", "Carstensz Pyramid"]]] },
  { cat: "nature", map: "points", q: "Name a desert anywhere in the world.",
    a: [["Sahara", "Gobi"],
        ["Mojave", "Kalahari", "Atacama", "Arabian Desert", "Sonoran", "Antarctic Desert"],
        ["Namib", "Thar", "Taklamakan", "Great Victoria Desert", "Patagonian Desert", "Chihuahuan", "Great Basin Desert", "Arctic Desert", "Negev", "Sinai", "Painted Desert"],
        ["Karakum", "Kyzylkum", "Great Sandy Desert", "Simpson Desert", "Gibson Desert", "Tanami Desert", "Syrian Desert",
         ["Rub' al Khali", "Empty Quarter"], "Danakil", "Nubian Desert", ["Libyan Desert", "Western Desert"], "Dasht-e Kavir", "Dasht-e Lut",
         "Colorado Desert", "Black Rock Desert", "Judaean Desert", "Wadi Rum", "Karoo", "Ordos", "Badain Jaran", "Tengger", "White Sands", "Red Desert"]] },
  { cat: "nature", map: "none", q: "Name a river in Africa.",
    a: [["Nile"], ["Congo", "Niger", "Zambezi"],
        ["Orange", "Limpopo", "Blue Nile", "White Nile", "Okavango", "Senegal", "Volta", "Gambia"],
        ["Ubangi", "Kasai", "Juba", "Shebelle", "Benue", ["Cuanza", "Kwanza"], "Lualaba", "Rufiji", "Atbara", "Sankuru", "Vaal", "Tugela", "Ruvuma",
         "Sanaga", "Ogooue", "Chari", "Awash", "Omo", "Sobat", "Komoe", "Sassandra", "Kagera", "Shire", "Luangwa", "Kafue", "Cunene", "Save", "Tana", "Draa", "Moulouya", "Sebou", "Medjerda"]] },
  { cat: "nature", map: "none", q: "Name a river in Europe.",
    a: [["Thames", "Danube", "Rhine", "Seine"], ["Volga", "Loire", "Elbe", "Rhone", "Po", "Tiber"],
        ["Tagus", "Ebro", "Douro", "Oder", "Vistula", "Dnieper", "Don", "Shannon", "Garonne", "Meuse", "Moselle", "Main", "Severn", "Arno"],
        ["Inn", "Dniester", "Daugava", "Neva", "Drava", "Sava", "Tisza", "Guadalquivir", "Weser", "Pechora", "Northern Dvina", "Kama", "Ural", "Prut",
         "Mures", "Morava", "Vltava", "Neckar", "Ems", "Scheldt", "Somme", "Dordogne", "Tyne", "Trent", "Clyde", "Tay", "Spey", "Mersey", "Liffey",
         "Guadiana", "Minho", "Adige", "Piave", "Maritsa", "Struma", "Vardar", "Glomma", "Torne", "Narva", "Neman", "Bug"]] },
  { cat: "nature", map: "none", q: "Name a river in South America.",
    a: [["Amazon"], ["Orinoco", "Parana", ["Rio de la Plata", "River Plate", "Plate"]],
        ["Sao Francisco", "Paraguay", "Uruguay", "Madeira", "Magdalena", ["Negro", "Rio Negro"], "Xingu", "Tocantins", ["Iguazu", "Iguacu"]],
        ["Purus", "Jurua", "Japura", "Caqueta", "Putumayo", "Ucayali", "Maranon", "Pilcomayo", "Araguaia", "Tapajos", "Essequibo", "Beni", "Mamore",
         "Bermejo", "Salado", "Colorado", "Napo", "Cauca", "Meta", "Guaviare", "Apure", "Caroni", "Branco", "Trombetas", "Biobio", "Maule", "Chubut"]] },
  { cat: "nature", map: "none", q: "Name a river in Asia.",
    a: [["Yangtze", "Ganges"], ["Mekong", ["Yellow", "Huang He"], "Indus", "Euphrates", "Tigris"],
        ["Brahmaputra", "Ob", "Yenisei", "Lena", "Amur", "Irrawaddy", "Jordan", "Salween"],
        ["Amu Darya", "Syr Darya", "Pearl", "Chao Phraya", "Red", "Godavari", "Yamuna", "Krishna", "Narmada", "Irtysh", "Kolyma", "Indigirka", "Han",
         "Liao", "Songhua", "Mahanadi", "Kaveri", "Sutlej", "Jhelum", "Chenab", "Ravi", "Helmand", "Karun", "Kura", "Aras", "Orontes", "Litani",
         "Mahaweli", "Pasig", "Kapuas", "Mahakam", "Selenga", "Tarim", "Ili"]] },
  { cat: "nature", map: "none", q: "Name a river in North America.",
    a: [["Mississippi"], ["Missouri", "Colorado", ["Rio Grande", "Rio Bravo"], "Hudson", "Ohio"],
        [["St. Lawrence", "Saint Lawrence"], "Yukon", "Columbia", "Mackenzie", "Arkansas", "Snake", "Tennessee", "Potomac", "Delaware", "Niagara", "Red"],
        ["Fraser", "Nelson", "Platte", "Susquehanna", "Sacramento", "Connecticut", "Brazos", "Pecos", "Gila", "Saskatchewan", "Churchill", "Detroit",
         "Illinois", "Wabash", "Cumberland", "Alabama", "Savannah", "James", "Kansas", "Yellowstone", "Willamette", "Charles", "Chattahoochee",
         "Usumacinta", "Lerma", "Grijalva", "Green", "Allegheny", "Monongahela", "Minnesota", "Wisconsin", "Iowa", "Des Moines", "Kentucky",
         "Shenandoah", "Suwannee", ["St. Johns", "Saint Johns"], "Mobile", "Pearl", "Sabine", "Trinity", "Canadian", "Cimarron", "Salmon", "Klamath",
         "San Joaquin", "Mohawk", "Merrimack", "Kennebec", "Penobscot", "Ottawa", "Saguenay", "Athabasca", "Peace"]] },
  { cat: "nature", map: "points", q: "Name a lake in Africa.",
    a: [[["Lake Victoria", "Victoria"]], [["Lake Tanganyika", "Tanganyika"], ["Lake Malawi", "Malawi", "Lake Nyasa", "Nyasa"], ["Lake Chad", "Chad"]],
        [["Lake Turkana", "Turkana"], ["Lake Albert", "Albert"], ["Lake Kivu", "Kivu"], ["Lake Volta", "Volta"], ["Lake Nasser", "Nasser"], ["Lake Kariba", "Kariba"]],
        [["Lake Tana", "Tana"], ["Lake Edward", "Edward"], ["Lake Mweru", "Mweru"], ["Lake Bangweulu", "Bangweulu"], ["Lake Rukwa", "Rukwa"], ["Lake Kyoga", "Kyoga"],
         ["Lake Natron", "Natron"], ["Lake Nakuru", "Nakuru"], ["Lake Naivasha", "Naivasha"], ["Lake Retba", "Retba", "Pink Lake"], ["Lake Assal", "Assal"]]] },
  { cat: "nature", map: "points", q: "Name one of the world's 10 largest lakes.",
    a: [["Caspian Sea", ["Lake Superior", "Superior"], ["Lake Victoria", "Victoria"]],
        [["Lake Michigan", "Michigan"], ["Lake Huron", "Huron"], ["Lake Baikal", "Baikal"]],
        [["Lake Tanganyika", "Tanganyika"], ["Lake Malawi", "Malawi", "Nyasa"]],
        ["Great Bear Lake", "Great Slave Lake"]] },
  { cat: "nature", map: "none", q: "Name a mountain range in Europe.",
    a: [["Alps"], ["Pyrenees", ["Carpathians", "Carpathian"], ["Ural", "Urals"], "Caucasus"],
        [["Apennines", "Apennine"], ["Balkan", "Balkans"], "Dinaric Alps", ["Scandinavian Mountains", "Scandes"], "Dolomites", "Jura", ["Tatra", "Tatras", "High Tatras"], "Sierra Nevada"],
        ["Sudetes", "Massif Central", "Cantabrian", "Rila", "Pindus", "Vosges", "Black Forest", "Ardennes", "Harz", "Grampians", "Cairngorms",
         "Pennines", "Snowdonia", ["Ore Mountains", "Erzgebirge"], "Rhodope", "Julian Alps", "Picos de Europa", "Sierra Morena", "Bohemian Forest",
         "Taunus", "Eifel", "Brecon Beacons", "Mourne", "Wicklow"]] },
  { cat: "nature", map: "none", q: "Name a mountain range in Asia.",
    a: [["Himalayas", "Himalaya"], [["Ural", "Urals"], "Karakoram", "Hindu Kush", "Caucasus"],
        ["Tian Shan", "Altai", ["Pamir", "Pamirs"], "Kunlun", "Zagros", "Western Ghats", "Taurus", ["Elburz", "Alborz"]],
        ["Eastern Ghats", "Annamite", "Japanese Alps", "Hengduan", "Qinling", "Sayan", "Verkhoyansk", "Kopet Dag", "Aravalli", "Vindhya", "Satpura",
         "Arakan", "Sulaiman", "Barisan", "Sikhote-Alin", "Stanovoy", "Chersky", "Greater Khingan", "Pontic", "Hejaz", "Hajar", "Yablonovy", "Qilian", "Alay"]] },
  { cat: "nature", map: "none", q: "Name a mountain range in North or South America.",
    a: [[["Rocky Mountains", "Rockies", "Rocky"], "Andes"], [["Appalachian", "Appalachians"], "Sierra Nevada"],
        [["Cascade", "Cascades"], ["Sierra Madre", "Sierra Madre Occidental", "Sierra Madre Oriental"], "Brooks Range", "Alaska Range", "Coast Mountains",
         ["Adirondacks", "Adirondack"], "Blue Ridge", ["Great Smoky", "Smokies", "Great Smokies"], ["Ozarks", "Ozark"], ["Teton", "Tetons"]],
        ["White Mountains", "Green Mountains", "Wasatch", "Bitterroot", "Olympic", "Laurentian", "Torngat", "Sierra Madre del Sur", "Guiana Highlands",
         "Serra do Mar", "Coast Range", "San Juan", "Sangre de Cristo", "Uinta", "Wind River", "Black Hills", ["Catskills", "Catskill"], "Berkshires",
         "Poconos", "Ouachita", "Mackenzie", "Selkirk", "Purcell", "Saint Elias", "Chugach", "Wrangell", "Cordillera Blanca", "Cordillera Real",
         "Talamanca", "Sierra Maestra", "Blue Mountains"]] },
  { cat: "nature", map: "none", q: "Name a sea that touches Europe.",
    a: [["Mediterranean Sea", "North Sea", "Baltic Sea", "Black Sea"], ["Adriatic Sea", "Aegean Sea", "Irish Sea", "Caspian Sea", "Norwegian Sea"],
        ["Ionian Sea", "Tyrrhenian Sea", "Barents Sea", "Ligurian Sea", "Celtic Sea", "Balearic Sea", ["Sea of Azov", "Azov"], "White Sea", ["Sea of Marmara", "Marmara"]],
        ["Alboran Sea", "Wadden Sea", "Kara Sea", "Greenland Sea", "Bothnian Sea", "Sea of the Hebrides", "Cretan Sea", "Levantine Sea", "Libyan Sea", "Pechora Sea", "Archipelago Sea"]] },
  { cat: "nature", map: "points", q: "Name one of the world's 10 largest islands. (Australia is a continent, so it doesn't count!)",
    a: [["Greenland", "Madagascar", "Great Britain"], ["Borneo", "New Guinea", "Honshu"], ["Sumatra", "Baffin Island"], ["Victoria Island", "Ellesmere Island"]] },
  { cat: "nature", map: "points", q: "Name a waterfall.",
    a: [[["Niagara Falls", "Niagara"]], [["Victoria Falls", "Victoria", "Mosi-oa-Tunya"], ["Angel Falls", "Angel"], ["Iguazu Falls", "Iguazu", "Iguacu", "Iguassu"]],
        [["Yosemite Falls", "Yosemite"], "Gullfoss", ["Horseshoe Falls", "Horseshoe"], ["Rhine Falls"], ["Multnomah Falls", "Multnomah"], ["Kaieteur Falls", "Kaieteur"],
         ["Plitvice Falls", "Plitvice"], ["Havasu Falls", "Havasu"], ["Bridalveil Fall", "Bridalveil"], "Skogafoss", "Seljalandsfoss"],
        [["Sutherland Falls", "Sutherland"], ["Tugela Falls", "Tugela"], "Dettifoss", ["Krimml Falls", "Krimml"], ["Kegon Falls", "Kegon"], ["Jog Falls", "Jog"],
         ["Detian Falls", "Detian", "Ban Gioc"], ["Huangguoshu Falls", "Huangguoshu"], ["Kuang Si Falls", "Kuang Si"], ["Gocta Falls", "Gocta"],
         ["Shoshone Falls", "Shoshone"], ["Montmorency Falls", "Montmorency"], ["Murchison Falls", "Murchison"], ["Blue Nile Falls", "Tis Issat"],
         ["Dunn's River Falls", "Dunns River"], ["Snoqualmie Falls", "Snoqualmie"], ["Vernal Fall", "Vernal"], ["Nevada Fall"], ["Burney Falls"],
         ["Akaka Falls"], ["Takakkaw Falls"], ["Ouzoud Falls"], ["Augrabies Falls"], ["Kalambo Falls"], "Svartifoss", "Godafoss", "Dynjandi",
         "Voringsfossen", ["Seven Sisters"], ["Staubbach Falls"], ["Reichenbach Falls"], ["Trummelbach Falls"], ["Huka Falls"], ["Wallaman Falls"],
         ["Jim Jim Falls"], ["Erawan Falls"], ["Dudhsagar Falls"], ["Athirappilly Falls"], ["Nohkalikai Falls"]]] },
  { cat: "city", map: "points", q: "Name a European capital city.",
    a: [["London", "Paris", "Rome", "Berlin", "Madrid"],
        ["Athens", "Vienna", "Amsterdam", "Dublin", "Moscow", "Lisbon", "Brussels", "Prague", "Stockholm", "Oslo", "Copenhagen"],
        ["Warsaw", "Budapest", "Helsinki", "Bern", ["Kyiv", "Kiev"], "Bucharest", "Belgrade", "Reykjavik", "Sofia", "Zagreb", "Luxembourg", "Monaco",
         "Ankara", "Valletta", "Minsk", "Tallinn", "Riga", "Vilnius", "Bratislava", "Ljubljana"],
        ["Tirana", "Sarajevo", "Podgorica", "Skopje", ["Chisinau", "Kishinev"], "Andorra la Vella", "Vaduz", "San Marino", VATICAN, "Nicosia", "Pristina",
         "Tbilisi", "Yerevan", "Baku", "Edinburgh", "Cardiff", "Belfast"]] },
  { cat: "city", map: "points", q: "Name an Asian capital city.",
    a: [["Tokyo", "Beijing", ["New Delhi", "Delhi"], "Seoul", "Bangkok"],
        ["Manila", "Jakarta", "Hanoi", "Kabul", "Baghdad", "Tehran", "Islamabad", "Kathmandu", "Singapore", "Riyadh"],
        ["Kuala Lumpur", "Dhaka", "Doha", "Abu Dhabi", "Damascus", "Beirut", "Amman", "Pyongyang", ["Ulaanbaatar", "Ulan Bator"], "Colombo", "Phnom Penh",
         "Vientiane", "Kuwait City", "Muscat", ["Sanaa", "Sana'a"], "Taipei", "Jerusalem", "Tashkent", ["Astana", "Nur-Sultan"]],
        [["Naypyidaw", "Nay Pyi Taw"], "Thimphu", ["Male", "Malé"], "Bandar Seri Begawan", "Dili", "Dushanbe", "Bishkek", "Ashgabat", "Manama",
         "Tbilisi", "Yerevan", "Baku", "Sri Jayawardenepura Kotte", "Nicosia"]] },
  { cat: "city", map: "points", q: "Name an African capital city.",
    a: [["Cairo", "Nairobi", "Cape Town"],
        ["Pretoria", "Addis Ababa", "Abuja", "Accra", "Dakar", "Rabat", "Algiers", "Tunis", "Tripoli", "Kinshasa", "Khartoum", "Kampala"],
        ["Luanda", "Harare", "Lusaka", "Dodoma", "Dar es Salaam", "Kigali", "Mogadishu", "Antananarivo", "Maputo", "Windhoek", "Gaborone", "Bamako",
         "Niamey", "Ouagadougou", ["Yaounde", "Yaoundé"], "Abidjan", "Conakry", "Freetown", "Monrovia", "Bloemfontein", "Lilongwe", "Asmara", "Djibouti"],
        ["Nouakchott", "Banjul", "Bissau", "Praia", "Porto-Novo", ["Lome", "Lomé"], "Libreville", "Malabo", "Brazzaville", "Bangui", ["N'Djamena", "Ndjamena"],
         "Juba", "Bujumbura", "Gitega", "Maseru", "Mbabane", "Lobamba", "Moroni", ["Victoria (Seychelles)", "Victoria"], "Port Louis",
         ["Sao Tome", "São Tomé"], "Yamoussoukro"]] },
  { cat: "city", map: "points", q: "Name a capital city in North America, Central America or the Caribbean.",
    a: [[["Washington, D.C.", "Washington", "Washington DC", "DC"], "Ottawa", "Mexico City"],
        ["Havana", "Panama City", "Kingston", ["San José", "San Jose"]],
        ["Guatemala City", "Tegucigalpa", "Managua", "San Salvador", "Santo Domingo", "Port-au-Prince", "Nassau"],
        ["Belmopan", "Bridgetown", "Port of Spain", "Castries", "Kingstown", ["St. George's", "Saint Georges"], "Basseterre",
         ["St. John's (Antigua)", "St. John's", "Saint Johns"], "Roseau"]] },
  { cat: "city", map: "points", q: "Name a US state capital.",
    a: [["Sacramento", "Austin", "Boston", "Atlanta", "Denver", "Phoenix", "Honolulu", "Nashville"],
        ["Salt Lake City", "Indianapolis", "Columbus", "Oklahoma City", "Albany", "Tallahassee", "Richmond", "Raleigh", "Springfield", "Baton Rouge",
         "Santa Fe", "Little Rock", "Des Moines", "Juneau"],
        ["Boise", "Lansing", "Madison", ["Saint Paul", "St. Paul"], "Harrisburg", "Trenton", "Hartford", "Providence", "Annapolis", "Carson City",
         "Cheyenne", "Helena", "Lincoln", "Topeka", "Montgomery", "Jackson", "Columbia", "Olympia", "Salem"],
        ["Bismarck", "Pierre", "Montpelier", "Concord", "Augusta", "Dover", "Frankfort", "Jefferson City", "Charleston"]] },
  { cat: "city", map: "points", q: "Name a city that has hosted the Summer Olympics.",
    a: [["London", "Paris", "Tokyo", "Beijing", "Los Angeles", ["Rio de Janeiro", "Rio"]],
        ["Sydney", "Athens", "Barcelona", "Atlanta", "Moscow", "Seoul", "Berlin", "Rome"],
        ["Montreal", "Munich", "Mexico City", "Melbourne", "Amsterdam", "Stockholm"],
        ["Helsinki", "Antwerp", ["St. Louis", "Saint Louis"]]] },
  { cat: "city", map: "points", q: "Name a city or town that has hosted the Winter Olympics.",
    a: [["Vancouver", "Salt Lake City", "Lake Placid", "Sochi", "Beijing"],
        ["Calgary", "Nagano", ["Turin", "Torino"], "Lillehammer", "Innsbruck", "Pyeongchang", "Sarajevo"],
        ["Sapporo", "Grenoble", "Albertville", "Oslo", ["St. Moritz", "Saint Moritz"], ["Milan", "Milano"], ["Cortina d'Ampezzo", "Cortina"]],
        ["Chamonix", ["Garmisch-Partenkirchen", "Garmisch"], ["Squaw Valley", "Palisades Tahoe"]]] },
  { cat: "city", map: "points", q: "Name a city on the Danube River (the long river that flows through Vienna).",
    a: [["Vienna", "Budapest"], ["Belgrade", "Bratislava"], ["Linz", "Passau", "Regensburg", "Ulm", "Novi Sad"],
        ["Ingolstadt", "Ruse", ["Galati", "Galați"], "Vukovar", "Krems", "Esztergom", "Vidin", "Izmail", "Braila", "Donaueschingen"]] },
  { cat: "city", map: "points", q: "Name a city in Japan.",
    a: [["Tokyo", "Osaka", "Kyoto"], ["Hiroshima", "Yokohama", "Nagasaki", "Sapporo", "Nagoya", "Kobe", "Nara"],
        ["Fukuoka", "Sendai", ["Naha", "Okinawa"], "Kawasaki", "Nagano", "Kanazawa", "Hakodate", "Kamakura", "Nikko", "Niigata", "Kagoshima", "Kumamoto", "Saitama", "Chiba"],
        ["Kitakyushu", "Hamamatsu", "Shizuoka", "Okayama", "Matsuyama", "Himeji", "Takayama", "Aomori", "Akita", "Morioka", "Gifu", "Toyama", "Takamatsu",
         "Matsue", "Miyazaki", "Oita", "Utsunomiya", "Kofu", "Wakayama", "Yokosuka", "Sakai", "Hachioji"]] },
  { cat: "city", map: "points", q: "Name a city in India.",
    a: [[["Mumbai", "Bombay"], ["Delhi", "New Delhi"], ["Kolkata", "Calcutta"]],
        [["Bangalore", "Bengaluru"], ["Chennai", "Madras"], "Hyderabad", "Agra", "Jaipur"],
        ["Pune", "Ahmedabad", ["Varanasi", "Benares"], "Lucknow", "Amritsar", "Udaipur", "Jodhpur", ["Kochi", "Cochin"], ["Mysore", "Mysuru"], "Chandigarh",
         "Surat", "Kanpur", "Shimla", "Darjeeling", "Rishikesh", "Bhopal"],
        ["Indore", "Nagpur", "Patna", ["Thiruvananthapuram", "Trivandrum"], "Coimbatore", "Madurai", "Visakhapatnam", "Guwahati", "Bhubaneswar", "Dehradun",
         "Leh", "Srinagar", ["Puducherry", "Pondicherry"], "Jaisalmer", "Pushkar", "Haridwar", "Ranchi", "Raipur", "Vadodara", "Ludhiana", "Mangalore",
         ["Prayagraj", "Allahabad"], "Gwalior", "Panaji"]] },
  { cat: "city", map: "points", q: "Name a city in China.",
    a: [["Beijing", "Shanghai", "Hong Kong"], [["Guangzhou", "Canton"], "Shenzhen", "Xi'an", "Wuhan", "Chengdu", "Macau", "Nanjing"],
        ["Chongqing", "Tianjin", "Hangzhou", "Suzhou", "Harbin", "Kunming", "Guilin", "Lhasa", "Qingdao", "Dalian", "Shenyang", "Xiamen"],
        ["Urumqi", "Changsha", "Zhengzhou", "Jinan", "Fuzhou", "Nanning", "Lanzhou", "Hefei", "Nanchang", "Taiyuan", "Kashgar", "Luoyang", "Datong",
         "Kaifeng", "Yangshuo", "Sanya", "Haikou", "Hohhot", "Xining", "Yinchuan", "Guiyang", "Dunhuang", "Zhuhai", "Ningbo", "Wuxi", "Dongguan", "Foshan"]] },
  { cat: "city", map: "points", q: "Name a city in Brazil.",
    a: [[["Rio de Janeiro", "Rio"], ["São Paulo", "Sao Paulo"], ["Brasília", "Brasilia"]],
        ["Salvador", "Manaus", "Recife", "Fortaleza", "Belo Horizonte"],
        ["Curitiba", "Porto Alegre", "Belém", "Florianópolis", "Natal", "Foz do Iguaçu", "Goiânia", "Campinas"],
        ["Vitória", "São Luís", "Maceió", "João Pessoa", "Teresina", "Cuiabá", "Campo Grande", "Porto Velho", "Aracaju", "Macapá", "Boa Vista", "Palmas",
         "Rio Branco", "Ouro Preto", "Paraty", "Santos", "Petrópolis", "Olinda"]] },
  { cat: "city", map: "points", q: "Name a city in Italy.",
    a: [["Rome", "Venice", ["Milan", "Milano"], ["Florence", "Firenze"]], [["Naples", "Napoli"], "Pisa", ["Turin", "Torino"], "Verona", "Bologna"],
        [["Genoa", "Genova"], "Palermo", "Siena", "Bari", "Trieste", "Sorrento", "Amalfi", "Catania", ["Padua", "Padova"], "Bergamo", "Lucca", "Assisi", "Como"],
        ["Parma", "Modena", "Ravenna", "Perugia", "Cagliari", "Messina", "Taranto", "Brescia", "Trento", "Bolzano", "Ancona", "Lecce", "Rimini",
         "Reggio Calabria", ["Syracuse", "Siracusa"], "Positano", "Aosta", "Matera", "Urbino", "Orvieto", "San Gimignano", "Vicenza", ["Mantua", "Mantova"],
         "Ferrara", "Udine", "Salerno", "Pescara", "Sassari"]] },
  { cat: "city", map: "points", q: "Name a city in Germany.",
    a: [["Berlin", ["Munich", "München"], "Hamburg", "Frankfurt"], [["Cologne", "Köln", "Koln"], "Dresden", "Stuttgart", ["Düsseldorf", "Dusseldorf"], "Leipzig"],
        [["Hanover", "Hannover"], ["Nuremberg", "Nürnberg"], "Bremen", "Heidelberg", "Bonn", "Dortmund", "Essen"],
        ["Freiburg", "Mainz", "Karlsruhe", "Mannheim", "Augsburg", ["Würzburg", "Wurzburg"], "Regensburg", "Rostock", "Kiel", ["Lübeck", "Lubeck"], "Potsdam",
         "Erfurt", "Weimar", "Magdeburg", "Aachen", ["Münster", "Munster"], "Bielefeld", "Bochum", "Wiesbaden", "Ulm", "Trier", "Konstanz", "Passau",
         "Ingolstadt", "Wolfsburg", "Kassel", "Saarbrücken", "Göttingen", "Bamberg", "Baden-Baden", "Rothenburg ob der Tauber", "Duisburg", "Schwerin"]] },
  { cat: "city", map: "points", q: "Name a city in Canada.",
    a: [["Toronto", "Vancouver", ["Montreal", "Montréal"]], ["Ottawa", "Calgary", "Quebec City", "Edmonton", "Winnipeg"],
        ["Halifax", "Victoria", "Banff", "Whistler", "Regina", "Saskatoon", "Hamilton", "Niagara Falls", "St. John's"],
        ["Kelowna", "Moncton", "Fredericton", "Charlottetown", "Yellowknife", "Whitehorse", "Iqaluit", "Thunder Bay", "Sudbury", "Mississauga", "Brampton",
         "Surrey", "Burnaby", "Gatineau", "Laval", "Sherbrooke", "Trois-Rivieres", "Saint John", "Kitchener", "Waterloo", "Guelph", "Barrie", "Kamloops",
         "Nanaimo", "Prince George", "Red Deer", "Lethbridge", "Jasper", "Churchill", "Dawson City", "Tofino"]] },
  { cat: "city", map: "points", q: "Name a city in Australia.",
    a: [["Sydney", "Melbourne"], ["Brisbane", "Perth", "Canberra", "Adelaide"], ["Darwin", "Hobart", "Gold Coast", "Cairns", "Alice Springs", "Newcastle", "Wollongong"],
        ["Geelong", "Townsville", "Ballarat", "Bendigo", "Launceston", "Toowoomba", "Mackay", "Rockhampton", "Bunbury", "Broome", "Fremantle", "Byron Bay",
         "Sunshine Coast", "Coober Pedy", "Kalgoorlie", "Mount Isa", "Wagga Wagga", "Albury", "Bathurst", "Dubbo", "Mildura", "Port Augusta", "Katherine"]] },
  { cat: "city", map: "points", q: "Name a city in Mexico.",
    a: [["Mexico City", ["Cancún", "Cancun"], "Guadalajara"], ["Monterrey", "Tijuana", "Acapulco", "Puerto Vallarta", ["Cabo San Lucas", "Cabo"], "Oaxaca"],
        ["Puebla", ["Mérida", "Merida"], "Veracruz", "Playa del Carmen", "Tulum", ["Mazatlán", "Mazatlan"], ["Juárez", "Ciudad Juárez", "Juarez"], "Guanajuato",
         "San Miguel de Allende", ["León", "Leon"], ["Querétaro", "Queretaro"]],
        ["Chihuahua", "Hermosillo", "Culiacán", "Durango", "Zacatecas", "Aguascalientes", "San Luis Potosí", "Morelia", "Toluca", "Cuernavaca", "Taxco",
         "Ensenada", "Saltillo", "Torreón", "Tampico", "Villahermosa", "Campeche", "Chetumal", "Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Mexicali",
         "Nuevo Laredo", "Matamoros", "Reynosa", "Cozumel", "Xalapa", "Pachuca", "Colima", "Tepic", "Ixtapa", "Zihuatanejo", "Manzanillo", "Puerto Escondido",
         "Huatulco", "Isla Mujeres"]] },
  { cat: "city", map: "points", q: "Name a city in Spain.",
    a: [["Madrid", "Barcelona"], [["Seville", "Sevilla"], "Valencia", ["Málaga", "Malaga"], "Ibiza", "Granada"],
        ["Bilbao", "Toledo", ["Córdoba", "Cordoba"], ["San Sebastián", "San Sebastian", "Donostia"], ["Palma", "Palma de Mallorca"], "Salamanca", "Zaragoza",
         "Pamplona", "Marbella", "Alicante"],
        ["Santiago de Compostela", "Cádiz", "Segovia", "Murcia", "Valladolid", "Oviedo", "Santander", "Gijón", "A Coruña", "Vigo", "Girona", "Tarragona",
         "Benidorm", "Almería", "Huelva", "Jerez", "Ronda", "Cuenca", "Logroño", "Burgos", "Ávila", "Cáceres", "Badajoz", "Teruel", "Lleida", "Vitoria-Gasteiz",
         "Las Palmas", "Santa Cruz de Tenerife", "Melilla", "Ceuta"]] },
  { cat: "city", map: "points", q: "Name a city in the United Kingdom.",
    a: [["London", "Manchester", "Liverpool", "Edinburgh"], ["Birmingham", "Glasgow", "Oxford", "Cambridge", "Cardiff", "Belfast", "Bristol", "Leeds"],
        ["Bath", "York", ["Newcastle upon Tyne", "Newcastle"], "Sheffield", "Nottingham", "Brighton", "Aberdeen", "Southampton", "Leicester", "Coventry",
         "Plymouth", "Dundee", "Inverness", "Canterbury", "Swansea"],
        ["Stirling", "Exeter", "Norwich", "Portsmouth", "Derby", "Stoke-on-Trent", "Wolverhampton", "Sunderland", "Hull", "Bradford", "Preston", "Blackpool",
         "Lancaster", "Carlisle", "Durham", "Chester", "Salisbury", "Winchester", "Worcester", "Gloucester", "Hereford", "Wells", "Ely", "St Andrews",
         ["Londonderry", "Derry"], "Armagh", "Lisburn", "Newport", "Wrexham", "Bangor", "St Davids", "Reading", "Milton Keynes", "Luton", "Ipswich",
         "Cheltenham", "Stratford-upon-Avon", "Windsor"]] },
);

// Older questions: tag their category and map style.
const CAT_FIX = {
  "Name a landlocked country in Africa (one with no coastline).": ["other"],
  "Name a country (or territory) the Tropic of Cancer passes through. (It's the line about 23° north of the Equator, crossing Mexico and the Sahara.)": ["other"],
  "Name a capital city in South America.": ["city", "points"],
  "Name a Nordic capital city.": ["city", "points"],
  "Name an Australian state or territory capital.": ["city", "points"],
  "Name a Canadian provincial or territorial capital.": ["city", "points"],
  "Name one of the seven continents.": ["nature", "none"],
  "Name one of the world's five oceans.": ["nature", "none"],
  "Name one of the Great Lakes.": ["nature", "none"],
  "Name a Canadian province or territory.": [null, "none"],
  "Name an Australian state or territory.": [null, "none"],
  "Name one of the four countries that make up the United Kingdom.": [null, "none"],
  "Name a New England state.": [null, "us"],
  "Name one of the Four Corners states (the 4 US states that meet at a single point).": [null, "us"],
};
const NATURE_RX = /\b(River|Lake|Sea|Ocean|oceans|Gulf|Alps|Andes|Himalayas|Sahara|Amazon|Mekong|Rhine|Danube|Nile|coastline|shoreline|Coast)\b/;
QUESTIONS.forEach((q) => {
  const fix = CAT_FIX[q.q];
  if (fix) { if (fix[0]) q.cat = fix[0]; q.map = fix[1]; }
  if (!q.cat) q.cat = NATURE_RX.test(q.q) ? "nature" : "other";
});

// Every question gets at least one Foot Chip, so a perfect 2,800 m climb is always possible:
// if a question has none, its rarest answer is promoted.
QUESTIONS.forEach((q) => {
  if (q.a[3].length) return;
  for (let t = 2; t >= 0; t--) {
    if (q.a[t].length > (t === 0 ? 1 : 0)) { q.a[3].push(q.a[t].pop()); break; }
  }
});

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
// rock = the rock type you climb on there; env = the scenery drawn around the wall.
const CRAGS = [
  { name: "El Capitan", where: "Yosemite, California, USA", rock: "Granite", env: "forest", lat: 37.7, lon: -119.6 , fact: "Its granite wall rises about 900 m (3,000 ft) straight up from the valley floor. In 2017 Alex Honnold climbed it with no rope at all." },
  { name: "Kalymnos", where: "Dodecanese Islands, Greece", rock: "Limestone", env: "sea", lat: 37.0, lon: 27.0 , fact: "For centuries the island's families made their living by diving for natural sponges. Climbers only discovered its limestone in the 1990s." },
  { name: "Railay Beach", where: "Krabi, Thailand", rock: "Limestone", env: "tropical", lat: 8.0, lon: 98.8 , fact: "Towering limestone cliffs cut Railay off from the mainland's roads, so the only way in is by boat." },
  { name: "Fontainebleau", where: "Île-de-France, France", rock: "Sandstone", tone: "#d6c7a4", env: "forest", lat: 48.4, lon: 2.7 , fact: "Climbers from Paris have trained on these forest boulders since the late 1800s, practicing for climbs in the Alps." },
  { name: "Squamish", where: "British Columbia, Canada", rock: "Granite", env: "forest", lat: 49.7, lon: -123.2 , fact: "The Stawamus Chief is one of the largest granite monoliths in the world, towering over the town at about 700 m." },
  { name: "Mount Arapiles", where: "Victoria, Australia", rock: "Quartzite", tone: "#d9925e", env: "desert", lat: -36.8, lon: 141.8 , fact: "The rock rises suddenly out of flat wheat fields. Its Aboriginal name is Dyurrite." },
  { name: "Frankenjura", where: "Bavaria, Germany", rock: "Limestone", env: "forest", lat: 49.7, lon: 11.4 , fact: "This Bavarian forest hides over 10,000 climbing routes, including Action Directe, the world's first route graded 9a (1991)." },
  { name: "Rocklands", where: "Western Cape, South Africa", rock: "Sandstone", env: "desert", lat: -32.3, lon: 19.1 , fact: "Ancient rock paintings made by the San people can still be found on boulders throughout the area." },
  { name: "Siurana", where: "Catalonia, Spain", rock: "Limestone", tone: "#e0b98a", env: "forest", lat: 41.3, lon: 0.9 , fact: "The tiny clifftop village was the last Moorish stronghold in Catalonia, finally captured in 1153." },
  { name: "Red River Gorge", where: "Kentucky, USA", rock: "Sandstone", env: "forest", lat: 37.8, lon: -83.7 , fact: "The gorge has more than 100 natural sandstone arches carved by wind and water." },
  { name: "Yangshuo", where: "Guangxi, China", rock: "Limestone", env: "tropical", lat: 24.8, lon: 110.5 , fact: "The karst towers along the Li River are so famous they're printed on China's 20-yuan banknote." },
  { name: "Wadi Rum", where: "Aqaba Governorate, Jordan", rock: "Sandstone", tone: "#c8643e", env: "desert", lat: 29.6, lon: 35.4 , fact: "Its red sand and rock look so otherworldly that films set on Mars, like The Martian, were shot here." },
  { name: "El Potrero Chico", where: "Nuevo León, Mexico", rock: "Limestone", env: "desert", lat: 25.9, lon: -100.5 , fact: "Time Wave Zero, a 23-pitch climb here, is one of the longest sport routes in North America." },
  { name: "Hampi", where: "Karnataka, India", rock: "Granite", tone: "#d2a27a", env: "desert", lat: 15.3, lon: 76.5 , fact: "Giant granite boulders surround the ruins of Vijayanagara, a 14th-century empire's capital and now a UNESCO World Heritage Site." },
  { name: "Céüse", where: "Hautes-Alpes, France", rock: "Limestone", env: "alpine", lat: 44.5, lon: 5.9 , fact: "In 2001 Chris Sharma climbed Realization here, the world's first route graded 9a+." },
  { name: "Smith Rock", where: "Oregon, USA", rock: "Tuff", env: "desert", lat: 44.4, lon: -121.1 , fact: "Smith Rock is called the birthplace of American sport climbing. Its most famous spire is shaped like a monkey's face." },
  { name: "Joshua Tree", where: "California, USA", rock: "Granite", tone: "#d3b892", env: "desert", lat: 34.0, lon: -116.2 , fact: "The park is named after its spiky trees, which settlers thought looked like the prophet Joshua raising his arms." },
  { name: "The Gunks", where: "New York, USA", rock: "Quartzite", env: "forest", lat: 41.7, lon: -74.2 , fact: "Short for the Shawangunk Ridge, it's one of the oldest climbing areas in the US, first climbed in the 1930s." },
  { name: "Dolomites", where: "South Tyrol, Italy", rock: "Dolomite", env: "alpine", lat: 46.4, lon: 11.8 , fact: "The mountains are named after Déodat de Dolomieu, a French geologist who studied their unusual rock in the 1700s." },
  { name: "Torres del Paine", where: "Patagonia, Chile", rock: "Granite", env: "alpine", lat: -51.0, lon: -73.0 , fact: "The word Paine is thought to mean blue in the local Tehuelche language, after the color of the lakes and glaciers." },
  { name: "Lofoten Islands", where: "Nordland, Norway", rock: "Granite", env: "sea", lat: 68.2, lon: 14.0 , fact: "These islands sit above the Arctic Circle, so in summer the midnight sun lets you climb all night long." },
  { name: "Ton Sai", where: "Krabi, Thailand", rock: "Limestone", env: "tropical", lat: 8.0, lon: 98.8 , fact: "Nearby sea cliffs are famous for deep-water soloing: climbing with no rope and falling into the ocean." },
  { name: "Paklenica", where: "Dalmatia, Croatia", rock: "Limestone", env: "forest", lat: 44.4, lon: 15.5 , fact: "The canyon hides huge underground bunkers secretly built for Yugoslav leader Tito." },
  { name: "Indian Creek", where: "Utah, USA", rock: "Sandstone", tone: "#c4613b", env: "desert", lat: 38.0, lon: -109.5 , fact: "The desert walls are split by perfectly straight cracks, making it one of the world's best places for crack climbing." },
];

// Every other country / US state name, so a real-but-wrong place (e.g. "Gambia")
// is never "auto-corrected" into a right answer (e.g. "Zambia").
const KNOWN_COUNTRIES = (
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
  "Vanuatu,Vatican City,Venezuela,Vietnam,Yemen,Zambia,Zimbabwe,Democratic Republic of the Congo,Western Sahara"
).split(",");
const KNOWN_STATES = (
  "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho," +
  "Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota," +
  "Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York," +
  "North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota," +
  "Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming"
).split(",");
const KNOWN_PLACES = KNOWN_COUNTRIES.concat(KNOWN_STATES);
