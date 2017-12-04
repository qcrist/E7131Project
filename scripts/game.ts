import * as $ from "jquery"

namespace gamepage {
    $(()=>{
        $("choice").click(e => {
            let is_correct = e.target.getAttribute("correct") == "true";
            if (is_correct) {
            } else {
            }
            setTimeout(() => {
                $("content").on("click",e => location.reload());
            }, 500);
            document.body.setAttribute("finished", "");
        })
    })
}
