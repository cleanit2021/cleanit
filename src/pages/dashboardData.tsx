import { aluminium, aluminium_pouch, bloodbankwaste, blue, brass, carton, chipboard, condom, copper, crt_monitor, diapers, drum_waste, green, hdpe, hll_peroorkada, idcard, iron_sheets, keltron, ldpe, mask_and_cap, metal_waste, motherboard, needle_waste, newspaper, notebook, paper_waste, pete, plastic_waste, polystyrene, polythene, polythene_cover, pp, pvc, red, red_gypsum, sanitary_napkins, sludge, sponge_waste, steel, tampons, terumo_penpol, tin, titanium_trivandrum, type1, type2, type3, type4, type5, type6, type7, ups, used_silica_powder, white, white_gypsum, yellow } from "./pictures"

export const dashboard = {
    "dashboard":{
        "heading":[
            {
                "title":"Types of Waste",
                "data":[
                    {
                        "title":"Food Waste",
                        "icon":"food",
                        "description":"description"
                    },
                    {
                        "title":"E-Waste",
                        "icon":"food",
                        "description":"description"
                    },
                    {
                        "title":"Paper",
                        "icon":"food",
                        "description":"description"
                    }
                ]
            }
        ]
    }
}
const food = 'https://www.sustainweb.org/resources/images/food_2012/Food-waste-eco-watch-FW.jpg'

export const dashboard_data_home = [
    {
        title:'Food Waste',
        items:[
            {
                text:'Food',
                sub:'',
                img:food
            }
        ]
    },
    {
        title:'Paper',
        items:[
            {
                text:'Carton',
                sub:'',
                img:'data:image/jpeg;base64,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'
            },
            {
                text:'Magazine',
                sub:'',
                img:'data:image/jpeg;base64,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'
            },
            {
                text:'NewsPaper',
                sub:'',
                img:newspaper
            },
            {
                text:'Notebook',
                sub:'',
                img:notebook
            }
        ]
    },
    {
        title:'Sanitary Wastes',
        items:[
            {
                text:'Diapers',
                sub:'',
                img:diapers
            },
            {
                text:'Sanitary Napkins',
                sub:'',
                img:sanitary_napkins
            },
            {
                text:'Condoms',
                sub:'',
                img:condom
            },
            {
                text:'Tampons',
                sub:'',
                img:tampons
            }
        ]
    },
    {
        title:'E Waste',
        items:[
            {
                text:'Type 1',
                sub:'Major Appliances',
                img:type1
            },
            {
                text:'Type 2',
                sub:'Small appliances',
                img:type2
            },
            {
                text:'Type 3',
                sub:'Computer and telecommunication appliances',
                img:type3
            },
            {
                text:'Type 4',
                sub:'Consumer electronics',
                img:type4
            },
            {
                text:'Type 5',
                sub:'Lighting devices',
                img:type5
            },
            {
                text:'Type 6',
                sub:'Electrical and electronic tools',
                img:type6
            },
            {
                text:'Type 7',
                sub:'Toys, leisure',
                img:type7
            }
        ]
    },
    {
        title:'Metal Waste',
        items:[
            {
                text:'Copper',
                sub:'',
                img:copper
            },
            {
                text:'Brass',
                sub:'',
                img:brass
            },
            {
                text:'Steel',
                sub:'',
                img:steel
            },
            {
                text:'Aluminium',
                sub:'',
                img:aluminium
            }, 
            {
                text:'Iron Sheet',
                sub:'',
                img:iron_sheets
            },
            {
                text:'Tin',
                sub:'',
                img:tin
            },
            {
                text:'Others',
                sub:'',
                img:''
            }
        ]
    }, 
    {
        title:'Plastic Waste',
        items:[
            {
                text:'PETE',
                sub:'Polyethylene Terephthalate',
                img:pete
            },
            {
                text:'HDPE',
                sub:'High Density Polyethylene',
                img:hdpe
            },
            {
                text:'PVC',
                sub:'Polyvinyl Chloride',
                img:pvc
            },
            {
                text:'LDPE',
                sub:'Low-Density Polyethylene',
                img:ldpe
            },
            {
                text:'PP',
                sub:'Polypropylene',
                img:pp
            },
            {
                text:'POLYSTYRENE',
                sub:'Polystyrene',
                img:polystyrene
            },
            {
                text:'Other',
                sub:'',
                img:''
            }
        ]
    },
    {
        title:'Other',
        items:[
            {
                text:'Other',
                sub:'',
                img:''
            }
        ]
    }
]

export const hospital_waste = [
    {
        title:'Green',
        items:[
            {text:'Green', sub:'',img:green},
        ]
    },
    {
        title:'Blue',
        items:[
            {text:'Blue', sub:'',img:blue},
        ]
    }, {
        title:'Yellow',
        items:[
            {text:'Yellow', sub:'',img:yellow},
        ]
    }, {
        title:'Red',
        items:[
            {text:'Red', sub:'',img:red},
        ]
    }, {
        title:'White',
        items:[
            {text:'White', sub:'',img:white},
        ]
    }
]
export const hotel_waste = [
    {
        title:'Food Waste',
        items:[
            {text:'Food Waste', sub:'',img:food},
        ]
    },
    {
        title:'Paper Waste',
        items:[
            {text:'Paper Waste', sub:'',img:paper_waste},
        ]
    }, {
        title:'Plastic Waste',
        items:[
            {text:'Plastic Waste', sub:'',img:plastic_waste},
        ]
    }, {
        title:'Cardboard',
        items:[
            {text:'Cardboard', sub:'',img:red},
        ]
    },
    {
        title:'Glass',
        items:[
            {text:'Glass', sub:'',img:''},
        ]
    },
    {
        title:'Metal',
        items:[
            {text:'Metal', sub:'',img:metal_waste},
        ]
    },
    {
        title:'Cloth',
        items:[
            {text:'Cloth', sub:'',img:''},
        ]
    }
]
export const industrial_waste = [
    {
        title:'Keltron',
        img:keltron,
        items:[
            {text:'Electronic Waste',items:[
                {text:'Motherboard',img:motherboard},
                {text:'Chipboard',img:chipboard},
                {text:'CRT Monitors',img:crt_monitor},
                {text:'UPD',img:ups},
            ]}
        ]
    },
    {
        title:'Travancore Titanium',
        img:titanium_trivandrum,
        items:[
            {text:'Bi-Products',items:[
                {text:'White Gypsum',img:white_gypsum},
                {text:'Red Gypsum',img:red_gypsum},
                {text:'Sludge',img:sludge},
            ]},
            {text:'Food Waste',items:[
                {text:'Food Waste',img:food},
            ]},
            {text:'Paper Waste',items:[
                {text:'Paper Waste',img:paper_waste},
            ]},
            {text:'Plastic Waste',items:[
                {text:'Plastic Waste',img:plastic_waste},
            ]}
        ]
    },
    {
        title:'HLL Akkulam',
        img:hll_peroorkada,
        items:[
            {text:'PVC',items:[
                {text:'PVC',img:pvc},
            ]},
            {text:'Metal Waste',items:[
                {text:'Metal Waste',img:metal_waste},
            ]},
            {text:'ID Card',items:[
                {text:'ID Card',img:idcard},
            ]},
            {text:'Plastic Waste',items:[
                {text:'Plastic Waste',img:plastic_waste},
            ]},
            {text:'Carton Waste',items:[
                {text:'Carton Waste',img:carton},
            ]},
            {text:'Sutore',items:[
                {text:'Sutore',img:''},
            ]}
        ]
    },
    {
        title:'HLL Peroorkada',
        img:hll_peroorkada,
        items:[
            {text:'Condom Waste',items:[
                {text:'Dry Condom',img:condom},
                {text:'Oil Condom',img:condom},
                {text:'Wet Condom',img:condom},
            ]},
            {text:'Foil Waste',items:[
                {text:'Foil Waste',img:aluminium},
            ]},
            {text:'Polythene Cover',items:[
                {text:'Polythene Cover',img:polythene_cover},
            ]},
            {text:'Plastic Waste',items:[
                {text:'Plastic Crate',img:plastic_waste},
                {text:'Plastic Bottle',img:plastic_waste},
                {text:'Plastic Pipe',img:plastic_waste},
            ]},
            {text:'Carton Waste',items:[
                {text:'Consumer carton',img:carton},
                {text:'Dispenser',img:carton},
                {text:'Valet',img:carton},
                {text:'Master carton',img:carton},
            ]},
            {text:'Used Silica Powder',items:[
                {text:'Used Silica Powder',img:used_silica_powder}
            ]},
            {text:'Metal Waste',items:[
                {text:'Aluminium',img:aluminium},
                {text:'Iron',img:iron_sheets},
                {text:'Valet',img:''}
            ]},
            {text:'Mask and Cap',items:[
                {text:'Mask and Cap',img:mask_and_cap}
            ]},
            {text:'Drum Waste',items:[
                {text:'Drum Waste',img:drum_waste}
            ]},
            {text:'Sponge Waste ',items:[
                {text:'Sponge Waste',img:sponge_waste}
            ]},
            
        ]
    },
    {
        title:'Terumo Penpol',
        img:terumo_penpol,
        items:[
            {text:'Blood Bank Waste',items:[
                {text:'Wet',img:bloodbankwaste},
                {text:'Dry',img:bloodbankwaste},
            ]},
            {text:'Needle Waste',items:[
                {text:'Needle Waste',img:needle_waste},
              
            ]},
            {text:'Polythene Waste',items:[
                {text:'Polythene Waste',img:polythene},
                
            ]},
            {text:'Thick Polythene',items:[
                {text:'Thick Polythene',img:polythene},
                
            ]},
            {text:'Plastic Waste',items:[
                {text:'Plastic Waste',img:plastic_waste},
                
            ]},{text:'Metal Waste',items:[
                {text:'Metal Waste',img:metal_waste},
               
            ]},
            {text:'Carton',items:[
                {text:'Carton',img:carton},
                
            ]},
            {text:'Aluminium pouch',items:[
                {text:'Aluminium pouch',img:aluminium_pouch},
                
            ]}
        ]
    },
]



// Titanium
// English India Clay
// Terumo Penpol
// Keltron
// HLL peroorkada
// HLL Akkulam
// Small scale Industries

// {
//     title:'Metal Waste',
//     items:[
//         {
//             text:'',
//             img:''
//         },
//         {
//             text:'',
//             img:''
//         },
//         {
//             text:'',
//             img:''
//         },
//         {
//             text:'',
//             img:''
//         }
//     ]
// }
