export function render(offer, container, appendCSS) {
  console.log("start load: banner temp 1 ===========>");
  const params = offer.params;
  console.log(params);

  const html = `
    <div id="demo">
    <svg id="mySvg" width="100%" height="7vh">
        
   <text id="txtId" x="50%" y="75%"  text-anchor="middle"  >
     FREE Shipping over $35 in the US
   </text>
   </svg>
  </div>
      `;

  const css = `
    #demo {
        background-image: url(https://us.123rf.com/450wm/estherpoon/estherpoon1606/estherpoon160600104/58030489-ice-polygonal-mosaic-background.jpg?ver=6);
        margin:0;
     }
     
     
     #mySvg #txtId {
       font-family: fantasy;
       stroke: white;
       font-size: 23px;
       font-weight: 500;
       stroke-width: 0.4;
      
       animation: textAnimate 6s infinite alternate;
       
     }
     
     @keyframes textAnimate {
       0% {
         stroke-dasharray: 0 50%;
         stroke-dashoffset:  20%;
     
       }
       
       100% {
         stroke-dasharray: 50% 0;
         stroke-dashoffstet: -20%;
       }
       
     }
     
      `;

  appendCSS(css);

  container.innerHTML += html;

  document.getElementById("txtId").innerHTML = params.text[0].value;
  document.getElementById("txtId").style.stroke = params.colors[0].value;
  document.getElementById("mySvg").style.stroke = params.colors[0].value;
  document.getElementById("demo").style.fill = params.colors[1].value;

  if (params.images[0])
    document.getElementById("demo").style.backgroundImage =
      "url('" + params.images[0]?.url + "')";

  container.style.display = "block";
  return true;
}
