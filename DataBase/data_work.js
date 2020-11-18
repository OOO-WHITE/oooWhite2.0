const admin = require('firebase-admin');
var serviceAccount = require('./FireBaseInfo.json');
var db = null
/*admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://dron-5e28f.firebaseio.com"
 })*/

function test() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://dron-5e28f.firebaseio.com"
      })
      db = admin.firestore();
    console.log(`Все работает`);
}
// Create order
function create_order(mail, tel, dron, order) {
    const docRef = db.collection('order_data').doc(order).set({
        Client_e_mail: mail,
        Client_tel: tel,
        Client_dron: dron,
        Client_order: order
    });
    console.log(`Oreder has been created`);
}
// Create user
function create_user(name_input, login_input, password_input, role_input) {
    const docRef = db.collection('user').doc(login_input).set({
        Name: name_input,
        Login: login_input,
        Password: password_input,
        Role: role_input
    });
}
// Dron info upload
function dron_data(a, b, c) {
    const docRef = db.collection('drons_data').doc('F-1').set({
        par1: a,
        par2: b,
        par3: c,
        ID: 'F-1'
    });
}
//Get order_information
async function order_info(orderID) {
    const doc = await db.collection('order_data').doc(orderID).get();
    console.log('function order_info from data_work')
    //console.log((doc || {}).data());
    data = {
        Client_e_mail: ((doc || {}).data() || {}).Client_e_mail,
        Client_tel: ((doc || {}).data() || {}).Client_tel,
        Client_dron: ((doc || {}).data() || {}).Client_dron,
        Client_order: ((doc || {}).data() || {}).Client_order
    };
    return data;
}
// get user info
async function user_info(login) {
    console.log(login);
    const doc = await db.collection('user').doc(login).get();
    console.log('function user_info from data_work');
    data = {
        Name: ((doc || {}).data() || {}).Name,
        Login: ((doc || {}).data() || {}).Login,
        Password: ((doc || {}).data() || {}).Password,
        Role: ((doc || {}).data() || {}).Role
    };
    return data;
}
// get dron info
async function dron_info(ID) {
    console.log(ID);
    const doc = await db.collection('drons_data').doc(ID).get();
    console.log('function dron_info from data_work');
    data = {
        par1: ((doc || {}).data() || {}).par1,
        par2: ((doc || {}).data() || {}).par2,
        par3: ((doc || {}).data() || {}).par3,
    };
    return data;
}

function dbGet() {
    return new Promise(function(resolve, reject) {
        try {
            resolve(db.collection('order_data').doc('AA').get())
        } catch(err) {
            reject(err);
        }
      });
}

module.exports = {
    tes:test,
    create_order:create_order,
    create_user:create_user,
    order_info:order_info,
    user_info:user_info,
    dron_data:dron_data,
    dron_info:dron_info
}