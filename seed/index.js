require('dotenv').config();
const mongoose = require('mongoose');
const Bike = require('../models/Bike')

const bikes = [
  {  
    name: "ORBEA TERRA H",
    image:" ",
    url: "https://www.orbea.com/es-es/bicicletas/carretera/terra/cat/terra-h40",
    description: "The aluminum version is your perfect companion for those days of endless exploration and multi-day getaways, as it offers the most versatility in the Terra family. SHIFTERS Shimano ST-RX400 BRAKE Shimano RX400 Hydraulic Disc SPROCKET Shimano Tiagra HG-500 11-34t 10-Speed ​​REAR DERAILLEUR Shimano RD-RX400 FRONT DERAILLEUR Shimano GRX RX400 CHAIN ​​KMC X10 WHEEL Orbea wheel: Ready GR with 12mm RS4HC TA28 Shimano E-UB70 hubset Vittoria Terrain Dry Gravel G2.0 TNT 700x38c WEIGHT 10.08kg",
    terrain: "all road",
    biketype: "normal",
    material: "aluminum",
    price: "1.999"
  },
  {  
    name: "ORBEA TERRA M20i",
    image:" ",
    url: "https://www.orbea.com/es-es/bicicletas/carretera/terra/cat/terra-m20iteam",
    description: "The Terra M is the sportiest option in the family: fast and light for those adventures on back roads or gravel trails. The carbon frame offers the perfect blend of weight, comfort and strength, while our LOCKR system takes care of storing those essential accessories. SHIMANO ST-RX815FRENE SHIMANO BR-RX810 HYDRAULIC CONFIÑON SHIMANO ULTEGRA HG800 11-34T 11-SPEED CHANG WEIGHT 8.80kg",
    terrain: "intense",
    biketype: "normal",
    material: "carbon",
    price: "4.799"
  },
  {  
    name: "CANYON GRIZL CFSL7",
    image:" ",
    url: "https://www.canyon.com/es-es/bicicletas-gravel/bike-packing/grizl/cf-sl/grizl-cf-sl-7/3244.html?dwvar_3244_pv_rahmenfarbe=GY%2FBK",
    description: "From escapades looking for a sunset to trips of a week. The Grizl CF SL goes where other road bar bikes can't with its durable construction and quality components. If you're ready, so is she. SHIFTERS Shimano GRX RX600 11sBRAKE Shimano RT70SPROCKET Shimano Ultegra HG800 11-34t 11-Speed ​​DERAILLEUR Shimano GRX RX810 GSFRONT DERAILLEUR Shimano GRX RX810CHAIN ​​Shimano HG 601WHEELDT Swiss C 1850 Biwalbe G-mmSchTIRE db Clincher4 Spline db WEIGHT 9.20 kg",
    terrain: "intense",
    biketype: "normal",
    material: "carbon",
    price: "2.299"
  },
  {  
    name: "CANYON GRAIL 6",
    image:" ",
    url: "https://www.canyon.com/en-es/gravel-bikes/all-road/grail/al/grail-6/3092.html?dwvar_3092_pv_rahmenfarbe=YE%2FBK",
    description: "New routes on land and asphalt. The Grail is a very capable, practical gravel bike that's really fun, whatever the weather. The Grail 6 is equipped with a carbon fork and the Shimano GRX400 gravel-specific groupset. SHIFTERS Shimano GRX RX600 11sBRAKE Shimano RT70SPROCKET Shimano Ultegra HG800 11-34t 11-Speed ​​DERAILLEUR Shimano GRX RX400 GSFRONT DERAILLEUR Shimano GRX RX400CHAIN ​​KMC X10-93 10sWHEEL DT Swiss Gravelmm LN DT SH11COVER WEIGHT 9.90kg",
    terrain: "light",
    biketype: "normal",
    material: "aluminum",
    price: "1.499"
  },
  {  
    name: "CANYON GRAIL ON CF 8 eTap",
    image:" ",
    url: "https://www.canyon.com/en-es/electric-bikes/electric-gravel-bikes/grail-on/grail-on-cf-8-etap/2553.html?dwvar_2553_pv_rahmenfarbe=GY%2FBK",
    description: "On tarmac or dirt, smooth or rough, this electric gravel bike delivers extraordinary performance no matter where you take it. With SRAM's cable-free Force eTap AXS 1-ring shifting, you'll enjoy your adventures with next-level performance. Bosch Performance Line CX motor Battery SRAM eTap Powerpack 1BY Battery Bosch PowerTube SRAM Force eTap AXS 12s rear derailleur SRAM Force XG-1270 12s 10-36 Cassette FSA CK-702 Gen4 cranks Bosch Generation 4 Boost FSA 44T Spider Chainrings SRAM Force D1 12s Chain WEIGHT 15.90 kg",
    terrain: "all road",
    biketype: "electric",
    material: "carbon",
    price: "6.199"
  },
  {  
    name: "CANNONDALE TOPSTONE",
    image:" ",
    url: "https://www.cannondale.com/en-es/bikes/road/gravel/topstone-alloy/topstone-1-c15602u",
    description: "Simple, reliable and a lot of fun, the aluminum Topstone is a gravel bike designed for those with a taste for adventure. Roll light and free, or load it up for a long ride. SHIFTERS Shimano GRX800 braze-onBRAKE Shimano GRX 400SPROCKET Shimano Ultegra HG800 11-34t 11-Speed ​​REAR DERAILLEUR Shimano GRX RX400 GSFRONT DERAILLEUR Shimano GRX RX400CHAIN ​​KMC X10-11 speedWHEELStainless Steel, 37mm TCSWiddler REAR COVER WEIGHT 10.20 kg",
    terrain: "light",
    biketype: "normal",
    material: "aluminum",
    price: "2.499"
  },
  {  
    name: "CANNONDALE TOPSTONE CARBON",
    image:" ",
    url: "https://www.cannondale.com/en-es/bikes/road/gravel/topstone-carbon/topstone-carbon-2-lefty",
    description: "Simple, reliable and a lot of fun, the aluminum Topstone is a gravel bike designed for those with a taste for adventure. Roll light and free, or load it up for a long ride. Shimano Grx810 Shadow RD+Shimano Grx 800Piñon Shimano Ultegra Hg800 11-34t 11-Speed ​​Change Grx Rx400 GSDESVIADIA SHIMANO GRX RX400CADENA KMC X10-11 SPEEDRUEDA WTB KOM LIGHT I23 TCS, 700C, 28HCUBERTE WTB RADL 700x44c, tubeless ready WEIGHT 8.70kg",
    terrain: "intense",
    biketype: "normal",
    material: "carbon",
    price: "5.199"
  },
  {  
    name: "CANNONDALE TOPSTONE NEO CARBON",
    image:" ",
    url: "https://www.cannondale.com/en-es/bikes/electric/e-road/topstone-neo/topstone-neo-carbon-4-c62251m",
    description: "The sum of Gravel and E-Bike. We've combined our highest-end carbon fiber gravel frame with Bosch's best motor to create a powerful machine, capable of taking you anywhere with almost unreal rolling qualities. Bosch Performance Line CX motor Battery Bosch PowerTube 500Wh Shimano GRX 400 rear derailleur, Shadow RD+ Shimano HG500 cassette, 11-34, 10-speed FSA CK-702 Gen4 cranks Bosch Generation 4 Boost FSA 44T Spider Chainrings Chain KMC X10EL, 10-speed WEIGHT 15.90 kg", 
    terrain: "all road",
    biketype: "electric",
    material: "carbon",
    price: "4.799"
  },
  {  
    name: "BMC URS ONE",
    image:" ",
    url: "https://www.bmc-switzerland.com/eu_es/bmc-urs-one-22.html?___from_store=eu_en",
    description: "URS ONE makes the exciting performance and versatility of its premium sibling accessible to more riders answering the call of the wild. Featuring a TCC Gravel-designed Premium Carbon frameset with Gravel+ Geometry. LEVERS Easton EA50 AX BRAKE SRAM APEX HRD-A1 Centerline Rotors (180/160) WTB SL8 Steel Medium REAR DERAILLEUR SRAM APEX 1 HRD DERAILLEUR DT Swiss 370 FRONT DERAILLEUR CHAIN ​​KMC X10-11 speedWHEEL WTB KOM Light i23 TCS, 700c, 28hCOVER WTB Raddler 40mm WEIGHT 9.20 kg", 
    terrain: "all road",
    biketype: "normal",
    material: "carbon",
    price: "2.999"
  },
  {  
    name: "BMC URS ALL THREE",
    image:" ",
    url: "https://www.bmc-switzerland.com/intl_en/bmc-urs-al-three-22.html",
    description: "URS AL is the bicycle equivalent of a chameleon, able to adapt and perfectly fit in to diverse surroundings. Maintaining the URS family’s ride and handling characteristics, and offering even greater practicality, through additional cargo mounts and dropper post compatibility, URS AL can truly be your bike for all reasons. LEVERS Easton EA50 AX BRAKE SHIMANO GRX 400 SM-RT64 Rotors WTB SL8 Steel Medium SPROCKET DERAILLEUR SRAM APEX 1 HRD DERAILLEUR DT Swiss 370 CHAIN ​​KMC X10-11 speed WHEEL WTB KOM Light i23 TCS, 700c, 28h COVER WTB Riddler 45mm WEIGHT 10.20 kg", 
    terrain: "light",
    biketype: "normal",
    material: "aluminum",
    price: "2.099"
  }
]


mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Bike.create(bikes)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 