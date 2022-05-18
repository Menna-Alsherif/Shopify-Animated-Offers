
export function render(offer, container, appendCSS) {
    console.log('start load: style69GAPS===========>')
    const params = offer.params;
    console.log(params)

    const html = `
<link href="https://fonts.googleapis.com/css?family=Kanit:200,400,500&display=swap" rel="stylesheet">
<link href='//fonts.googleapis.com/css?family=Asap:400,700' rel='stylesheet' type='text/css'>
<div id="style69body">
    <div id="style69wrapper">

        <div id="style69demo">


            <div id="style69imgs">
                <img id="img2"crossorigin="anonymous" src="https://animated-offers-storefront.blazi.co/styles/23-style69/images/img_1.png">
                <img id="img1"crossorigin="anonymous" src="   https://animated-offers-storefront.blazi.co/styles/23-style69/images/img_0.png">
                <img id="img3"crossorigin="anonymous" src="https://animated-offers-storefront.blazi.co/styles/23-style69/images/img_2.png">


            </div>
            <div id="mytext1">
                <div id="quote">
                    <div id="myline1">
                        BIG SALE 15% OFF
                    </div>

                </div>
                <button id="myanimate">BUY NOW</button>

            </div>
        </div>
    </div>
</div>

`;
    const css =` 
     #style69body {
            color:white;
            font-family: 'Kanit', sans-serif;
            background:#ffffff;
            display: flex;
            justify-content: center;
            align-items: center;

        }
        #style69wrapper {
            visibility:hidden;
            width:100%;
            height:100%;
            position: relative;

            text-align:center;
        }
        #style69demo {

            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
            background-color: transparent;
          





        }


        #style69imgs {
            position:relative;
            top:5vh;
           

        }

        #style69imgs img {
           


            max-width: 18%;
            max-height: 15%;
        }
        #img1{
            position:relative;
            transform: scale(1.8);


        }
        #img2{
            position:relative;
            transform: scale(0.8);
           


        }
        #img3 {

            position:relative;
            transform: scale(0.8);

           

        }


        #mytext1{
            position:relative;
            /*top:70px;*/
            top:7vh;
            width:100%;
           height:30vh;

        }
        #quote{
            position:relative;
            top:2vh;
            left:-15vh;
            
            font-size:3.5vh;
            line-height:4vw;
            color:#000;




        }
        #myline1{
            font-family: 'Kanit', sans-serif;
            position:relative;
            left:15vh;
            line-height: 1.3;

        }



        #myanimate {
            position:relative;
            top:1vh;

           
            width: 140px;
            height: 40px;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5vh;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            font-weight: 500;
            color: #000;
            background-color: #fff;
            border: none;
            border-radius: 45px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
            cursor: pointer;
            outline: none;
        }

        #myanimate:hover {
            background-color: #808080;

            color: #fff;
            transform: translateY(-1vh);
        }
    
`;

    appendCSS(css);

    container.innerHTML += html;


    document.getElementById('myline1').innerText = params.text[0].value;

    document.getElementById('myanimate').innerText = params.text[1].value;



    if (params.images[0])
        document.getElementById('img1').srcset = params.images[0]?.url;
    if (params.images[1])
        document.getElementById('img2').srcset = params.images[1]?.url;
    if (params.images[2])
        document.getElementById('img3').srcset = params.images[2]?.url;


    document.addEventListener('click', function (event) {
        if (event.target.matches('button')) {
            event.target.focus()
        }
    })



    var animation = gsap.timeline({repeat:-1})

        .set("#img2",{zIndex:-1})
        .set("#img1",{zIndex:8})
        .set("#img3",{zIndex:-1})
        .from("#style69imgs",{y:-490,duration:3})


        .set("#img2",{zIndex:-8})
        .set("#img1",{zIndex:-8})
        .set("#img3",{zIndex:8})
        .to("#img1",{scale:1,duration:2,xPercent:-90,yPercent:-5})
        .to("#img2",{xPercent:250,duration:2,yPercent:3},"<")
        .to("#img3",{scale:1.8,duration:2,xPercent:-85,yPercent:5},"<")



        .set("#img2",{zIndex:8})
        .set("#img1",{zIndex:-8})
        .set("#img3",{zIndex:-8})
        .to("#img1",{xPercent:120,yPercent:-2,duration:2})
        .to("#img2",
            {scale:1.8,xPercent:100,yPercent:5,duration:2},"<")
        .to("#img3",{scale:0.9,duration:2,xPercent:-210,yPercent:-5},"<")
        .to("#img3",{delay:0.7},"<")


    var tl = gsap.timeline({repeat:-1,yoyo:true})
        .from("#myline1",{ease:"back",duration:5,yPercent:5,scale:1.2,opacity:0,repeat:0})




    gsap.set("#style69wrapper", {scale:1, visibility:"visible"});
    // container.style.display = 'block';
    return true;
}
