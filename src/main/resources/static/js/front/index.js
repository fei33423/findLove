var age_low_limit = 18;
var age_high_limit = 66;
var height_low_limit = 145;
var height_high_limit = 210;
$(function () {
    initIndexSearch();

    flexisel();
    initToolBar();
    // Animations
    gridRotator();
    contentWayPoint();
    //搜索事件
    searchUser();

    $(".animate-box a").each(function () {
        this.href = contextPath+"profile/"+this.id.split("-")[1];
    })
});

// 每日情缘
function flexisel() {
    $("#flexiselDemo3").flexisel({
        visibleItems: 1,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 8000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            portrait: {
                changePoint: 480,
                visibleItems: 1
            },
            landscape: {
                changePoint: 640,
                visibleItems: 1
            },
            tablet: {
                changePoint: 768,
                visibleItems: 1
            }
        }
    });
}

function gridRotator(){
    $('#ri-grid').gridrotator({
        rows: 2,
        // number of columns
        columns: 3,
        w1024: {rows: 2, columns: 3},
        w768: {rows: 2, columns: 3},
        w480: {rows: 2, columns: 3},
        w320: {rows: 2, columns: 3},
        w240: {rows: 2, columns: 3},
        preventClick: false
    });
}

function contentWayPoint() {
    var i = 0;
    $('.animate-box').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('animated') ) {
            i++;
            $(this.element).addClass('item-animate');
            setTimeout(function(){

                $('body .animate-box.item-animate').each(function(k){
                    var el = $(this);
                    setTimeout( function () {
                        var effect = el.data('animate-effect');
                        if ( effect === 'fadeIn') {
                            el.addClass('fadeIn animated');
                        } else {
                            el.addClass('fadeInUp animated');
                        }

                        el.removeClass('item-animate');
                    },  k * 200, 'easeInOutExpo' );
                });

            }, 100);
        }
    } , { offset: '85%' } );

}

//初始化首页搜索条件
function initIndexSearch() {
    $.ajax({
        url:contextPath+"index/initSearch",
        typ:"get",
        dataType:"json",
        success:function (data) {
            if (data.workplace!=null) {
                var arr = data.workplace.split("-");
                initWorkplaceDropdown(null,"province-select","city-select",arr[0], arr.length > 1 ? arr[1] : -1);
            }else {
                initWorkplaceDropdown(null,"province-select","city-select",-1,-1);

            }
            initAgeDropdown(null,data.ageLow,data.ageHigh);
            initHeightDropdown(null,data.heightLow,data.heightHigh)
        }
    })
}


function searchUser() {
    $("#submit-btn").click(function () {
        $.ajax({
            url: contextPath + "index/getSearchUser",
            data: $("#search-form").serialize(),
            async:false,
            type: "post",
            dataType: "json",
            success: function (data) {
                $("#dayLover").empty();
                $("#dayLover").append("<ul id='flexiselDemo3'>");
                $("#flexiselDemo3").append("<li id='page1'></li>");
                $("#flexiselDemo3").append("<li id='page2'></li>");
               /// $("#page1").empty();$("#page2").empty()
            if(data.length<8){
                for (i = 0; i < data.length; i++) {
                    var id=data[i].id;
                    var photo=data[i].photo;
                    var nickname=data[i].nickname;
                    var vip=data[i].vip;
                    var star=data[i].star;
                    var age=data[i].age;
                    var workplace=data[i].workplace;
                    var height=data[i].height;
                    var salary=data[i].salary;
                    var signature=data[i].userDetail.signature
                    $("#page1").append("<div class='col-md-3 biseller-column'>" +
                        "                                <a href='"+contextPath+"profile/"+id+"'>" +
                        "                                    <div class='profile-image'>" +
                        "                                        <img src='"+contextPath+"file?path="+photo+"' class='img-responsive'"+
                        "style='width: 265px;height: 190px;' alt='profile image'/>" +
                        "                                        <div class='agile-overlay'>" +
                        "                                            <h4>" + nickname +
                        "                                                <img  src='"+contextPath+"images/vip"+(vip ? "" : "-grey")+".png' class='snap-flag'/>" +
                        "                                                <img src='" + contextPath + "images/star-0" + (star ? "" : "-grey") + ".png' class='flag'>" +
                        "                                            </h4>" +
                        "                                            <ul>" +
                        "                                                <li><span>"+age+"</span>"+workplace+"</li>" +
                        "                                                <li><span>"+height+"</span>"+salary+"</li>" +
                        "                                                <li>"+signature+"</li>" +
                        "                                            </ul>" +
                        "                                        </div>" +
                        "                                    </div>" +
                        "                                </a>" +
                        "                            </div>"
                    );
                }
            }else{
                for (i = 0; i < 8; i++) {
                    var id=data[i].id;
                    var photo=data[i].photo;
                    var nickname=data[i].nickname;
                    var vip=data[i].vip;
                    var star=data[i].star;
                    var age=data[i].age;
                    var workplace=data[i].workplace;
                    var height=data[i].height;
                    var salary=data[i].salary;
                    var signature=data[i].userDetail.signature
                    $("#page1").append("<div class='col-md-3 biseller-column'>" +
                        "                                <a href='"+contextPath+"profile/"+id+"'>" +
                        "                                    <div class='profile-image'>" +
                        "                                        <img src='"+contextPath+"file?path="+photo+"' class='img-responsive'"+
                        "style='width: 265px;height: 190px;' alt='profile image'/>" +
                        "                                        <div class='agile-overlay'>" +
                        "                                            <h4>" + nickname +
                        "                                                <img  src='"+contextPath+"images/vip"+(vip ? "" : "-grey")+".png' class='snap-flag'/>" +
                        "                                                <img src='" + contextPath + "images/star-0" + (star ? "" : "-grey") + ".png' class='flag'>" +
                        "                                            </h4>" +
                        "                                            <ul>" +
                        "                                                <li><span>"+age+"</span>"+workplace+"</li>" +
                        "                                                <li><span>"+height+"</span>"+salary+"</li>" +
                        "                                                <li>"+signature+"</li>" +
                        "                                            </ul>" +
                        "                                        </div>" +
                        "                                    </div>" +
                        "                                </a>" +
                        "                            </div>"
                    );
                }
                for (i = 8; i < data.length; i++) {
                    var id=data[i].id;
                    var photo=data[i].photo;
                    var nickname=data[i].nickname;
                    var vip=data[i].vip;
                    var star=data[i].star;
                    var age=data[i].age;
                    var workplace=data[i].workplace;
                    var height=data[i].height;
                    var salary=data[i].salary;
                    var signature=data[i].userDetail.signature

                    $("#page2").append("<div class='col-md-3 biseller-column'>" +
                        "                                <a href='"+contextPath+"profile/"+id+"'>" +
                        "                                    <div class='profile-image'>" +
                        "                                        <img src='"+contextPath+"file?path="+photo+"' class='img-responsive'" +
                        "style='width: 265px;height: 190px;' alt='profile image'/>" +
                        "                                        <div class='agile-overlay'>" +
                        "                                            <h4>" + nickname +
                        "                                                <img  src='"+contextPath+"images/vip"+(vip ? "" : "-grey")+".png' class='snap-flag'/>" +
                        "                                                <img src='" + contextPath + "images/star-0" + (star ? "" : "-grey") + ".png' class='flag'>" +
                        "                                            </h4>" +
                        "                                            <ul>" +
                        "                                                <li><span>"+age+"</span>"+workplace+"</li>" +
                        "                                                <li><span>"+height+"</span>"+salary+"</li>" +
                        "                                                <li>"+signature+"</li>" +
                        "                                            </ul>" +
                        "                                        </div>" +
                        "                                    </div>" +
                        "                                </a>" +
                        "                            </div>"
                    );
                }
            }




                flexisel();

            }
        });
    });
}