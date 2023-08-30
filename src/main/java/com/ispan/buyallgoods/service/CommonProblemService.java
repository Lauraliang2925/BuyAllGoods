package com.ispan.buyallgoods.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ispan.buyallgoods.model.CommonProblemBean;
import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.repository.CommonProblemRepository;
import com.ispan.buyallgoods.repository.MembersRepository;
import com.ispan.buyallgoods.tools.CommonProblemMemberOthers;

@Service
public class CommonProblemService {

	@Autowired
	private CommonProblemRepository cpRepo;

	@Autowired
	private MembersRepository mRepo;

	// 新增一筆
	public String addOne(CommonProblemMemberOthers commonProblemMemberOthers) {

		String userName = commonProblemMemberOthers.getUserName();
		Members findByUserName = mRepo.findByUserName(userName);
		if(findByUserName==null) {
			return "輸入的帳號有誤";
		}

		CommonProblemBean commonProblemBean = new CommonProblemBean();
		commonProblemBean.setMemberId(findByUserName.getMembersId());
		commonProblemBean.setQuestion(commonProblemMemberOthers.getQuestion());
		commonProblemBean.setTitle(commonProblemMemberOthers.getTitle());

		cpRepo.save(commonProblemBean);
		
		return "留言成功*.。(๑･∀･๑)*.。";
	}

	// 查詢一筆
	public CommonProblemBean findOneById(Integer questionId) {
		Optional<CommonProblemBean> findById = cpRepo.findById(questionId);
		// 如果沒資料 會回傳false
		if (findById.isPresent()) {
			return findById.get();
		}
		return null;
	}

	// 回覆資料
	public String replyOneById(@RequestBody CommonProblemBean questionsBean) {
		Optional<CommonProblemBean> findById = cpRepo.findById(questionsBean.getQuestionId());
		if (findById.isPresent()) {
			questionsBean.setReplyDate(LocalDateTime.now());
			cpRepo.save(questionsBean);
			return "回覆成功(๑•̀ㅂ•́)و✧";
		}
		return "回覆失敗QAQ";
	}

	public List<CommonProblemBean> findAll() {
		return cpRepo.findAllByOrderByCreatedDateDesc();
	}
	
	public Page<CommonProblemBean> findAll(Pageable pageable) {
		return cpRepo.findAllByOrderByCreatedDateDesc(pageable);
	}
}
