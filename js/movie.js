chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, (response) => {
  if (response.data === 'on') {
    console.log('Comment-Movie:ON');
    $('.pagination').css('display','block');
    if($('body').width() <= 768){
      var height = 300
    }else{
      var height = 500
    };

    let youtubeReg = /(http:\/\/|https:\/\/)(www|m)\.youtube\.com\/watch\?v\=.{1,11}/gi;
    let youtube2Reg = /(http:\/\/|https:\/\/)youtu\.be\/.{1,11}/gi;
    let niconicoReg =  /http(s):\/\/(www|sp)\.nicovideo\.jp\/watch\/(sm|so).{1,64}/gi

    setInterval(() => {
      $('.jscroll-inner').ready(() => {
        comment2youtube();
        comment2youtube2();
        comment2niconico();
      })
    },1000)

    const comment2youtube = () => {
      let youtube = $('p').text().match(youtubeReg);
      if(youtube){
        $('p:contains(youtube)').each(function(index){
          let tt = $(this).text();
          if(!$(this).hasClass('has-youtube')){
            $(this).addClass('has-youtube');
            $(this).append('<div class="yt-frame"></div>');
            console.log('#'+index+'\n'+tt);
            let width = $(this).parent().width();
            $(this).text(function(){
              let you = $(this).text();
              you = you.match(youtubeReg).toString();
              let yid = you.replace(/(http:\/\/|https:\/\/)(www|m)\.youtube\.com\/watch\?v\=/, '');
              console.log('ID'+index+':'+yid);
              const yin = you.replace(youtubeReg,'<iframe class="youtube-movie added" src="https://www.youtube.com/embed/'+yid+'" width="'+width+'" height="'+height+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
              $(this).find('.yt-frame').html(yin);
            });
          };
        });
      };
    };

    const comment2youtube2 = () => {
      let youtube2 = $('p').text().match(youtube2Reg);
      if(youtube2){
        $('p:contains("//youtu.be/")').each(function(index){
          let tt = $(this).text();
          if(!$(this).hasClass('has-youtube2')){
            $(this).addClass("has-youtube2");
            $(this).append('<div class="yt-frame"></div>');
            let width = $(this).parent().width();
            $(this).text(function(){
              let you = tt;
              you = you.match(youtube2Reg).toString();
              let yid = you.replace(/(http:\/\/|https:\/\/)youtu\.be\//, '');
              console.log('ID2-'+index+':'+yid);
              const yin = you.replace(youtube2Reg,'<iframe class="youtube-movie added" src="https://www.youtube.com/embed/'+yid+'" width="'+width+'" height="'+height+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
              $(this).find('.yt-frame').html(yin);
            });
          };
        });
      };
    };

    const comment2niconico = () => {
      let niconico = $('p').text().match(niconicoReg);
      if(niconico){
        $('p:contains("nicovideo.jp/watch/")').each(function(index){
          let tt = $(this).text();
          if(!$(this).hasClass('has-niconico')){
            $(this).addClass('has-niconico');
            $(this).append('<div class="nico-frame"></div>');
            let nc = tt;
            nc = nc.match(niconicoReg).toString();
            let nid = nc.replace(/http(s):\/\/(www|sp)\.nicovideo\.jp\/watch\//,'');
            console.log('ID-nico'+index+':'+nid);
            const nin = nc.replace(niconicoReg,'<iframe allowfullscreen="allowfullscreen" frameborder="0" width="640" height="360" src="https://embed.nicovideo.jp/watch/'+nid+'?oldScript=1&referer='+location.href+'&from=0&allowProgrammaticFullScreen=1"style="max-width: 100%;"></iframe>');
            $(this).find('.nico-frame').html(nin);
          };
        });
      };
    };
  }else{
    console.log('Comment-Movie:OFF');
  };
});
