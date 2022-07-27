const Host = {
  ROOT: "http://localhost:3001",
  PREFIX: "/v1/api",
  //FRONTEND: "https://www.milo-jbilu.xyz",
  FRONTEND: "https://cheap-shop.net",
}
  
const ApiEndpoints = {  
  UserEndpoints: {
    route: `${Host.PREFIX}/user`,
    list: `/list`,
    login: `/login`, 
    signup: `/signup`,  
    edit: `/edit/:id`,
    activate: `/activate/:id`, 
    address: `/address/:id`,
    image: `/image/:id`,
    create: `/create`,
    suspension: `/suspension/:id`,
    forgotPassword: `/forgot-password`,
    resetPassword: `/reset-password/:id`,
    confirmEmail: `/confirm-email/:id`,
    me: `/me`,
    count: `/count`,
    rule: `/rule/:id`,
  },

  AdminEndpoints: {
    route: `${Host.PREFIX}/admin`,
    login: `/login`
    },
  ProductsEndpoints: {
    route: `${Host.PREFIX}/products`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    review: `/review/:id`,
    distinct: `/distinct`,
    count: `/count`,
    views: `/views/:id`,
    aliexpress: `/aliexpress/:id`,
  },
  OrdersEndpoints: {
    route: `${Host.PREFIX}/orders`,
    list: `/list`,
    calculate: `/calculate`,
    create: `/create`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    status: `/status`,
    tracking: `/tracking`, 
    count: `/count`,
  },
  ChatEndpoints: { 
    route: `${Host.PREFIX}/chat`, 
    getFriends: `/get-friends`, 
    getMessage: `/get-message/:p/:id`, 
    sendMessage: `/send-message`, 
    imageMessageSend: `/image-message-send`, 
    seenMessage: `/seen-message`,  
    delivaredMessage: `/delivared-message`
  },

  FileEndpoints: {
    route: `${Host.PREFIX}/file`,
    getSingleFileView: `/get-single-file/:id/view`,
    getSingleFileDownload: `/get-single-file/:id/download`,
    createSingleFile: `/create-single-file`,
    createMultipleFile: `/create-multiple-file`, 
  }, 
 
  
  wishlistEndpoints: {
    route: `${Host.PREFIX}/wishlist`,
    list: `/list`,
    create: `/create`,
    delete: `/delete/:id`,
    count: `/count`,
  },
  MainEndpoints: {
    route: `${Host.PREFIX}/main`,
    list: `/list`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    count: `/count`,

  },
  SubscribeEndpoints: {
    route: `${Host.PREFIX}/subscribe`,
    list: `/list`,
    create: `/create`,
    count: `/count`,

  },
  ContactEndpoints: {
    route: `${Host.PREFIX}/contact`,
    list: `/list`,
    create: `/create` ,
    count: `/count`,

  },

  
  CatyEndpoints: {
    route: `${Host.PREFIX}/caty`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    count: `/count`,
  },

};

module.exports = {ApiEndpoints , Host}