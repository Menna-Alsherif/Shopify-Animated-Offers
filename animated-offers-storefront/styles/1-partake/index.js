
export function render(offer, container, appendCSS) {
    console.log('start load: partake===========>')
    const params = offer.params;
    console.log(params)

    const html = `<div id="demo">
    <img id="title"
         src="//cdn.shopify.com/s/files/1/0012/2296/7353/files/partake-logo_large.png?v=1600282687" style="width:173px" >

    <div id="freds">
        <img id="img1"

             srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_360x.png?v=1626100904 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_540x.png?v=1626100904 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_720x.png?v=1626100904 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_900x.png?v=1626100904 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1080x.png?v=1626100904 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1296x.png?v=1626100904 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1512x.png?v=1626100904 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1728x.png?v=1626100904 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_2048x.png?v=1626100904 2048w">

        <img id="img2"
             srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_360x.png?v=1621517699 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_540x.png?v=1621517699 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_720x.png?v=1621517699 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_900x.png?v=1621517699 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1080x.png?v=1621517699 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1296x.png?v=1621517699 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1512x.png?v=1621517699 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1728x.png?v=1621517699 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_2048x.png?v=1621517699 2048w">


        <img id="img3"
             srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_360x.png?v=1621518257 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_540x.png?v=1621518257 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_720x.png?v=1621518257 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_900x.png?v=1621518257 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_1080x.png?v=1621518257 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_1296x.png?v=1621518257 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_1512x.png?v=1621518257 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_1728x.png?v=1621518257 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/partake_Softbaked_Double_chocolate_chip_cookies_2048x.png?v=1621518257 2048w">


        <img id="img4"
             srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_360x.png?v=1600137441 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_540x.png?v=1600137441 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_720x.png?v=1600137441 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_900x.png?v=1600137441 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_1080x.png?v=1600137441 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_1296x.png?v=1600137441 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_1512x.png?v=1600137441 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_1728x.png?v=1600137441 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/KEP_5944copy_2048x.png?v=1600137441 2048w">

    </div>
    <div id="time" class="btn-holder">
        <a id="ctaText" href="/collections" class="btn btn-primary navigable" data-open-accessibility-text-original="14px"
           style="font-size: 14px;">Shop Now</a>
    </div>
</div>`;
    const css =`
     #demo {
            overflow: hidden;
            position: relative;
            width: 800px;
            height: 410px;
            /*border: 1px solid #333;*/
            background-color: #fff
            /*   background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/space-background.png); */

        }

        #title {
            position: absolute;
            top: 80px;
            left: 300px;
        }

        #freds {
            position: absolute;
            top: 230px;
            left: 18px;
            /*border: solid 1px red;*/
        }

        #freds img {
            width: 190px;
        }

        .btn-primary {
            font-weight: 700;
            color: #fff;
            background: #007367;
            padding: 15px;
            outline: 0;
            border: 1px solid #007367;
            letter-spacing: 1.8px;
            min-width: 245px;
            font-size: 17px;
        }


        #time {
            position: absolute;
            top: 25px;
            right: 0;
        }
    `;

    appendCSS(css);

    container.innerHTML += html;

    document.getElementById('ctaText').innerText = params.text[0].value;
    if (params.images[0])
        document.getElementById('img1').srcset = params.images[0]?.url;
    if (params.images[1])
        document.getElementById('img2').srcset = params.images[1]?.url;
    if (params.images[2])
        document.getElementById('img3').srcset = params.images[2]?.url;
    if (params.images[3])
        document.getElementById('img4').srcset = params.images[3]?.url;


    gsap.timeline()
        .from("#demo", {autoAlpha: 0})
        .from("#title", {opacity: 0, duration: 2, scale: 1, ease: "back"})
        .from("#freds img", {y: 170, stagger: 0.1, duration: 0.8, ease: "back"})
        .from("#time", {xPercent: 100, duration: 0.2})



    // container.style.display = 'block';
    // console.log('finish load idea script')
    return true;
}
