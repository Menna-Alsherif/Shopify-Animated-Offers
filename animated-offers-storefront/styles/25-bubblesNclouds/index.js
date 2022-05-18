
export function render(offer, container, appendCSS) {
    console.log('start load: bubblesNclouds===========>')
    const params = offer.params;
    console.log(params)

    const html = `<div id="demo">
    <div id="main">
          <h1 id="ctaText1">Buy One</h1>
        <h2 id="ctaText2">Get One free</h2>
        <!--   <p>Learn how to find inspiration in the things you love. </p> -->
        <button id="ctaText3" class="myButton">Order</button>
    </div>
    </div>


    <div id="svgs">
        <!-- Generator: Adobe Illustrator 23.0.4, SVG Export Plug-In  -->

        <!--  MY SVG    -->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mysvgclouds" x="0px" y="0px" viewBox="0 0 750 500" enable-background="new 0 0 750 500" xml:space="preserve">
<g id="clouds">
\t<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="221.6613" y1="466.9291" x2="732.2383" y2="466.9291">
\t\t<stop offset="0" style="stop-color:#D1D5DE"/>
        <stop offset="1" style="stop-color:#DBDBDB"/>
\t</linearGradient>
    <path opacity="0.2" fill="url(#SVGID_1_)" d="M682.48,545.29c-7.53-21.62-5.46-45.36-1.48-67.9c3.98-22.55,9.8-45,9.5-67.9   c-0.5-37.39-18.42-74.23-47.68-97.51C613.56,288.7,573.5,279.53,537.08,288c-23.03,5.36-44.68,17.34-68.31,18.31   c-24.26,1-47.31-9.72-71.19-14.1c-56.7-10.41-117.47,18.12-149.2,66.25c-31.73,48.13-34.74,112.69-11.52,165.46   s70.82,93.23,125.34,111.98c54.51,18.74,115.18,16.57,169.87-1.66c26.82-8.94,52.35-21.59,79.54-29.3   c27.2-7.71,57.23-10.12,83.08,1.32l37.54-19.83C709.35,585.81,690.02,566.91,682.48,545.29z"/>
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="-227.9816" y1="595.418" x2="282.5954" y2="595.418">
\t\t<stop offset="0" style="stop-color:#D1D5DE"/>
        <stop offset="1" style="stop-color:#DBDBDB"/>
\t</linearGradient>
    <path opacity="0.2" fill="url(#SVGID_2_)" d="M232.84,673.78c-7.54-21.62-5.46-45.36-1.48-67.9c3.98-22.55,9.8-45,9.5-67.9   c-0.5-37.39-18.42-74.23-47.68-97.51c-29.26-23.28-69.32-32.45-105.74-23.98c-23.03,5.36-44.68,17.34-68.31,18.31   c-24.26,1-47.31-9.72-71.19-14.1c-56.7-10.41-117.47,18.12-149.2,66.25c-31.73,48.13-34.74,112.69-11.52,165.46   c23.22,52.76,70.82,93.23,125.34,111.98c54.51,18.74,115.18,16.57,169.87-1.66c26.82-8.94,52.35-21.59,79.54-29.3   c27.2-7.71,57.23-10.12,83.08,1.32l37.54-19.83C259.71,714.3,240.37,695.4,232.84,673.78z"/>
    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="391.9715" y1="-86.7707" x2="902.5485" y2="-86.7707">
\t\t<stop offset="0" style="stop-color:#D1D5DE"/>
        <stop offset="1" style="stop-color:#DBDBDB"/>
\t</linearGradient>
    <path opacity="0.2" fill="url(#SVGID_3_)" d="M852.79-8.4c-7.54-21.62-5.46-45.36-1.48-67.9c3.98-22.55,9.8-45,9.5-67.9   c-0.5-37.39-18.42-74.23-47.68-97.51s-69.32-32.45-105.74-23.98c-23.03,5.36-44.68,17.34-68.31,18.31   c-24.26,1-47.31-9.72-71.19-14.1c-56.7-10.41-117.47,18.12-149.2,66.25c-31.73,48.13-34.74,112.69-11.52,165.46   C430.4,22.98,478,63.45,532.51,82.19c54.51,18.74,115.18,16.57,169.87-1.66c26.82-8.94,52.35-21.59,79.54-29.3   c27.2-7.71,57.23-10.12,83.08,1.32l37.54-19.83C879.66,32.11,860.33,13.21,852.79-8.4z"/>
    <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="161.33" y1="429.0495" x2="647.26" y2="429.0495">
\t\t<stop offset="0" style="stop-color:#D1D5DE"/>
        <stop offset="1" style="stop-color:#DBDBDB"/>
\t</linearGradient>
    <path fill="url(#SVGID_4_)" d="M647.26,500.01H161.33c1.46-13.7,4.91-27.24,9.92-40.06c11.72-29.92,35.16-58.44,66.97-62.98   c13.72-1.96,27.2,0.7,40.25,5.54c18.7,6.93,39.65,1.28,52.48-13.99c9.06-10.77,20.71-19.39,33.8-24.57   c24.24-9.61,52.9-7.26,75.25,6.15c6.63,3.98,12.71,8.85,18.58,14.03c16.7,14.72,31.71,31.94,52.74,38.34   c21.87,6.64,45.77-0.03,68.18,4.45c32.85,6.57,56.99,36.54,66.53,68.65C646.47,497.04,646.88,498.52,647.26,500.01z"/>
    <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="0" y1="95.2595" x2="495.82" y2="95.2595">
\t\t<stop offset="0" style="stop-color:#D1D5DE"/>
        <stop offset="1" style="stop-color:#DBDBDB"/>
\t</linearGradient>
    <path opacity="0.2" fill="url(#SVGID_5_)" d="M495.82,0c-4.25,25.2-14.46,49.39-30.15,69.59c-30.96,39.84-82.29,62.95-132.64,59.7   c-5.35-0.34-10.74-0.95-16.15-1.68c-28.28-3.79-57.1-10.7-82.47,1.11c-21.54,10.03-35.31,31.55-54.75,45.2   c-25.43,17.86-59.66,20.78-89.24,11.25c-29.57-9.53-54.63-30.45-72.94-55.56C11.15,120.93,5.55,111.74,0,102.5V0H495.82z"/>
</g>
            <g id= "bubbles">
<ellipse transform="matrix(0.2206 -0.9754 0.9754 0.2206 -11.3951 227.5869)" fill="#FFFFFF" cx="136.7" cy="120.92" rx="34.08" ry="34.08"/>

                <ellipse transform="matrix(0.7489 -0.6627 0.6627 0.7489 -119.5754 454.9709)" fill="#FFFFFF" cx="540.54" cy="385.26" rx="11.7" ry="11.7"/>

                <ellipse transform="matrix(0.7489 -0.6627 0.6627 0.7489 -158.3114 127.9753)" fill="#FFFFFF" cx="89.71" cy="272.88" rx="11.7" ry="11.7"/>

                <ellipse transform="matrix(0.7729 -0.6345 0.6345 0.7729 62.7665 462.0789)" fill="#FFFFFF" cx="676.94" cy="143.35" rx="21.46" ry="21.46"/>

                <ellipse transform="matrix(0.7729 -0.6345 0.6345 0.7729 -231.185 231.2599)" fill="#FFFFFF" cx="207.49" cy="438.61" rx="21.46" ry="21.46"/>
</g>
</svg>


    </div>



    <img id="image2" class="img-fluid center-block lazyautosizes lazyloaded" alt="partake soft baked birthday cake cookies" data-widths="[360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.0" data-sizes="auto" data-image="" data-srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_360x.png?v=1621517699 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_540x.png?v=1621517699 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_720x.png?v=1621517699 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_900x.png?v=1621517699 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1080x.png?v=1621517699 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1296x.png?v=1621517699 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1512x.png?v=1621517699 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1728x.png?v=1621517699 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_2048x.png?v=1621517699 2048w" sizes="210px" srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_360x.png?v=1621517699 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_540x.png?v=1621517699 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_720x.png?v=1621517699 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_900x.png?v=1621517699 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1080x.png?v=1621517699 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1296x.png?v=1621517699 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1512x.png?v=1621517699 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_1728x.png?v=1621517699 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/Softbakedbirthdaycake_2048x.png?v=1621517699 2048w">

    <img id="image1" class="img-fluid center-block lazyautosizes lazyloaded" alt="Soft Baked Ginger Snap cookies" data-widths="[360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.0" data-sizes="auto" data-image="" data-srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_360x.png?v=1626100904 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_540x.png?v=1626100904 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_720x.png?v=1626100904 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_900x.png?v=1626100904 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1080x.png?v=1626100904 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1296x.png?v=1626100904 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1512x.png?v=1626100904 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1728x.png?v=1626100904 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_2048x.png?v=1626100904 2048w" sizes="210px" srcset="//cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_360x.png?v=1626100904 360w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_540x.png?v=1626100904 540w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_720x.png?v=1626100904 720w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_900x.png?v=1626100904 900w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1080x.png?v=1626100904 1080w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1296x.png?v=1626100904 1296w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1512x.png?v=1626100904 1512w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_1728x.png?v=1626100904 1728w, //cdn.shopify.com/s/files/1/0012/2296/7353/products/SBGingerEcomImage_2048x.png?v=1626100904 2048w">




</div>`;
    const css =`
     body {
            font-family: 'Kanit', sans-serif;
            background:#252525;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        #demo {
            overflow:hidden;
            position:relative;
            width:621px;
            height:385px;
            border:1px solid #333;
            background:url(https://sandysameh.github.io/images/background.png);
        }

        #main {
            position:absolute;
            width:250px;
            top:160px;
            left:250px;
        }

        h1{
            font-size:30px;
            font-weight:400;
        }

        h2{
            font-size:20px;
            font-weight:200;
            margin-top:10px;
            margin-left:5px
        }
        /*
        p {
          font-weight:200;
          margin-top:14px;
          font-size:16px;
          line-height:20px;
        }
         */
        #svgs {
            /*   position:absolute; */
            left:375px;
            top:80px;
        }


        #image2 {
            position:absolute;
            top:120px;
            left:50px;
        }
        #image1 {
            position:absolute;
            top:120px;
            left:50px;
        }

        /* #freds img {
          width:190px;
        } */


        .myButton {
            margin-top:20px;
            margin-left:12px;
            -moz-box-shadow:inset 0px 1px 0px 0px #fbafe3;
            -webkit-box-shadow:inset 0px 1px 0px 0px #fbafe3;
            box-shadow:inset 0px 1px 0px 0px #fbafe3;
            background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ff905c), color-stop(1, #ef027d));
            background:-moz-linear-gradient(top, #ff905c 5%, #ef027d 100%);
            background:-webkit-linear-gradient(top, #ff905c 5%, #ef027d 100%);
            background:-o-linear-gradient(top, #ff905c 5%, #ef027d 100%);
            background:-ms-linear-gradient(top, #ff905c 5%, #ef027d 100%);
            background:linear-gradient(to bottom, #ff905c 5%, #ef027d 100%);
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff905c', endColorstr='#ef027d',GradientType=0);
            background-color:#ff905c;
            -moz-border-radius:17px;
            -webkit-border-radius:17px;
            border-radius:17px;
            border:1px solid #ee1eb5;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:15px;
            font-weight:bold;
            padding:6px 24px;
            text-decoration:none;
            text-shadow:0px 1px 0px #c70067;
        }
        .myButton:hover {
            background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ef027d), color-stop(1, #ff905c));
            background:-moz-linear-gradient(top, #ef027d 5%, #ff905c 100%);
            background:-webkit-linear-gradient(top, #ef027d 5%, #ff905c 100%);
            background:-o-linear-gradient(top, #ef027d 5%, #ff905c 100%);
            background:-ms-linear-gradient(top, #ef027d 5%, #ff905c 100%);
            background:linear-gradient(to bottom, #ef027d 5%, #ff905c 100%);
        }

        .myButton:active {
            position:relative;

        }
    `;

    appendCSS(css);

    container.innerHTML += html;


        document.getElementById('ctaText1').innerText = params.text[0].value;

        document.getElementById('ctaText2').innerText = params.text[1].value;

        document.getElementById('ctaText3').innerText = params.text[2].value;


    if (params.images[0])
        document.getElementById('image1').srcset = params.images[0]?.url;
    if (params.images[1])
        document.getElementById('image2').srcset = params.images[1]?.url;


    var tl=gsap.timeline();
    tl.from("#demo",{opacity:0,duration:1})
        .from("#bubbles ellipse",{duration:3,stagger:0.3,ease:"elastic.out(1,0.3)",y:0.6,yoyo:true,repeat:-1})
        .from("#clouds",{yoyo:true,repeat:-1,opacity:0.2,duration:2},"<0.2")
        .from("#image1",{opacity:0,duration:10,ease: "elastic.out(2,0.1)",x:50},"<0.5")
        .fromTo("#image2",{opacity:0,duration:5,ease: "elastic.out(1,0.4)"},{opacity:1,duration:5,ease: "elastic.out(1,0.4)",x:320},"<2")
        .from("h1",{xPercent:-100,opacity:0,scale:2},"<1")
        .from("h2",{xPercent:100,opacity:0,scale:2},"<0.3")
        .from("button",{opacity:0,scale:2,ease:"back",y:2},"<0.2")




    // container.style.display = 'block';
    console.log('finish load idea script')
    return true;
}
