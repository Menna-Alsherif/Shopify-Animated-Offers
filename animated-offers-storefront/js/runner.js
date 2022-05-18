console.log('offers manager start loading..')
import { getParams } from './util.js'
import OfferManager from './offer-manager.js'

// 1- get storeURl
const storeUrl = getParams('runner').storeUrl
console.log('store: ' + storeUrl);

// 2- instantiate
const manager = new OfferManager(storeUrl);

// 3- execute
manager.showOffers();





