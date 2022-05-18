import { postData, getData, renderScript, renderElement, isArrayIncludeKey, appendCSS } from './util.js'
// import config from './config.js'
import { renderStyle } from './util.js'

// reading from start.js
const config = window.animatedOffersConfig;

export default class OfferManager {

    storeUrl = '';
    offer = {};
    constructor(storeUrl) {
        this.storeUrl = storeUrl;
    }

    async getOffers() {
        let offers = null;
        const url = `${config.apiBaseUrl}/get-shop-offers?shop=${this.storeUrl}`;
        const resp = await fetch(url)
        offers = await resp.json();
        console.log({offers})
        return offers;
    }

    renderContainer() {
        const container = renderElement('div', 'container', 'container', '');
        const close = renderElement('div', '', 'close', '', container);


        close.onclick = () => {
            container.remove();
            console.log('123')
        }
        return container;
    }

    addOrUpdateShowCookie(offer, showTimes) {
        document.cookie = `offer-${offer._id}=${showTimes}`;
    }

    getShowTimes(offer) {
        const cookie = document.cookie;
        let count = 0;
        if (cookie) {
            cookie.split(';').forEach(c => {
                if (c.includes(`offer-${offer._id}`)) {
                    count = parseInt(c.split('=')[1]);
                }
            });
        }
        return count;
    }

    async showOffers() {
        const offers = await this.getOffers();

        if (offers.length > 0) {
            await this.renderLibAndContainer();

            // 4- render selected offers with logic
            for (const offer of offers) {

                if (offer.catId===1) {
                    //if (offer.events.includes('exit_intent')) {
                    if(isArrayIncludeKey(offer.triggers,'type', 'exit_intent')){
                        this.showExitOffer(offer); // no await
                    }

                    if (isArrayIncludeKey(offer.triggers,'type', 'new_visitor')) {
                        this.showStoreVisitOffer(offer); // no await
                    }

                    if (isArrayIncludeKey(offer.triggers,'type', 'page_visit')) {
                        this.showPageVisitOffer(offer); // no await
                    }

                    if (isArrayIncludeKey(offer.triggers,'type', 'inactive_cart')) {
                        this.showInactiveCartOffer(offer); // no await
                    }

                    if (isArrayIncludeKey(offer.triggers,'type', 'abandoned_checkout')) {
                        this.showAbandonedCheckoutOffer(offer); // no await
                    }

                }
                // switch (offer.events) {
                //     case 'exit':
                //         this.showExitOffer(offer); // no await
                //         break;
                //     case 'store_visit':
                //         this.showStoreVisitOffer(offer);
                //         break;
                //     case 'page_visit':
                //         this.showPageVisitOffer(offer);
                //         break;
                //     case 'inactive_cart':
                //         this.showInactiveCartOffer(offer);
                //         break;
                //     case 'abandoned_checkout':
                //         this.showAbandonedCheckoutOffer(offer);
                //         break;
                //     case 'post_purchase':
                //         this.showPostPurchaseOffer(offer);
                //         break;
                //
                // }
            }
        }
    }

    async renderLibAndContainer() {
        renderStyle(`${config.rootUrl}/css/offers.css`); // base style
        const lottieScript = renderScript(config.lottieUrl);
        const gsapScript = renderScript(config.gsapUrl);
        const container = this.renderContainer();
    }

    async showExitOffer(offer) {
        // this.offer = offer;
        const scriptModule = await import(`${config.rootUrl}${offer.template.scriptPath}`);

        // validate show requirements if present in the offer
        const showTimes = this.getShowTimes(offer);
        console.log('show times: ' + showTimes);

        // TODO: add showtime param to popup offer creation screen
        //if (showTimes < offer.behavior.showTimes) {
            // render
            const mouseEvent = e => {
                if (!e.toElement && !e.relatedTarget) {
                    document.removeEventListener('mouseout', mouseEvent);
                    const assetUrl = config.rootUrl + offer.template.templatePath;
                    scriptModule.render(container, assetUrl, offer.params);
                }
            };
            document.addEventListener('mouseout', mouseEvent);

            // show x times
            this.addOrUpdateShowCookie(offer, showTimes + 1)
        //}
        // if (offer.behavior.showTimes) {
        // }
        // else {
        //     // no showTimes requirements, just render
        //     //this.renderOffer();
        // }

    }

    async showStoreVisitOffer(offer) {

        console.log('showStoreVisitOffer started');

        // this.offer = offer;
        const scriptModule = await import(`${config.rootUrl}${offer.template.path}/index.js`);

        // validate show requirements if present in the offer
        // const showTimes = this.getShowTimes(offer);
        // console.log('show times: ' + showTimes);

        // if (showTimes < offer.behavior.showTimes) {
            // render

            scriptModule.render(offer, container,appendCSS);

            // show x times
            //this.addOrUpdateShowCookie(offer, showTimes + 1)
        // }
    }


    async showPageVisitOffer(offer) {


        // this.offer = offer;
        const scriptModule = await import(`${config.rootUrl}${offer.scriptPath}`);

        // validate show requirements if present in the offer
        const showTimes = this.getShowTimes(offer);
        console.log('show times: ' + showTimes);

        if (showTimes < offer.behavior.showTimes) {

            if (window.location.href.includes(offer.behavior.targetUrl)) {
                // render
                const assetUrl = config.rootUrl + offer.templatePath;
                scriptModule.render(container, assetUrl, offer.templateParams);
            }
            // show x times
            this.addOrUpdateShowCookie(offer, showTimes + 1)
        }
    }

    async getCart() {
        let cart = {};
        // TODO: replace with fetch
        await getData('/cart.js', 'x-cartjs-updatedat').then(data => {
            // console.log('data from get cart 111:');
            // console.log(data.respHeader);
            cart = data;
        });
        return cart;
    }

    async cartIsInactive(offer) {
        let cart = await this.getCart();
        if (cart.item_count > 0) {
            const lastUpdated = new Date(parseFloat(cart.respHeader * 1000));
            const differenceSinceCartLastUpdated = Math.abs((new Date() - lastUpdated) / 1000);

            console.log('time since last updated in seconds');
            console.log(differenceSinceCartLastUpdated);

            if (differenceSinceCartLastUpdated >= offer.behavior.inactiveCartDurationInSeconds) {
                return true;
            }
        }
        return false;
    }

    async cartIsAbandoned() {
        let isAbandoned = false;
        const cart = await this.getCart();

        if (cart.item_count > 0) {
            const url = `${config.apiBaseUrl}/cart-is-abandoned`;
            // TODO: replace with fetch
            await postData(url, { cartToken: cart.token, storeUrl: this.storeUrl }).then(data => {
                console.log('/cart-is-abandoned:');
                console.log(data);
                isAbandoned = data.status;
            });
        }

        return isAbandoned;
    }


    async showInactiveCartOffer(offer) {
        // validate show requirements if present in the offer
        const showTimes = this.getShowTimes(offer);
        console.log('show times: ' + showTimes);

        //if (showTimes < offer.behavior.showTimes) {

        const scriptModule = await import(`${config.rootUrl}${offer.scriptPath}`);
        const assetUrl = config.rootUrl + offer.templatePath;

        let showOffer = await this.cartIsInactive(offer);

        if (showOffer) {
            scriptModule.render(container, assetUrl, offer.templateParams);
            this.addOrUpdateShowCookie(offer, showTimes + 1)
        } else {
            let interval = setInterval(async () => {
                showOffer = await this.cartIsInactive(offer);

                if (showOffer) {
                    scriptModule.render(container, assetUrl, offer.templateParams);
                    this.addOrUpdateShowCookie(offer, showTimes + 1)
                    window.clearInterval(interval); // stop counting for this page load
                }

            }, offer.behavior.inactiveNumOfSeconds * 1000);
        }
        //}
    }

    async showAbandonedCheckoutOffer(offer) {
        const showTimes = this.getShowTimes(offer);
        console.log('show times: ' + showTimes);

        if (showTimes < offer.behavior.showTimes) {

            const scriptModule = await import(`${config.rootUrl}${offer.scriptPath}`);
            const assetUrl = config.rootUrl + offer.templatePath;

            let showOffer = await this.cartIsAbandoned();

            if (showOffer) {
                scriptModule.render(container, assetUrl, offer.templateParams);
                this.addOrUpdateShowCookie(offer, showTimes + 1)
            }
        }
    }

    async showPostPurchaseOffer(offer) {
        const scriptModule = await import(`${config.rootUrl}${offer.scriptPath}`);

        console.log('post purchase');

        // validate show requirements if present in the offer
        const showTimes = this.getShowTimes(offer);
        console.log('show times: ' + showTimes);

        if (showTimes < offer.behavior.showTimes) {

            if (window.location.href.includes('/checkouts/')) {
                // render
                const assetUrl = config.rootUrl + offer.templatePath;
                scriptModule.render(container, assetUrl, offer.templateParams);

                // show x times
                this.addOrUpdateShowCookie(offer, showTimes + 1)
            }
        }
    }


}
