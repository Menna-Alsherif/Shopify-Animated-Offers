export function render(container, offerBaseUrl, params) {

    console.log('start load: style 2')

    fetch(`${offerBaseUrl}/promo03.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.layers.forEach(layer => {
                if (layer.nm === 'promoText') {
                    layer.t.d.k[0].s.t = params.promoText
                }
            });

            data.assets.forEach(asset => {
                if (asset.u === 'images/') {
                    asset.u = `${offerBaseUrl}/${asset.u}`
                }
            });

            // const container = document.getElementById("container");
            // container.classList.remove("invisible");
            // container.classList.add("opacity-100");
            // container.classList.remove("opacity-0");

            //const element = document.getElementById('animation');
            lottie.loadAnimation({
                container,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: data
            });

            if (params.targetUrl) {
                const animation = container.childNodes[1];
                animation.style.cursor = 'pointer'
                animation.onclick = () => {
                    window.location.href = params.targetUrl
                }
            }

            container.style.display = 'block';

        })
    return true;
}