$(document).ready(function () {
    var articles = $('.articles');
    var input = $('input');
    var button = $('button');
    var toSearch = '';
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            dataType: 'jsonp',
            data: {
                //main parameters
                action: 'query',
                format: 'json',

                generator: 'search',
                    //parameters for generator
                    gsrsearch: toSearch,
                    gsrnamespace: 0,
                    gsrlimit: 10,

                prop: 'extracts|pageimages',
                    //parameters for extracts
                    exchars: 200,
                    exlimit: 'max',
                    explaintext: true,
                    exintro: true,

                    //parameters for pageimages
                    piprop: 'thumbnail',
                    pilimit: 'max',
                    pithumbsize: 100
            },
            success: function (json) {
                var pages = json.query.pages;
                $.map(pages, function (page) {
                    var pageElement = $('<div>');

                    //get the article title
                    pageElement.append($('<h3>').append($('<a target="_blank">').attr('href', 'http://en.wikipedia.org/wiki/' + page.title).text(page.title)));

                    //get the article image (if exists)
                    if (page.thumbnail) pageElement.append($('<img>').attr('width', 150).attr('src', page.thumbnail.source));

                    //get the article text
                    pageElement.append($('<p>').text(page.extract));

                    pageElement.append($('<hr>'));

                    articles.append(pageElement);
                });
            }
        });
    };

    input.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: searchUrl,
                dataType: 'jsonp',
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        }
    });
    
    button.click(function () {
        articles.empty();
        toSearch = input.val();        
        if (toSearch !==""){$("#search").css("height",'10vh');
         ajaxArticleData();}
        else { alert('Please input something to search!');}
       
    });
 
  input.change(function(){
    articles.empty();    
    $('#stext').css("width",'100%');
  })
  
});