const getPageInfo = (page) => {
  switch (true) {
    case page === "/dashboard":
      return 1;

    /************************************/

    case page === "/sales/create":
      return 2;

    case page === "/sales/all":
      return 3;

    case page.includes("/sales/detail"):
      return 4;

    case page === "/sales/due/all":
      return 5;

    /************************************/

    case page === "/order/create":
      return 6;

    case page === "/order/all":
      return 7;

    case page.includes("/order/detail"):
      return 8;

    case page === "/order/due/all":
      return 9;

    /************************************/

    case page === "/product/create":
      return 10;

    case page === "/product/all":
      return 11;

    case page.includes("/product/detail"):
      return 12;

    case page === "/product/move":
      return 13;

    case page === "/product/move/history":
      return 14;

    /************************************/

    case page === "/warehouse/all":
      return 15;

    case page.includes("/warehouse/detail"):
      return;

    /************************************/

    case page === "/user/create":
      return 17;

    case page === "/user/detail":
      return 18;

    case page === "/user/all/customer":
      return 19;

    case page === "/user/all/vendor":
      return 20;

    case page === "/user/all/manager":
      return 21;

    case page === "/user/all/salesman":
      return 22;

    case page === "/user/all/expense":
      return 23;

    case page === "/user/contactcreate":
      return 26;

    case page === "/user/profile":
      return 27;

    /************************************/

    case page === "/reports/purchase":
      return 24;

    case page === "/reports/selling":
      return 25;

    default:
      break;
  }
};

export default getPageInfo;
