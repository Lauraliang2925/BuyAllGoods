package com.ispan.buyallgoods.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.repository.MembersRepository;

@Service
public class MembersService {
	
	@Autowired
	private MembersRepository membersRepository;
	
	public Integer updatePhotoById(String photopath,Integer membersId) {
		Integer updateRows = membersRepository.updatePhotoById(photopath, membersId);
		return updateRows;
	}
	
	//C&U區別by ID
	public Members saveMembers(Members members) {
		Members savedMember = membersRepository.save(members);
		return savedMember;		
	}
	
	//C&U區別by ID
	public Members saveMembersJson(String json) {
		
		JSONObject obj = new JSONObject(json);
		
		Integer membersId = obj.isNull("membersId") ? null : obj.getInt("membersId");
		String userName = obj.isNull("userName") ? null : obj.getString("userName");
		String password = obj.isNull("password") ? null : obj.getString("password");
		String firstName = obj.isNull("firstName") ? null : obj.getString("firstName");
		String lastName = obj.isNull("lastName") ? null : obj.getString("lastName");
		String gender = obj.isNull("gender") ? null : obj.getString("gender");
		String birthday = obj.isNull("birthday") ? null : obj.getString("birthday");
		String tel = obj.isNull("tel") ? null : obj.getString("tel");		
		String phoneNumber = obj.isNull("phoneNumber") ? null : obj.getString("phoneNumber");
		String postalCode = obj.isNull("postalCode") ? null : obj.getString("postalCode");
		String address = obj.isNull("address") ? null : obj.getString("address");
		String email = obj.isNull("email") ? null : obj.getString("email");
		String photoPath = obj.isNull("photoPath") ? null : obj.getString("photoPath");
		String registrationDate = obj.isNull("registrationDate") ? null : obj.getString("registrationDate");
		Integer roleId = obj.isNull("roleId") ? null : obj.getInt("roleId");
		String expirationDate = obj.isNull("expirationDate") ? null : obj.getString("expirationDate");
		
		Members membersById = findMembersById(membersId);
		
		membersById.setUserName(userName);
		membersById.setPassword(password);
		membersById.setFirstName(firstName);
		membersById.setLastName(lastName);
		membersById.setGender(gender);
		
		// 定义日期格式化器
        DateTimeFormatter formatterLDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // 将字符串转换为LocalDate
        LocalDate birthdayLDate = LocalDate.parse(birthday, formatterLDate);			
		membersById.setBirthday(birthdayLDate);
		
		membersById.setTel(tel);
		membersById.setPhoneNumber(phoneNumber);
		membersById.setPostalCode(postalCode);
		membersById.setAddress(address);
		membersById.setEmail(email);
		
		String[] split = photoPath.split("buyallgoods");		
		membersById.setPhotoPath(split[1]);
		
		 // 定义日期时间格式化器
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 将字符串转换为LocalDateTime
        LocalDateTime registrationDateTime = LocalDateTime.parse(registrationDate, formatter);
        membersById.setRegistrationDate(registrationDateTime);
        membersById.setRoleId(roleId);
        
        LocalDateTime expirationDateTime = LocalDateTime.parse(expirationDate, formatter);
        membersById.setExpirationDate(expirationDateTime);
		
        Members savedMember = membersRepository.save(membersById);
		return savedMember;		
	}
	
	
	public Members findMembersById(Integer id) {
		Optional<Members> optional = membersRepository.findById(id);
		if(optional.isPresent()) {
			Members members = optional.get();
			return members;
		}	else {
			Members error = new Members();			
			return error;
		}	
	}
	
	public List<Members> findMembersAll() {
		List<Members> membersAll = membersRepository.findAll();				
		return membersAll;		
	}
	
	
	public List<Members> findUserNameByLike(String userName) {
		List<Members> memberLike = membersRepository.findUserNameByLike(userName);				
		return memberLike;		
	}
	
	
	public Integer deleteMembersById(Integer id) {
		Optional<Members> optional = membersRepository.findById(id);
		if(optional.isEmpty()) {			
			return 0;
		}	else {
			membersRepository.deleteById(id);
			return 1;
		}			
	}
	
	public Page<Members> findMembersByPage(Integer pageNumber,Integer rows,String direction,String columnName) {
		Direction sortDirection = Sort.Direction.DESC;
		if(direction.compareToIgnoreCase("ASC")==0) {
			sortDirection =  Sort.Direction.ASC;
		}		
		Direction asc = Sort.Direction.DESC;
		PageRequest pageRequest = PageRequest.of(pageNumber-1, rows,sortDirection, columnName);
		Page<Members> findAllPage = membersRepository.findAll(pageRequest);
		return findAllPage;		
	}
	
	
	
	
	
	
	
	
	//渝平-----開始
	public Members findMembersByIdForAddS(Integer id) {
		Optional<Members> optional = membersRepository.findById(id);
		if (optional.isPresent()) {
			Members members = optional.get();
			return members;
		} else {
			return null;
		}
	}

	//for新增廠商頁面的會員代號下拉選單
	public List<Object> findAllMembers() {
		List<Object> allMemberId = membersRepository.getAllMemberId();

		if (allMemberId == null) {
			return null;
		}
		return allMemberId;
	}

	public List<Object> findOneByMemberId(Integer membersId) {
		List<Object> oneByMemberId = membersRepository.getOneByMemberId(membersId);
		
		if(oneByMemberId==null) {
			return null;

		}
		return oneByMemberId;

		}
	//渝平-----結束

}
