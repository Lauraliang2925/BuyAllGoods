package com.ispan.buyallgoods.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.CommonProblemBean;
import com.ispan.buyallgoods.service.CommonProblemService;
import com.ispan.buyallgoods.service.MembersServiceByP;
import com.ispan.buyallgoods.tools.CommonProblemMemberOthers;

@RestController
@RequestMapping(path = "/problem")
public class CommonProblemController {

	@Autowired
	private CommonProblemService cpSer;

	@Autowired
	private MembersServiceByP mSer;

	// 新增一筆資料------------會員留言
	@PostMapping("/insertOne")
	public String insertOne(@RequestBody CommonProblemMemberOthers commonProblemMemberOthers) {
		return cpSer.addOne(commonProblemMemberOthers);
	}

	// 查詢一筆資料
	@PostMapping("/findOne")
	public CommonProblemBean findOne(@RequestBody CommonProblemBean questionsBean) {
		return cpSer.findOneById(questionsBean.getQuestionId());
	}

	// 修改一筆資料------------admin回覆
	@PostMapping("/replyOne")
	public String replyOne(@RequestBody CommonProblemBean questionsBean) {
		return cpSer.replyOneById(questionsBean);
	}

	@PostMapping("/findAllQ")
	public Map<String, Object> findAllQ() {
		List<CommonProblemBean> findAll = cpSer.findAll();
		Map<String, Object> responseJson = new HashMap<>();

		responseJson.put("list", findAll);

		return responseJson;
	}

	@GetMapping("/findAllQ2")
	public Map<String, Object> findAllQ2(@RequestParam("current") int current, @RequestParam("rows") int rows) {

		// spring boot 分頁API
		Pageable pageable = PageRequest.of((current - 1), rows);

		Page<CommonProblemBean> pages = cpSer.findAll(pageable);

		List<CommonProblemBean> findAll = pages.getContent();
		long count = pages.getTotalElements();

		List<CommonProblemMemberOthers> extendedList = new ArrayList<>();

		for (CommonProblemBean commonProblemBean : findAll) {
			CommonProblemMemberOthers cp = new CommonProblemMemberOthers(); // Create a new object in each iteration
			cp.setMemberId(commonProblemBean.getMemberId());
			cp.setQuestionId(commonProblemBean.getQuestionId());
			cp.setQuestion(commonProblemBean.getQuestion());
			cp.setReply(commonProblemBean.getReply());
			cp.setReplyDate(commonProblemBean.getReplyDate());
			cp.setCreatedDate(commonProblemBean.getCreatedDate());
			cp.setTitle(commonProblemBean.getTitle());

			String userName = mSer.getUserName(commonProblemBean.getMemberId());
			cp.setUserName(userName);
			extendedList.add(cp);
		}

		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("list", extendedList); // Use extendedList instead of cp
		responseJson.put("count", count);

		return responseJson;
	}

}
