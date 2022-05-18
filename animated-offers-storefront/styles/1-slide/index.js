export function render(offer,container, appendCSS) {
 
    const params = offer.params;
   
    const html = `
    <div class="juice">
        <img id="img" src="./images/pepsi.png" alt="">
    </div>

    <div class="sale">
        <button id="button" type="button" class="button">Order Now</button>
    </div>
    `;

    const css = `
    * {
    margin: 0;
    padding: 0;
}

body {
    width: 100%;
    height: 100vh;
    font-family: 'Montserrat';
    font-size: 12px;
    overflow: hidden;
}


.cart{
    position: absolute;
    bottom: 1%;
    left: 50%;
    z-index: 1;
    opacity: 0.85;

}



.sale{
    position: absolute;
    bottom: 50%;
    left: 55%;
    z-index: 1;
    scale: 0.4;
}

.sale button{
    border-radius: 50%;
    background-color: black;
    opacity: 95%;
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    width: 300px;
    height: 300px;
    text-decoration: none;
    display: inline-block;
    font-size: 55px;
    margin: 2px 2px;
    cursor: pointer;
    animation: float 1.8s ease-in-out infinite;
    max-height: 600px;
}

.juice {
    position: absolute;
    top: 55%;
    left: 50%;
    z-index: 1;

}

.juice img {
    animation: float 1.8s ease-in-out infinite;
    max-height: 600px;

}


@keyframes float {
    0% {
        transform: translate(-50%, -46%);
    }
    50% {
        transform: translate(-50%, -54%);
    }
    100% {
        transform: translate(-50%, -46%);
    }
}

    `;

    appendCSS(css);

    container.innerHTML += html;
    document.getElementById('button').innerText = params.text[0].value;
    if (params.images[0])
        document.getElementById('img').srcset = params.images[0]?.url;
    

        gsap.from(".juice", {
            delay: 2, opacity: 0, y: -800, ease: "expo.inout"
        })

        gsap.from(".sale", {
            delay: 2, opacity: 0, y: 800, ease: "expo.inout"
        })

        container.style.display = 'block';

      return true;
}