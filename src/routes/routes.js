// import { directHisobot } from "../../../backend/src/controllers/admin-app/registration.controller";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Layout/DashboardLayout.vue"),
    redirect: "user",
    name: "dashboard",
    children: [
      {
        path: "user",
        name: "User Profile",
        component: () => import("@/pages/User/Index.vue")
      },
      {
        path: "/dashboard",
        name: "/dashboard",
        component: () => import("@/pages/Dashboard/Index.vue")
      },
      {
        path: "/user/statsionar",
        name: "User Statsionar",
        component: () => import("@/pages/User/Statsionar.vue")
      },
      // {
      //   path: "dashboard",
      //   name: "home",
      //   component: () => import("@/pages/NavbatlarRoyhati/Dashboard.vue")
      // },
      // {
      //   path: "bemor",
      //   name: "bemor",
      //   component: () => import("@/pages/Bemorlar/Index.vue")
      // },
      // {
      //   path: "bemor-create",
      //   name: "Bemor Create",
      //   component: () => import("@/pages/Bemorlar/Create.vue")
      // },
      // {
      //   path: "bemor-update/:id",
      //   name: "bemor-update",
      //   component: () => import("@/pages/Bemorlar/Update.vue")
      // },
      {
        path: "bemor",
        name: "Bemor",
        component: () => import("@/pages/Bemorlar/Index.vue")
      },
      {
        path: "enter-price",
        name: "Enter-Price",
        component: () => import("@/pages/EnterPrice/Index.vue")
      },
      {
        path: "enter-price-update/:id",
        name: "EnterPrice-update",
        component: () => import("@/pages/EnterPrice/Update.vue")
      },
     
      {
        path: "Bassen-price",
        name: "Bassen-Price",
        component: () => import("@/pages/BassenPrice/Index.vue")
      },
      {
        path: "Bassen-price-update/:id",
        name: "BassenPrice-update",
        component: () => import("@/pages/BassenPrice/Update.vue")
      },
      {
        path: "bemor-create",
        name: "Bemor-create",
        component: () => import("@/pages/Bemorlar/Create.vue")
      },
      {
        path: "bemor-update/:id",
        name: "Bemor-update",
        component: () => import("@/pages/Bemorlar/Update.vue")
      },
      {
        path: "naprovitel",
        name: "Naprovitel",
        component: () => import("@/pages/Naprovitel/Index.vue")
      },
      {
        path: "naprovitel-create",
        name: "Naprovitel Create",
        component: () => import("@/pages/Naprovitel/Create.vue")
      },
      {
        path: "naprovitel-update/:id",
        name: "Naprovitel Update",
        component: () => import("@/pages/Naprovitel/Update.vue")
      },
      {
        path: "medpritavitel",
        name: "Medpristavitel",
        component: () => import("@/pages/medPristavitel/Index.vue")
      },
      {
        path: "medpritavitel-create",
        name: "medpritavitel Create",
        component: () => import("@/pages/medPristavitel/Create.vue")
      },
      {
        path: "medpritavitel-update/:id",
        name: "medpritavitel Update",
        component: () => import("@/pages/medPristavitel/Update.vue")
      },
      {
        path: "reagent",
        name: "Reagent",
        component: () => import("@/pages/Reagent/Index.vue")
      },
      {
        path: "reagent-create",
        name: "Reagent Create",
        component: () => import("@/pages/Reagent/Create.vue")
      },
      {
        path: "reagent-update/:id",
        name: "Reagent Update",
        component: () => import("@/pages/Reagent/Update.vue")
      },
      {
        path: "filial",
        name: "Filial",
        component: () => import("@/pages/Filial/Index.vue")
      },
      {
        path: "filial-create",
        name: "Filial Create",
        component: () => import("@/pages/Filial/Create.vue")
      },
      {
        path: "filial-update/:id",
        name: "Filial Update",
        component: () => import("@/pages/Filial/Update.vue")
      },
      {
        path: "prixod",
        name: "Prixod",
        component: () => import("@/pages/Prixod/Index.vue")
      },

      {
        path: "provider",
        name: "Provider",
        component: () => import("@/pages/Pastavshik/Index.vue")
      },
      {
        path: "provider-create",
        name: "Provider Create",
        component: () => import("@/pages/Pastavshik/Create.vue")
      },
      {
        path: "provider-update/:id",
        name: "Provider Update",
        component: () => import("@/pages/Pastavshik/Update.vue")
      },
      {
        path: "provider/pay",
        name: "ProviderPay",
        component: () => import("@/pages/PastavshikTolov/Index.vue")
      },

      {
        path: "/arxiv",
        name: "Arxiv",
        component: () => import("@/pages/Arxiv/Index.vue")
      },
      {
        path: "/hisobotlar",
        nema: "Hisobotlar",
        component: () => import("@/pages/Hisobot/From.vue")
      },
      {
        path: "/settings/update",
        name: "/settings/update",
        component: () => import("@/pages/Settings/Form.vue")
      },
      {
        path: "/settings/create",
        name: "/settigns/create",
        component: () => import("@/pages/Settings/Form.vue")
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/pages/Settings/Index.vue")
      },
      {
        path: "sori",
        name: "sori",
        component: () => import("@/pages/Sori/Index.vue")
      },
      {
        path: "sori-create",
        name: "Sori Create",
        component: () => import("@/pages/Sori/Create.vue")
      },
      {
        path: "sori-update/:id",
        name: "sori-update",
        component: () => import("@/pages/Sori/Update.vue")
      },
      {
        path: "oplata",
        name: "oplata",
        component: () => import("@/pages/Oplata/Index.vue")
      },
      {
        path: "oplata-create",
        name: "Oplata Create",
        component: () => import("@/pages/Oplata/Create.vue")
      },
      {
        path: "oplata-update/:id",
        name: "oplata-update",
        component: () => import("@/pages/Oplata/Update.vue")
      },
      {
        path: "pay-direct",
        name: "pay-direct",
        component: () => import("@/pages/PayDirect/Index.vue")
      },
      {
        path: "oplataDoc/:id",
        name: "oplataDoc",
        component: () => import("@/pages/oplataDoc/From.vue")
      },
      {
        path: "oplata_doc",
        name: "oplataDocument",
        component: () => import("@/pages/oplataDoc/Index.vue")
      },
      {
        path: "KassaDoc/:id",
        name: "KassaDoc",
        component: () => import("@/pages/KassaDoc/From.vue")
      },
      {
        path: "kassaDoc",
        name: "KAssaDOcument",
        component: () => import("@/pages/KassaDoc/Index.vue")
      },
      {
        path: "Shifokor-bolimi",
        name: "ShifokorBolimi",
        component: () => import("@/pages/ShifokorBolimi/Index.vue")
      },
      {
        path: "doctor-hisobot",
        name: "DoctorHisobot",
        component: () => import("@/pages/Hisobot/Doctor.vue")
      },

      {
        path: "kassa-hisobot",
        name: "KassaHisobot",
        component: () => import("@/pages/Hisobot/Kassa.vue")
      },
      {
        path: "inspection_hisobot",
        name: "InspectionHisobot",
        component: () => import("@/pages/Hisobot/Inspection.vue")
      },
      {
        path: "direct_hisobot",
        name: "DirectHisobot",
        component: () => import("@/pages/Hisobot/Direct.vue")
      },
      {
        path: "med/direct/hisobot",
        name: "MedDirectHisobot",
        component: () => import("@/pages/Hisobot/MedHisobot.vue")
      },
      {
        path: "provayder/hisobot",
        name: "PastavshikHisobot",
        component: () => import("@/pages/Hisobot/Pastavshik.vue")
      },
      {
        path: "reagent/hisobot",
        name: "ReagentHisobot",
        component: () => import("@/pages/Hisobot/Reagent.vue")
      },
      {
        path: "sori/hisobot",
        name: "SoriHisobot",
        component: () => import("@/pages/Hisobot/Sori.vue")
      },
      {
        path: "Shifokor-bolimi-create",
        name: "ShifokorBolimi-create",
        component: () => import("@/pages/ShifokorBolimi/Create.vue")
      },
      {
        path: "shifokor-bolimi-update/:id",
        name: "ShifokorBolimi-update",
        component: () => import("@/pages/ShifokorBolimi/Update.vue")
      },
      {
        path: "shifokor",
        name: "shifokor",
        component: () => import("@/pages/Shifokorlar/Index.vue")
      },
      {
        path: "shifokor-create",
        name: "shifokor-create",
        component: () => import("@/pages/Shifokorlar/Create.vue")
      },
      {
        path: "shifokor-update/:id",
        name: "shifokor-update",
        component: () => import("@/pages/Shifokorlar/Update.vue")
      },
      {
        path: "hodimlar",
        name: "Hodimlar",
        component: () => import("@/pages/Hodimlar/Index.vue")
      },
      {
        path: "hodimlar-create",
        name: "Hodimlar-create",
        component: () => import("@/pages/Hodimlar/Create.vue")
      },
      {
        path: "hodimlar-update/:id",
        name: "Hodimlar-update",
        component: () => import("@/pages/Hodimlar/Update.vue")
      },

      {
        path: "xonalar",
        name: "Xonalar",
        component: () => import("@/pages/Xonalar/Index.vue")
      },
      {
        path: "reagent/department",
        name: "Reagent Department",
        component: () => import("@/pages/ReagentBolimi/Index.vue")
      },
      {
        path: "xonalar-create",
        name: "Xonalar-create",
        component: () => import("@/pages/Xonalar/Create.vue")
      },
      {
        path: "xonalar-update/:id",
        name: "Xonalar-update",
        component: () => import("@/pages/Xonalar/Update.vue")
      },

      {
        path: "tekshiruv-bolimlari",
        name: "TekshiruvBolimlari",
        component: () => import("@/pages/TekshiruvBolimlari/Index.vue")
      },
      {
        path: "tekshiruv-bolimlari-create",
        name: "TekshiruvBolimlari-create",
        component: () => import("@/pages/TekshiruvBolimlari/Create.vue")
      },
      {
        path: "tekshiruv-bolimlari-update/:id",
        name: "TekshiruvBolimlari-update",
        component: () => import("@/pages/TekshiruvBolimlari/Update.vue")
      },
      {
        path: "tekshiruvlar",
        name: "Tekshiruvlar",
        component: () => import("@/pages/Tekshiruvlar/Index.vue")
      },
      {
        path: "tekshiruvlar-create",
        name: "Tekshiruvlar-create",
        component: () => import("@/pages/Tekshiruvlar/Create.vue")
      },
      {
        path: "tekshiruvlar-update/:id",
        name: "Tekshiruvlar-update",
        component: () => import("@/pages/Tekshiruvlar/Update.vue")
      },
      {
        path: "dorilar",
        name: "Dorilar",
        component: () => import("@/pages/Dorilar/Index.vue")
      },
      {
        path: "kassaa",
        name: "Kassa",
        component: () => import("@/pages/Kassa Order/Index.vue")
      },
      {
        path: "kassa-create",
        name: "KassaCreate",
        component: () => import("@/pages/Kassa Order/Create.vue")
      },
      {
        path: "kassa-update/:id",
        name: "Kassa-Update",
        component: () => import("@/pages/Kassa Order/Update.vue")
      },
      {
        path: "/reagent2",
        name: "/reagent2",
        component: () => import("@/pages/Hisobot/Reagent2.vue")
      },
      {
        path: "palata",
        name: "Palata",
        component: () => import("@/pages/Palata/Index.vue")
      },
      {
        path: "palata-create",
        name: "PalataCreate",
        component: () => import("@/pages/Palata/Create.vue")
      },
      {
        path: "palata-update/:id",
        name: "Palata-Update",
        component: () => import("@/pages/Palata/Update.vue")
      },
      {
        path: "dorilar-create",
        name: "Dorilar-create",
        component: () => import("@/pages/Dorilar/Create.vue")
      },
      {
        path: "dorilar-update/:id",
        name: "Dorilar-update",
        component: () => import("@/pages/Dorilar/Update.vue")
      }
      // {
      //   path: "naprovitel",
      //   name: "Naprovitel",
      //   component: () => import("@/pages/Naprovitel/Index.vue")
      // },
      // {
      //   path: "naprovitel-create",
      //   name: "Naprovitel-create",
      //   component: () => import("@/pages/Naprovitel/Create.vue")
      // },
      // {
      //   path: "naprovitel-update/:id",
      //   name: "Naprovitel-update",
      //   component: () => import("@/pages/Naprovitel/Update.vue")
      // }
    ]
  },
  {
    path: "/kirish",
    name: "Kirish",
    component: () => import("@/pages/Kirish/Form.vue")
  },
  {
    path: "/eshikdan-kirish",
    name: "Eshikdan kirish",
    component: () => import("@/pages/EnterDoor/Index.vue")
  },
  {
    path: "/Bassen-kirsh",
    name: "Bassen",
    component: () => import("@/pages/Bassen/Index.vue")
  },
  {
    path: "/registration/archive",
    name: "Registration Archive",
    component: () => import("@/pages/Arxiv/Kasalliktarixi.vue")
  },
  {
    path: "/provider/pay/create",
    name: "Provider Pay Create",
    component: () => import("@/pages/PastavshikTolov/Create.vue")
  },
  {
    path: "/provider/pay/update/:id",
    name: "Provider Pay Update",
    component: () => import("@/pages/PastavshikTolov/Update.vue")
  },
  {
    path: "/pay-direct/create",
    name: "pay-direct-create",
    component: () => import("@/pages/PayDirect/Create.vue")
  },
  {
    path: "/pay-direct/update/:id",
    name: "pay-direct-update",
    component: () => import("@/pages/PayDirect/Update.vue")
  },
  {
    path: "/provider/pay/document/:id",
    name: "Provider Document",
    component: () => import("@/pages/PastavshikTolov/Document.vue")
  },
  {
    path: "/prixod-create",
    name: "Prixod Create",
    component: () => import("@/pages/Prixod/Create.vue")
  },
  {
    path: "/prixod-update/:id",
    name: "Prixod Update",
    component: () => import("@/pages/Prixod/Update.vue")
  },
  {
    path: "/prixod/document/:id",
    name: "Prixod Document",
    component: () => import("@/pages/Prixod/Document.vue")
  },
  {
    path: "/reagent/department/create",
    name: "Reagent Department Create",
    component: () => import("@/pages/ReagentBolimi/Update.vue")
  },
  {
    path: "/reagent/department/update/:id",
    name: "Reagent Department Update",
    component: () => import("@/pages/ReagentBolimi/Update.vue")
  },
  {
    path: "/patient-count",
    name: "PatientCount",
    component: () => import("@/pages/Sverka/Patient_count.vue")
  },
  {
    path: "/doctor_sverka",
    name: "DoctorSverka",
    component: () => import("@/pages/Sverka/DoctorSverka.vue")
  },
  {
    path: "/kassa-sverka",
    name: "KassaSverka",
    component: () => import("@/pages/Sverka/KassaSverka.vue")
  },
  {
    path: "/direct_sverka",
    name: "DIrectSverka",
    component: () => import("@/pages/Sverka/DirectSverka.vue")
  },
  {
    path: "/provayder/sverka",
    name: "ProvayderSverka",
    component: () => import("@/pages/Sverka/PostavshikSverks.vue")
  },
  {
    path: "/Reagent/sverka",
    name: "ReagentSverka",
    component: () => import("@/pages/Sverka/ReagentSverka.vue")
  },
  {
    path: "/sori/sverka",
    name: "SoriSverka",
    component: () => import("@/pages/Sverka/SoriSverka.vue")
  },
  {
    path: "/eshik/sverka",
    name: "EshikSverka",
    component: () => import("@/pages/Sverka/KirishSverka.vue")
  },
  {
    path: "/Bassen/sverka",
    name: "BassenSverka",
    component: () => import("@/pages/Sverka/BassenSverka.vue")
  },
  {
    path: "/med/direct/sverka",
    name: "MedDIrectSverka",
    component: () => import("@/pages/Sverka/MedSverka.vue")
  },
  {
    path: "/statsionar/sverka",
    name: "StatsionarSverka",
    component: () => import("@/pages/Sverka/Statsionar.vue")
  },
  {
    path: "/inspection_sverka",
    name: "InspectionSverka",
    component: () => import("@/pages/Sverka/inspectionSverka.vue")
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue")
  },
  {
    path: "/arxivone/:id",
    name: "ArxivOne",
    component: () => import("@/pages/Arxiv/From.vue")
  },
  {
    path: "/user-create",
    name: "User Profile Create",
    component: () => import("@/pages/User/Create.vue")
    // meta: {
    //   requireAdmin: true,
    // }
  },
  {
    path: "/user-update/:id",
    name: "User Profile Update",
    component: () => import("@/pages/User/Update.vue")
  },
  {
    path: "/user-chek",
    name: "User Profile Chek",
    component: () => import("@/pages/User/Chek.vue")
  },
  {
    path: "/user-bayonot",
    name: "User Profile Bayonot",
    component: () => import("@/pages/User/Bayonot.vue")
  },
  {
    path: "/user-shartnoma",
    name: "User Profile Shartnoma",
    component: () => import("@/pages/User/Shartnoma.vue")
  },
  {
    path: "/user_shablon",
    name: "User Profile Shablon",
    component: () => import("@/pages/User/Shablon1.vue")
  },
  {
    path: "/malumotnoma",
    name: "User Profile Malumotnoma",
    component: () => import("@/pages/User/Malumotnoma.vue")
  },
  {
    path: "/shablon_rus",
    name: "User Profile shablon_rus",
    component: () => import("@/pages/User/Shablon2.vue")
  },
  {
    path: "/shablon_3",
    name: "User Profile shablon_3",
    component: () => import("@/pages/User/Shablon3.vue")
  },
  {
    path: "/shablon_4",
    name: "User Profile shablon_4",
    component: () => import("@/pages/User/Shablon4.vue")
  },
  {
    path: "/userShartnoma",
    name: "User Profile Shartnomalar",
    component: () => import("@/pages/User/shartnomaForm.vue")
  },
  {
    path: "/historyPatient",
    name: "User Profile History",
    component: () => import("@/pages/User/HistoryBemor.vue")
  },
  {
    path: "/user/navbatchek",
    name: "User Navbat Chek",
    component: () => import("@/pages/User/NavbatChek.vue")
  },
  {
    path: "/royhat",
    name: "Royhatlar",
    component: () => import("@/pages/NavbatlarRoyhati/Dashboard.vue")
  },
  {
    path: "/user-tekshiruv",
    name: "UserTekshiruvlar",
    component: () => import("@/pages/User/Tekshiruv.vue")
  },
  {
    path: "/expired-app",
    name: "expired app",
    component: () => import("@/pages/ExpiredApp/Index.vue")
  },
  {
    path: "/permission-user",
    name: "permission user",
    component: () => import("@/pages/Permisson/Index.vue")
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/pages/404.vue")
  }
];
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('token')
//   const role = localStorage.getItem('user').role;
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else {
//     if(role == 'Shifokor' && to.meta.requireAdmin) {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

export default routes;
