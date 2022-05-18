

export function getParams(script_name) {

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf("/" + script_name) > -1) {
            var pa = scripts[i].src.split("?").pop().split("&");
            var p = {};
            for (var j = 0; j < pa.length; j++) {
                var kv = pa[j].split("=");
                p[kv[0]] = kv[1];
            }
            return p;
        }
    }
    return {};
}

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export async function getData(url, respHeader) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    const data = await response.json();

    if (respHeader) {
        data.respHeader = response.headers.get(respHeader);
    }

    return data;
}



export function renderScript(scriptSrc) {
    const script = document.createElement("script");
    //script.type = 'module';
    script.src = scriptSrc;
    document.body.append(script);
    return script;
}
export function renderStyle(styleSrc) {
    const style = document.createElement("link");
    style.rel = 'stylesheet';
    style.href = styleSrc;
    style.type = 'text/css';
    document.head.append(style);
    return style;
}
export function renderElement(tag, id, cls, style, parent) {
    const elm = document.createElement(tag);
    if (id) {
        elm.id = id;
    }
    if (cls) {
        elm.className = cls;
    }
    if (style) {
        elm.style = style;
    }
    if (parent) {
        parent.append(elm);
    } else {
        document.body.append(elm);
    }

    return elm;
}

export function isArrayIncludeKey(arr, key, value) {
    for (const elm of arr) {
        if (elm[key] === value) {
            console.log(value)
            return true;
        }
    }
    return  false;
}

export function appendCSS(css){
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
}
