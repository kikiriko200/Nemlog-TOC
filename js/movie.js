chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, function (response) {
  if (response.data === 'on') {
    console.log('Comment-Movie:ON')
    $('.pagination').css('display','block')
    const cB = $('.comment_box')
    const width = $('.media').width() - $('.comment-img-box').width()
    if($('body').width() <= 768){
      var height = 300
    }else{
      var height = 500
    }
    // Youtube
    var youtube = /(http:\/\/|https:\/\/)(www|m)\.youtube\.com\/watch\?v\=.{1,11}/gi
    var youtube2 = /(http:\/\/|https:\/\/)youtu\.be\/.{1,11}/gi
    youtube = cB.text().match(youtube)
    youtube2 = cB.text().match(youtube2)

    setInterval(function(){
      $('.comment_box').ready(function(){
        comment2youtube();
        comment2youtube2();
      })
    },1000)

    function comment2youtube(){
      if(youtube){
        $('.comment_box:contains(youtube)').each(function(index){
          var tt = $(this).text()
          if('tt:has(youtube)'){
            if(!$(this).hasClass('has-youtube')){
              $(this).addClass('has-youtube')
              $(this).append('<div class="yt-frame"></div>')
              console.log('#'+index+'\n'+tt)
              $(this).text(function(){
                var you = $(this).text()
                you = you.match(/(http:\/\/|https:\/\/)(www|m)\.youtube\.com\/watch\?v\=.{1,11}/gi).toString()
                console.log('YOU:'+you+' YOU-Type:'+$.type(you))
                var yid = you.replace('https://www.youtube.com/watch?v=', '').replace('https://m.youtube.com/watch?v=', '')
                console.log('ID-a'+index+':'+yid)
                const yin = you.replace(/(http:\/\/|https:\/\/)(www|m)\.youtube\.com\/watch\?v\=.{1,11}/gi,'<iframe class="youtube-movie added" src="https://www.youtube.com/embed/'+yid+'" width="'+width+'" height="'+height+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
                $(this).find('.yt-frame').html(yin)
              })
            }
          }
        })
      }
    }

    function comment2youtube2(){
      if(youtube2){
        $('.comment_box:contains("//youtu.be/")').each(function(index){
          var tt = $(this).text()
          if('tt:has(youtube2)'){
            if(!$(this).hasClass('has-youtube2')){
              $(this).addClass("has-youtube2");
              $(this).append('<div class="yt-frame"></div>')
              $(this).text(function(){
                var you = tt
                you = you.match(/(http:\/\/|https:\/\/)youtu\.be\/.{1,11}/gi).toString()
                var yid = you.replace('https://youtu.be/', '')
                console.log('ID'+index+':'+yid)
                const yin = you.replace(/(http:\/\/|https:\/\/)youtu\.be\/.{1,11}/gi,'<iframe class="youtube-movie added" src="https://www.youtube.com/embed/'+yid+'" width="'+width+'" height="'+height+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
                $(this).find('.yt-frame').html(yin)
              })
            }
          }
        })
      }
    }

    // TODO:Niconico
    /*
      var niconico = /http(s):\/\/(www|sp).nicovideo.jp\/watch\/(sm|so):id/
    */
  }else{
    console.log('Comment-Movie:OFF');
  }
})
