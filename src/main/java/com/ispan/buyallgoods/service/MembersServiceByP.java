package com.ispan.buyallgoods.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.repository.MembersRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class MembersServiceByP {

	@Autowired
	private MembersRepository membersRepository;

	public Members findMembersByIdForAddS(Integer id) {
		Optional<Members> optional = membersRepository.findById(id);
		if (optional.isPresent()) {
			Members members = optional.get();
			return members;
		} else {
			return null;
		}
	}

	// for新增廠商頁面的會員代號下拉選單
	public List<Object> findAllMembers() {
		List<Object> allMemberId = membersRepository.getAllMemberId();

		if (allMemberId == null) {
			return null;
		}
		return allMemberId;
	}

	public List<Object> findOneByMemberId(Integer membersId) {
		List<Object> oneByMemberId = membersRepository.getOneByMemberId(membersId);
		if (oneByMemberId == null) {
			return null;

		}
		return oneByMemberId;

	}

	public Map<String,Object> findByUserName(Members members) {
		Members findByUserName = membersRepository.findByUserName(members.getUserName());
		Map<String,Object> responseJSON = new HashMap<>();
		if (findByUserName!=null) {
				if (findByUserName.getPassword().equals(members.getPassword())) {
					responseJSON.put("message", "登入成功!!");
					responseJSON.put("success", true);
					responseJSON.put("members", findByUserName);
					
					//Alan 0818 1640 for session
					responseJSON.put("UserName", findByUserName.getUserName());
					responseJSON.put("UserId", "  "+findByUserName.getMembersId());
					responseJSON.put("RoleId", "  "+findByUserName.getRoleId());
					
					
					return responseJSON;
			}
				responseJSON.put("message", "密碼輸入錯誤!!");
				responseJSON.put("success", false);
				return responseJSON;
		}
		responseJSON.put("message", "找無此帳號，請重新確認輸入之內容");
		responseJSON.put("success", false);
		return responseJSON;
	}
	

}