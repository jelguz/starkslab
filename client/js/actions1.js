$(document).ready(function(){        
    
    /* MESSAGE BOX */
    $(".mb-control-rate").on("click",function(){
        var box = $($(this).data("box"));
        if(box.length > 0){
            box.toggleClass("open");
            
            var sound = box.data("sound");
            
            if(sound === 'alert')
                playAudio('alert');
            
            if(sound === 'fail')
                playAudio('fail');
            
        }        
        return false;
    });
    $(".mb-control-rate-close").on("click",function(){
       $(this).parents(".message-box").removeClass("open");
       return false;
    });    
    /* END MESSAGE BOX */
    
});
