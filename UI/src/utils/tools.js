/* eslint-disable no-param-reassign */
class Tools {

    static copyToClipBoard(dom, txt) {
        if (dom && dom.select) {
            try {
                dom.value = txt
                dom.select()
                window.document.execCommand('copy')
                dom.blur()
            }
            catch (err) {
                alert('please press Ctrl/Cmd+C to copy')
            }
        }
    }

    static getContextPosition(e) {
        var posx = 0
        var posy = 0
        if (!e) e = window.event
        if (e.clientX || e.clientY) {
            posx = e.clientX //+ document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY //+ document.body.scrollTop + document.documentElement.scrollTop;
        }
        else if (e.pageX || e.pageY) {
            posx = e.pageX
            posy = e.pageY
        }
        return {
            x: posx,
            y: posy
        }
    };

    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    };

    //文档高度
    static getDocumentTop() {
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0
        if (document.body) {
            bodyScrollTop = document.body.scrollTop
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
        return scrollTop
    }

    //可视窗口高度
    static getWindowHeight() {
        let windowHeight = 0
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight
        } else {
            windowHeight = document.body.clientHeight
        }
        return windowHeight
    }

    //滚动条滚动高度
    static getScrollHeight() {
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
        return scrollHeight
    }

    static copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}

export default Tools
