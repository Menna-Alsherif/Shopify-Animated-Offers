
export function render(offer, container, appendCSS) {
    console.log('start load: style69GAPS===========>')
    const params = offer.params;
    console.log(params)

    const html = `
<div id="textpopbody">
    <svg id="textpopdemo" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
        <defs>
            <clipPath id="theClipPath">
                <circle id="textpopcircle" r="50" fill="green" cx="50" cy="50" />
            </clipPath>
        </defs>
        <circle id="textpopcircle" r="50" cx="50" cy="50" fill="purple" />
        <g clip-path="url(#theClipPath)">
            <text id="textline1" text-anchor="middle" x="50" y="50" fill="#FFF" font-size="24">MANY</text>
            <text id="textline2"text-anchor="middle" x="50" y="64" fill="white" font-size="14">OFFER</text>
        </g>
    </svg>
</div>

`;
    const css =` 
         @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700);

        #textpopbody {
            background-color: transparent;
            font-family: 'Source Sans Pro', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            min-height: 90vh;

        }

        #textpopdemo {

            font-weight: 700;
        }

    
`;

    appendCSS(css);

    container.innerHTML += html;


    document.getElementById('textline1').innerHTML= params.text[0].value;
    document.getElementById('textline2').innerHTML = params.text[1].value;




    gsap.from("#textpopcircle", {
        duration: 1.1,
        attr: { r: 0 },
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
        ease:"power4.inOut"
    });

    // container.style.display = 'block';
    return true;
}
