export const state = {
  currentUser: null,
  messages: [],
  guestCart: [],
  users: [
    {
      id: 1,
      name: "Customer1",
      email: "Customer1@gmail.com",
      password: "Customer1@1234",
      orders: [1, 2],
      cart: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 2 },
      ],
      accountType: "customer",
    },
    {
      id: 2,
      name: "ash admin",
      email: "ash@admin.ash",
      password: "Ash@1234",
      accountType: "admin",
    },
    {
      id: 3,
      name: "ash sellerB",
      email: "ash@seller.ash",
      password: "abcdefghijAAAA@123",
      orders: [100],
      accountType: "seller",
      products: [
        {
          productId: 1,
        },
        {
          productId: 2,
        },
        {
          productId: 3,
        },
        {
          productId: 4,
        },
        {
          productId: 5,
        },
        {
          productId: 6,
        },
        {
          productId: 7,
        },
      ],
    },
    {
      id: 4,
      name: "ash sellerA",
      email: "ash@seller.ash",
      password: "Ash@12345",
      orders: [100],
      accountType: "seller",
      products: [
        {
          productId: 8,
        },
        {
          productId: 9,
        },
        {
          productId: 10,
        },
        {
          productId: 11,
        },
        {
          productId: 12,
        },
        {
          productId: 13,
        },
        {
          productId: 14,
        },
        {
          productId: 15,
        },
        {
          productId: 16,
        },
        {
          productId: 17,
        },
        {
          productId: 18,
        },
      ],
    },
    {
      id: 5,
      name: "ash sellerA",
      email: "ash@seller.ash",
      password: "ash12345",
      orders: [200],
      accountType: "seller",
      products: [
        {
          productId: 19,
        },
        {
          productId: 20,
        },
        {
          productId: 21,
        },
        {
          productId: 22,
        },
        {
          productId: 23,
        },
        {
          productId: 24,
        },
        {
          productId: 25,
        },
        {
          productId: 26,
        },
        {
          productId: 27,
        },
        {
          productId: 28,
        },
        {
          productId: 29,
        },
        {
          productId: 30,
        },
      ],
    },
  ],
  orders: [
    {
      id: 100,
      items: [
        {
          id: 1,
          title: "Coush",
          description: "Desk, 89 1/50 8/8",
          imgURL0:
            "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1022432_pe832720_s5.jpg?f=xxs",
          imgURL1:
            "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1158868_pe888215_s5.jpg?f=xxs",
          sellerId: 3,
          category: "Sofas",
          stock: 10,
          price: 100,
          quantity: 4,
        },
        {
          id: 2,
          title: "Coush",
          description: "Desk,68 1/8 22 7/8",
          imgURL0: "https://www.ikea.com/us/en/images/products/uppland-sofa-kilanda-dark-blue__1194843_pe902111_s5.jpg?f=xxs",
          imgURL1: "https://www.ikea.com/us/en/images/products/uppland-sofa-kilanda-dark-blue__1194842_pe902092_s5.jpg?f=xxs",
          sellerId: 3,
          category: "Sofas",
          stock: 7,
          price: 890,
          quantity: 2,
        },
        {
          id: 11,
          title: "Dining Table",
          description: "Table,  86 5/8 39 3/8  29 1/8 ",
          imgURL0: "https://www.ikea.com/us/en/images/products/moerbylanga-groensta-table-and-6-chairs__1243748_pe920771_s5.jpg?f=xxs",
          imgURL1: "https://www.ikea.com/us/en/images/products/moerbylanga-groensta-table-and-6-chairs__1243747_pe920772_s5.jpg?f=xxs",
          sellerId: 4,
          category: "Tables",
          stock: 3,
          price: 11250,
          quantity: 2,
        },
      ],
      customerId: 1,
      status: "deleverd",
      date: "2024-01-25",
      customerDetails: {
        FirstName: "abdelhameed",
        lastname: "abdelhameed",
        userAddress: "78 madrab st,ezbet elshal,qism tani",
        Email: "abdelhameedosamaiti@gmail.com",
        Phone: "01094335757",
        streetAddress: "78 madrab st,ezbet elshal,qism tani",
        City: "mansoura",
        Zip: "35511",
      },
    },
    {
      id: 200,
      items: [
        {
          id: 23,
          title: "chair",
          description: "chair,  33 1/4 35 3/4  34 3/4 ",
          imgURL0: "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1109687_pe870153_s5.jpg?f=xxs",
          imgURL1: "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg?f=xxs",
          sellerId: 5,
          category: "chairs",
          stock: 6,
          quantity: 4,
          price: 2357,
        },
      ],
      customerId: 1,
      status: "pending",
      date: "2024-01-25",
      customerDetails: {
        FirstName: "abdelhameed",
        lastname: "abdelhameed",
        userAddress: "78 madrab st,ezbet elshal,qism tani",
        Email: "abdelhameedosamaiti@gmail.com",
        Phone: "01094335757",
        streetAddress: "78 madrab st,ezbet elshal,qism tani",
        City: "mansoura",
        Zip: "35511",
      },
    },
  ],
  products: [
    {
      id: 1,
      title: "Coush",
      description: "Desk, 89 1/50 8/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1022432_pe832720_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1158868_pe888215_s5.jpg?f=xxs",
      price: 100,
      prevPrice: 200,
      category: "Sofas",
      sellerId: 3,
      stock: 10,
      numberofsales: 3,
    },
    {
      id: 2,
      title: "Coush",
      description: "Desk,68 1/8 22 7/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/uppland-sofa-kilanda-dark-blue__1194843_pe902111_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/uppland-sofa-kilanda-dark-blue__1194842_pe902092_s5.jpg?f=xxs",
      price: 890,
      prevPrice: 1000,
      category: "Sofas",
      sellerId: 3,
      stock: 7,
      numberofsales: 3,
    },
    {
      id: 3,
      title: "Coush",
      description: "Desk,  5 7/8 31 3/4",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/linanaes-sofa-vissle-dark-gray__1013898_pe829450_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/linanaes-sofa-vissle-dark-gray__1013900_pe829454_s5.jpg?f=xx",
      price: 800,
      prevPrice: 950,
      category: "Sofas",
      sellerId: 3,
      stock: 15,
      numberofsales: 4,
    },
    {
      id: 4,
      title: "Coush",
      description: "Desk,  6 4/8 50 3/4",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/friheten-sleeper-sectional-3-seat-w-storage-skiftebo-dark-gray__0175610_pe328883_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/friheten-sleeper-sectional-3-seat-w-storage-skiftebo-dark-gray__1089881_pe861727_s5.jpg?f=xxs",
      price: 600,
      prevPrice: 600,
      category: "Sofas",
      sellerId: 3,
      stock: 6,
      numberofsales: 2,
    },
    {
      id: 5,
      title: "Coush",
      description: "Desk,  10 7/8 30 2/5",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/morabo-sofa-gunnared-dark-gray-wood__0602117_pe680186_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/morabo-sofa-gunnared-dark-gray-wood__0815940_pe773127_s5.jpg?f=xxs",
      price: 1000,
      prevPrice: 1320,
      category: "Sofas",
      sellerId: 3,
      stock: 9,
      numberofsales: 1,
    },
    {
      id: 6,
      title: "Coush",
      description: "Desk,  7 3/8 35 4/9",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/linanaes-sofa-with-chaise-vissle-dark-gray__1013908_pe829460_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/morabo-sofa-gunnared-dark-gray-wood__0815940_pe773127_s5.jpg?f=xxs",
      price: 900,
      prevPrice: 980,
      category: "Sofas",
      sellerId: 3,
      stock: 12,
      numberofsales: 8,
    },
    {
      id: 7,
      title: "Coush",
      description: "Desk,  9 3/8 32 7/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950864_pe800736_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950897_pe800737_s5.jpg?f=xxs",
      price: 800,
      prevPrice: 900,
      category: "Sofas",
      sellerId: 3,
      stock: 10,
      numberofsales: 6,
    },
    {
      id: 8,
      title: "Coush",
      description: "Desk,  4 3/8 30 7/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/kivik-sofa-gunnared-beige__0781491_pe760799_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950897_pe800737_s5.jpg?f=xxs",
      price: 700,
      prevPrice: 700,
      category: "Sofas",
      sellerId: 4,
      stock: 13,
      numberofsales: 8,
    },
    {
      id: 9,
      title: "Coush",
      description: "Desk,  7 4/7 26 7/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/finnala-sofa-gunnared-beige__0514366_pe639439_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/finnala-sofa-gunnared-beige__0787232_pe763195_s5.jpg?f=xxs",
      price: 780,
      prevPrice: 900,
      category: "Sofas",
      sellerId: 4,
      stock: 19,
      numberofsales: 4,
    },
    {
      id: 10,
      title: "Coush",
      description: "Desk,  9 5/7 30 7/8",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/morabo-sofa-grann-bomstad-golden-brown-wood__0602112_pe680181_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/morabo-sofa-grann-bomstad-golden-brown-wood__0815934_pe773121_s5.jpg?f=xxs",
      price: 1000,
      prevPrice: 1000,
      category: "Sofas",
      sellerId: 4,
      stock: 10,
      numberofsales: 2,
    },
    {
      id: 11,
      title: "Dining Table",
      description: "Table,  86 5/8 39 3/8  29 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/moerbylanga-groensta-table-and-6-chairs__1243748_pe920771_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/moerbylanga-groensta-table-and-6-chairs__1243747_pe920772_s5.jpg?f=xxs",
      price: 11250,
      prevPrice: 12000,
      category: "Tables",
      sellerId: 4,
      stock: 3,
      numberofsales: 0,
    },
    {
      id: 12,
      title: "Dining Table",
      description: "Table,  80 5/8 30 3/8  23 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/moerbylanga-marenaes-table-and-4-armchairs__1198495_pe904102_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/moerbylanga-marenaes-table-and-4-armchairs__1198494_pe904103_s5.jpg?f=xxs",
      price: 10500,
      prevPrice: 10745,
      category: "Tables",
      sellerId: 4,
      stock: 4,
      numberofsales: 1,
    },
    {
      id: 13,
      title: "Dining Table",
      description: "Table,  83 5/8 35 3/8  28 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/skogsta-sakarias-table-and-4-chairs-acacia-black-sporda-dark-gray__0680670_pe719884_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/skogsta-sakarias-table-and-4-chairs-acacia-black-sporda-dark-gray__0680679_pe719885_s5.jpg?f=xxs",
      price: 12530,
      prevPrice: 15000,
      category: "Tables",
      sellerId: 4,
      stock: 10,
      numberofsales: 0,
    },
    {
      id: 14,
      title: "Dining Table",
      description: "Table,  89 5/8 40 3/8  30 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/ekedalen-klinten-table-and-4-chairs-white-kilanda-light-beige__1209067_pe909007_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/ekedalen-klinten-table-and-4-chairs-white-kilanda-light-beige__1209066_pe909006_s5.jpg?f=xxs",
      price: 7800,
      prevPrice: 8200,
      category: "Tables",
      sellerId: 4,
      stock: 15,
      numberofsales: 6,
    },
    {
      id: 15,
      title: "Dining Table",
      description: "Table,  90 5/8 33 3/8  32 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/strandtorp-marenaes-table-and-6-armchairs-brown-black-gunnared-dark-grey__1198509_pe904116_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/strandtorp-marenaes-table-and-6-armchairs-brown-black-gunnared-dark-grey__1198508_pe904117_s5.jpg?f=xxs",
      price: 25000,
      prevPrice: 25000,
      category: "Tables",
      sellerId: 4,
      stock: 3,
      numberofsales: 1,
    },
    {
      id: 16,
      title: "Dining Table",
      description: "Table,  83 5/8 34 3/8  35 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/ekedalen-krylbo-table-and-4-chairs-oak-tonerud-dark-beige__1232016_pe916333_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/ekedalen-krylbo-table-and-4-chairs-oak-tonerud-dark-beige__1232015_pe916335_s5.jpg?f=xxs",
      price: 7689,
      prevPrice: 7700,
      category: "Tables",
      sellerId: 4,
      stock: 13,
      numberofsales: 2,
    },
    {
      id: 17,
      title: "Dining Table",
      description: "Table,  85 5/8 36 3/8  34 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/strandtorp-tossberg-table-and-4-chairs-brown-metal-black-gray__1060388_pe850007_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/strandtorp-tossberg-table-and-4-chairs-brown-metal-black-gray__1060387_pe850004_s5.jpg?f=xxs",
      price: 6759,
      prevPrice: 6759,
      category: "Tables",
      sellerId: 4,
      stock: 9,
      numberofsales: 3,
    },
    {
      id: 18,
      title: "Dining Table",
      description: "Table,  81 5/8 33 3/8  41 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/ekedalen-krylbo-table-and-4-chairs-oak-tonerud-blue__1232008_pe916329_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/ekedalen-krylbo-table-and-4-chairs-oak-tonerud-blue__1232007_pe916326_s5.jpg?f=xxs",
      price: 6534,
      prevPrice: 7200,
      category: "Tables",
      sellerId: 4,
      stock: 4,
      numberofsales: 2,
    },
    {
      id: 19,
      title: "Dining Table",
      description: "Table,  83 5/8 43 3/8  50 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/taernoe-table-and-4-chairs-outdoor-black-light-brown-stained-kloesan-blue__1035867_pe838199_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/taernoe-table-and-4-chairs-outdoor-black-light-brown-stained-kloesan-blue__1035868_pe838200_s5.jpg?f=xxs",
      price: 20346,
      prevPrice: 23657,
      category: "Tables",
      sellerId: 5,
      stock: 7,
      numberofsales: 3,
    },
    {
      id: 20,
      title: "Dining Table",
      description: "Table,  93 5/8 55 3/8  34 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/skogsta-skogsta-table-and-6-chairs-acacia-acacia__1240709_pe919454_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/skogsta-skogsta-table-and-6-chairs-acacia-acacia__1240708_pe919455_s5.jpg?f=xxs",
      price: 9346,
      prevPrice: 10000,
      category: "Tables",
      sellerId: 5,
      stock: 13,
      numberofsales: 5,
    },
    {
      id: 21,
      title: "Dining Table",
      description: "Table,  86 5/8 35 3/8  32 1/8 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/sjaelland-table-2-chairs-and-bench-outdoor-light-brown-froesoen-duvholmen-beige__0735906_pe740262_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/sjaelland-table-2-chairs-and-bench-outdoor-light-brown-froesoen-duvholmen-beige__0907408_pe674371_s5.jpg?f=xxs",
      price: 6843,
      prevPrice: 6843,
      category: "Tables",
      sellerId: 5,
      stock: 17,
      numberofsales: 6,
    },
    {
      id: 22,
      title: "chair",
      description: "chair,  32 1/4 37 3/4  39 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/strandmon-wing-chair-nordvalla-dark-gray__0325432_pe517964_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/strandmon-wing-chair-nordvalla-dark-gray__1116445_pe872501_s5.jpg?f=xxs",
      price: 2999,
      prevPrice: 2999,
      category: "chairs",
      sellerId: 5,
      stock: 12,
      numberofsales: 3,
    },
    {
      id: 23,
      title: "chair",
      description: "chair,  33 1/4 35 3/4  34 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1109687_pe870153_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg?f=xxs",
      price: 2357,
      prevPrice: 3000,
      category: "chairs",
      sellerId: 5,
      stock: 6,
      numberofsales: 4,
    },
    {
      id: 24,
      title: "chair",
      description: "chair,  35 1/4 37 3/4  30 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/vedbo-armchair-gunnared-dark-gray__0512767_pe638683_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/vedbo-armchair-gunnared-dark-gray__0708567_ph153038_s5.jpg?f=xxs",
      price: 4589,
      prevPrice: 6924,
      category: "chairs",
      sellerId: 5,
      stock: 17,
      numberofsales: 5,
    },
    {
      id: 25,
      title: "chair",
      description: "chair,  33 1/4 32 3/4  39 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/bingsta-armchair-vissle-dark-yellow-kabusa-dark-yellow__0761760_pe751428_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/bingsta-armchair-vissle-dark-yellow-kabusa-dark-yellow__0809764_pe771125_s5.jpg?f=xxs",
      price: 5200,
      prevPrice: 5200,
      category: "chairs",
      sellerId: 5,
      stock: 15,
      numberofsales: 9,
    },
    {
      id: 26,
      title: "chair",
      description: "chair,  44 1/4 39 3/4  49 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/dyvlinge-swivel-chair-kelinge-green__1205904_pe907276_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/dyvlinge-swivel-chair-kelinge-green__1205903_pe907277_s5.jpg?f=xxs",
      price: 6432,
      prevPrice: 7000,
      category: "chairs",
      sellerId: 5,
      stock: 9,
      numberofsales: 4,
    },
    {
      id: 27,
      title: "chair",
      description: "chair,  30 1/4 33 3/4  45 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/remsta-armchair-djuparp-dark-green-blue__0908607_pe783330_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/remsta-armchair-djuparp-dark-green-blue__0908608_pe783331_s5.jpg?f=xxs",
      price: 5200,
      prevPrice: 6000,
      category: "chairs",
      sellerId: 5,
      stock: 18,
      numberofsales: 3,
    },
    {
      id: 28,
      title: "chair",
      description: "chair,  46 1/4 32 3/4  34 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/fulloesa-armchair-gatehult-gray__1203775_pe906443_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/fulloesa-armchair-gatehult-gray__1203774_pe906445_s5.jpg?f=xxs",
      price: 7823,
      prevPrice: 8000,
      category: "chairs",
      sellerId: 5,
      stock: 9,
      numberofsales: 5,
    },
    {
      id: 29,
      title: "chair",
      description: "chair,  43 1/4 39 3/4  40 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/muren-recliner-remmarn-dark-gray__0908536_pe783303_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/muren-recliner-remmarn-dark-gray__0908537_pe783270_s5.jpg?f=xxs",
      price: 9000,
      prevPrice: 9000,
      category: "chairs",
      sellerId: 5,
      stock: 5,
      numberofsales: 3,
    },
    {
      id: 30,
      title: "chair",
      description: "chair,  39 1/4 32 3/4  35 3/4 ",
      imgURL0:
        "https://www.ikea.com/us/en/images/products/buskbo-armchair-rattan-djupvik-white__0700959_pe723853_s5.jpg?f=xxs",
      imgURL1:
        "https://www.ikea.com/us/en/images/products/buskbo-armchair-rattan-djupvik-white__0822799_ph167442_s5.jpg?f=xxs",
      price: 4792,
      prevPrice: 6389,
      category: "chairs",
      sellerId: 5,
      stock: 10,
      numberofsales: 7,
    },
  ],
};
function loadStateFromLocalStorage() {
  console.log("state LOADED:>> ");
  for (const key in state) {
    state[key] = JSON.parse(localStorage.getItem(key)) || state[key];
  }
}

export function saveStateInLocalStorage() {
  for (const key in state) {
    localStorage.setItem(key, JSON.stringify(state[key]));
  }
}
function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function setCurrentUser(user) {
  state.currentUser = user;
  saveInLocalStorage("currentUser", user);
}
export function getCurrentUser() {
  return state.currentUser;
}
export function addUser(user) {
  state.users.push(user);
  saveStateInLocalStorage();
}

export function getUserById(id) {
  return state.users.find((user) => user.id === +id);
}
export function getUserByEmail(email) {
  return state.users.find((user) => user.email === email);
}

export function getAllOrdersByOrderIds(orderIds) {
  let allOrders = [];
  // let orders = JSON.parse(localStorage.getItem("orders"));
  for (const orderId of orderIds) {
    // Find the order in the state.orders array
    const foundOrder = state.orders.find((order) => order.id === orderId);
    console.log(foundOrder);
    // If the order is found, add it to the allOrders array
    if (foundOrder) {
      allOrders.push(foundOrder);
    }
  }
  let result = [];
  for (let i = 0; i < allOrders.length; i++) {
    // Create a new array for each iteration of the outer loop
    const matchedItems = [];
    console.log(state.currentUser);
    for (let j = 0; j < allOrders[i].items.length; j++) {
      if (allOrders[i].items[j].sellerId === state.currentUser.id) {
        console.log(allOrders[i].status);
        allOrders[i].items[j].orderId = allOrders[i].id;
        allOrders[i].items[j].orderDate = allOrders[i].date;
        allOrders[i].items[j].orderStatus = allOrders[i].status;
        matchedItems.push(allOrders[i].items[j]);
      }
    }
    result.push(matchedItems);
  }
  console.log(result);
  return result;
}

function getAllProductsBySellerId(allProducts) {
  if (state.currentUser.accountType === "seller") {
    if (allProducts) {
      let id = state.currentUser.id;
      const result = allProducts
        .filter((obj) => obj.sellerId === id)
        .map(({ id, title, description, category, stock, price }) => ({
          id,
          title,
          description,
          category,
          stock,
          price,
        }));
      return result;
    }
  }
  //
  else return;
}
export function getAllProductsByProductIds(productIds) {
  // Initialize an array to store the found orders
  const allProducts = [];

  // Iterate through the order IDs
  for (const productId of productIds) {
    const foundProduct = localStorage.getItem("products");

    if (foundProduct) {
      allProducts.push(JSON.parse(foundProduct));
    }
  }
  const arrProducts = getAllProductsBySellerId(allProducts[0]);
  return arrProducts;
}
export function getCustomers() {
  return state.users.filter((u) => u.accountType === "customer");
}
export function getSellers() {
  return state.users.filter((u) => u.accountType === "seller");
}
export function getLastAddedProducts(number = 0) {
  return state.products.slice(-number).reverse();
}
export function getTotalOrdersRevenue() {
  return getOrdersRevenue(state.orders);
}
export function getOrderById(id) {
  return state.orders.find((order) => order.id === +id);
}
export function getProductById(id) {
  return state.products.find((product) => product.id === +id);
}
export function getOrdersRevenue(ordersArray) {
  return ordersArray.reduce((acc, order) => acc + getOrderTotal(order), 0);
}
export function getOrderTotal(order) {
  return order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function getByPageNumber(array, pageNumber, itemsPerPage) {
  //sorting first or sorting after slicing?
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}
export function deleteProductById(id) {
  //get product to get seller id
  const product = getProductById(id);

  //loop over users
  state.users.forEach((user) => {
    if (user.id === product?.sellerId) {
      //delete product from seller products
      user.products = user.products.filter(
        (product) => product.productId !== +id
      );
    } else if (user.accountType === "customer") {
      //delete product from all carts
      user.cart = user.cart.filter((item) => item.id !== +id);
    }
  });

  //delete product from guest cart
  state.guestCart = state.guestCart.filter((item) => item.id !== +id);

  //delete product from products
  state.products = state.products.filter((product) => product.id !== +id);

  //save state in local storage
  saveStateInLocalStorage();
}

export function changeCartItemCount(id, quantity) {
  const cart = getCurrentCart();
  const index = cart.findIndex((item) => item.id === +id);
  cart[index].quantity = quantity;
  if (!state.currentUser) {
    state.guestCart = cart;
  } else {
    state.currentUser.cart = cart;
    const index = state.users.findIndex(
      (user) => user.id === state.currentUser.id
    );
    state.users[index].cart = cart;
  }

  saveStateInLocalStorage();
}

export function DeleteFromCart(id) {
  const cart = getCurrentCart();
  const newCart = cart.filter((item) => item.id !== +id);
  if (!state.currentUser) {
    state.guestCart = newCart;
  } else {
    state.currentUser.cart = newCart;
    const index = state.users.findIndex(
      (user) => user.id === state.currentUser.id
    );
    state.users[index].cart = newCart;
  }
  saveStateInLocalStorage();
}
export function getCurrentCart() {
  return state.currentUser ? state.currentUser.cart : state.guestCart;
}
export function deleteCustomerById(id) {
  state.users = state.users.filter((user) => user.id !== +id);
  saveInLocalStorage("users", state.users);
}
export function deleteSellerById(id) {
  const seller = getUserById(id);
  seller.products.forEach((product) => deleteProductById(product.productId));
  deleteCustomerById(id);
  saveStateInLocalStorage();
}
export function editUserById(id, email, password, name) {
  const foundUser = getUserByEmail(email);
  if (foundUser && foundUser.id !== +id)
    throw new Error("Email already in use.");
  const index = state.users.findIndex((user) => user.id === +id);
  state.users[index].email = email;
  state.users[index].password = password;
  state.users[index].name = name;
  saveStateInLocalStorage();
}
export function searchProductsByTitle(title) {
  return state.products.filter((product) =>
    product.title.toLowerCase().includes(title.toLowerCase())
  );
}
export function searchSellerByName(name) {
  return state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(name.toLowerCase()) &&
      user.accountType === "seller"
  );
}
export function searchCustomerByName(name) {
  return state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(name.toLowerCase()) &&
      user.accountType === "customer"
  );
}
export function searchOrdersByCustomerName(name) {
  return state.orders.filter((order) =>
    getUserById(order.customerId)
      .name.toLowerCase()
      .includes(name.toLowerCase())
  );
}

export function sortByField(array, field, order = "asc") {
  return [...array].sort((a, b) => {
    let res = a[field] > b[field] ? 1 : -1;
    if (order === "desc") res *= -1;
    return res;
  });
}
export function searchByField(array, field, value) {
  return array.filter((item) =>
    `${item[field]}`.toLowerCase().includes(value.toLowerCase())
  );
}
export function deleteMessageById(id) {
  console.log("id :>> ", id);
  state.messages = state.messages.filter((message) => message.mId !== +id);
  saveStateInLocalStorage();
}
export function testLog() {
  console.log("test");
}

export function moveGuestCartToUserCart(id) {
  const index = state.users.findIndex((user) => user.id === +id);
  console.log("index :>> ", index);
  console.log("state.users[index] :>> ", state.users[index]);
  state.users[index].cart = [...state.users[index].cart, ...state.guestCart];
  state.guestCart = [];
  saveStateInLocalStorage();
}
//this runs once when the app starts sets the state from local storage
loadStateFromLocalStorage();
