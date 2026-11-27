// CRUX — map coordinates [latitude, longitude] for cities, landmarks and tiny countries.
// Used by the map reveal. Names are matched loosely (case and accents don't matter).
const GEO = {
  // ---- tiny countries & territories (too small for the world map) ----
  "Andorra": [42.55, 1.6], "Liechtenstein": [47.16, 9.55], "Monaco": [43.74, 7.42], "San Marino": [43.94, 12.45], "Vatican City": [41.9, 12.45],
  "Malta": [35.9, 14.45], "Singapore": [1.35, 103.82], "Bahrain": [26.07, 50.55], "Maldives": [3.2, 73.22], "Mauritius": [-20.3, 57.58],
  "Seychelles": [-4.68, 55.49], "Comoros": [-11.65, 43.33], "Sao Tome and Principe": [0.33, 6.73], "Cape Verde": [15.1, -23.6],
  "Barbados": [13.19, -59.54], "Saint Lucia": [13.91, -60.98], "Grenada": [12.12, -61.68], "Saint Vincent and the Grenadines": [13.25, -61.2],
  "Antigua and Barbuda": [17.06, -61.8], "Saint Kitts and Nevis": [17.3, -62.73], "Dominica": [15.41, -61.37], "Kiribati": [1.45, 173.0],
  "Tuvalu": [-8.52, 179.2], "Nauru": [-0.52, 166.93], "Palau": [7.5, 134.6], "Marshall Islands": [7.1, 171.2], "Micronesia": [6.9, 158.2],
  "Samoa": [-13.76, -172.1], "Tonga": [-21.18, -175.2], "Faroe Islands": [62.0, -6.8], "Aland Islands": [60.2, 20.0],

  // ---- European capitals ----
  "London": [51.51, -0.13], "Paris": [48.86, 2.35], "Rome": [41.9, 12.5], "Berlin": [52.52, 13.4], "Madrid": [40.42, -3.7], "Athens": [37.98, 23.73],
  "Vienna": [48.21, 16.37], "Amsterdam": [52.37, 4.9], "Dublin": [53.35, -6.26], "Moscow": [55.76, 37.62], "Lisbon": [38.72, -9.14], "Brussels": [50.85, 4.35],
  "Prague": [50.08, 14.44], "Stockholm": [59.33, 18.07], "Oslo": [59.91, 10.75], "Copenhagen": [55.68, 12.57], "Warsaw": [52.23, 21.01], "Budapest": [47.5, 19.04],
  "Helsinki": [60.17, 24.94], "Bern": [46.95, 7.45], "Kyiv": [50.45, 30.52], "Bucharest": [44.43, 26.1], "Belgrade": [44.79, 20.45], "Reykjavik": [64.15, -21.94],
  "Sofia": [42.7, 23.32], "Zagreb": [45.81, 15.98], "Luxembourg": [49.61, 6.13], "Ankara": [39.93, 32.86], "Valletta": [35.9, 14.51], "Minsk": [53.9, 27.57],
  "Tallinn": [59.44, 24.75], "Riga": [56.95, 24.11], "Vilnius": [54.69, 25.28], "Bratislava": [48.15, 17.11], "Ljubljana": [46.06, 14.51], "Tirana": [41.33, 19.82],
  "Sarajevo": [43.86, 18.41], "Podgorica": [42.44, 19.26], "Skopje": [42.0, 21.43], "Chisinau": [47.01, 28.86], "Andorra la Vella": [42.51, 1.52],
  "Vaduz": [47.14, 9.52], "Nicosia": [35.17, 33.36], "Pristina": [42.66, 21.17], "Tbilisi": [41.72, 44.79], "Yerevan": [40.18, 44.51], "Baku": [40.41, 49.87],
  "Edinburgh": [55.95, -3.19], "Cardiff": [51.48, -3.18], "Belfast": [54.6, -5.93],

  // ---- Asian capitals ----
  "Tokyo": [35.68, 139.69], "Beijing": [39.9, 116.4], "New Delhi": [28.61, 77.21], "Seoul": [37.57, 126.98], "Bangkok": [13.76, 100.5], "Manila": [14.6, 120.98],
  "Jakarta": [-6.2, 106.85], "Hanoi": [21.03, 105.85], "Kabul": [34.53, 69.17], "Baghdad": [33.31, 44.36], "Tehran": [35.69, 51.39], "Islamabad": [33.69, 73.05],
  "Kathmandu": [27.72, 85.32], "Riyadh": [24.71, 46.68], "Jerusalem": [31.77, 35.21], "Taipei": [25.03, 121.56], "Kuala Lumpur": [3.14, 101.69], "Dhaka": [23.81, 90.41],
  "Doha": [25.29, 51.53], "Abu Dhabi": [24.45, 54.38], "Damascus": [33.51, 36.28], "Beirut": [33.89, 35.5], "Amman": [31.95, 35.93], "Pyongyang": [39.04, 125.76],
  "Ulaanbaatar": [47.89, 106.91], "Colombo": [6.93, 79.86], "Phnom Penh": [11.56, 104.92], "Vientiane": [17.98, 102.63], "Kuwait City": [29.38, 47.99],
  "Muscat": [23.59, 58.41], "Sanaa": [15.37, 44.19], "Tashkent": [41.3, 69.24], "Astana": [51.17, 71.45], "Naypyidaw": [19.76, 96.08], "Thimphu": [27.47, 89.64],
  "Male": [4.18, 73.51], "Bandar Seri Begawan": [4.9, 114.94], "Dili": [-8.56, 125.57], "Dushanbe": [38.56, 68.79], "Bishkek": [42.87, 74.59],
  "Ashgabat": [37.96, 58.33], "Manama": [26.23, 50.59], "Sri Jayawardenepura Kotte": [6.89, 79.92],

  // ---- African capitals ----
  "Cairo": [30.04, 31.24], "Nairobi": [-1.29, 36.82], "Cape Town": [-33.92, 18.42], "Pretoria": [-25.75, 28.19], "Addis Ababa": [9.03, 38.74], "Abuja": [9.06, 7.5],
  "Accra": [5.6, -0.19], "Dakar": [14.72, -17.47], "Rabat": [34.02, -6.84], "Algiers": [36.75, 3.06], "Tunis": [36.81, 10.18], "Tripoli": [32.89, 13.19],
  "Kinshasa": [-4.44, 15.27], "Khartoum": [15.5, 32.56], "Kampala": [0.35, 32.58], "Luanda": [-8.84, 13.23], "Harare": [-17.83, 31.05], "Lusaka": [-15.39, 28.32],
  "Dodoma": [-6.16, 35.75], "Dar es Salaam": [-6.79, 39.21], "Kigali": [-1.95, 30.06], "Mogadishu": [2.05, 45.32], "Antananarivo": [-18.88, 47.51],
  "Maputo": [-25.97, 32.57], "Windhoek": [-22.56, 17.08], "Gaborone": [-24.63, 25.92], "Bamako": [12.64, -8.0], "Niamey": [13.51, 2.11],
  "Ouagadougou": [12.37, -1.52], "Yaounde": [3.85, 11.5], "Abidjan": [5.36, -4.01], "Yamoussoukro": [6.83, -5.29], "Conakry": [9.64, -13.58],
  "Freetown": [8.47, -13.23], "Monrovia": [6.3, -10.8], "Bloemfontein": [-29.09, 26.16], "Lilongwe": [-13.96, 33.79], "Asmara": [15.32, 38.93],
  "Djibouti": [11.59, 43.15], "Nouakchott": [18.08, -15.98], "Banjul": [13.45, -16.58], "Bissau": [11.86, -15.6], "Praia": [14.93, -23.51],
  "Porto-Novo": [6.5, 2.6], "Lome": [6.13, 1.22], "Libreville": [0.42, 9.47], "Malabo": [3.75, 8.78], "Brazzaville": [-4.26, 15.24], "Bangui": [4.39, 18.56],
  "N'Djamena": [12.13, 15.06], "Juba": [4.85, 31.58], "Bujumbura": [-3.38, 29.36], "Gitega": [-3.43, 29.93], "Maseru": [-29.31, 27.48],
  "Mbabane": [-26.31, 31.14], "Lobamba": [-26.45, 31.2], "Moroni": [-11.7, 43.26], "Victoria (Seychelles)": [-4.62, 55.45], "Port Louis": [-20.16, 57.5],
  "Sao Tome": [0.34, 6.73],

  // ---- Americas capitals ----
  "Washington, D.C.": [38.9, -77.04], "Ottawa": [45.42, -75.7], "Mexico City": [19.43, -99.13], "Havana": [23.11, -82.37], "Panama City": [8.98, -79.52],
  "Kingston": [17.97, -76.79], "San José": [9.93, -84.08], "Guatemala City": [14.63, -90.51], "Tegucigalpa": [14.07, -87.19], "Managua": [12.11, -86.24],
  "San Salvador": [13.69, -89.22], "Santo Domingo": [18.49, -69.93], "Port-au-Prince": [18.59, -72.31], "Nassau": [25.05, -77.35], "Belmopan": [17.25, -88.76],
  "Bridgetown": [13.1, -59.62], "Port of Spain": [10.66, -61.51], "Castries": [14.01, -60.99], "Kingstown": [13.16, -61.23], "St. George's": [12.06, -61.75],
  "Basseterre": [17.3, -62.72], "St. John's (Antigua)": [17.12, -61.85], "Roseau": [15.3, -61.39],
  "Buenos Aires": [-34.6, -58.38], "Lima": [-12.05, -77.04], "Santiago": [-33.45, -70.67], "Bogota": [4.71, -74.07], "Brasilia": [-15.79, -47.88],
  "Caracas": [10.48, -66.9], "Quito": [-0.18, -78.47], "Montevideo": [-34.9, -56.16], "La Paz": [-16.5, -68.15], "Asuncion": [-25.26, -57.58],
  "Sucre": [-19.03, -65.26], "Georgetown": [6.8, -58.16], "Paramaribo": [5.85, -55.2], "Cayenne": [4.92, -52.31],
  "Nuuk": [64.18, -51.72], "Torshavn": [62.01, -6.77], "Mariehamn": [60.1, 19.94],

  // ---- US state capitals ----
  "Montgomery": [32.38, -86.3], "Juneau": [58.3, -134.42], "Phoenix": [33.45, -112.07], "Little Rock": [34.75, -92.29], "Sacramento": [38.58, -121.49],
  "Denver": [39.74, -104.99], "Hartford": [41.76, -72.68], "Dover": [39.16, -75.52], "Tallahassee": [30.44, -84.28], "Atlanta": [33.75, -84.39],
  "Honolulu": [21.31, -157.86], "Boise": [43.62, -116.2], "Springfield": [39.8, -89.65], "Indianapolis": [39.77, -86.16], "Des Moines": [41.59, -93.62],
  "Topeka": [39.05, -95.68], "Frankfort": [38.2, -84.87], "Baton Rouge": [30.45, -91.15], "Augusta": [44.31, -69.78], "Annapolis": [38.98, -76.49],
  "Boston": [42.36, -71.06], "Lansing": [42.73, -84.56], "Saint Paul": [44.95, -93.09], "Jackson": [32.3, -90.18], "Jefferson City": [38.58, -92.17],
  "Helena": [46.59, -112.04], "Lincoln": [40.81, -96.7], "Carson City": [39.16, -119.77], "Concord": [43.21, -71.54], "Trenton": [40.22, -74.76],
  "Santa Fe": [35.69, -105.94], "Albany": [42.65, -73.76], "Raleigh": [35.78, -78.64], "Bismarck": [46.81, -100.78], "Columbus": [39.96, -83.0],
  "Oklahoma City": [35.47, -97.52], "Salem": [44.94, -123.04], "Harrisburg": [40.27, -76.88], "Providence": [41.82, -71.41], "Columbia": [34.0, -81.03],
  "Pierre": [44.37, -100.35], "Nashville": [36.16, -86.78], "Austin": [30.27, -97.74], "Salt Lake City": [40.76, -111.89], "Montpelier": [44.26, -72.58],
  "Richmond": [37.54, -77.44], "Olympia": [47.04, -122.9], "Charleston": [38.35, -81.63], "Madison": [43.07, -89.4], "Cheyenne": [41.14, -104.82],

  // ---- Olympic host cities ----
  "Los Angeles": [34.05, -118.24], "Rio de Janeiro": [-22.91, -43.17], "Sydney": [-33.87, 151.21], "Barcelona": [41.39, 2.17], "Montreal": [45.5, -73.57],
  "Munich": [48.14, 11.58], "Melbourne": [-37.81, 144.96], "Antwerp": [51.22, 4.4], "St. Louis": [38.63, -90.2], "Vancouver": [49.28, -123.12],
  "Lake Placid": [44.28, -73.98], "Sochi": [43.6, 39.73], "Calgary": [51.05, -114.07], "Nagano": [36.65, 138.18], "Turin": [45.07, 7.69],
  "Lillehammer": [61.12, 10.47], "Innsbruck": [47.27, 11.39], "Pyeongchang": [37.37, 128.39], "Sapporo": [43.06, 141.35], "Grenoble": [45.19, 5.72],
  "Albertville": [45.68, 6.39], "St. Moritz": [46.5, 9.84], "Milan": [45.46, 9.19], "Cortina d'Ampezzo": [46.54, 12.14], "Chamonix": [45.92, 6.87],
  "Garmisch-Partenkirchen": [47.49, 11.1], "Squaw Valley": [39.2, -120.24],

  // ---- Danube ----
  "Linz": [48.31, 14.29], "Passau": [48.57, 13.43], "Regensburg": [49.01, 12.1], "Ulm": [48.4, 9.99], "Novi Sad": [45.27, 19.83], "Ingolstadt": [48.77, 11.43],
  "Ruse": [43.85, 25.97], "Galati": [45.44, 28.05], "Vukovar": [45.35, 19.0], "Krems": [48.41, 15.6], "Esztergom": [47.79, 18.74], "Vidin": [43.99, 22.88],
  "Izmail": [45.35, 28.84], "Braila": [45.27, 27.96], "Donaueschingen": [47.95, 8.5],

  // ---- Japan ----
  "Osaka": [34.69, 135.5], "Kyoto": [35.01, 135.77], "Hiroshima": [34.39, 132.46], "Yokohama": [35.44, 139.64], "Nagasaki": [32.75, 129.88],
  "Nagoya": [35.18, 136.91], "Kobe": [34.69, 135.2], "Nara": [34.69, 135.8], "Fukuoka": [33.59, 130.4], "Sendai": [38.27, 140.87], "Naha": [26.21, 127.68],
  "Kawasaki": [35.53, 139.7], "Kanazawa": [36.56, 136.66], "Hakodate": [41.77, 140.73], "Kamakura": [35.32, 139.55], "Nikko": [36.75, 139.6],
  "Niigata": [37.92, 139.04], "Kagoshima": [31.6, 130.56], "Kumamoto": [32.8, 130.71], "Saitama": [35.86, 139.65], "Chiba": [35.61, 140.12],
  "Kitakyushu": [33.88, 130.88], "Hamamatsu": [34.71, 137.73], "Shizuoka": [34.98, 138.38], "Okayama": [34.66, 133.93], "Matsuyama": [33.84, 132.77],
  "Himeji": [34.82, 134.69], "Takayama": [36.15, 137.25], "Aomori": [40.82, 140.74], "Akita": [39.72, 140.1], "Morioka": [39.7, 141.15],
  "Gifu": [35.42, 136.76], "Toyama": [36.7, 137.21], "Takamatsu": [34.34, 134.05], "Matsue": [35.47, 133.05], "Miyazaki": [31.91, 131.42],
  "Oita": [33.24, 131.61], "Utsunomiya": [36.56, 139.88], "Kofu": [35.66, 138.57], "Wakayama": [34.23, 135.17], "Yokosuka": [35.28, 139.67],
  "Sakai": [34.57, 135.48], "Hachioji": [35.66, 139.32],

  // ---- India ----
  "Mumbai": [19.08, 72.88], "Delhi": [28.7, 77.1], "Kolkata": [22.57, 88.36], "Bangalore": [12.97, 77.59], "Chennai": [13.08, 80.27], "Hyderabad": [17.39, 78.49],
  "Agra": [27.18, 78.01], "Jaipur": [26.91, 75.79], "Pune": [18.52, 73.86], "Ahmedabad": [23.02, 72.57], "Varanasi": [25.32, 82.97], "Lucknow": [26.85, 80.95],
  "Amritsar": [31.63, 74.87], "Udaipur": [24.59, 73.71], "Jodhpur": [26.24, 73.02], "Kochi": [9.93, 76.27], "Mysore": [12.3, 76.64], "Chandigarh": [30.73, 76.78],
  "Surat": [21.17, 72.83], "Kanpur": [26.45, 80.33], "Shimla": [31.1, 77.17], "Darjeeling": [27.04, 88.26], "Rishikesh": [30.09, 78.27], "Bhopal": [23.26, 77.41],
  "Indore": [22.72, 75.86], "Nagpur": [21.15, 79.09], "Patna": [25.59, 85.14], "Thiruvananthapuram": [8.52, 76.94], "Coimbatore": [11.02, 76.96],
  "Madurai": [9.93, 78.12], "Visakhapatnam": [17.69, 83.22], "Guwahati": [26.14, 91.74], "Bhubaneswar": [20.3, 85.82], "Dehradun": [30.32, 78.03],
  "Leh": [34.16, 77.58], "Srinagar": [34.08, 74.8], "Puducherry": [11.94, 79.81], "Jaisalmer": [26.92, 70.91], "Pushkar": [26.49, 74.55],
  "Haridwar": [29.95, 78.16], "Ranchi": [23.34, 85.31], "Raipur": [21.25, 81.63], "Vadodara": [22.31, 73.18], "Ludhiana": [30.9, 75.86],
  "Mangalore": [12.91, 74.86], "Prayagraj": [25.44, 81.85], "Gwalior": [26.22, 78.18], "Panaji": [15.5, 73.83],

  // ---- China ----
  "Shanghai": [31.23, 121.47], "Hong Kong": [22.32, 114.17], "Guangzhou": [23.13, 113.26], "Shenzhen": [22.54, 114.06], "Xi'an": [34.34, 108.94],
  "Wuhan": [30.59, 114.31], "Chengdu": [30.57, 104.07], "Macau": [22.2, 113.54], "Nanjing": [32.06, 118.8], "Chongqing": [29.56, 106.55],
  "Tianjin": [39.34, 117.36], "Hangzhou": [30.27, 120.16], "Suzhou": [31.3, 120.59], "Harbin": [45.8, 126.53], "Kunming": [25.04, 102.71],
  "Guilin": [25.27, 110.29], "Lhasa": [29.65, 91.12], "Qingdao": [36.07, 120.38], "Dalian": [38.91, 121.6], "Shenyang": [41.8, 123.43], "Xiamen": [24.48, 118.09],
  "Urumqi": [43.83, 87.62], "Changsha": [28.23, 112.94], "Zhengzhou": [34.75, 113.63], "Jinan": [36.65, 117.12], "Fuzhou": [26.07, 119.3],
  "Nanning": [22.82, 108.32], "Lanzhou": [36.06, 103.83], "Hefei": [31.82, 117.23], "Nanchang": [28.68, 115.86], "Taiyuan": [37.87, 112.55],
  "Kashgar": [39.47, 75.99], "Luoyang": [34.62, 112.45], "Datong": [40.08, 113.3], "Kaifeng": [34.8, 114.31], "Yangshuo": [24.78, 110.49],
  "Sanya": [18.25, 109.51], "Haikou": [20.04, 110.34], "Hohhot": [40.84, 111.75], "Xining": [36.62, 101.78], "Yinchuan": [38.49, 106.23],
  "Guiyang": [26.65, 106.63], "Dunhuang": [40.14, 94.66], "Zhuhai": [22.27, 113.58], "Ningbo": [29.87, 121.54], "Wuxi": [31.49, 120.31],
  "Dongguan": [23.02, 113.75], "Foshan": [23.02, 113.12],

  // ---- Brazil ----
  "São Paulo": [-23.55, -46.63], "Salvador": [-12.97, -38.5], "Manaus": [-3.12, -60.02], "Recife": [-8.05, -34.88], "Fortaleza": [-3.73, -38.52],
  "Belo Horizonte": [-19.92, -43.94], "Curitiba": [-25.43, -49.27], "Porto Alegre": [-30.03, -51.23], "Belém": [-1.46, -48.5], "Florianópolis": [-27.6, -48.55],
  "Natal": [-5.79, -35.21], "Foz do Iguaçu": [-25.55, -54.59], "Goiânia": [-16.69, -49.26], "Campinas": [-22.91, -47.06], "Vitória": [-20.32, -40.34],
  "São Luís": [-2.53, -44.3], "Maceió": [-9.67, -35.74], "João Pessoa": [-7.12, -34.86], "Teresina": [-5.09, -42.8], "Cuiabá": [-15.6, -56.1],
  "Campo Grande": [-20.47, -54.62], "Porto Velho": [-8.76, -63.9], "Aracaju": [-10.91, -37.07], "Macapá": [0.03, -51.07], "Boa Vista": [2.82, -60.67],
  "Palmas": [-10.18, -48.33], "Rio Branco": [-9.97, -67.81], "Ouro Preto": [-20.39, -43.5], "Paraty": [-23.22, -44.71], "Santos": [-23.96, -46.33],
  "Petrópolis": [-22.51, -43.18], "Olinda": [-8.01, -34.85],

  // ---- Italy ----
  "Venice": [45.44, 12.32], "Florence": [43.77, 11.26], "Naples": [40.85, 14.27], "Pisa": [43.72, 10.4], "Verona": [45.44, 10.99], "Bologna": [44.49, 11.34],
  "Genoa": [44.41, 8.93], "Palermo": [38.12, 13.36], "Siena": [43.32, 11.33], "Bari": [41.12, 16.87], "Trieste": [45.65, 13.78], "Sorrento": [40.63, 14.38],
  "Amalfi": [40.63, 14.6], "Catania": [37.5, 15.09], "Padua": [45.41, 11.88], "Bergamo": [45.7, 9.67], "Lucca": [43.84, 10.5], "Assisi": [43.07, 12.62],
  "Como": [45.81, 9.09], "Parma": [44.8, 10.33], "Modena": [44.65, 10.93], "Ravenna": [44.42, 12.2], "Perugia": [43.11, 12.39], "Cagliari": [39.22, 9.12],
  "Messina": [38.19, 15.55], "Taranto": [40.46, 17.25], "Brescia": [45.54, 10.21], "Trento": [46.07, 11.12], "Bolzano": [46.5, 11.35], "Ancona": [43.62, 13.52],
  "Lecce": [40.35, 18.17], "Rimini": [44.06, 12.57], "Reggio Calabria": [38.11, 15.65], "Syracuse": [37.08, 15.29], "Positano": [40.63, 14.48],
  "Aosta": [45.74, 7.32], "Matera": [40.67, 16.6], "Urbino": [43.73, 12.64], "Orvieto": [42.72, 12.11], "San Gimignano": [43.47, 11.04],
  "Vicenza": [45.55, 11.55], "Mantua": [45.16, 10.79], "Ferrara": [44.84, 11.62], "Udine": [46.06, 13.24], "Salerno": [40.68, 14.77], "Pescara": [42.46, 14.21],
  "Sassari": [40.73, 8.56],

  // ---- Germany ----
  "Hamburg": [53.55, 9.99], "Frankfurt": [50.11, 8.68], "Cologne": [50.94, 6.96], "Dresden": [51.05, 13.74], "Stuttgart": [48.78, 9.18],
  "Düsseldorf": [51.23, 6.77], "Leipzig": [51.34, 12.37], "Hanover": [52.37, 9.73], "Nuremberg": [49.45, 11.08], "Bremen": [53.08, 8.8],
  "Heidelberg": [49.4, 8.67], "Bonn": [50.74, 7.1], "Dortmund": [51.51, 7.47], "Essen": [51.46, 7.01], "Freiburg": [47.99, 7.84], "Mainz": [50.0, 8.27],
  "Karlsruhe": [49.01, 8.4], "Mannheim": [49.49, 8.47], "Augsburg": [48.37, 10.9], "Würzburg": [49.79, 9.95], "Rostock": [54.09, 12.1], "Kiel": [54.32, 10.14],
  "Lübeck": [53.87, 10.69], "Potsdam": [52.39, 13.06], "Erfurt": [50.98, 11.03], "Weimar": [50.98, 11.33], "Magdeburg": [52.13, 11.63], "Aachen": [50.78, 6.08],
  "Münster": [51.96, 7.63], "Bielefeld": [52.02, 8.53], "Bochum": [51.48, 7.22], "Wiesbaden": [50.08, 8.24], "Trier": [49.75, 6.64], "Konstanz": [47.66, 9.18],
  "Wolfsburg": [52.42, 10.79], "Kassel": [51.31, 9.48], "Saarbrücken": [49.23, 7.0], "Göttingen": [51.54, 9.93], "Bamberg": [49.89, 10.89],
  "Baden-Baden": [48.76, 8.24], "Rothenburg ob der Tauber": [49.38, 10.18], "Duisburg": [51.43, 6.76], "Schwerin": [53.63, 11.41],

  // ---- Canada ----
  "Toronto": [43.65, -79.38], "Edmonton": [53.55, -113.49], "Winnipeg": [49.9, -97.14], "Quebec City": [46.81, -71.21], "Halifax": [44.65, -63.57],
  "Victoria": [48.43, -123.37], "Banff": [51.18, -115.57], "Whistler": [50.12, -122.95], "Regina": [50.45, -104.61], "Saskatoon": [52.13, -106.67],
  "Hamilton": [43.26, -79.87], "Niagara Falls": [43.08, -79.07], "St. John's": [47.56, -52.71], "Fredericton": [45.96, -66.64], "Charlottetown": [46.24, -63.13],
  "Yellowknife": [62.45, -114.37], "Whitehorse": [60.72, -135.06], "Iqaluit": [63.75, -68.52], "Kelowna": [49.89, -119.5], "Moncton": [46.09, -64.78],
  "Thunder Bay": [48.38, -89.25], "Sudbury": [46.49, -80.99], "Mississauga": [43.59, -79.64], "Brampton": [43.73, -79.76], "Surrey": [49.19, -122.85],
  "Burnaby": [49.25, -122.98], "Gatineau": [45.48, -75.7], "Laval": [45.61, -73.71], "Sherbrooke": [45.4, -71.89], "Trois-Rivieres": [46.35, -72.55],
  "Saint John": [45.27, -66.06], "Kitchener": [43.45, -80.49], "Waterloo": [43.46, -80.52], "Guelph": [43.54, -80.25], "Barrie": [44.39, -79.69],
  "Kamloops": [50.67, -120.33], "Nanaimo": [49.17, -123.94], "Prince George": [53.92, -122.75], "Red Deer": [52.27, -113.81], "Lethbridge": [49.69, -112.84],
  "Jasper": [52.87, -118.08], "Churchill": [58.77, -94.17], "Dawson City": [64.06, -139.43], "Tofino": [49.15, -125.9],

  // ---- Australia ----
  "Brisbane": [-27.47, 153.03], "Perth": [-31.95, 115.86], "Adelaide": [-34.93, 138.6], "Canberra": [-35.28, 149.13], "Hobart": [-42.88, 147.33],
  "Darwin": [-12.46, 130.84], "Gold Coast": [-28.02, 153.4], "Cairns": [-16.92, 145.77], "Alice Springs": [-23.7, 133.88], "Newcastle": [-32.93, 151.78],
  "Wollongong": [-34.42, 150.89], "Geelong": [-38.15, 144.36], "Townsville": [-19.26, 146.82], "Ballarat": [-37.56, 143.85], "Bendigo": [-36.76, 144.28],
  "Launceston": [-41.43, 147.14], "Toowoomba": [-27.56, 151.95], "Mackay": [-21.14, 149.19], "Rockhampton": [-23.38, 150.51], "Bunbury": [-33.33, 115.64],
  "Broome": [-17.96, 122.24], "Fremantle": [-32.06, 115.75], "Byron Bay": [-28.64, 153.61], "Sunshine Coast": [-26.65, 153.07], "Coober Pedy": [-29.01, 134.75],
  "Kalgoorlie": [-30.75, 121.47], "Mount Isa": [-20.73, 139.49], "Wagga Wagga": [-35.12, 147.37], "Albury": [-36.08, 146.92], "Bathurst": [-33.42, 149.58],
  "Dubbo": [-32.25, 148.6], "Mildura": [-34.19, 142.16], "Port Augusta": [-32.49, 137.77], "Katherine": [-14.47, 132.26],

  // ---- Mexico ----
  "Cancún": [21.16, -86.85], "Guadalajara": [20.66, -103.35], "Monterrey": [25.69, -100.32], "Tijuana": [32.51, -117.04], "Acapulco": [16.85, -99.82],
  "Puerto Vallarta": [20.65, -105.23], "Cabo San Lucas": [22.89, -109.91], "Oaxaca": [17.07, -96.73], "Puebla": [19.04, -98.21], "Mérida": [20.97, -89.62],
  "Veracruz": [19.17, -96.13], "Playa del Carmen": [20.63, -87.08], "Tulum": [20.21, -87.47], "Mazatlán": [23.25, -106.41], "Juárez": [31.69, -106.42],
  "Guanajuato": [21.02, -101.26], "San Miguel de Allende": [20.91, -100.74], "León": [21.12, -101.68], "Querétaro": [20.59, -100.39],
  "Chihuahua": [28.63, -106.07], "Hermosillo": [29.07, -110.96], "Culiacán": [24.81, -107.39], "Durango": [24.02, -104.66], "Zacatecas": [22.77, -102.58],
  "Aguascalientes": [21.88, -102.29], "San Luis Potosí": [22.15, -100.98], "Morelia": [19.7, -101.19], "Toluca": [19.28, -99.66], "Cuernavaca": [18.92, -99.22],
  "Taxco": [18.56, -99.6], "Ensenada": [31.87, -116.6], "Saltillo": [25.42, -101.0], "Torreón": [25.54, -103.41], "Tampico": [22.23, -97.86],
  "Villahermosa": [17.99, -92.93], "Campeche": [19.85, -90.53], "Chetumal": [18.5, -88.3], "Tuxtla Gutiérrez": [16.75, -93.12],
  "San Cristóbal de las Casas": [16.74, -92.64], "Mexicali": [32.62, -115.45], "Nuevo Laredo": [27.48, -99.51], "Matamoros": [25.87, -97.5],
  "Reynosa": [26.09, -98.28], "Cozumel": [20.42, -86.92], "Xalapa": [19.54, -96.91], "Pachuca": [20.1, -98.76], "Colima": [19.24, -103.72],
  "Tepic": [21.5, -104.89], "Ixtapa": [17.66, -101.6], "Zihuatanejo": [17.64, -101.55], "Manzanillo": [19.05, -104.32], "Puerto Escondido": [15.86, -97.07],
  "Huatulco": [15.77, -96.13], "Isla Mujeres": [21.23, -86.73],

  // ---- Spain ----
  "Seville": [37.39, -5.98], "Valencia": [39.47, -0.38], "Málaga": [36.72, -4.42], "Ibiza": [38.91, 1.43], "Granada": [37.18, -3.6], "Bilbao": [43.26, -2.93],
  "Toledo": [39.86, -4.03], "Córdoba": [37.89, -4.78], "San Sebastián": [43.32, -1.98], "Palma": [39.57, 2.65], "Salamanca": [40.97, -5.66],
  "Zaragoza": [41.65, -0.89], "Pamplona": [42.81, -1.64], "Marbella": [36.51, -4.89], "Alicante": [38.35, -0.48], "Santiago de Compostela": [42.88, -8.54],
  "Cádiz": [36.53, -6.29], "Segovia": [40.95, -4.12], "Murcia": [37.99, -1.13], "Valladolid": [41.65, -4.72], "Oviedo": [43.36, -5.85], "Santander": [43.46, -3.81],
  "Gijón": [43.53, -5.66], "A Coruña": [43.36, -8.41], "Vigo": [42.24, -8.72], "Girona": [41.98, 2.82], "Tarragona": [41.12, 1.25], "Benidorm": [38.54, -0.13],
  "Almería": [36.84, -2.46], "Huelva": [37.26, -6.95], "Jerez": [36.69, -6.14], "Ronda": [36.74, -5.17], "Cuenca": [40.07, -2.14], "Logroño": [42.47, -2.45],
  "Burgos": [42.34, -3.7], "Ávila": [40.66, -4.7], "Cáceres": [39.47, -6.37], "Badajoz": [38.88, -6.97], "Teruel": [40.34, -1.11], "Lleida": [41.62, 0.62],
  "Vitoria-Gasteiz": [42.85, -2.67], "Las Palmas": [28.12, -15.43], "Santa Cruz de Tenerife": [28.46, -16.25], "Melilla": [35.29, -2.94], "Ceuta": [35.89, -5.32],

  // ---- United Kingdom ----
  "Manchester": [53.48, -2.24], "Liverpool": [53.41, -2.98], "Birmingham": [52.49, -1.89], "Glasgow": [55.86, -4.25], "Oxford": [51.75, -1.26],
  "Cambridge": [52.21, 0.12], "Bristol": [51.45, -2.59], "Leeds": [53.8, -1.55], "Bath": [51.38, -2.36], "York": [53.96, -1.08],
  "Newcastle upon Tyne": [54.98, -1.62], "Sheffield": [53.38, -1.47], "Nottingham": [52.95, -1.15], "Brighton": [50.82, -0.14], "Aberdeen": [57.15, -2.09],
  "Southampton": [50.9, -1.4], "Leicester": [52.64, -1.13], "Coventry": [52.41, -1.51], "Plymouth": [50.38, -4.14], "Dundee": [56.46, -2.97],
  "Inverness": [57.48, -4.22], "Canterbury": [51.28, 1.08], "Swansea": [51.62, -3.94], "Stirling": [56.12, -3.94], "Exeter": [50.72, -3.53],
  "Norwich": [52.63, 1.3], "Portsmouth": [50.82, -1.09], "Derby": [52.92, -1.48], "Stoke-on-Trent": [53.0, -2.18], "Wolverhampton": [52.59, -2.13],
  "Sunderland": [54.91, -1.38], "Hull": [53.74, -0.33], "Bradford": [53.8, -1.75], "Preston": [53.76, -2.7], "Blackpool": [53.82, -3.05],
  "Lancaster": [54.05, -2.8], "Carlisle": [54.89, -2.93], "Durham": [54.78, -1.57], "Chester": [53.19, -2.89], "Salisbury": [51.07, -1.79],
  "Winchester": [51.06, -1.31], "Worcester": [52.19, -2.22], "Gloucester": [51.86, -2.24], "Hereford": [52.06, -2.72], "Wells": [51.21, -2.65],
  "Ely": [52.4, 0.26], "St Andrews": [56.34, -2.8], "Londonderry": [55.0, -7.31], "Armagh": [54.35, -6.65], "Lisburn": [54.52, -6.04],
  "Newport": [51.58, -3.0], "Wrexham": [53.05, -3.0], "Bangor": [53.23, -4.13], "St Davids": [51.88, -5.27], "Reading": [51.45, -0.97],
  "Milton Keynes": [52.04, -0.76], "Luton": [51.88, -0.42], "Ipswich": [52.06, 1.16], "Cheltenham": [51.9, -2.08], "Stratford-upon-Avon": [52.19, -1.71],
  "Windsor": [51.48, -0.61],

  // ---- former capitals ----
  "Philadelphia": [39.95, -75.17], "New York": [40.71, -74.01], "Istanbul": [41.01, 28.98], "Saint Petersburg": [59.93, 30.34], "Karachi": [24.86, 67.01],
  "Lagos": [6.52, 3.38], "Almaty": [43.24, 76.89], "Krakow": [50.06, 19.94], "Yangon": [16.84, 96.17], "Zomba": [-15.39, 35.32], "Quezon City": [14.68, 121.04],
  "Kaunas": [54.9, 23.89], "Coimbra": [40.21, -8.43], "Hue": [16.46, 107.59], "Luang Prabang": [19.89, 102.13], "Kandy": [7.29, 80.63],
  "Ayutthaya": [14.35, 100.57], "Auckland": [-36.85, 174.76], "Baltimore": [39.29, -76.61], "Princeton": [40.35, -74.66], "Belize City": [17.5, -88.2],
  "Antigua Guatemala": [14.56, -90.73], "Cartago": [9.86, -83.92], "Nafplio": [37.57, 22.8], "Turku": [60.45, 22.27], "Bergen": [60.39, 5.32],
  "Trondheim": [63.43, 10.4], "Roskilde": [55.64, 12.08], "Gniezno": [52.54, 17.6], "Veliko Tarnovo": [43.08, 25.63], "Cetinje": [42.39, 18.92],
  "Kragujevac": [44.01, 20.91], "Mombasa": [-4.04, 39.67], "Karakorum": [47.2, 102.8],

  // ---- mountains ----
  "Mount Everest": [27.99, 86.93], "K2": [35.88, 76.51], "Kangchenjunga": [27.7, 88.15], "Lhotse": [27.96, 86.93], "Makalu": [27.89, 87.09],
  "Cho Oyu": [28.09, 86.66], "Dhaulagiri": [28.7, 83.49], "Manaslu": [28.55, 84.56], "Nanga Parbat": [35.24, 74.59], "Annapurna": [28.6, 83.82],
  "Gasherbrum I": [35.72, 76.7], "Broad Peak": [35.81, 76.57], "Gasherbrum II": [35.76, 76.65], "Shishapangma": [28.35, 85.78],
  "Kilimanjaro": [-3.07, 37.35], "Denali": [63.07, -151.0], "Mont Blanc": [45.83, 6.86], "Aconcagua": [-32.65, -70.01], "Mount Elbrus": [43.35, 42.44],
  "Vinson Massif": [-78.53, -85.62], "Mount Kosciuszko": [-36.46, 148.26], "Puncak Jaya": [-4.08, 137.16],

  // ---- deserts ----
  "Sahara": [23, 13], "Gobi": [42.5, 103], "Mojave": [35, -115.5], "Kalahari": [-23, 22], "Atacama": [-24.5, -69.25], "Arabian Desert": [22, 48],
  "Sonoran": [32, -112.5], "Antarctic Desert": [-82, 30], "Namib": [-24.5, 15], "Thar": [27, 71], "Taklamakan": [38.9, 83], "Great Victoria Desert": [-29, 128],
  "Patagonian Desert": [-45, -69], "Chihuahuan": [30, -105], "Great Basin Desert": [40, -117], "Arctic Desert": [78, -40], "Negev": [30.5, 34.9],
  "Sinai": [29.5, 33.8], "Painted Desert": [35.9, -111.4], "Karakum": [40, 60], "Kyzylkum": [42.5, 63.5], "Great Sandy Desert": [-20.5, 124.5],
  "Simpson Desert": [-25, 137], "Gibson Desert": [-24, 124], "Tanami Desert": [-19.5, 130.5], "Syrian Desert": [32, 39], "Rub' al Khali": [20, 51],
  "Danakil": [13.5, 41], "Nubian Desert": [20.5, 33], "Libyan Desert": [25, 25], "Dasht-e Kavir": [34.7, 54], "Dasht-e Lut": [30.5, 58.5],
  "Colorado Desert": [33, -115.5], "Black Rock Desert": [41, -119.2], "Judaean Desert": [31.6, 35.3], "Wadi Rum": [29.6, 35.4], "Karoo": [-32.5, 22],
  "Ordos": [39, 108], "Badain Jaran": [40, 102], "Tengger": [38, 104.5], "White Sands": [32.8, -106.3], "Red Desert": [42, -108],

  // ---- lakes ----
  "Lake Victoria": [-1, 33], "Lake Tanganyika": [-6, 29.5], "Lake Malawi": [-12, 34.6], "Lake Chad": [13, 14.5], "Lake Turkana": [3.6, 36.1],
  "Lake Albert": [1.7, 30.9], "Lake Kivu": [-2, 29.2], "Lake Volta": [7.5, 0], "Lake Nasser": [22.5, 31.8], "Lake Kariba": [-17, 28], "Lake Tana": [12, 37.3],
  "Lake Edward": [-0.3, 29.6], "Lake Mweru": [-9, 28.7], "Lake Bangweulu": [-11.1, 29.8], "Lake Rukwa": [-8, 32.4], "Lake Kyoga": [1.5, 32.9],
  "Lake Natron": [-2.4, 36], "Lake Nakuru": [-0.36, 36.09], "Lake Naivasha": [-0.77, 36.35], "Lake Retba": [14.84, -17.23], "Lake Assal": [11.65, 42.42],
  "Caspian Sea": [42, 50.5], "Lake Superior": [47.7, -87.5], "Lake Michigan": [44, -87], "Lake Huron": [44.8, -82.4], "Lake Baikal": [53.5, 108],
  "Great Bear Lake": [66, -121], "Great Slave Lake": [61.7, -114],

  // ---- islands ----
  "Greenland": [72, -40], "New Guinea": [-5.5, 141], "Borneo": [0.5, 114], "Madagascar": [-19, 46.7], "Baffin Island": [68.5, -70.5], "Sumatra": [-0.5, 101.5],
  "Honshu": [36, 138], "Victoria Island": [71, -110], "Great Britain": [54, -2.5], "Ellesmere Island": [79.5, -80],

  // ---- volcanoes ----
  "Mount Vesuvius": [40.82, 14.43], "Mount Fuji": [35.36, 138.73], "Mount St. Helens": [46.19, -122.19], "Mount Etna": [37.75, 14.99], "Kilauea": [19.41, -155.29],
  "Mauna Loa": [19.48, -155.6], "Krakatoa": [-6.1, 105.42], "Mount Pinatubo": [15.13, 120.35], "Stromboli": [38.79, 15.21], "Popocatepetl": [19.02, -98.62],
  "Eyjafjallajokull": [63.63, -19.62], "Mauna Kea": [19.82, -155.47], "Mount Rainier": [46.85, -121.76], "Mount Hood": [45.37, -121.7], "Cotopaxi": [-0.68, -78.44],
  "Hekla": [63.98, -19.7], "Mount Tambora": [-8.25, 118.0], "Mount Pelee": [14.81, -61.17], "Mount Shasta": [41.41, -122.19], "Yellowstone": [44.43, -110.59],
  "Mount Erebus": [-77.53, 167.15], "Merapi": [-7.54, 110.45], "Nyiragongo": [-1.52, 29.25], "Sakurajima": [31.58, 130.66], "Mount Aso": [32.88, 131.1],
  "Mount Ruapehu": [-39.28, 175.57], "Taranaki": [-39.3, 174.06], "Mount Agung": [-8.34, 115.51], "Mayon": [13.26, 123.69], "Villarrica": [-39.42, -71.93],
  "Chimborazo": [-1.47, -78.82], "Arenal": [10.46, -84.7], "Paricutin": [19.49, -102.25], "Santorini": [36.4, 25.4], "Teide": [28.27, -16.64],
  "Mount Ararat": [39.7, 44.3], "Damavand": [35.95, 52.11], "Mount Cameroon": [4.2, 9.17], "Taal": [14.0, 120.99], "Mount Bromo": [-7.94, 112.95],
  "Fuego": [14.47, -90.88], "Nevado del Ruiz": [4.89, -75.32], "Klyuchevskaya Sopka": [56.06, 160.64], "Mount Kenya": [-0.15, 37.31],
  "Ojos del Salado": [-27.11, -68.54], "Osorno": [-41.1, -72.49], "Mount Baker": [48.78, -121.81], "Katla": [63.63, -19.05], "Grimsvotn": [64.42, -17.33],
  "Laki": [64.07, -18.23], "Surtsey": [63.3, -20.6], "Campi Flegrei": [40.83, 14.14], "Pacaya": [14.38, -90.6], "Irazu": [9.98, -83.85], "Poas": [10.2, -84.23],
  "Masaya": [11.98, -86.16], "El Misti": [-16.29, -71.41], "Tungurahua": [-1.47, -78.44], "Sangay": [-2.0, -78.34], "Mount Unzen": [32.76, 130.3],
  "Piton de la Fournaise": [-21.24, 55.71], "Soufriere Hills": [16.72, -62.18], "Lassen Peak": [40.49, -121.5], "Ol Doinyo Lengai": [-2.76, 35.91],
  "Novarupta": [58.27, -155.16], "Mount Redoubt": [60.49, -152.74],

  // ---- waterfalls ----
  "Victoria Falls": [-17.92, 25.86], "Angel Falls": [5.97, -62.54], "Iguazu Falls": [-25.69, -54.44], "Yosemite Falls": [37.76, -119.6],
  "Gullfoss": [64.33, -20.12], "Horseshoe Falls": [43.08, -79.08], "Rhine Falls": [47.68, 8.62], "Multnomah Falls": [45.58, -122.12],
  "Kaieteur Falls": [5.18, -59.48], "Plitvice Falls": [44.87, 15.6], "Havasu Falls": [36.26, -112.7], "Bridalveil Fall": [37.72, -119.65],
  "Skogafoss": [63.53, -19.51], "Seljalandsfoss": [63.62, -19.99], "Sutherland Falls": [-44.8, 167.73], "Tugela Falls": [-28.75, 28.89],
  "Dettifoss": [65.81, -16.38], "Krimml Falls": [47.2, 12.17], "Kegon Falls": [36.74, 139.5], "Jog Falls": [14.23, 74.81], "Detian Falls": [22.85, 106.72],
  "Huangguoshu Falls": [25.99, 105.67], "Kuang Si Falls": [19.75, 101.99], "Gocta Falls": [-6.03, -77.89], "Shoshone Falls": [42.6, -114.4],
  "Montmorency Falls": [46.89, -71.15], "Murchison Falls": [2.28, 31.69], "Blue Nile Falls": [11.49, 37.59], "Dunn's River Falls": [18.41, -77.13],
  "Snoqualmie Falls": [47.54, -121.84], "Vernal Fall": [37.73, -119.54], "Nevada Fall": [37.72, -119.53], "Burney Falls": [41.01, -121.65],
  "Akaka Falls": [19.85, -155.15], "Takakkaw Falls": [51.5, -116.48], "Ouzoud Falls": [32.01, -6.72], "Augrabies Falls": [-28.59, 20.34],
  "Kalambo Falls": [-8.6, 31.24], "Svartifoss": [64.03, -16.98], "Godafoss": [65.68, -17.55], "Dynjandi": [65.73, -23.2], "Voringsfossen": [60.43, 7.25],
  "Seven Sisters": [62.11, 7.09], "Staubbach Falls": [46.59, 7.91], "Reichenbach Falls": [46.71, 8.18], "Trummelbach Falls": [46.56, 7.91],
  "Huka Falls": [-38.65, 176.09], "Wallaman Falls": [-18.59, 145.8], "Jim Jim Falls": [-12.93, 132.55], "Erawan Falls": [14.37, 99.14],
  "Dudhsagar Falls": [15.31, 74.31], "Athirappilly Falls": [10.29, 76.57], "Nohkalikai Falls": [25.27, 91.69],

  // ---- straits ----
  "Strait of Gibraltar": [35.97, -5.6], "Bering Strait": [65.8, -169], "Strait of Hormuz": [26.57, 56.25], "Strait of Magellan": [-53.5, -70.5],
  "Bosphorus": [41.12, 29.07], "Strait of Dover": [51.0, 1.45], "Strait of Malacca": [2.5, 101.2], "English Channel": [50.2, -2.0], "Dardanelles": [40.2, 26.4],
  "Strait of Messina": [38.25, 15.63], "Taiwan Strait": [24.5, 119.5], "Bass Strait": [-39.5, 146], "Cook Strait": [-41.2, 174.4], "Torres Strait": [-10.2, 142.2],
  "Straits of Florida": [24.3, -81], "Bab-el-Mandeb": [12.58, 43.33], "Strait of Juan de Fuca": [48.3, -124], "Drake Passage": [-58, -65],
  "Davis Strait": [66, -58], "Hudson Strait": [62.5, -71], "Straits of Mackinac": [45.82, -84.75], "Strait of Otranto": [40.2, 18.9], "Kerch Strait": [45.3, 36.5],
  "Sunda Strait": [-6.0, 105.8], "Lombok Strait": [-8.7, 115.8], "Makassar Strait": [-2.0, 118], "Palk Strait": [10, 79.8], "Oresund": [55.9, 12.7],
  "Skagerrak": [57.8, 9.5], "Kattegat": [56.8, 11.5], "Menai Strait": [53.2, -4.2], "Strait of Bonifacio": [41.3, 9.2], "Strait of Tiran": [27.97, 34.46],
  "La Perouse Strait": [45.7, 142], "Tsugaru Strait": [41.4, 140.6], "Korea Strait": [34.4, 129], "Strait of Georgia": [49.3, -123.8],
  "Denmark Strait": [67, -26], "Fram Strait": [79, 0], "Strait of Sicily": [37.2, 11.2], "Singapore Strait": [1.2, 104], "Luzon Strait": [20.5, 121.5],
  "Strait of Belle Isle": [51.5, -56.5], "Cabot Strait": [47.4, -59.8], "Foveaux Strait": [-46.6, 168.1], "Mona Passage": [18.2, -67.9],
  "Windward Passage": [20.0, -73.8],
};
