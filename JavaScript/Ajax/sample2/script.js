$(function() {
    $('#call').click(function() {
        $('#show').html('....loading...');

        $.ajax({
            type: "GET",
            url: "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20200902",
            success: function(data) {
                $('#show').html(JSON.stringify(data));
            }
        })
    })
})