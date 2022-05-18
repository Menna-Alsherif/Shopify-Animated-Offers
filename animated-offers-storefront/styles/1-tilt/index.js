export function render(offer, container, appendCSS) {

    const params = offer.params;
    console.log(params);

    const html = `
   
    <div class="content" id="tiltCard">
        <h2 class="name" id="tiltOffer">20% OFF</h2>
        <a href="#" class="buy" id="tiltCTA">Buy Now</a>
        <div class="circle" id="tiltCircle"></div>
        <img src="shoes.png" class="product" id="tiltImage">
    </div>

    `;

    const css = `
    .content {
      position: static;
      width: 300px;
      height: 400px;
      background: #232322;
      border-radius: 20px;
      display: inline-block;
      transform-style: preserve-3d;
      animation: tilt 7s linear infinite;
      background: rgb(146, 148, 156);
      background: radial-gradient(circle, rgba(146, 148, 156, 1) 0%, rgba(62, 83, 162, 0.8519608527004552) 100%);
    
    }
    
          .content:hover {
                
                animation-play-state: paused;
            
            }
    
    
            .content:before {
                position: absolute;
                top: 20px;
                left: 20px;
                font-size: 5em;
                font-weight: 900;
                color: #fff;
                font-style: italic;
                opacity: 0;
                transition: 0.5s;
            }
    
            .content:after {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 4em;
      font-weight: 900;
      color: #fff;
      font-style: italic;
      opacity: 0;
      transition: 0.5s;
    }
    
    
     .content:before,
     .content:after {
      opacity: 0.04;
    }
    
     .content .name {
      position: absolute;
      left: 0;
      text-align: center;
      color: #fff;
      width: 100%;
      transform-style: preserve-3d;
      transform: translate3d(0, 0, 75px);
      transition: 0.5s;
      z-index: 10;
      top: 40px;
      opacity: 1;
      animation: float 1.8s ease-in-out infinite;
      
    
    }
    
    
    
     .content .buy {
      position: absolute;
      left: 50%;
      transform-style: preserve-3d;
      transform: translate3d(-50px, 0, 75px);
      color: #fff;
      background: #333;
      padding: 10px 25px;
      border-radius: 30px;
      text-decoration: none;
      transition: 0.5s;
      z-index: 10;
      bottom: 30px;
      opacity: 1;
    }
    
    
     .content .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      transition: 0.5s;
      background: #fff;
      z-index: 10;
      opacity: 1;
      transform-style: preserve-3d;
      transform: translate3d(-50%, -50%, 50px) rotate(30deg);
    }
    
     .content .product {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 300px;
      transition: 0.5s;
      z-index: 11;
      transform-style: preserve-3d;
      transform: translate3d(-50%, -50%, 100px) rotate(360deg);
    }
    
     .content .circle,
     .content .buy {
      background: #004d99;
      opacity: 0.8;
    }
    
    
    @keyframes tilt {
    
      0% {
          transform: rotateX(20deg) rotateY(-20deg);
      }
    
      10% {
          transform: rotateX(-20deg) rotateY(20deg);
      }
    
      20% {
          transform: rotateX(-20deg) rotateY(20deg);
      }
    
      30% {
          transform: rotateX(0deg) rotateY(20deg);
      }
    
      40% {
          transform: rotateX(0deg) rotateY(0deg);
      }
    
      50% {
          transform: rotateX(0deg) rotateY(-20deg);
      }
    
      60% {
          transform: rotateX(20deg) rotateY(20deg);
      }
    
      70% {
          transform: rotateX(20deg) rotateY(0deg);
      }
    
      80% {
          transform: rotateX(-20deg) rotateY(20deg);
      }
    
      90% {
          transform: rotateX(20deg) rotateY(-20deg);
      }
    
      100% {
          transform: rotateX(20deg) rotateY(-20deg);
      }
    
    }
    
    
    @keyframes float {
      0% {
          letter-spacing: 2px;
      }
    
      50% {
          letter-spacing: 5px;
      }
    
      100% {
          letter-spacing: 2px;
      }
    
    
    }
    
    `;

    appendCSS(css);

    container.innerHTML += html;
  
    console.log(params.colors);

    document.getElementById('tiltOffer').innerText = params.text[0].value;
    document.getElementById('tiltOffer').style.color = params.colors[0].value;
    document.getElementById('tiltCTA').innerText = params.text[1].value;
    document.getElementById('tiltCTA').style.color = params.colors[1].value;
    document.getElementById('tiltCTA').style.background = params.colors[2].value;
    document.getElementById('tiltCircle').style.background = params.colors[3].value;
    document.getElementById('tiltCard').style.background = 'radial-gradient(circle, '+ params.colors[4].value + ' 0%, ' + params.colors[5].value + ' 100%)';

    if (params.images[0])
        document.getElementById('tiltImage').srcset = params.images[0]?.url;

    container.style.display = 'block';
    console.log('finish load idea script')
    return true;

}