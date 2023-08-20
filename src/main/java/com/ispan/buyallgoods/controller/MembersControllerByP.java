package com.ispan.buyallgoods.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.service.MembersServiceByP;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(path = "/members")
public class MembersControllerByP {

	private static final String String = null;
	@Autowired
	private MembersServiceByP mSer;

	// 找所有會員
	@PostMapping("/findMembersByIdForAddS")
	public ResponseEntity<List<Map<String, Object>>> findMembersByIdForAddS() {

		List<Object> findAllMembers = mSer.findAllMembers();

		if (findAllMembers == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object obj : findAllMembers) {
			if (obj instanceof Object[]) {
				Object[] row = (Object[]) obj;
				Map<String, Object> map = new HashMap<>();
				map.put("membersId", row[0]);
				map.put("userName", row[1]);
				map.put("firstName", row[2]);
				map.put("lastName", row[3]);
				result.add(map);
			}
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/findByMembersIdForContractsAdd")
	public Members findByMembersIdForContractsAdd(@RequestBody Members members) {
		Integer membersId = members.getMembersId();
		Members findById = mSer.findMembersByIdForAddS(membersId);
		if (findById == null) {
			return null;
		}
		return findById;
	}

	@PostMapping("/checkUser")
	public Map<String, Object> checkUser(@RequestBody Members members, HttpSession seesion) {

		// 新增Session Alan 08/18 1636
		Map<String, Object> responseJSON = mSer.findByUserName(members);

		seesion.setAttribute("UserName", responseJSON.get("UserName"));
		seesion.setAttribute("UserID", responseJSON.get("UserID"));
		seesion.setAttribute("RoleId", responseJSON.get("RoleId"));

		return responseJSON;
	}

}