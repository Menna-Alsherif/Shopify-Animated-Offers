export function render(offer, container, appendCSS) {

    const params = offer.params;


    const html = `
    <div class="wrapper all">
    <div class="container all">
        <ul class="thumb all">
            <li class="list all" onmouseover="changeImageSrc('pngegg.png')"><img class="image all" id="imageOne" src="pngegg.png" alt=""></li>
            <li class="list all" onmouseover="changeImageSrc('pngegg(1).png')"><img class="image all" id="imageTwo" src="pngegg(1).png" alt=""></li>
            <li class="list all" onmouseover="changeImageSrc('pngegg.png')"><img class="image all" id="imageThree" src="pngegg.png" alt=""></li>
        </ul>
        <div class="imgBox all">
            <h2 class="productName all">Nike Air Zoom</h2>
            <p id="salePercent">50% off</p>
            <img src="pngegg.png" class="selectedImg all" alt="">
            <ul class="size all">
                <span class="spanStyle all">SIZE</span>
                <li class="list all">7</li>
                <li class="list all">8</li>
                <li class="list all">9</li>
                <li class="list all">10</li>
            </ul>

            <a href="" id="btn">Add To Cart</a>


        </div>
    </div>
    </div>



    `;

    const css = `
    @import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
    .all{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Hachi Maru Pop', cursive;
    }
    
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
       /*  background: grey;
        background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%); */
    }
    
    .container{
        position: relative;
        width: 400px;
        height: 400px;
        margin: 60px;
        
        
    }
    
    .container .thumb{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    
    
    }
    
    .container .thumb .list .image{
        width: 90%;
    }
    
    
    .container .thumb .list{
        list-style: none;
        width: 100px;
        height: 100px;
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #232322;
        background: radial-gradient(circle, rgba(146,148,156,1) 0%, rgba(62,83,162,0.8519608527004552) 100%); 
    
       
        /* background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%); */
        box-shadow: 0px 15px 25px rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        border-left: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 15px;
        backdrop-filter: blur(4px); 
        
    }
    
    .container .thumb .list:hover .image{
        transition-duration: 0.8s;
        transform: scale(1.2) rotate(-360deg);
    }
    
    .container .imgBox{
        position: absolute;
        top: 0;
        right: 0;
        width: 350px;
        height: 100%;
        background: #232322;
        background: radial-gradient(circle, rgba(146,148,156,1) 0%, rgba(62,83,162,0.45700286950717783) 100%);
     
       /*  background: grey;
        background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%); */
        box-shadow: 0px 15px 25px rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        border-left: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 15px;
        backdrop-filter: blur(4px);
        display: flex;
        padding: 60px 20px;
        padding-left: 50px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    
    
    }
    
    
    .container .imgBox .productName {
        color: #fff;
        letter-spacing:1;
    }
    
    .container .imgBox #salePercent {
        color: #1e6b7b;
        letter-spacing:2px;
        background:#fff;
        border-radius: 5px;
        padding: 5px 15px;
        justify-content: center;
        animation: float 1.8s ease-in-out infinite;
    
    }
    
    @keyframes float {
        0% { letter-spacing: 2px;}
        50% {letter-spacing: 5px;}
        100% { letter-spacing: 2px;}
    
        
    }
    
    
    .container .imgBox .selectedImg {
        width: 70%;
        height: 80%;
        transition: 0.25s;
    
    
    }
    
    
    .container .imgBox .selectedImg:hover {
        transform: scale(1.6) rotate(15deg) translateX(20px);
    }
    
    
    .container .imgBox .size{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    
    .container .imgBox .size .spanStyle{
    
        color: #fff;
        font-size:1.2em;
        letter-spacing: 1px;
        margin-right: 5px;
    
    }
    
    
    .container .imgBox .size .list{
        list-style: none;
        width: 30px;
        height: 30px;
        background: #fff;
        color: #1e6b7b;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        border-radius: 4px;
        font-weight: 700;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 0.25s;
    }
    
    
    .container .imgBox .size .list:hover{
      transform: translateY(-10px);
    }
    
    .container .imgBox #btn{
        position:absolute;
        bottom: -30px;
        background:#fff;
        display:inline-block;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 30px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        font-weight: 500;
        color: #1e6b7b;
        
        transition: 0.25s;
    }
    
    .container .imgBox #btn:hover{
    letter-spacing: 2px;
    
    }
    `;

    appendCSS(css);

    container.innerHTML += html;



    document.getElementById('btn').innerText = params.text[0].value;
    document.getElementById('salePercent').innerText = params.text[0].value;
    if (params.images[0])
        document.getElementById('imageOne').srcset = params.images[0]?.url;
    if (params.images[1])
        document.getElementById('imageTwo').srcset = params.images[1]?.url;
    if (params.images[2])
        document.getElementById('imageThree').srcset = params.images[2]?.url;






    container.style.display = 'block';
    console.log('finish load idea script')
    return true;
}