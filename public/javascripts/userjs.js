/**
 * Created by Sulaiman on 4/19/2016.
 */

$(document).ready(function(){
    $.ajax({
        url: config.ipaddress + '/api/v2/viewclass/getUsersList',
        type: 'GET',
        success: function (data, textStatus, jqXHR) {
            var i = 0;
            $.each(data, function (index, result) {
                $("<tr></tr>").attr("id",result.user_id+"userTr").appendTo("#userTBody");
                $("<td></td>").attr("id",result.user_id+"userName").appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id+"userName").html(result.username);
                $("<td></td>").attr("id",result.user_id+"email").appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id+"email").html(result.email);
                $("<td></td>").attr("id",result.user_id+"firstName").appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id+"firstName").html(result.first_name);
                $("<td></td>").attr("id",result.user_id+"lastName").appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id+"lastName").html(result.last_name);
                $("<td></td>").attr("id",result.user_id+"phone").appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id+"phone").html(result.phone);
                $("<td></td>").attr("id",result.user_id).appendTo("#"+result.user_id+"userTr");
                $("#"+result.user_id).html('Delete');
                $("#"+result.user_id).css('cursor', 'pointer');
                $("#"+result.user_id).addClass("delete");
                i=i+1;
            });
            $('#user').DataTable();
        },
        error: function() {
            alert('err')
        }
    });
    $(document).on('click', '.delete', function () {
        //alert( $(this).attr('id') );
        var id = $(this).attr('id');
        if (confirm('Are you sure you want to delete the record?')) {
            $.ajax({
                type: 'POST',
                url: config.ipaddress + '/api/v2/viewclass/deleteUserView',
                data: {
                    'user_id': $(this).attr('id')
                },
                success: function(msg){
                    alert(msg);
                    //$('#'+id+'userTr').remove();
                    //$("#user").dataTable().fnDraw();
                    $('#user').dataTable().fnDeleteRow('#'+id+'userTr');
                }
            });
        }
    });
});
