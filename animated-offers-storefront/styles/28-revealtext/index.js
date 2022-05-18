
export function render(offer, container, appendCSS) {
    console.log('start load: style69GAPS===========>')
    const params = offer.params;
    console.log(params)

    const html = `
<div id="revealtextbody">
    <svg id="revealtextdemo" xmlns="http://www.w3.org/2000/svg" width="2000" height="1000" viewBox="0 0 2000 1000">
        <defs>
            <clipPath id="theClipPath">
                <circle class="revealtextmoveMe" r="200" fill="purple" cx="200" cy="500" />
            </clipPath>
        </defs>
        <circle class="revealtextmoveMe" r="200" fill="#5cceee" cx="200" cy="500" />
        <text id="mytextrevealtext" transform="translate(1000 520)" text-anchor="middle" font-size="400" fill="#333">50 % OFF</text>
        <g clip-path="url(#theClipPath)">
            <text id="mytextrevealtext1" transform="translate(1000 520)" text-anchor="middle" font-size="400" fill="#fff">50 % OFF</text>
        </g>
    </svg>
</div>

`;
    const css =` 
       #revealtextbody {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            overflow: hidden;
            color: transparent;
            font-family: "Roboto", sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;

        }

        #revealtextdemo {
            height: auto;
            width: 100vw;
            font-weight: 400;
            dominant-baseline: middle;
            box-sizing: border-box;

        }
        .revealtextmoveMe{
            background:grey;
            box-sizing: border-box;

        }
    
`;

    appendCSS(css);

    container.innerHTML += html;


    document.getElementById('mytextrevealtext').innerHTML = params.text[0].value;
    document.getElementById('mytextrevealtext1').innerHTML= params.text[0].value;



    gsap.to(".revealtextmoveMe", {
        duration: 4,
        x: 1600,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
    // container.style.display = 'block';
    return true;
}
