export function render(offer, container, appendCSS) {
  console.log("start load: banner temp 1 ===========>");
  const params = offer.params;
  console.log(params);

  const html = `
  <div id="demo">
  <div class="banner1">
      <a class="aStyle" id="text1" href="#">
          FREE Shipping over $35 in the US
      </a>
  </div>
  <div class="banner2">
      <a class="aStyle" id="text2" href="#">
          New Subscribers get 10% off!
      </a>
  </div>
</div>
    `;

  const css = `

    .aStyle {
        color: white;
        text-align: center;
        text-decoration: none;
        height: 100%;
        text-shadow: 1px 1px 2px black, 0 0 10px white;
        font-weight: bold;
    }

    .banner1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .banner2 {
        opacity: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    #demo {
        font-color: white;
        font-family: 'Kanit', sans-serif;
        height: 8vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        text-align: center;
        overflow: hidden;
        position: relative;
        width: 100%;
        background-image: url(https://media.istockphoto.com/photos/space-background-wiht-stars-stock-image-picture-id1287901429?b=1&k=20&m=1287901429&s=170667a&w=0&h=RH6-KPEq-WYftCxoKnQixr8SOwyHlWr8F8EfloDmTxg=);
    }

    `;

  appendCSS(css);

  container.innerHTML += html;

  document.getElementById("text1").innerText = params.text[0].value;
  document.getElementById("text2").innerText = params.text[1].value;
  document.getElementById("text1").style.color = params.colors[0].value;
  document.getElementById("text2").style.color = params.colors[1].value;

  if (params.images[0])
    document.getElementById("demo").style.backgroundImage =
      "url('" + params.images[0]?.url + "')";

  var tl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });
  tl.to(".banner1", { x: 30, duration: 3, yoyo: true, repeat: 3 });
  tl.to(".banner1", { opacity: 0, duration: 1 });
  tl.to(".banner2", { opacity: 1, duration: 1 });
  tl.to(".banner2", { x: 30, duration: 3, yoyo: true, repeat: 3 });
  tl.to(".banner2", { opacity: 0, duration: 1 });
  tl.to(".banner1", { opacity: 1, duration: 1 });
  container.style.display = "block";
  return true;
}
