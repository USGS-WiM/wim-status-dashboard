/**
 * Created by bdraper on 10/21/2016.
 */
// $( "#mapServices" ).selectmenu();

//main document ready function
$( document ).ready(function() {

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
        var serviceUrl = $("#mapService").val();
        var serviceType = 'agsmapserver';
        var apiKey = 'a09fa1813393acffca8c06f9f2782054';

        $.ajax({
            type: "GET",
            url: "https://statuschecker.fgdc.gov/api/v2/liveTest?auth=" + apiKey + "&type=" + serviceType + "&url"+ serviceUrl,
            dataType: "json",
            success: function (result) {

                console.log(result);

            }
        });


    });


});


