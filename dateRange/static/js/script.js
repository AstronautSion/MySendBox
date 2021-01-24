$('document').ready(function(){
    datePickerSet('.start-input', '.end-input');
})

function datePickerSet(startInput, endInput) {
    var sDate = $(startInput);
    var eDate = $(endInput);
    var monthNames = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
    var dayNamesMin =  ['일', '월', '화', '수', '목', '금', '토'];
    var dateFormat = "yy-mm-dd";

    var startDate = null;
    var endDate = null;
    var selectDaylist = [];
    
    function getDaysArray(start, end) {
        for(var arr=[], dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt).toISOString().slice(0,10));
        }
        return arr;
    };
    
    eDate.add(sDate).datepicker({
        inline: true,
        showOtherMonths: true,
        showMonthAfterYear: true,
        selectOtherMonth:true,
        monthNames: monthNames,
        dayNamesMin: dayNamesMin,
        dateFormat: dateFormat,
        beforeShowDay: changeDatas,
    }).datepicker('setDate', new Date(new Date()))
    
    startDate = sDate.val();
    endDate = sDate.val();
    
    sDate.datepicker("option", "onSelect", function (selectedDate){
        startDate = selectedDate;
        eDate.datepicker( "option", "minDate", selectedDate );
        if(selectDaylist){
            selectDaylist = getDaysArray(new Date(startDate),new Date(endDate));
        }
        setTimeout (function () {eDate.focus();}, 0 ); 
    });
    eDate.datepicker("option", "onSelect", function (selectedDate){
        endDate = selectedDate;
        selectDaylist = getDaysArray(new Date(startDate),new Date(endDate));
    });
    
    function changeDatas(d){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', d);

        if($.inArray(string, selectDaylist) == -1){
            return [true,''];
        }else{
            if(string == selectDaylist[0] || string == selectDaylist[selectDaylist.length - 1]){
                return [true,"style_range custom_style_range"];
            }else{
                return [true,"style_range"];
            }
        }
    }
}