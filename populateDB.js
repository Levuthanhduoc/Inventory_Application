#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Meat = require("./models/meat");
  const Store = require("./models/store");
  const Type = require("./models/type");
  
  const meats = [];
  const stores = [];
  const types = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createOrigins();
    await createTypes();
    await createMeats();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function meatCreate(index,name,type,store,price,size,description,status) {
    const meat = new Meat({ 
        name: name,
        type:type,
        store:store,
        price:price,
        size:size,
        description:description,
        status:status
     });
    await meat.save();
    meats[index] = meat;
    console.log(`Added meat: ${name}`);
  }
  
  async function storeCreate(index, name,location) {
    const store = new Store({
        name:name,
        location:location,
    });
  
    await store.save();
    stores[index] = store;
    console.log(`Added store: ${name}`);
  }
  
  async function typeCreate(index, name) {
    const type = new Type({
        name:name
    });

    await type.save();
    types[index] = type;
    console.log(`Added type: ${name}`);
  }

  async function createOrigins() {
    console.log("Adding Origins");
    await Promise.all([
      storeCreate(0,"Meat Store brach 1","Sydney NSW 2000 Australia"),
      storeCreate(1,"Meat Store brach 2","Bondi Junction Australia"),
      storeCreate(2,"Meat Store brach 3","Caringbah Australia")
    ])
  }

  async function createTypes(){
    console.log("Adding Types")
    await Promise.all([
      typeCreate(0,"Beef"),
      typeCreate(1,"Lamb"),
      typeCreate(2,"Pork"),
      typeCreate(3,"Chicken"),
    ])
  }

  async function createMeats() {
    console.log("Adding meats");
    await Promise.all([
      meatCreate(0, "Grass Fed Scotch Fillet Steaks",types[0], stores[0],
       62.99,[200,250,300,1000],
       "This grass-fed scotch fillet steak is cherished due to its marbling and higher fat content, resulting in an incredibly succulent steak as it self-bastes while cooking, delivering a moist, tender, and flavourful experience.",
       "Available", 
      ),
      meatCreate(1, "Grass Fed Sirloin Steaks", types[0], stores[0],
       43.99,[200,250,300,1000],
       "Grass Fed Sirloin Steaks (Porterhouse or New York) are a lean cut from the loin, renowned for their robust flavour. Lower in fat than other cuts, they are ideal for grilling for a juicy and delicious experience. Enjoy the full flavour of grass-fed beef with these delicious steaks.",
       "Available",
      ),
      meatCreate(2,"Grass Fed Rump Steak",types[0], stores[2],
       34.99,[700,1000],
       "An Aussie favourite the Grass Fed Rump Steak. Generously deep in flavour and texture, if you like a bit of bite to your steak, this is the one for you! Cut straight from the rump we have left you just enough fat on its cap adding extra flavour.",
       "Available",
      ),
      meatCreate(3,"Rangers Valley Wagyu Scotch Fillet Marble",types[0], stores[1],
        99.99,[300],
        "Experience the ultimate in premium steak with Rangers Valley Wagyu Scotch Fillet Marble Score 5+, the creme de la creme of beef. Enjoy its melt-in-your-mouth texture, intense flavor, and rich juiciness. Treat yourself to the best steak you can find!",
        "Available",
      ),
      meatCreate(4,"Grass Fed T Bone Steak",types[0], stores[2],
       39.99,[500],
       "Grass Fed T Bone Steak, An exciting combination for steak-lovers with hearty appetites – a juicy, thick, marbled sirloin, plus a tender, subtly-flavoured fillet, joined together on the bone to really intensify their flavours.",
       "Unavailable",
      ),
      meatCreate(5,"Grass Fed Lamb Cutlets",types[1],stores[1],
        54.99,[1000],
        "Grass Fed Lamb Cutlets, An Aussie classic, tender, juicy and full of flavour, the king of the lamb BBQ cuts. We only use the coveted Riverina Junee Gold Lambs, known for their succulent flavour, tenderness and light pink colour.",
        "Available",
      ),
      meatCreate(6,"Grass Fed Lamb Loin Chops",types[1],stores[0],
        34.99,[1000],
        "Grass Fed Lamb Loin Chops, A versatile cut from the loin with the added inner fillet and the bone to intensify the flavour. We proudly source all our Lamb from the Victoria & Riverina regions known for their succulent flavour, tenderness and light pink colour.",
        "Available",
      ),
      meatCreate(7,"Grass Fed Lamb Cutlet Rack 4 Point",types[1],stores[2],
        56.99,[300],
        "Grass Fed Lamb Cutlet Rack 4 Point, The King of lamb’s roasting cuts. Tender, juicy and full of flavour. We proudly source all our Lamb from the Victoria & Riverina regions known for their succulent flavour, tenderness and light pink colour.",
        "Available",
      ),
      meatCreate(8,"Grass Fed Lean Lamb Rump Steaks",types[1],stores[2],
        42.99,[70,1000],
        "Extra lean lamb sliced straight from the rump. Grass Fed Lean Lamb Rump Steaks is delicious on the BBQ or pan fried. We proudly source all our Lamb from the Victoria & Riverina regions known for their succulent flavour, tenderness and light pink colour.",
        "Available",
      ),
      meatCreate(9,"Warilba Organic Grass Fed Lamb Cutlet Rack",types[1],stores[0],
        31.99,[1000],
        "Enjoy Warilba's Organic Grass Fed Lamb Cutlet Rack. This premium rack is grass-fed, organic, and hormone-free, giving you an optimal flavor unparalleled in any other product. Carefully-raised on a free-range farm, this rack contains all the natural benefits of fresh, grass-fed lamb. Try it today and taste the difference!",
        "Unavailable",
      ),
      meatCreate(10,"Free Range Pork Belly",types[2],stores[1],
        28.99,[2000,3000],
        "The Free Range Pork Belly is our most popular pork roast. With a perfect meat to fat ratio. When slow cooked the flavour is rich and creamy, with the crunch of crackling. All our pork is APIQ Certified free range and RSPCA approved.",
        "Available",
      ),
      meatCreate(11,"Free Range Pork Cutlets",types[2],stores[0],
        32.99,[290],
        "Free Range Pork Cutlets, Perfect for the BBQ or pan frying, with just enough fat to baste the meat while cooking. All our pork is APIQ Certified free range and 100% carbon neutral.",
        "Available",
      ),
      meatCreate(12,"Free Range Pork Cutlet Rack Roast 4 Point",types[2],stores[1],
        32.99,[1659],
        "The Free Range Pork Cutlet Rack Roast 4 Point is french trimmed and hand tied, with the rind on leaving a layer of fat to baste the meat while it roasts. It's sure to impress when placed on the dinner table. All our pork is APIQ Certified free range and RSPCA approved.",
        "Available",
      ),
      meatCreate(13,"Free Range Pork Shoulder Bone In",types[2],stores[2],
        14.99,[3000],
        "The Free Range Pork Shoulder Bone In has become one of our most popular cuts. It's best slow cooked this until the meat just falls from the bone. Create the perfect pulled pork. All our pork is APIQ Certified free range and RSPCA approved.",
        "Available",
      ),
      meatCreate(14,"Free Range Pork Meaty Ribs",types[2],stores[2],
        12.99,[1000],
        "Our premium Free Range Pork Meaty Ribs are sourced directly from nature, giving the meat a distinctive, succulent flavor. These tender ribs are a luxurious treat, perfect for tantalizing the taste-buds of the most discerning palate. Experience the flavours of nature at its finest with our Free Range Pork Meaty Ribs.",
        "Unavailable",
      ),
      meatCreate(15,"Chicken Breast Fillet",types[3],stores[1],
        16.99,[420,1000],
        "Our fresh chicken breast fillets come as single breasts and are excellent for pan-frying, on the grill or making your own chicken schnitzels. Extra lean,hemical free, no added hormones. Our chickens are  given plenty of space to roam and are able to freely source young grass, insects and seed, providing them with higher amounts of omega and essential vitamins and minerals.",
        "Available",
      ),
      meatCreate(16,"Chicken Drumsticks",types[3],stores[2],
        8.99,[500,1000],
        "Chicken Drumsticks can be enjoyed cooked in a range of ways, from oven roasted to tossed in casseroles.",
        "Available",
      ),
      meatCreate(17,"Chicken Thigh Fillets",types[3],stores[0],
        19.99,[150,1000],
        "Chicken Thigh Fillets are perfect for great pan-frying, grilling, prepared in a casserole or chicken schnitzel. No matter your culinary aspirations, our range of chicken items will give you plenty of room for delicious meals.",
        "Available",
      ),
      meatCreate(18,"Organic Chicken Liver",types[3],stores[1],
        27.99,[100],
        "Organic Chicken Liver are nutrient dense and delicious pan fried.",
        "Available",
      ),
      meatCreate(19,"Whole Free Range Chicken",types[3],stores[2],
        13.99,[1800],
        "This Whole Free Range Chicken is of the highest quality, reared to the highest standards with no growth hormones or additives. Enjoy a natural, tasty chicken with the assurance of sustainability and ethical farming. Nothing like a roast chicken at home.",
        "Unavailable",
      )
    ]);
  }