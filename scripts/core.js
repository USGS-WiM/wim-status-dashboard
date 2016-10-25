/**
 * Created by bdraper on 10/21/2016.
 */
// $( "#mapServices" ).selectmenu();

//main document ready function
$( document ).ready(function() {

    //uptime robot
    var tag = document.createElement("script");
    tag.src = "https://api.uptimerobot.com/getMonitors?apiKey=u376953-d43c4b57764cb9b6b3da0618&format=json";
    document.getElementsByTagName("head")[0].appendChild(tag);

    // Load the services list xml feed file using ajax
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/USGS-WiM/service_lists/master/mapServices_xml/wimMapServices.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("entry").each(function () {
                var optionLabel = $(this).find('title').text();
                var optionValue = $(this).find('serviceUrl').text();
                $('#mapService').append('<option value="' + optionValue + '">' + optionLabel + '</option>');
            });
        }
    });

    $("#btn_checkMapService").click(function (){
        $(".testLoading").show();
        var serviceUrl = $("#mapService").val();
        var serviceType = 'agsmapserver';
        var apiKey = 'a09fa1813393acffca8c06f9f2782054';
        lastServiceSelected = $("#mapService option:selected").text();

        var tag = document.createElement("script");
        tag.src = "https://statuschecker.fgdc.gov/api/v2/liveTest?auth=" + apiKey + "&type=" + serviceType + "&url="+ serviceUrl +"&callback=displayLiveTestResults";
        document.getElementsByTagName("head")[0].appendChild(tag);

        // $.ajax({
        //     type: "GET",
        //     url: "https://statuschecker.fgdc.gov/api/v2/liveTest?auth=" + apiKey + "&type=" + serviceType + "&url="+ serviceUrl,
        //     dataType: "jsonp",
        //     crossDomain: true,
        //     success: function (result) {
        //     console.log("nailed it. " + result)
        //     $("#timeVal").html(result.data[0].date);
        //     }
        // });

    });

});





