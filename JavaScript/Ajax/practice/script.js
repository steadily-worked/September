$(function() {
    $('#listButton').click(function() {
        $.ajax({
            type: "POST",
            url: "/list.html",
            dataType : "html",
            success: function(data) {
                $('#listDiv').html(data);
            }
        });
    })
})
