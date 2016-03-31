function sortTable(f,n){
    var rows = $('#roster').find('tbody  tr').get();

    rows.sort(function(a, b) {

        var A = getVal(a);
        var B = getVal(b);

        if(A < B) {
            return -1*f;
        }
        if(A > B) {
            return 1*f;
        }
        return 0;
    });

    function getVal(elm){
        var v = $(elm).children('td').eq(n).text().toUpperCase();
        if($.isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    $.each(rows, function(index, row) {
        $('#roster').children('tbody').append(row);
    });
}
var f_sl = 1;
var f_nm = 1;
$("#first_name").click(function(){
    f_sl *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_sl,n);
});
$("#last_name").click(function(){
    f_nm *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_nm,n);
});
$("#psu_id").click(function(){
    f_nm *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_nm,n);
});
$("#team").click(function(){
    f_nm *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_nm,n);
});
