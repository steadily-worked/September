$(function() {
    $('#listButton').click(function() {
        $.ajax({
            type: "POST",
            urk: "/list.html",
            dataType : "html",
            success: function(data) {
                $('#listDiv').html(data);
            }
        });
    })
})
