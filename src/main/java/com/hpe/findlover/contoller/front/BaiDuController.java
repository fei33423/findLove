package com.hpe.findlover.contoller.front;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yk
 * @date 2018/7/6 15:53
 */
@Controller
@RequestMapping("/baidu")
public class BaiDuController {
    private Logger logger = LogManager.getLogger(BaiDuController.class);

    @RequestMapping("getBaiDuPage")
    public String getBaiDuPage(){
        return "front/baidu";
    }
}
