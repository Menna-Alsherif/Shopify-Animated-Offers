export function render(container, offerBaseUrl, params) {
    console.log('start load: 1-idea')
    console.log(params)

    function getTextValue(key) {
        for (const elm of params.text) {
            if (elm.key === key) {
                return elm.value
            }
        }
    }

    fetch(`${offerBaseUrl}/idea.json`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            data.layers.forEach(layer => {
                if (layer.nm === 'promoText') {
                    layer.t.d.k[0].s.t = getTextValue('promoText1') + '\r' + getTextValue('promoText2')
                }
            });

            if (Object.keys(params.images).length > 0) {
                for (let i = 0; i < data.assets.length; i++) {

                    if (data.assets[i].u === 'images/') {

                        if (params.images[i]) {
                            const {url} = params.images[i];
                            const fileName = url.substring(url.lastIndexOf('/') + 1);
                            const path = url.replace(fileName, '');
                            data.assets[i].u = path;
                            data.assets[i].p = fileName;
                        }

                    }
                }
            }
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

            console.log('finish load idea script')
        })
    return true;
}