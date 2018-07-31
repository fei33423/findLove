package com.hpe.findlover.service.impl;

import com.hpe.findlover.mapper.LabelMapper;
import com.hpe.findlover.mapper.UserLabelMapper;
import com.hpe.findlover.model.Label;
import com.hpe.findlover.model.UserLabel;
import com.hpe.findlover.service.UserLabelService;
import com.hpe.util.BaseTkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author sinnamm
 * @Date Create in  2017/10/23.
 */

@Service
public class UserLabelServiceImpl extends BaseServiceImpl<UserLabel> implements UserLabelService {

    @Autowired
    UserLabelMapper userLabelMapper;
    @Autowired
    LabelMapper labelMapper;

    @Override
    public BaseTkMapper<UserLabel> getMapper() {
        return userLabelMapper;
    }

    @Override
    public void reloadLabel(String meaning, int userId, boolean condition) {
        Label labelObj = new Label();
        if("high_salary".equals(meaning)){
            labelObj.setName("高收入");
        }else if("high_education".equals(meaning)){
            labelObj.setName("高学历");
        }else if("have_car".equals(meaning)){
            labelObj.setName("有车一族");
        }else if("have_house".equals(meaning)){
            labelObj.setName("有房一族");
        }else if("civil_servant".equals(meaning)){
            labelObj.setName("公务员");
        }else if("programmer".equals(meaning)){
            labelObj.setName("程序员");
        }
        labelObj = labelMapper.selectOne(labelObj);
        UserLabel userLabel = userLabelMapper.selectLabelByUserIdAndLabelId(userId, labelObj.getId());
        if (condition) {
            if (userLabel == null) {
                UserLabel label = new UserLabel();
                label.setUserId(userId);
                label.setLabelId(labelObj.getId());//设置标签id为标签表的id，这里是有房一族
                userLabelMapper.insert(label);
            }
        } else if (userLabel != null) { //删除有房一族标签
            userLabelMapper.deleteLabelByUserIdAndLabelId(userId, labelObj.getId());
        }
    }
}
