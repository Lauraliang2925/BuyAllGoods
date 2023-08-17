package com.ispan.buyallgoods.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.service.MembersService;

@Controller
public class MembersController {

	@Autowired
	private MembersService membersService;

	@Value("${spring.servlet.multipart.location}") // 获取配置文件中的临时目录路径
	private String uploadPath;

	@ResponseBody
	@PutMapping("/members/modify/{id}")
	public String modifyMember(@PathVariable(name = "id") Integer id, @RequestBody String json) {

		System.out.println("modify=" + json);

		JSONObject obj = new JSONObject(json);
		JSONObject responseJson = new JSONObject();
		Members savedMember = null;

		// 資料轉換
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

		System.out.println("photoPath=" + photoPath);

		Members membersById = membersService.findMembersById(membersId);

		if (membersById == null) {
			responseJson.put("message", "資料不存在");
			responseJson.put("success", false);
		} else {
			// 進行存檔作業
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
			System.out.println("split=" + split[0] + "_" + split[1]);
			membersById.setPhotoPath(split[1]);

			// 定义日期时间格式化器
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

			// 将字符串转换为LocalDateTime
			LocalDateTime registrationDateTime = LocalDateTime.parse(registrationDate, formatter);
			membersById.setRegistrationDate(registrationDateTime);
			membersById.setRoleId(roleId);

			LocalDateTime expirationDateTime = LocalDateTime.parse(expirationDate, formatter);
			membersById.setExpirationDate(expirationDateTime);

			System.out.println("membersById=" + membersById);
			savedMember = membersService.saveMembers(membersById);
			if (savedMember == null) {
				responseJson.put("message", "修改資料失敗");
				responseJson.put("success", false);
			} else {
				responseJson.put("message", "修改資料成功");
				responseJson.put("success", true);
			}
		}
		return responseJson.toString();
	}

	@ResponseBody
	@PostMapping("/members/single-file")
	public String singleFile(@RequestParam("file") MultipartFile file,
			@RequestParam("editMembersId") String editMembersId) {
		JSONObject responseJson = new JSONObject();
		if (file == null || file.isEmpty()) {
			responseJson.put("message", "檔案不存在");
			responseJson.put("success", false);
		} else {
			try {
				byte[] bytes = file.getBytes(); // 檔案內容
				String name = file.getOriginalFilename(); // 檔案名稱
				String type = file.getContentType(); // 檔案類型
				long size = file.getSize(); // 檔案大小

				// 新檔名準備
				String originalFileName = file.getOriginalFilename();
				String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

				LocalDateTime currentDateTime = LocalDateTime.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("_yyyyMMdd_HHmmss");
				String formattedDate = currentDateTime.format(formatter);

				System.out.println("name=" + name);
				System.out.println("type=" + type);
				System.out.println("size=" + size);
				System.out.println("editMembersId=" + editMembersId);
				System.out.println(
						"路徑與新檔名=" + uploadPath + "/pic/members/" + editMembersId + formattedDate + fileExtension);

				// 存檔
				File destFile = new File(uploadPath + "/pic/members/" + editMembersId + formattedDate + fileExtension);
				file.transferTo(destFile); // 保存文件到指定位置

				// 更新table
				Integer updateRows = membersService.updatePhotoById(
						"/pic/members/" + editMembersId + formattedDate + fileExtension,
						Integer.parseInt(editMembersId));

				System.out.println("updateRows=" + updateRows);

				if (updateRows != 1) {
					throw new Exception(
							"/pic/members/" + editMembersId + formattedDate + fileExtension + " update memeber fail");
				}

				responseJson.put("message", "檔案上傳成功");
				responseJson.put("success", true);
				responseJson.put("photoPath", "/pic/members/" + editMembersId + formattedDate + fileExtension);

			} catch (Exception e) {
				responseJson.put("message", "檔案上傳失敗");
				responseJson.put("success", false);
				System.out.println("檔案上傳失敗(e)：" + e.toString());
			}
		}
		return responseJson.toString();
	}

	@GetMapping({ "/members/readedit" })
	public String readEdit(@RequestParam String membersId, Model model) {

		Members membersById = membersService.findMembersById(Integer.parseInt(membersId));
//		System.out.println("(membersById.getBirthday()).toString()="+membersById.getBirthday());
//		System.out.println("(membersById.getBirthday()).toString()="+membersById.getRegistrationDate());
//		System.out.println("(membersById.getBirthday()).toString()="+membersById.getExpirationDate());

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		model.addAttribute("membersId", membersId);
		model.addAttribute("onemember", membersById);
		model.addAttribute("onememberBirthday", (membersById.getBirthday()).toString());
		model.addAttribute("onememberRegistrationDate",
				((membersById.getRegistrationDate()).format(formatter)).toString());
		model.addAttribute("onememberExpirationDate",
				(membersById.getExpirationDate() != null) ? membersById.getExpirationDate().toString() : null);

		return "members/member-edit";
	}

	@GetMapping({ "/members/list" })
	public String memberslist() {
		return "/members/member-list";
	}

	@ResponseBody
	@PostMapping("/members/findusernamebylike")
	public Map<String, Object> findUserNameByLike(@RequestBody Members members) {
		Map<String, Object> responseJson = new HashMap<>();
		String userName = members.getUserName();

		if (userName == null) {
			responseJson.put("message", "資料不存在");
		} else {
			List<Members> findUserNameByLike = membersService.findUserNameByLike(userName);
			responseJson.put("list", findUserNameByLike);
		}
		return responseJson;
	}

	@ResponseBody
	@PostMapping("/members/insert")
	public Members insert(@RequestBody Members members) {

		LocalDateTime registrationDate = LocalDateTime.now();
		;
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String registrationDate = sdf.format(currentDate);

		members.setRegistrationDate(registrationDate);
		members.setExpirationDate(null);
		Members newMember = membersService.saveMembers(members);
		return newMember;
	}

	@ResponseBody
	@GetMapping("/members/getbyid")
	public Members selectById(@RequestParam Integer id) {
		Members findMembersById = membersService.findMembersById(id);
		System.out.println("getbyid=" + findMembersById.getUserName());
		return findMembersById;
	}

	@ResponseBody
	@GetMapping("/members/getall")
	public List<Members> selectAll() {
		List<Members> findMembersAll = membersService.findMembersAll();
		System.out.println("findMembersAll=" + findMembersAll);
		return findMembersAll;
	}

	@ResponseBody
	@DeleteMapping("/members/deletebyid")
	public Integer deleteById(@RequestParam Integer id) {
		Integer deleteCount = membersService.deleteMembersById(id);
		return deleteCount;
	}

	// 可以前端整個member(含ID)塞過來，只要格式OK
	@ResponseBody
	@PostMapping("/members/update")
	public Members updateSet(@RequestBody Members members) {
		Members membersById = membersService.findMembersById(members.getMembersId());
		if (membersById != null) {
			membersService.saveMembers(members);
			return membersById;
		} else {
			return null;

		}

	}

	@ResponseBody
	@GetMapping("/members/pages")
	public Page<Members> findByPage(@RequestParam("pagenum") Integer pageNumber, @RequestParam("rows") Integer rows,
			@RequestParam("direction") String sortDirection, @RequestParam("columnname") String columnName) {
		Page<Members> findMembersByPage = membersService.findMembersByPage(pageNumber, rows, sortDirection, columnName);
		return findMembersByPage;
	}

//	@ResponseBody
//	@PostMapping("/members/updateset")
//	public Members updateSet(@RequestBody Members members) {
//		Members membersById = membersService.findMembersById(members.getMembersId());
//		if (membersById != null) {
//			membersById.setUserName(members.getUserName());			
//			membersService.saveMembers(membersById);
//			return membersById;
//		}else {
//			return null;
//			
//		}
//		
//	}

	
	
	


}
