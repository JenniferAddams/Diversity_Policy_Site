$(document).ready(function() {
    var timeoutID = null;
    function findMember(str) {
        console.log('search: ' + str);
    }

    $('#s_bar3').click(function(err) {
        $(".be_strong").removeClass();
        var query = $("#s_bar2").val();
        clearTimeout(timeoutID);
        $.ajax({
            url: "/policy_suggest/?search=" + query,
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                //console.log(res);
                var tags = res.suggestions;
                var html = $('.card.border-0');
                $.each(html,function(index,v){
                    //$('.be_strong').removeClass('be_strong');
                    //var v = $('.card.border-0')[i].html(); 
                   //console.log(v.innerHTML);
                  // $('.be_strong').innerHTML=$('.be_strong').innerText;
                    var v = v.innerHTML;
                    var htmlReg = new RegExp("\<.*?\>", "i"); 
                    var arrA = new Array(); 
                    for (var i = 0; true; i++) { 
                        var m = htmlReg.exec(v); 
                        if (m) { 
                            arrA[i] = m; 
                        } 
                        else { 
                            break; 
                        } 
                        v = v.replace(m, "[[[[" + i + "]]]]"); 
                    } 
                    var replaceText 
                    if (true) 
                    replaceText = "<span class='be_strong'>$1</span>"; 
                    else 
                    replaceText = "<font style='color:black;'>$1</font>"; 
                    var arrayWord = query.split(','); 
                    for (var w = 0; w < arrayWord.length; w++) { 
                        var r = new RegExp("(" + arrayWord[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig"); 
                       // console.log(v);
                        v = v.replace(r, replaceText); 
                    } 
                    for (var i = 0; i < arrA.length; i++) { 
                        v = v.replace("[[[[" + i + "]]]]", arrA[i]); 
                    }
                    $(".card.border-0")[index].innerHTML=v;
                    //$(".card.border-0")[index].html(v);  
                });
            //    setHeightKeyWord('container-fluid', query, 'black', true);
                $( "#s_bar2" ).autocomplete({
                    source: tags
                });
                //字体变粗
                
   
            }
        });
            //console.log("handler function called! Data: " + query);

    });

    //Save previous search query in the current search bar--get from URL
    //Problem is that there is a tiny lag before it appears
    const urlParams = new URLSearchParams(window.location.search);
    $('#s_bar2').val(urlParams.get('search'));
    $('.query').each(function(){
        $(this).val(urlParams.get('search'));
    });

    var years = new Set();
    $('.filter').each(function(){
        var filter = this.getAttribute("data-filter").split("-");
        key = filter[0];
        if(!years.has(key)){
            years.add(key);
            $(this).val(key);
            this.setAttribute('data-filter', key)
        } else {
            $(this).css('display', 'none')
        }
    });

});

var yearFilter = document.querySelectorAll("[data-filter]");
var yearFilterArray = Array.from(yearFilter);

let sorted = yearFilterArray.sort(sorter);
//字体加粗
function setHeightKeyWord(id, keyword, color, bold) { 
    if (keyword == "") 
        return; 
    var tempHTML = $("#container-fluid").html(); 
    console.log(tempHTML);
    var htmlReg = new RegExp("\<.*?\>", "i"); 
    var arrA = new Array(); 
    for (var i = 0; true; i++) { 
        var m = htmlReg.exec(tempHTML); 
        if (m) { 
            arrA[i] = m; 
        } 
        else { 
            break; 
        } 
        tempHTML = tempHTML.replace(m, "[[[[" + i + "]]]]"); 
    } 
    var replaceText 
    if (bold) 
    replaceText = "<b style='color:" + color + ";'>$1</b>"; 
    else 
    replaceText = "<font style='color:" + color + ";'>$1</font>"; 
    var arrayWord = keyword.split(','); 
    for (var w = 0; w < arrayWord.length; w++) { 
        var r = new RegExp("(" + arrayWord[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig"); 
        tempHTML = tempHTML.replace(r, replaceText); 
    } 
    for (var i = 0; i < arrA.length; i++) { 
        tempHTML = tempHTML.replace("[[[[" + i + "]]]]", arrA[i]); 
    } 
    $("#container-fluid").html(tempHTML); 
} 
function sorter(a,b) {
    if(a.dataset.filter < b.dataset.filter) return -1;
    if(a.dataset.filter > b.dataset.filter) return 1;
}

sorted.forEach(e => document.querySelector("#yr-filter > form").appendChild(e));

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function CopyToClipboard(id, link) {
    copyTextToClipboard(link);
    var elem = document.getElementById(id);
    $(elem).val($(elem).data("loading-text")); setTimeout(function(){
        $(elem).val('Copy Link');
    }, 1500);
}

function showCites(source) {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    document.getElementById('mla').innerHTML = getMLA(source);
    document.getElementById('apa').innerHTML = getAPA(source);
    document.getElementById('chicago').innerHTML = getChicago(source);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

function getMLA(source) {
    var mla = "";
    if(source.getAttribute("data-author")) {
        mla += (formatAuthor(source.getAttribute("data-author").trim(), "mla"));
    }
    if(source.getAttribute("data-title")) {
        var title = source.getAttribute("data-title").split(" ");
        if(title[title.length-1].includes("?") || title[title.length-1].includes("!")
        || title[title.length-1].includes(".")) {
            mla += ('"' + source.getAttribute("data-title").trim() + '" ');
        } else {
            mla += ('"' + source.getAttribute("data-title").trim() + '." ');
        }
    }
    if(source.getAttribute("data-publisher")) {
        var pub = source.getAttribute("data-publisher").trim();
        mla += (pub.italics() + ', ');
    }
    if(source.getAttribute("data-pubdate")) {
        mla += (formatDate(source.getAttribute("data-pubdate").trim(), "mla") + ", ");
    }
    var url = source.getAttribute("data-url");
    url = url.replace(/^\/\/|^.*?:(\/\/)?/, '');
    mla += url.trim() + ". ";

    var date = new Date();
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    mla += "Accessed " + day + ' ' + months[monthIndex] + ' ' + year + ".";

    return mla;
}

function getAPA(source) {
    var apa = "";
    if(source.getAttribute("data-author")) {
        apa += (formatAuthor(source.getAttribute("data-author").trim(), "apa"));
    }
    if(source.getAttribute("data-title")) {
        var title = source.getAttribute("data-title").split(" ");
        if(title[title.length-1].includes("?") || title[title.length-1].includes("!")
        || title[title.length-1].includes(".")) {
            apa += (source.getAttribute("data-title").trim() + ' ');
        } else {
            apa += (source.getAttribute("data-title").trim() + '. ');
        }
    }
    if(source.getAttribute("data-pubdate")) {
        apa += ("(" + formatDate(source.getAttribute("data-pubdate").trim(), "apa") + "). ");
    } else {
        apa += "(n.d.). ";
    }

    apa += "Retrieved from " + source.getAttribute("data-url");
    return apa;
}

function getChicago(source) {
    var chicago = "";
    if(source.getAttribute("data-author")) {
        chicago += (formatAuthor(source.getAttribute("data-author").trim(), "chicago"));
    }
    if(source.getAttribute("data-title")) {
        var title = source.getAttribute("data-title").split(" ");
        if(title[title.length-1].includes("?") || title[title.length-1].includes("!")
        || title[title.length-1].includes(".")) {
            chicago += ('"' + source.getAttribute("data-title").trim() + '" ');
        } else {
            chicago += ('"' + source.getAttribute("data-title").trim() + '." ');
        }
    }
    if(source.getAttribute("data-publisher")) {
        chicago += (source.getAttribute("data-publisher").trim() + '. ');
    }
    if(source.getAttribute("data-pubdate")) {
        chicago += (formatDate(source.getAttribute("data-pubdate").trim(), "chicago") + '. ');
    } else {
        var date = new Date();
        var months2 = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        chicago += "Accessed " + months2[monthIndex] + ' ' + day + ', ' + year + ". ";
    }

    chicago += source.getAttribute("data-url");
    return chicago;
}

function formatAuthor(author, format) {
    if(format == "mla" || format == "chicago") {
        var formatted = author.split(" ");
        if(formatted.length == 3) {
            if(formatted[1].includes(".")) {
                return formatted[2] + ', ' + formatted[0] + ' ' + formatted[1] + " ";
            }
            return formatted[2] + ', ' + formatted[0] + ' ' + formatted[1] + ". ";
        } else {
            return formatted[1] + ', ' + formatted[0] + ". ";
        }
    }
    else if(format == "apa") {
        var formatted = author.split(" ");
        if(formatted.length == 3) {
            return formatted[2] + ", " + formatted[0][0] + ". " + formatted[1] + " ";
        }
        else {
            return formatted[1] + ", " + formatted[0][0] + ". ";
        }
    }
}

function formatDate(date, format) {
    var pubdate = new Date(date);
    pubdate = new Date( pubdate.getTime() - pubdate.getTimezoneOffset() * -60000 );
    var day = pubdate.getDate();
    var month = pubdate.getMonth();
    var year = pubdate.getFullYear();
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.",
            "Sept.", "Oct.", "Nov.", "Dec."];
    var months2 = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];

    if(date.split("-").length == 1) {
        return year
    }
    else if(date.split("-").length == 2) {
        if(format == "mla") {
            return months[month] + ' ' + year;
        }
        else if(format == "apa") {
            return year + ", " + months2[month];
        }
        else {
            return months2 + ", " + year;
        }
    }
    else if(date.split("-").length == 3) {
        if(format == "mla") {
            return day + ' ' + months[month] + ' ' + year;
        }
        else if(format == "apa") {
            return year + ", " + months2[month] + " " + day;
        }
        else {
            return months2[month] + " " + day + ", " + year;
        }
    }
    else {}
}


var elements = document.querySelectorAll('.sticky');
Stickyfill.add(elements);