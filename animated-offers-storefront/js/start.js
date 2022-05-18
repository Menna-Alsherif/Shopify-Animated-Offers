
// const rootUrl ='http://localhost:8000'
// const rootUrl =  'https://js.ahmed.wiki'
// const rootUrl = 'https://animated-offers-storefront.netlify.app'

let rootUrl = '';
let apiBaseUrl = '';
console.log('begin start script .... ')

const allScripts = document.getElementsByTagName('script');
for (const script of allScripts)
{
    if (script.src.includes('start.js'))
    {
        // console.log(script.src)
        rootUrl = script.src.split('?')[0].replace('/js/start.js','');
        console.log({rootUrl});
        apiBaseUrl = script.src.split('api_url=')[1].split('&')[0]
    }
}

//apiBaseUrl: 'https://bb136862cb49.ngrok.io/api/rest/public',

window.animatedOffersConfig = {
    rootUrl,
    apiBaseUrl,
    lottieUrl: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.12/lottie.min.js',
    gsapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.3/gsap.min.js'
}

console.log(window.animatedOffersConfig)

function getParams(script_name) {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf("/" + script_name) > -1) {
            var pa = scripts[i].src.split("?").pop().split("&");
            var p = {};
            for (var j = 0; j < pa.length; j++) {
                var kv = pa[j].split("=");
                p[kv[0]] = kv[1];
            }
            return p;
        }
    }
    return {};
}



// get shop  => sent by Shopify
const shop = getParams('start.js').shop


const script = document.createElement("script");
script.type = 'module';
script.src = `${rootUrl}/js/runner.js?storeUrl=${shop}`;



document.body.append(script);



